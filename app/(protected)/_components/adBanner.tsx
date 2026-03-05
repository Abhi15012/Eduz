import { usePushTokenStore } from "@/store/pushTokenStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface AdBannerProps {
  onPress?: () => void;
}

async function sendNotificationToUser(
  token: string,
  title: string,
  body: string,
  data?: any
) {
  if (!token) {
    console.error("No push token available");
    return;
  }

  try {
    console.log("Sending notification with token:", token);

    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expoPushToken: token,
        title,
        body,
        data,
         channelId: "urgent"
      }),
    });

    const result = await res.json();

    console.log("Push response:", result);

    if (!res.ok) {
      throw new Error("Push failed");
    }

    console.log("Notification sent!");
  } catch (err) {
    console.error("Send failed", err);
  }
}

export function PremiumCourseBanner({ onPress }: AdBannerProps) {
  const { width } = Dimensions.get("window");

  console.log("Current push token:", usePushTokenStore.getState().expoPushToken);

  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(600)}
      className="mx-4 mb-10"
    >
      <LinearGradient
        colors={["#6366f1", "#8b5cf6", "#7c3aed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            await sendNotificationToUser(
               usePushTokenStore.getState().expoPushToken ?? "",
              "Premium Course",
              "You clicked on the Premium Course banner!",
            );
          }}
          activeOpacity={0.8}
        >
          <View className="p-6 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-l-bold text-lg mb-1">
                Premium Unlocked
              </Text>
              <Text className="text-white/80 font-l-regular text-sm mb-3">
                Get 40% off on all premium courses
              </Text>
              <View className="flex-row items-center">
                <MaterialIcons name="local-offer" size={16} color="#fbbf24" />
                <Text className="text-yellow-300 font-l-semibold text-xs ml-1">
                  Limited Time Offer
                </Text>
              </View>
            </View>
            <View className="items-center justify-center bg-white/20 rounded-full p-3">
              <MaterialIcons name="trending-up" size={28} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}


export function SkillMastery50OffBanner({ onPress }: AdBannerProps) {
  const { width } = Dimensions.get("window");

  return (
    <Animated.View
      entering={FadeInUp.delay(600).duration(600)}
      className="mx-4 mb-10"
    >
      <LinearGradient
        colors={["#dc2626", "#f87171", "#fca5a5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            await sendNotificationToUser(
              usePushTokenStore.getState().getExpoPushToken() ?? "",
              "Skill Mastery 50% Off",
              "You clicked on the Skill Mastery 50% Off banner!",
            );
          }}
          activeOpacity={0.8}
        >
          <View className="p-6">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white font-l-bold text-2xl mb-1">
                  50% OFF
                </Text>
                <Text className="text-white/90 font-l-semibold text-sm">
                  Summer Learning Sale
                </Text>
              </View>
              <View className="bg-white/20 rounded-full p-3">
                <MaterialIcons
                  name="local-fire-department"
                  size={28}
                  color="white"
                />
              </View>
            </View>

            <Text className="text-white/80 font-l-regular text-xs mb-4">
              Upskill with our bestselling courses
            </Text>

            <View className="bg-white/20 rounded-lg p-3 mb-3">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-l-semibold text-xs">
                    Valid until Mar 31
                  </Text>
                </View>
                <View className="bg-white/30 rounded-full px-3 py-1">
                  <Text className="text-white font-l-bold text-xs">
                    3 Days Left
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={async () => {
                await sendNotificationToUser(
                  usePushTokenStore.getState().getExpoPushToken() ?? "",
                  "Skill Mastery 50% Off",
                  "You clicked on the Skill Mastery 50% Off banner!",
                );
              }}
              className="bg-white/95 rounded-full py-2 flex-row items-center justify-center"
            >
              <Text className="text-red-600 font-l-bold text-sm mr-2">
                Grab Now
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

export function AdBannerCarousel() {
  const { width } = Dimensions.get("window");

  return (
    <View className="flex-1">
      <PremiumCourseBanner />
      <SkillMastery50OffBanner />
    </View>
  );
}
