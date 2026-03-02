import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Platform, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


type ToastType = "success" | "error" | "info" | "warn";

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");
  const { width } = useWindowDimensions();



  const insets = useSafeAreaInsets();

  const showToast = (
    msg: string,
    toastType: ToastType = "info",
    duration: number = 3000
  ) => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <MaterialIcons name="check-circle" size={20} color="#4BB543" />;
      case "error":
        return <MaterialIcons name="error" size={20} color="#FF3333" />;
      case "warn":
        return <MaterialIcons name="warning" size={20} color="#FFCC00" />;
      default:
        return <MaterialIcons name="info" size={20} color="#3399FF" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 300 }}
          style={{ top: insets.top + 50 ,
            position: "absolute",
           
             zIndex: 9999,
             alignItems: "center",
             width: width * 0.6,
             left : (width - width * 0.6) / 2,
             height: 50,
          
             alignSelf:"center",
             borderWidth:  1,
             borderColor: "rgba(255, 255, 255, 0.3)",
             borderRadius: 25,
             overflow: "hidden",    
              
          }}
         
        >
         <BlurView
  intensity={90}
  tint="default"
  className=" 
  flex-row items-center
             dark:bg-black/60 dark:border-white/20 
              absolute top-0 left-0 right-0 bottom-0 
              w-full h-full
              
             gap-x-2 
             space-x-2
             bg-white/70 border-gray-300"
>
            <View className="mx-3" >{getIcon()}</View>


            <Text
              numberOfLines={2}

              
              className="  text-sm w-3/4 font-l-regular text-center dark:text-dark-body text-light-body"
            >
              {message}
            </Text>
          </BlurView>
        </MotiView>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};