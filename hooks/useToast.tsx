import React, { createContext, useContext, useState, ReactNode } from "react";
import { MotiView } from "moti";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
 import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";
type ToastType = "success" | "error" | "warn" | "info";

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
   const { colorScheme } = useColorScheme();
   const isDark = colorScheme === 'dark';

  const showToast = (msg: string, toastType: ToastType = "info", duration: number = 3000) => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };



  const getIcon = () => {
    switch (type) {
      case "success": return <MaterialIcons name="check-circle" size={20} color="#4BB543" />;
      case "error": return <MaterialIcons name="error" size={20} color="#FF3333" />;
      case "warn": return <MaterialIcons name="warning" size={20} color="#FFCC00" />;
      default: return <MaterialIcons name="info" size={20} color="#3399FF" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: "spring", damping: 40, stiffness: 500 }}
          style={{
            top: insets.top + 20, 
            position: "absolute",
            zIndex: 9999,
            width: width * 0.65, 
            left: (width - width * 0.65) / 2,
            minHeight: 50,
            borderWidth: 1,
            borderColor: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)",
            backgroundColor:  isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
            borderRadius: 25,
            overflow: "hidden",
            elevation: 5, 
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <BlurView
            intensity={Platform.OS === "ios" ? 90 : 100}
            tint={isDark ? 'dark' : 'light'}
           
            className="flex-1 flex-row items-center justify-center px-4 py-2 gap-x-2 bg-white/70 dark:bg-black/60"
          >
            <View>{getIcon()}</View>

            <Text
              numberOfLines={2}
             style={{
              color: isDark ? "#fff" : "#000",
             }}
              className="text-sm font-l-regular text-left dark:text-white text-black flex-shrink"
            >
              {message}
            </Text>
          </BlurView>
        </MotiView>
      )}
    </ToastContext.Provider>
  );
};