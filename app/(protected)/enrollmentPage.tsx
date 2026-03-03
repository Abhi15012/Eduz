import BackButton from "@/components/backButton";
import Bg from "@/components/bg";
import { coursesStore } from "@/store/dataStore";

import { Bookmark } from "@/utils/protected/types";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  SectionList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);


interface SectionItem {
  key: string;
  [k: string]: any;
}
interface Section {
  title: string;
  data: SectionItem[];
}


function buildSections({
  description,
  rating,
  tutorName,
}: {
  description?: string;
  rating?: string;
  tutorName?: string;
}): Section[] {
  const sections: Section[] = [];

  // 1 — Description
  if (description) {
    sections.push({
      title: "Description",
      data: [{ key: "desc", text: description }],
    });
  }


  sections.push({
    title: "What you'll learn",
    data: [
      { key: "learn-0", text: "Understand core concepts and fundamentals" },
      { key: "learn-1", text: "Build real-world projects from scratch" },
      { key: "learn-2", text: "Best practices and industry patterns" },
      { key: "learn-3", text: "Hands-on exercises with expert guidance" },
    ],
  });


  sections.push({
    title: "This course includes",
    data: [
      { key: "inc-0", icon: "play-circle", label: "On-demand video lectures" },
      { key: "inc-1", icon: "file-text", label: "Downloadable resources" },
      { key: "inc-2", icon: "smartphone", label: "Access on mobile & desktop" },
      { key: "inc-3", icon: "award", label: "Certificate of completion" },
      { key: "inc-4", icon: "clock", label: "Full lifetime access" },

    ],
  });


  if (tutorName) {
    sections.push({
      title: "Instructor",
      data: [
        {
          key: "instructor",
          name: tutorName,
          rating: rating ?? "4.5",
        },
      ],
    });
  }

  // 5 — Reviews
  sections.push({
    title: "Reviews",
    data: [
      {
        key: "review-0",
        author: "Aarav S.",
        stars: 5,
        body: "Excellent course! Very well structured and easy to follow.",
      },
      {
        key: "review-1",
        author: "Priya K.",
        stars: 4,
        body: "Great content. Would love more advanced examples.",
      },
      {
        key: "review-2",
        author: "Ravi M.",
        stars: 5,
        body: "Highly recommend this course for beginners and intermediates.",
      },
      {
        key: "review-3",
        author: "Ananya R.",
        stars: 4,
        body: "Good explanations, but some sections could be more in-depth.",
      }
    ],
  });

  return sections;
}


