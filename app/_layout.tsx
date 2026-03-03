
import { ToastProvider } from "@/hooks/useToast";
import { setupCloudMessaging } from "@/services/notificationService";
import { useAuthStore } from "@/store/store";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

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
const askNotificationPermission = async () => {
  try {
   setupCloudMessaging();
  } catch (error) {
    console.error("Error setting up cloud messaging:", error);
  }
}

askNotificationPermission();
    
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

const token = useAuthStore((state) => state.token);

const getToken =useAuthStore((state) => state.getToken);

const hasToken = Boolean(token) 

useEffect(() => {
  if (!hasToken) {
    getToken();
  }
}, [hasToken, getToken]);

   






  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Protected guard={hasToken}>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Screen name="(unprotected)" options={{ headerShown: false }} />

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
