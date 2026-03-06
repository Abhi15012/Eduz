import React, { useCallback, useEffect } from "react";
import { View } from "react-native";

import Bg from "@/components/bg";
import { coursesStore } from "@/store/dataStore";

import { useToast } from "@/hooks/useToast";
import { GET_PRODUCTS, GET_USERS } from "@/utils/protected/controllers";
import { LegendList } from "@legendapp/list";

import { storage } from "@/constants/storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  PremiumCourseBanner,
  SkillMastery50OffBanner,
} from "../_components/adBanner";
import HorizontalList from "../_components/horizontalList";
import Searchui from "../_components/searchBar";
import Trending from "../trending";

interface APIResponse<T> {
  sucess: boolean;
  data: T;
  message?: string;
  statusCode: number;
}

export type Course = {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  tutorName: string;
  rating: number;
};
export type Tutor = {
  id: string;
  name: string;
};

export default function list() {
  const router = useRouter();

  const { showToast } = useToast();
  const [data, setData] = React.useState<APIResponse<Course[]>>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [myLearningCourses, setMyLearningCourses] = React.useState<Course[]>(
    [],
  );
  const getCouses = async (): Promise<APIResponse<Course[]>> => {
    try {
      const res = await GET_PRODUCTS();

      setData(res?.data);
      coursesStore.getState().setCourses(res.data);
      setRefreshing(false);
      return res;
    } catch (error) {
      showToast("Failed to fetch courses");
      setRefreshing(false);
      return {
        sucess: false,
        data: [],
        message: "Failed to fetch courses",
        statusCode: 500,
      };
    }
  };

  const getUsers = async (): Promise<APIResponse<Tutor[]>> => {
    try {
      const res = await GET_USERS();
      setRefreshing(false);
      return res;
    } catch (error) {
      showToast("Failed to fetch tutors");
      setRefreshing(false);
      return {
        sucess: false,
        data: [],
        message: "Failed to fetch tutors",
        statusCode: 500,
      };
    }
  };
  useEffect(() => {
    Promise.all([getCouses(), getUsers()]);
  }, []);

  const loadMyLearning = useCallback(() => {
    const keys = storage.getAllKeys();
    if (!keys) return;
    const bookmarkKeys = keys.filter((key) => key.startsWith("enrolled-"));
    const enrolledIds = bookmarkKeys.map((key) => {
      const parts = key.split("-");
      return parts.slice(1, -1).join("-").trim();
    });
    const stored = coursesStore.getState().courses as any;
    const courses = stored?.data || data?.data || [];
    const matched = courses.filter((c: Course) =>
      enrolledIds.includes(c.id.toString()),
    );
    console.log("My Learning - Enrolled IDs:", enrolledIds);
    console.log("My Learning - Matched Courses:", matched);
    setMyLearningCourses(matched);
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      loadMyLearning();
    }, [loadMyLearning]),
  );

  const list = [
    { id: "search-1", type: "search", component: <Searchui /> },

    ...(myLearningCourses.length > 0
      ? [
          {
            id: "my-learning",
            header: "My Learning",
            data: myLearningCourses,
            type: "course",
          },
        ]
      : []),

    {
      id: "1",
      header: "Recommended for you",
      data: data?.data || [],
      type: "course",
    },

    {
      id: "ad-1",
      type: "ad",
      component: "premium",
    },

    {
      id: "2",
      header: "Your Favorites",
      data: data?.data.slice(0, 7) || [],
      type: "course",
    },
    {
      id: "ad-2",
      type: "ad",
      component: "hiring",
    },

    {
      id: "stack-1",
      type: "stack",
      component: <Trending />,
    },

    {
      id: "3",
      header: "Newly Added",
      data: data?.data.slice(7, 14) || [],
      type: "course",
    },
  ];
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([getCouses(), getUsers()]);
  };

  return (
    <View className="bg-light dark:bg-dark flex-1  ">
      <Bg />
      {list.length > 0 && (
        <LegendList
          data={list}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              {item.type === "ad" ? (
                item.component === "premium" ? (
                  <PremiumCourseBanner />
                ) : (
                  <SkillMastery50OffBanner />
                )
              ) : item.type === "stack" ? (
                item.component
              ) : item.type === "search" ? (
                item.component
              ) : (
                <HorizontalList
                  header={item.header || ""}
                  data={item.data || []}
                  numberOfItems={5}
                />
              )}
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
