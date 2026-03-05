import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '@/components/backButton';
import Bg from '@/components/bg';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { storage } from '@/constants/storage';

export type StepType = 'reading' | 'video' | 'pdf' | 'assessment';

export interface CourseStep {
  id: string;
  order: number;          
  title: string;
  type: StepType;
  content?: string;       
  videoUrl?: string;      
  pdfUrl?: string;       
  questions?: {           
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}
export default function Topics() {

const { title, id, tutorName, rating, header, 
  image
 }  = useLocalSearchParams()

 
   const topics =[
    {
        id: "1",
        icon : "book",
        title: "Programming",
        type: "reading",
    },
    {
        id: "2",
        icon : "video",
        title: "Design",
        type: "video",

    },
    {
        id: "3",
        icon : "book",
        title: "Marketing",
        type: "reading",

    },
    {
        id: "4",
        icon : "video",
        title: "Business",
        type: "video",

    },
    {
        id: "5",
        icon : "file",
        title: "Photography",
        type: "pdf",
    },
    {
        id: "6",
        icon : "check",
        title: "Artificial Intelligence",
        type: "assessment",
    }

   ]

   const router = useRouter()



  return (
    <SafeAreaView style={{ flex: 1,   }}
     className='bg-white dark:bg-dark p-4'
    >

      <Bg />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <BackButton />
          <Text className='text-lg text-light-title dark:text-dark-title font-l-semibold'>Course Topics</Text>
        </View>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
           onPress={() => {
            if(item.type === "reading" ){
              router.push(`/modules/content?title=${item.title}&id=${item.id}&type=${item.type}`);
            }
            else if(item.type === "video"){
              router.push(`/modules/video.player?title=${item.title}&id=${item.id}&type=${item.type}`);
            }
            else if(item.type === "pdf"){
              router.push(`/modules/download.pdf?title=${item.title}&id=${item.id}&type=${item.type}`);
            }
            else if(item.type === "assessment"){
              router.push(`/modules/content?title=${item.title}&id=${item.id}&type=${item.type}`);  
            }}
          }
            
          style={{ padding: 20,  width: '100%' , alignSelf: 'center', }}
           className='dark:bg-gray-900 bg-light my-2 rounded-xl items-center justify-start gap-x-4 flex-row'
          >
            <Feather name={item.icon} size={18} color="#0ea5e9"  />
            <Text className='text-base text-light-title dark:text-dark-title text-left '>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
