import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bg from '@/components/bg'

import {themeStore} from '@/store/storeTheme'

import { GET_PRODUCTS, GET_USERS } from '@/utils/protected/controllers'
import { LegendList, LegendListRef, LegendListRenderItemProps } from "@legendapp/list"
import { useToast } from '@/hooks/useToast'

import HorizontalList from '../_components/horizontalList'
import { MotiImage } from 'moti'


interface APIResponse <T> {
   sucess: boolean;
   data : T,
    message?: string
    statusCode: number
}

export type Course = {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  tutorName: string;
  rating: number;
}
export type Tutor = {
    id: string;
    name: string;
   
}

export default function index() {
   const {toggleTheme} = themeStore()

  const {showToast} = useToast ()
  const [data, setData] = React.useState<APIResponse<Course[]>>()
  const [refreshing, setRefreshing] = React.useState(false)
  const getCouses = async (): Promise<APIResponse<Course[]>> => {
 try {
  const res = await GET_PRODUCTS(); 

    setData(res?.data);
  return res;
 } catch (error) {
  showToast("Failed to fetch courses");
  return {
    sucess: false,
    data: [],
    message: "Failed to fetch courses",
    statusCode: 500
  }
 } }

 const getUsers = async (): Promise<APIResponse<Tutor[]>> => {
    try {
        const res = await GET_USERS();
       
        return res;
    } catch (error) {
        showToast("Failed to fetch tutors");
        return {
            sucess: false,
            data: [],
            message: "Failed to fetch tutors",
            statusCode: 500
        }
    }
 }  
  useEffect(() => {
    Promise.all([getCouses(), getUsers()])
  }, [])


  const list =[
    {
        id: "1",
        header : "Recommended for you",
        data : data?.data || [],
        
    },
    {
        id: "2",
        header : "Your Favorites",
        data :  data?.data.slice(0,7) || [],
    },
  
    {
        id: "3",
        header : "Newly Added",
        data : data?.data.slice(7,14) || [],
    }

  ]
const onRefresh = async () => {
  setRefreshing(true);
  await Promise.all([getCouses(), getUsers()]);
  setTimeout(() => {
    setRefreshing(false);
  }, 1000);
};


  







  return (
    <View className='bg-light dark:bg-dark flex-1 '>
      <Bg  />
      {
        refreshing && (
          <View className='absolute top-10  left-0 right-0 z-10 justify-center items-center' >
        <MotiImage
          source={require("@/assets/images/icon.png")}
          style={{ width: 40, height: 40 }}
          animate={{
            rotate: ["0deg", "360deg"],
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1000,
          }}
        />
              <Text className='text-sm text-light-title dark:text-dark-title mt-2' >Refreshing...</Text>
          </View>
        )
      }

      <LegendList
      data={list}
     refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <View className='z-50 ' >
          
          <HorizontalList data={item.data} header={item.header} numberOfItems={5}  />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      />


 </View>
  )
}
