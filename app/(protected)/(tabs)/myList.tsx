import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import Bg from "@/components/bg";
import { storage } from "@/constants/storage";

import { coursesStore } from "@/store/dataStore";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "moti";
import LegendListComponent from "../_components/legendList";

export default function MyList() {
  const [headers, setHeaders] = React.useState<string[]>([]);

  const [storedCourses, setStoredCourses] = React.useState<any[]>([]);
  const [bookmarkedCourses, setBookmarkedCourses] = React.useState<any[]>([]);

  const getCourses = coursesStore((state: any) => state.courses) || [];
  if (getCourses.length === 0 || getCourses === undefined) {
    console.log("No courses found in store.");
    return;
  }
  useEffect(() => {
    setStoredCourses(getCourses?.data || []);
  }, []);

  const loadBookmarks = useCallback(() => {
    const keys = storage.getAllKeys();
    console.log("All keys in storage:", keys);
    if (!keys) {
      console.log("No keys found in storage.");
      return;
    }
    const bookmarkKeys = keys.filter((key) => key.startsWith("enrolled-"));

    const uniqueHeaders = new Set<string>();
    bookmarkKeys.forEach((key) => {
      const value = storage.getString(key);

      if (value) {
        uniqueHeaders.add(value);
      }
    });
    setHeaders(Array.from(uniqueHeaders));
  }, []);

  const loadCoursesForAllHeaders = useCallback(() => {
    const keys = storage.getAllKeys();
    if (!keys) {
      console.log("No keys found in storage.");
      return;
    }
    const allCourses: any[] = [];

    headers.forEach((header) => {
      const bookmarkKeys = keys.filter((key) => key.startsWith("enrolled-"));

      const getId = bookmarkKeys.map((key) => {
        const parts = key.split("-");
        return parts.slice(1, -1).join("-");
      });

      const correctId = getId.map((id) => id.toString().trim());
      const matched = storedCourses
        .filter((course) => correctId.includes(course.id.toString()))
        .map((course) => ({ ...course, header }));

      allCourses.push(...matched);
    });

    // Deduplicate by course id (keep first occurrence)
    const seen = new Set<string>();
    const unique = allCourses.filter((c) => {
      const key = c.id.toString();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setBookmarkedCourses(unique);
  }, [storedCourses, headers]);

  useEffect(() => {
    if (headers.length > 0) {
      loadCoursesForAllHeaders();
    }
  }, [headers, loadCoursesForAllHeaders]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, []),
  );

  console.log("Unique headers found:", headers);
  console.log("Bookmarked courses:", storedCourses);

  return (
    <ScrollView
      className="bg-light dark:bg-dark flex-1  "
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Bg />
      {headers.length > 0 ? (
        <LegendListComponent
          data={bookmarkedCourses || []}
          from={"myList"}
          numberOfItems={bookmarkedCourses.length}
          isHorizontal={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-light-subtitle dark:text-dark-subtitle text-lg">
            No bookmarks found.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