export default function EnrollmentPage() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isDark] =  useState(colorScheme === "dark");

  const { title, description, price, tutorName, rating, id, image } =
    useLocalSearchParams<{
      title?: string;
      description?: string;
      price?: string;
      tutorName?: string;
      rating?: string;
      id?: string;
      image?: string;
    }>();


  const bookmarks = coursesStore((s) => s.Bookmarks);
  const setBookmarks = coursesStore((s) => s.setBookMarks);

  const isBookmarked = useMemo(
    () => bookmarks.some((b) => b.id === id),
    [bookmarks, id],
  );

  const toggleBookmark = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.id !== id));
    } else {
      const newBookmark: Bookmark = {
        id: id ?? "",
        title: (title as string) ?? "",
        description: (description as string) ?? "",
        price: price ?? "0",
        thumbnailUrl: (image as string) ?? "",
        tutorName: (tutorName as string) ?? "",
        rating: rating ? parseFloat(rating as string) : undefined,
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  }, [
    isBookmarked,
    bookmarks,
    id,
    title,
    description,
    price,
    image,
    tutorName,
    rating,
  ]);


  const sections = useMemo(
    () =>
      buildSections({
        description: description as string,
        rating: rating as string,
        tutorName: tutorName as string,
      }),
    [description, rating, tutorName],
  );

  /* ---- Scroll-driven animations ---- */
  const scrollY = useSharedValue(0);
  const MAX_IMG_HEIGHT = 350;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerButtonsAnim = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100, 200],
      [1, 0.5, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const imageAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 150, MAX_IMG_HEIGHT],
      [1, 0.8, 0],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, MAX_IMG_HEIGHT / 2, MAX_IMG_HEIGHT],
      [1, 0.95, 0.95],
      Extrapolation.CLAMP,
    );
    return { opacity, transform: [{ scale }] };
  });


  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null,
  );


  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <MaterialCommunityIcons
        key={i}
        name="star"
    
        size={14}
        color={i < count ? "#f59e0b" : isDark ? "#555" : "#d1d5db"}
      />
    ));

  const renderItem = ({
    item,
    section,
  }: {
    item: SectionItem;
    section: Section;
  }) => {
    const sectionTitle = section.title;


    if (sectionTitle === "Description") {
      return (
        <View className="px-5 py-3">
          <Text
            className={`text-sm leading-6 ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
          >
            {item.text}
          </Text>
        </View>
      );
    }


    if (sectionTitle === "What you'll learn") {
      return (
        <View className="flex-row items-start px-5 py-1.5 gap-x-3 ">
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={isDark ? "#34d399" : "#059669"}
            style={{ marginTop: 2 }}
          />
          <Text
            className={`flex-1 text-sm ${isDark ? "text-dark-body" : "text-light-body"}`}
          >
            {item.text}
          </Text>
        </View>
      );
    }

   
    if (sectionTitle === "This course includes") {
      return (
        <View className="flex-row items-center px-5 py-2 gap-x-3">
          <Feather
            name={item.icon as any}
            size={18}
            color={isDark ? "#94a3b8" : "#64748b"}
          />
          <Text
            className={`text-sm ${isDark ? "text-dark-body" : "text-light-body"}`}
          >
            {item.label}
          </Text>
        </View>
      );
    }

  
    if (sectionTitle === "Instructor") {
      return (
        <TouchableOpacity          onPress={() => {
            router.push(`/tutor?name=${item.name}&rating=${item.rating}&image=${"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80"}`);
          }}
          className={`mx-5 my-2 p-4 rounded-xl border ${isDark ? "bg-input-dark border-gray-700" : "bg-input-light border-gray-200"}`}
        >
          <View className="flex-row items-center gap-x-3 mb-2">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: isDark ? "#334155" : "#e2e8f0" }}
            >
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80",
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              cachePolicy={"memory-disk"}
            />
            </View>
            <View>
              <Text
                className={`text-base font-l-semibold ${isDark ? "text-dark-title" : "text-light-title"}`}
              >
                {item.name}
              </Text>
              <View className="flex-row items-center gap-x-1 mt-0.5">
                <MaterialCommunityIcons name="star" size={12} color="#f59e0b" />
                <Text
                  className={`text-xs ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
                >
                  {item.rating} Instructor Rating
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }


    if (sectionTitle === "Reviews") {
      return (
        <View
          className={`mx-5 my-1.5 p-4 rounded-xl border ${isDark ? "bg-input-dark border-gray-700" : "bg-input-light border-gray-200"}`}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Text
              className={`text-sm font-l-semibold ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              {item.author}
            </Text>
            <View className="flex-row gap-x-0.5">
              {renderStars(item.stars)}
            </View>
          </View>
          <Text
            className={`text-sm leading-5 ${isDark ? "text-dark-subtitle" : "text-light-subtitle"}`}
          >
            {item.body}
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View className={`px-5 pt-5 pb-2 bg-white dark:bg-dark`}>
      <Text
        className={`text-lg font-l-bold ${isDark ? "text-dark-title" : "text-light-title"} self-start px-2 rounded-full`}
      >
        {section.title}
      </Text>
    </View>
  );

 
  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-dark" : "bg-light"}`}>


     
      <Animated.View
        style={[headerButtonsAnim, { top: insets.top + 8, left: 8 }]}
        className="absolute z-50"
      >
        <BackButton />
      </Animated.View>

      <Animated.View
        style={[headerButtonsAnim, { top: insets.top + 8, right: 16 }]}
        className={`absolute z-50 p-2 rounded-full ${isDark ? "bg-white/30" : "bg-white/90"}`}
      >
        <TouchableOpacity onPress={toggleBookmark}>
          <MaterialCommunityIcons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={isBookmarked ? "#f59e0b" : isDark ? "#fff" : "#333"}
          />
        </TouchableOpacity>
      </Animated.View>

 
      <AnimatedSectionList
        sections={sections}
        keyExtractor={(item: any) => item.key}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <Animated.View
            style={[{ height: MAX_IMG_HEIGHT, overflow: "hidden" }]}
          >
            <Animated.Image
              source={{
                uri:
                  (image as string) ||
                  "https://images.unsplash.com/photo-1557683316-973673baf926?w=800",
              }}
              style={[imageAnimation, { width: "100%", height: "100%" }]}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                "rgba(0,0,0,0.01)",
                "rgba(0,0,0,0.4)",
                "rgba(0,0,0,0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="absolute inset-0 justify-end pb-6 px-5"
            >
              <Text className="text-white text-2xl font-l-bold mb-2">
                {title || "Course Title"}
              </Text>
              <View className="flex-row items-center gap-x-3 mb-1">
                <Text className="text-white text-sm font-l-medium">
                  By {tutorName || "Instructor"}
                </Text>
                {rating && (
                  <View className="flex-row items-center gap-x-1">
                    <MaterialCommunityIcons name="star" size={12} color="#f59e0b" />
                    <Text className="text-white text-sm font-l-medium">
                      {rating}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          </Animated.View>
        }
        renderSectionHeader={renderSectionHeader as any}
        renderItem={renderItem as any}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />

     
      <LinearGradient
        colors={[
          "transparent",
          isDark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)",
        ]}
        className="absolute bottom-0 left-0 right-0 px-4 pt-4"
        style={{ paddingBottom: insets.bottom || 16 }}
      >
        <BlurView
          intensity={isDark ? 90 : 100}
          tint={isDark ? "dark" : "light"}
          className="absolute inset-0"
        />

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text
              className={`ml-2 text-lg font-l-semibold ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              ₹{price || "Free"}
            </Text>
          </View>

          <TouchableOpacity
            className="px-5 py-3 rounded-lg bg-primary"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
     
              router.push({
                pathname: "/(protected)/content",
                params: { id },
              });
            }}
          >
            <Text className="text-white text-base font-l-semibold">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
