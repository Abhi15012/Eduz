import BackButton from "@/components/backButton";
import Bg from "@/components/bg";
import { coursesStore } from "@/store/dataStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Course } from "./(tabs)/list";
import LegendListComponent from "./_components/legendList";

export default function SeeAll() {
  const { header, data, from } = useLocalSearchParams() as {
    header: string;
    data: string;
    from: string;
  };
  const router = useRouter();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [searchTexts, setSearchTexts] = useState<string>("");
  const getCourses = coursesStore((state: any) => state.courses) || [];

  const isFromSearch = from === "search";

  let courseList: Course[] =
    getCourses?.data ?? (Array.isArray(getCourses) ? getCourses : []);

  const searchFunction = (text: string) => {
    if (!courseList.length) return;
    console.log("Course list available for searching:", courseList);
    if (!text.trim()) {
      setCourses(courseList);
      return;
    }
    const filtered = courseList.filter((course: Course) =>
      course.title?.toLowerCase().includes(text.toLowerCase()),
    );

    console.log("Filtered courses:", filtered);
    setCourses(filtered);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Searching for:", searchTexts);
      searchFunction(searchTexts);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTexts, courseList]);

  useEffect(() => {
    if (!isFromSearch && data) {
      try {
        const parsedData = JSON.parse(data);
        setCourses(Array.isArray(parsedData) ? parsedData : []);
      } catch (e) {
        console.error("Failed to parse courses data:", e);
        setCourses([]);
      }
    }
  }, [isFromSearch, data]);

  const [displayData, setDisplayData] = useState<Course[]>([]);

  useEffect(() => {
    if (isFromSearch && searchTexts.trim() === "") {
      setDisplayData(courseList);
    } else {
      setDisplayData(courses);
    }
  }, [isFromSearch, courses, courseList, searchTexts]);
  console.log("Display data set to:", displayData);

  return (
    <SafeAreaView className="flex-1 p-4 bg-light dark:bg-dark">
      <Bg />

      <View className="flex-row items-center mb-2">
        <BackButton />
        <Text className="text-xl font-bold text-light-title dark:text-dark-title ml-2">
          {header}
        </Text>
      </View>

     {
        isFromSearch && (
           <TextInput
        placeholder="Search courses..."
        className="bg-light dark:bg-gray-900 p-3 rounded-lg mb-4 text-light-title dark:text-dark-title"
        value={searchTexts}
        onChangeText={setSearchTexts}
      />
        )
     }

      <View className="flex-1">
        <LegendListComponent
          data={displayData}
          numberOfItems={displayData.length}
          isHorizontal={false}
          header={header}
        />
      </View>
    </SafeAreaView>
  );
}
