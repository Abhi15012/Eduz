
import { useTokenSync } from "@/config/store.functions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Tabs, useRouter, usePathname } from "expo-router";
import { MotiView } from "moti";
import {  useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,

  View
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

export   const commonHeader = ({header, router, isDark} : {header: string, router: any, isDark: boolean}) => {
 


    return (
      <MotiView
      
        className="w-full h-50 px-4 justify-between items-center flex-row mb-4"
      >
        <View className="justify-start right-2 items-center flex-row ">
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 40, height: 40 }}
            className="mx-auto   "
            cachePolicy={"memory-disk"}
          />

          <Text className="text-center text-xl font-bold text-light-title dark:text-dark-title ml-2 ">
            {header}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/profile");
          }}
        >
          <MaterialIcons
            name="account-circle"
            size={28}
            color={isDark ? "#999" : "#666"}
          />
        </TouchableOpacity>
      </MotiView>
    );
  };

export default function _layout() {
  const [header, setHeaderName] = React.useState<string >("Eduz");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const router = useRouter();

  const pathName = usePathname();

  const insets = useSafeAreaInsets();

  const token = useTokenSync();
  
  React.useEffect(() => {
    if (!token) {
      router.replace("/signin");
    }
  }, [token]);

  useEffect(() => {
    if (pathName === "/list") {
      setHeaderName("Eduz");
    } else if (pathName === "/myList") {
      setHeaderName("My Learning");
    } else if (pathName === "/bookMarks") {
      setHeaderName("Bookmarks");
    }
  }, [pathName]);

  return (
    <SafeAreaView
      style={{
      
      }}
      className="flex-1 bg-light dark:bg-dark "
    >
     {
        commonHeader({header, router, isDark})
     }

      <Tabs
        initialRouteName="list"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0ea5e9",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10,
       
          },
          tabBarIconStyle: {
            marginTop: 6,
          },
          tabBarStyle: {
            backgroundColor: isDark
              ? "rgba(0,0,0,0.8)"
              : "rgba(255,255,255,0.8)",
            borderColor: isDark
              ? "rgba(255,255,255,0.5)"
              : "rgba(0,0,0,0.2)",
            borderWidth: 0.35,
            bottom: insets.bottom ? 0 : 15,
            position: "absolute",
            borderTopWidth: 0,
            elevation: 7,
           height: 62,
            marginHorizontal: 100,
            borderRadius: 35,
            overflow: "hidden",

            shadowColor: "#000",
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: 35,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.2)",
                },
              ]}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="list"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="home"
                size={24}
                color={focused ? "#0ea5e9" : "#9CA3AF"}
              />
            ),
          }}
        />


        <Tabs.Screen
          name="bookMarks"
          options={{
            headerShown: false,
            tabBarLabel: "Bookmarks",
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="bookmark"
                size={24}
                color={focused ? "#0ea5e9" : "#9CA3AF"}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
