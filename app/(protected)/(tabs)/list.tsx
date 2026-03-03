import React, { useEffect } from "react";
import { View } from "react-native";

import Bg from "@/components/bg";

import { themeStore } from "@/store/storeTheme";

import { useToast } from "@/hooks/useToast";
import { GET_PRODUCTS, GET_USERS } from "@/utils/protected/controllers";
import { LegendList } from "@legendapp/list";

import {
 SkillMastery50OffBanner,
  PremiumCourseBanner,
} from "../_components/adBanner";
import HorizontalList from "../_components/horizontalList";
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

export default function index() {
  const { showToast } = useToast();
  const [data, setData] = React.useState<APIResponse<Course[]>>();
  const [refreshing, setRefreshing] = React.useState(false);
  const getCouses = async (): Promise<APIResponse<Course[]>> => {
    try {
      const res = await GET_PRODUCTS();
 console.log("Fetched courses:");
      setData(res?.data);
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

  const list = [
 
    {
      id: "1",
      header: "Recommended for you",
      data: data?.data || [],
      type: "course",
    },
       {
id : "stack-1",
type: "stack",
component: <Trending />
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



      <LegendList
        data={list}
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
            ) :  item.type === "stack" ? (
              item.component
            ) : (
              <HorizontalList
                header={item.header}
                data={item.data}
                numberOfItems={5}
              />
            )}  
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
