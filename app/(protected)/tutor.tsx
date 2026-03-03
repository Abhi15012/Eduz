import BackButton from "@/components/backButton";
import Bg from "@/components/bg";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import {
  useSafeAreaInsets
} from "react-native-safe-area-context";



export default function Tutor() {
  const { name, rating, image } = useLocalSearchParams<{
    name?: string;
    rating?: string;
    image?: string;
  }>();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isDark] = useState(colorScheme === "dark");

  const ratingNum = rating ? parseFloat(rating as string) : 4.5;

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <MaterialCommunityIcons
        key={i}
        name={
          i < Math.floor(count)
            ? "star"
            : i < count
              ? "star-half-full"
              : "star-outline"
        }
        size={16}
        color={i < count ? "#f59e0b" : isDark ? "#555" : "#d1d5db"}
      />
    ));

    const router = useRouter();

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-light"}`}>
      

 
      <TouchableOpacity
        onPress={() => {
          router.back();
        }
        }
        style={{
          position: "absolute",
          top: 15 ,
          left: 25,
          zIndex: 50,
        }}
      >
       <MaterialCommunityIcons

          name= "close"
          size={28}
          color={isDark ? "#fff" : "#333"}
        
        />
      </TouchableOpacity>

   
      <View
        style={{
          flex: 1,

          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          overflow: "hidden",
        }}
    
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        >
    
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 100 }}
            className="items-center pt-32 px-6"
          >
        
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                borderWidth: 3,
                borderColor: "#0ea5e9",
                overflow: "hidden",
                marginTop: -70,
              }}
            >
              <Image
                source={{
                  uri:
                    (image as string) ||
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
                }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            </View>

            <Text
              className={`text-xl font-l-bold mt-3 ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              {name || "Tutor"}
            </Text>

            <View className="flex-row items-center mt-1 gap-x-1">
              {renderStars(ratingNum)}
              <Text
                className={`text-sm font-l-medium ml-1 ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
              >
                {ratingNum.toFixed(1)}
              </Text>
            </View>

            <Text
              className={`text-sm font-l-regular mt-1 ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
            >
              Senior Instructor · 120+ Students
            </Text>
          </MotiView>


          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 250 }}
            className="flex-row justify-around mx-5 mt-5 py-4 rounded-2xl border"
            style={{
              borderColor: isDark ? "#374151" : "#e5e7eb",
              backgroundColor: isDark ? "#1f2937" : "#f9fafb",
            }}
          >
            {[
              { label: "Courses", value: "12" },
              { label: "Students", value: "1.2k" },
              { label: "Rating", value: ratingNum.toFixed(1) },
            ].map((stat) => (
              <View key={stat.label} className="items-center">
                <Text
                  className={`text-lg font-l-bold ${isDark ? "text-dark-title" : "text-light-title"}`}
                >
                  {stat.value}
                </Text>
                <Text
                  className={`text-xs font-l-regular ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </MotiView>

         
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 400 }}
            className="mx-5 mt-6"
          >
            <Text
              className={`text-lg font-l-bold mb-2 ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              About
            </Text>
            <Text
              className={`text-sm font-l-regular leading-6 ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
            >
              A passionate educator with years of experience in creating
              engaging, real-world focused curriculum. Specializes in breaking
              down complex topics into easy-to-understand lessons that empower
              students to build projects confidently from scratch.
            </Text>
          </MotiView>


          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 550 }}
            className="mx-5 mt-6"
          >
            <Text
              className={`text-lg font-l-bold mb-3 ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              Expertise
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {[
                "React Native",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "UI/UX Design",
                "Firebase",
              ].map((tag) => (
                <View
                  key={tag}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(14,165,233,0.15)"
                      : "rgba(14,165,233,0.1)",
                    borderWidth: 1,
                    borderColor: isDark
                      ? "rgba(14,165,233,0.3)"
                      : "rgba(14,165,233,0.2)",
                  }}
                >
                  <Text
                    className="text-xs font-l-medium"
                    style={{ color: "#0ea5e9" }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </MotiView>

 
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 700 }}
            className="mx-5 mt-6"
          >
            <Text
              className={`text-lg font-l-bold mb-3 ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              Highlights
            </Text>
            {[
              {
                icon: "award" as const,
                text: "Top-rated instructor on the platform",
              },
              { icon: "book-open" as const, text: "12 courses published" },
              { icon: "users" as const, text: "1,200+ students enrolled" },
              { icon: "clock" as const, text: "200+ hours of content created" },
            ].map((item) => (
              <View
                key={item.text}
                className="flex-row items-center py-2.5 gap-x-3"
              >
                <View
                  className="w-9 h-9 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(14,165,233,0.15)"
                      : "rgba(14,165,233,0.1)",
                  }}
                >
                  <Feather name={item.icon} size={16} color="#0ea5e9" />
                </View>
                <Text
                  className={`flex-1 text-sm font-l-regular ${isDark ? "text-dark-body" : "text-light-body"}`}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </MotiView>
        </ScrollView>
      </View>
    </View>
  );
}
