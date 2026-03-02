import Animated from "react-native-reanimated";
import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native";

interface CardProps {
    title: string;
    description: string;
    price : string | number;
    thumbnailUrl: string;
    tutorName?: string;
    rating?: number;
        index: number;
}

export function CourseCard({ title, description, price, thumbnailUrl, tutorName, rating , index }: CardProps) {
     

   
   
    return (

   <Animated.View key={index} className=" flex-1 w-full max-h-60 flex-row px-2 py-1  h-40 rounded-lg bg-light/50 dark:bg-dark border-[0.2px] border-gray-500 p-4" >
   
        <Image
            source={{ uri: thumbnailUrl }}
            className="w-1/3 h-full rounded-lg"
            cachePolicy={"memory-disk"}
            placeholder={""}
        />
        <View className="flex-1 px-3 py-2 justify-between">
            <View>
                <Text className="text-lg font-l-semibold text-light-title dark:text-dark-title">
                    {title}
                </Text>
                <Text className="text-sm font-l-regular text-light-body dark:text-dark-body mt-1">
                    {description}
                </Text>
            </View>
                </View>

   </Animated.View>

    )
}
    