
import Bg from "@/components/bg";
import { useSearchTexts } from "@/components/search.texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import React, { useContext, useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export default function Searchui() {
 const {colorScheme} = useColorScheme();
  const isDark = colorScheme === "dark";

  const router = useRouter();

  const TEXT_HEIGHT = 24;
  const translateY = useSharedValue(TEXT_HEIGHT);
  const ANIMATION_DURATION = 1000;
  const DISPLAY_DURATION = 3000;
  const { currentTexts } = useSearchTexts();

  useEffect(() => {
    if (currentTexts.length === 0) return;
    translateY.value = TEXT_HEIGHT;
    const onEnter = withTiming(0, { duration: ANIMATION_DURATION - 100 });
    const hold = withDelay(DISPLAY_DURATION, withTiming(0));
    const slideOut = withTiming(-TEXT_HEIGHT, { duration: ANIMATION_DURATION });

    translateY.value = withRepeat(
      withSequence(onEnter, hold, slideOut),
      -1,
      false,
    );
  }, [currentTexts]);

  const textAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const iosShadowStyle = {
    shadowColor: isDark ? "#fff" : "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  };

  const rotatingValue = currentTexts.length > 0 ? currentTexts : "Projects";

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      pointerEvents="box-none"
      className="px-5 flex-1  bg-light dark:bg-dark"
      style={Platform.OS === "ios" ? iosShadowStyle : ""}
    >
        <Bg />
      <Pressable
        onPress={() =>     router.push({
          pathname: "/verticalList",
          params: {
            header: "All Courses",
            from : "search",
          },
        }

        )
    }
        className={`flex-row items-center rounded-2xl border px-4 py-3 overflow-hidden ${isDark ? "bg-input-dark border-gray-700" : "bg-white border-gray-200"}`}
        style={
          Platform.OS !== "ios"
            ? {
                elevation: 3,
                shadowColor: isDark ? "#fff" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
              }
            : undefined
        }
      >
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? "bg-white/10" : "bg-primary/10"}`}
        >
     <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={isDark ? "#fff" : "#0ea5e9"}
          />
        </View>

        <View className="ml-3 ">

          <View className="h-7 overflow-hidden ">
            <Animated.Text
              style={textAnimation}
              className={`text-base font-l-semibold ${isDark ? "text-dark-title" : "text-light-title"}`}
            >
              {`"${rotatingValue}"`}
            </Animated.Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
