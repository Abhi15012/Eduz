import useInternetCheck from "@/hooks/useInternetCheck";
import { ToastProvider } from "@/hooks/useToast";
import { setupCloudMessaging } from "@/services/notificationService";
import { useAuthStore } from "@/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import Offline from "./offline";

export const unstable_settings = {
  anchor: "(protected)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexand_regular: require("../assets/fonts/Lexend-Regular.ttf"),
    Lexend_bold: require("../assets/fonts/Lexend-Bold.ttf"),
    Lexend_medium: require("../assets/fonts/Lexend-Medium.ttf"),
    Lexend_semibold: require("../assets/fonts/Lexend-SemiBold.ttf"),
    Lexend_thin: require("../assets/fonts/Lexend-Thin.ttf"),
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initNotifications = async () => {
      try {
        cleanup = await setupCloudMessaging();
      } catch (error) {
        console.error("Error setting up cloud messaging:", error);
      }
    };

    initNotifications();

    return () => {
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  const token = useAuthStore((state) => state.token);
  const getToken = useAuthStore((state) => state.getToken);
  const hasToken = Boolean(token);

  useEffect(() => {
    if (!hasToken) {
      getToken();
    }
  }, [hasToken, getToken]);

  const isConnected = useInternetCheck();
  const { colorScheme } = useColorScheme();

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            }}
          >
            {!isConnected ? (
              <Offline />
            ) : (
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="index" options={{ animation: "fade" }} />
                <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
                <Stack.Protected guard={hasToken}>
                  <Stack.Screen
                    name="(protected)"
                    options={{ gestureEnabled: false }}
                  />
                </Stack.Protected>
                <Stack.Screen
                  name="onboarding"
                  options={{
                    animation: "slide_from_right",
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name="(unprotected)"
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="privacy"
                  options={{ animation: "slide_from_bottom" }}
                />
                <Stack.Screen
                  name="terms"
                  options={{ animation: "slide_from_bottom" }}
                />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal" }}
                />
              </Stack>
            )}
            {}
          </View>
          <StatusBar style="auto" />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
