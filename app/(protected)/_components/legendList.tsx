import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { CourseCard } from './card'

import { useRouter } from 'expo-router';
import { Bookmark } from '@/utils/protected/types';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  tutorName: string;
  rating: number;
  tutorId?: string;
 
}
export default function LegendListComponent({
    data,
    numberOfItems,
    isHorizontal,
    header,
 
}:{data: Course[], numberOfItems:number, isHorizontal?:boolean, header?: string,

}) {

const visibleItems : (Course | Bookmark)[] = data.slice(0, numberOfItems);
 
const seeAll = [
    {
        id: "see-all",
        title: "See All",
        description: "",
        price: "",
        thumbnail: "",
        tutorName: "",
        rating: 0,
    }
]

 {
    isHorizontal && visibleItems.push(...seeAll)

 }

 const refreshControl = isHorizontal ? undefined : {
    refreshing: false,
    onRefresh: () => {
        // Implement your refresh logic here
    },
}


 


const router = useRouter()

  return (
<View  className=" flex-1 flex-row " >
      <LegendList
         keyExtractor={(item)=> item.id.toString()}
         horizontal={isHorizontal}
        refreshing={refreshControl?.refreshing}
        onRefresh={refreshControl?.onRefresh}
    data={visibleItems}
 renderItem={({item, index}: LegendListRenderItemProps<Course | Bookmark>)=>(
    
        item.id === "see-all" && isHorizontal=== true ? (
            <TouchableOpacity 
          onPress={() => {
  router.push(
    `/verticalList?header=${header}&data=${encodeURIComponent(
      JSON.stringify(data)
    )}`
  );
}}
            className="w-32 h-80  self-center mt-2 justify-center items-center rounded-xl bg-light/50 dark:bg-dark border-[0.2px] border-gray-500 " >
                <Text className="text-sm font-l-semibold text-primary" >See All</Text>
            </TouchableOpacity>
        ) : (      <CourseCard
        title={item.title}
          id={item.id}
        header={header || ""}
        isHorizontal={isHorizontal}
        description={item.description}
        price={item.price}
        thumbnailUrl={item?.thumbnail }
       rating={item.rating}
        index={index}
      />)
    
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{padding:10}}
   estimatedItemSize={100}
   recycleItems={true}
      />


</View>
  )
}