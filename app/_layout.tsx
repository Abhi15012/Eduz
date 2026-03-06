import useInternetCheck from "@/hooks/useInternetCheck";
import { ToastProvider } from "@/hooks/useToast";
import { setupCloudMessaging } from "@/services/notificationService";
import { useAuthStore } from "@/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import Offline from "./offline";
import { FontAwesome6 } from "@expo/vector-icons";

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

  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

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
              <>
              {isUpdateAvailable && (
                          <View
                            style={{
                              position: "absolute",
                              top: 35,
                              left: 0,
                              right: 0,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              paddingHorizontal: 16,
                              paddingVertical: 5,
                              zIndex: 1,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                         <FontAwesome6 name="cloud-arrow-down" size={16} color="white" />
                            <Text
                              style={{ color: "white", textAlign: "center" }}
                            >
                              A new update is being installed...
                            </Text>
                          </View>
                        )}
             
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="index" options={{ animation: "fade" }} />
               <Stack.Protected guard={hasToken}>
                  <Stack.Screen
                    name="(protected)"
                    options={{ gestureEnabled: false }}
                  />
                </Stack.Protected>
               
                <Stack.Screen
                  name="(unprotected)"
                  options={{ gestureEnabled: false }}
                />
             
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal" }}
                />
              </Stack>
              </>
            )}
            {}
          </View>
          <StatusBar style="auto" />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
