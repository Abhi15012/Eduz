import Animated from "react-native-reanimated";

import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import tutor from "../tutor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { coursesStore } from "@/store/dataStore";
import { storage } from "@/constants/storage";
import React from "react";
import { useToast } from "@/hooks/useToast";
import { setBookMarks } from "@/config/store.functions";
import { Bookmark } from "@/utils/protected/types";

interface CardProps {
    title: string;
    id : number | string;
    description: string;
    price : string | number;
    thumbnailUrl: string;
    tutorName?: string;
    isHorizontal?: boolean;
    header ?: string;
    rating?: number;
        index: number;
}

export function CourseCard({ title, description, price, thumbnailUrl, tutorName, rating , index, isHorizontal, header, id }: CardProps) {
console.log("Rendering card for course:", tutorName)
const {width}= Dimensions.get("window")
 const tutors = coursesStore.getState().getTutors()
const setRatingColor = (rating: number) => {
    if (rating >= 4.5) {
        return "#16a34a"; 
    } else if (rating >= 3) {
        return "#eab308"; 
    } else {
        return "#dc2626";
    }
};

const { getBookMarks, setBookMarks } = coursesStore.getState();

const current = getBookMarks();



const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false)

const {showToast} = useToast()


const addBookmark = (courseId: string) => {
    try {
        storage.set(`bookmark_${courseId}`, JSON.stringify({
            id: courseId,
            title,
            header: header || "",
            tutorName: tutorName || "",
            rating: rating || 0,
            description,
            price,
            thumbnailUrl,
          
        }))
        setIsBookmarked(true)
        showToast("Course added to bookmarks", "success")
    } catch (error) {
          console.error("Error adding bookmark:", error);   
    }

}

const checkBookmark = (courseId: string) => {
    try {
        const bookmark = storage.getString(`bookmark_${courseId}`)
        console.log("Checking bookmark for courseId:", courseId, "Found bookmark:", bookmark)
        if (bookmark) {
            const parsedBookmark = JSON.parse(bookmark)
          {
            parsedBookmark.header === header && setIsBookmarked(true)
           }
           console.log("Parsed bookmark:", parsedBookmark)

           setBookMarks([...current, parsedBookmark]);
        } else {
            setIsBookmarked(false)     
            }
    } catch (error) {
          console.error("Error checking bookmark:", error);   
    }
}

React.useEffect(()=>{
   
    checkBookmark(id.toString())
},[])


const removeBookmark = (courseId: string) => {
    try {
        storage.remove(`bookmark_${courseId}`)
        setIsBookmarked(false)
        showToast("Course removed from bookmarks", "info")
    } catch (error) {
          console.error("Error removing bookmark:", error);   
    }

}




    return (

   <Animated.View key={index}
   
   style={{
    width: isHorizontal ? width - 100 :"100%", 
    height: 300,
        marginRight: isHorizontal ? 10 : 0,
   }}
   className=" flex-1    flex-col  mb-2  rounded-xl bg-light/50 dark:bg-dark border-[0.2px] border-gray-500 overflow-hidden " >
   
     <Image
         source={{ uri: "https://picsum.photos/200/300" }} 
           resizeMode="cover"
          style={{ width: "100%", height: "60%", marginVertical:"auto" }}
        />

   <TouchableOpacity
    onPress={ ()=>  isBookmarked ? removeBookmark(id.toString()) : addBookmark(id.toString())}
    className="absolute top-2 right-2 px-1 py-0.5 rounded " >
     <MaterialIcons name={isBookmarked ? "bookmark" : "bookmark-border"} size={24}  color = { isBookmarked ? "#0ea5e9" : "white"} />
    
     
    </TouchableOpacity>
    
        <View className="flex-1 px-3 py-2 justify-between">
            <View className="px-1">
                <Text className="text-lg font-l-semibold text-light-title dark:text-dark-title">
                    {title}
                </Text>
                <Text
                 numberOfLines={1}
                 style={{
                    textOverflow: "ellipsis",
                    width: "100%",
                 }}
                className="text-sm  h-10 overflow-hidden font-l-regular text-light-body dark:text-dark-body mt-1">
                    {description}
                </Text>

                   <Text
                 numberOfLines={2}
                className="text-sm   overflow-hidden font-l-semibold text-light-body dark:text-dark-body ">
                {"\u20B9 "}{price} 
                </Text>
               {
                rating && rating > 0 && (
                    <View style={{
                        backgroundColor: setRatingColor(rating),
                    }} className="absolute top-2 right-2 px-1 py-0.5 rounded flex-row items-center">
                     <MaterialIcons name="star" size={12} color="white" />
                     <Text className="text-xs text-white font-l-semibold ml-1">{rating.toFixed(1)}</Text>
                    </View>
                )  }

                  <Text
            
                className="text-sm   overflow-hidden font-l-semibold text-light-body dark:text-dark-body ">
               By :  {tutors?.data?.[index]?.name?.first.concat(" ", tutors?.data?.[index]?.name?.last)  || "Unknown Tutor"}
                </Text>

            </View>
                </View>

                 
   </Animated.View>

    )
}
    