import { getTokenAsync, toggleSign, useTokenSync } from "@/config/store.functions";
import { ToastProvider } from "@/hooks/useToast";
import { useFonts } from "expo-font";
import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { themeStore } from "@/store/storeTheme";
import { useColorScheme as useNativeWind} from "nativewind";
import { toAndFroStore } from "@/store/toandfro";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
 const isSigned = toAndFroStore.getState().isSignIn;
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
         await getTokenAsync();
const token = useTokenSync();
 

        if (token) {
          setIsAuthenticated(true);
          toggleSign();
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [isSigned]);

   const { setColorScheme } = useNativeWind();
  const isDark = themeStore((state) => state.isDark);

  useEffect(() => {
    setColorScheme(isDark ? "dark" : "light");
  }, [isDark]);

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
        <Stack.Protected guard={isAuthenticated}>
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
