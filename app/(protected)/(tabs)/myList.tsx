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

  const getCourses = coursesStore((state :any) => state.courses) || [];
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

  const getCoursesForHeader = useCallback(
    (header: string) => {
      const keys = storage.getAllKeys();
      if (!keys) {
        console.log("No keys found in storage.");
        return [];
      }
      const bookmarkKeys = keys.filter(
        (key) => key.startsWith("enrolled-") && key.endsWith(header),
      );
      console.log("Bookmark keys for header", header, ":", bookmarkKeys);

      const getId = bookmarkKeys.map((key) => {
        const parts = key.split("-");
        return parts.slice(1, -1).join("-"); // Extract the ID part
      });

      const correctId = getId.map((id) => id.toString().trim());
      storedCourses.forEach((course) => {
        if (correctId.includes(course.id.toString())) {
          console.log("Course matched for header", header, ":", course.title);
        }
      });
      setBookmarkedCourses(
        storedCourses.filter((course) =>
          correctId.includes(course.id.toString()),
        ),
      );
    },
    [storedCourses],
  );

  useEffect(() => {
    if (headers.length > 0) {
      getCoursesForHeader(headers[0]);
    }
  }, [headers, getCoursesForHeader]);

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
