import { coursesStore } from "@/store/dataStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import React, { useEffect } from "react";

import { storage } from "@/constants/storage";
import { useRouter } from "expo-router";
import CourseCardSkeleton from "./skeletorCard";

interface CardProps {
  title: string;
  id: number | string;
  description: string;
  price: string | number;
  thumbnailUrl: string;
  tutorName?: string;
  isHorizontal?: boolean;
  header?: string;
  rating?: number;
  index: number;
}

export default function CourseCard({
  title,
  description,
  price,
  thumbnailUrl,
  tutorName,
  rating,
  index,
  isHorizontal,
  header,
  id,
}: CardProps) {
  const { width } = Dimensions.get("window");
  const tutors = coursesStore.getState().getTutors() || [];
  const isDataMissing = [title, description, price, thumbnailUrl, id].some(
    (value) => value === null || value === undefined,
  );
  const setRatingColor = (rating: number) => {
    if (rating >= 4.5) {
      return "#16a34a";
    } else if (rating >= 3) {
      return "#eab308";
    } else {
      return "#dc2626";
    }
  };


  const [isPurchasedDone, setPurchased] = React.useState(false);

  const router = useRouter();

  useEffect(() => {
    const keys = storage.getAllKeys();
    if (!keys) {
      console.log("No keys found in storage.");
      setPurchased(false);
      return;
    }

    const bookmarkKeys = keys.filter(
      (key) =>
        key.startsWith("enrolled-") &&
        key.endsWith(header?.toString().trim() || ""),
    );
    console.log("Bookmark keys for header", header, ":", bookmarkKeys);

    const getId = bookmarkKeys.map((key) => {
      const parts = key.split("-");
      return parts.slice(1, -1).join("-"); // Extract the ID part
    });

    const correctId = getId.map((id) => id.toString().trim());
    if (correctId.includes(id.toString())) {
      console.log("Course is enrolled for header", header, ":", title);
      setPurchased(true);
    }
  }, []);

  const randomProgress = Math.floor(Math.random() * 61) + 40;

  if (isDataMissing) {
    return <CourseCardSkeleton isHorizontal={isHorizontal} />;
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={async () => {
      {
        isPurchasedDone?
        router.push(`/modules/topics?image=${"https://picsum.photos/200/300"}&title=${title}&description=${description}&price=${price}&tutorName=${tutors?.data?.[index]?.name?.first.concat(" ", tutors?.data?.[index]?.name?.last) || "Unknown Tutor"}&rating=${rating}&id=${id}
    &header=${header || ""}`):
           router.push(`/enrollmentPage?image=${"https://picsum.photos/200/300"}&title=${title}&description=${description}&price=${price}&tutorName=${tutors?.data?.[index]?.name?.first.concat(" ", tutors?.data?.[index]?.name?.last) || "Unknown Tutor"}&rating=${rating}&id=${id}
    &header=${header || ""}`);
      }
  }}
      style={{
        width: isHorizontal ? width - 100 : "100%",
        height: 300,
        marginRight: isHorizontal ? 10 : 0,
        marginBottom: isHorizontal ? 0 : 20,
      }}
      className=" flex-1    flex-col   rounded-xl bg-light/50 dark:bg-gray-900 border-[0.2px] border-gray-500 overflow-hidden "
    >
      <Image
        source={{ uri: "https://picsum.photos/200/300" }}
        resizeMode="cover"
        style={{ width: "100%", height: "60%", marginVertical: "auto" }}
      />

      <View className="flex-1 px-3 py-2 justify-between">
        <View className="px-1">
          <Text className="text-lg font-l-semibold text-light-title dark:text-dark-title">
            {title}
          </Text>
          {!isPurchasedDone ? (
            <>
              <Text
                numberOfLines={1}
                style={{
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
                className="text-sm  h-10 overflow-hidden font-l-regular text-light-body dark:text-dark-body mt-1"
              >
                {description}
              </Text>

              <Text
                numberOfLines={2}
                className="text-sm   overflow-hidden font-l-semibold text-light-body dark:text-dark-body "
              >
                {"\u20B9 "}
                {price}
              </Text>
              {rating && rating > 0 && (
                <View
                  style={{
                    backgroundColor: setRatingColor(rating),
                  }}
                  className="absolute top-2 right-2 px-1 py-0.5 rounded flex-row items-center"
                >
                  <MaterialIcons name="star" size={12} color="white" />
                  <Text className="text-xs text-white font-l-semibold ml-1">
                    {rating.toFixed(1)}
                  </Text>
                </View>
              )}

              <Text className="text-sm  justify-center items-center gap-2  overflow-hidden font-l-semibold text-light-body dark:text-dark-body ">
                {tutors?.data?.[index]?.name?.first.concat(
                  " ",
                  tutors?.data?.[index]?.name?.last,
                ) || "Unknown Tutor"}
              </Text>
            </>
          ) : (
            <View className="flex-col mt-3 items-start gap-2  justify-center">
             
                <Text className="text-sm font-l-semibold text-light-body dark:text-dark-body">
                  Your Progress: {randomProgress}%
                </Text>
              <View className="bg-gray-200  dark:bg-zinc-500 rounded-full w-[90%] h-2 overflow-hidden">
                <View
                  style={{
                    width: `${randomProgress}%`,
                    backgroundColor: "#0ea5e9",
                    height: "100%",
                    borderRadius: 9999,
                  }}
                />
              </View>
               <Text className="text-sm font-l-semibold text-light-body dark:text-dark-body            ">
          Resume Course
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
