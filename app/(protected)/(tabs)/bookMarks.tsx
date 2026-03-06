import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import Bg from "@/components/bg";
import { storage } from "@/constants/storage";

import { coursesStore } from "@/store/dataStore";
import { toAndFroStore } from "@/store/toandfro";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "moti";
import LegendListComponent from "../_components/legendList";

export default function BookMarks() {
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
  const toggleBookMark = toAndFroStore((state) => state.isBookMarked);
  console.log("toggleBookmark function from store:", toggleBookMark);
  if (toggleBookMark === undefined) {
    console.log("toggleBookmark function is undefined in the store.");
  }

  const loadBookmarks = useCallback(() => {
    const keys = storage.getAllKeys();
    if (!keys) {
      console.log("No keys found in storage.");
      return;
    }
    const bookmarkKeys = keys.filter((key) => key.startsWith("bookmark-"));

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
      const bookmarkKeys = keys.filter(
        (key) => key.startsWith("bookmark-") && key.endsWith(header),
      );

      const getId = bookmarkKeys.map((key) => {
        const parts = key.split("-");
        return parts.slice(1, -1).join("-");
      });

      const correctId = getId.map((id) => id.toString().trim());
      const matched = storedCourses.filter((course) =>
        correctId.includes(course.id.toString()),
      );

      allCourses.push(...matched);
    });

   
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
  }, [headers, loadCoursesForAllHeaders, toggleBookMark]);

    useEffect(() => {
    loadBookmarks();
  }, [toggleBookMark]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, []),
  );



  return (
    <ScrollView
      className="bg-light dark:bg-dark flex-1  "
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Bg />
      {bookmarkedCourses.length > 0 ? (
        <LegendListComponent
          data={bookmarkedCourses || []}
          numberOfItems={bookmarkedCourses.length}
          isHorizontal={false}
          header={headers[0]}
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
