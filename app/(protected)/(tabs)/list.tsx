import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bg from '@/components/bg'

import {themeStore} from '@/store/storeTheme'
import { CourseCard } from '../_components/card'
import { GET_PRODUCTS } from '@/utils/protected/controllers'


interface APIResponse <T> {
   sucess: boolean;
   data : T,
    message?: string
    statusCode: number
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string;
  tutorName: string;
  rating: number;
}

export default function index() {
  const {toggleTheme} = themeStore()

  const getCouses = async (): Promise<APIResponse<Course[]>> => {
   const res = await GET_PRODUCTS();
  return res;
  }
  useEffect(() => {


  getCouses()
  }, [])


  return (
    <SafeAreaView className='bg-light dark:bg-dark flex-1 '>
      <Bg opacity={0.04} />

      {/* <Text onPress={()=>{
        toggleTheme() 
      }} className='text-2xl font-bold text-center text-primary dark:text-primaryDark mt-10'>
        Welcome to EduZ!
      </Text> */}

      <CourseCard
        title="Sample Course"
        description="This is a sample course description."
        price="19.99"
        thumbnailUrl="https://via.placeholder.com/150"
        tutorName="John Doe"
        rating={4.5}
        index={0}
      />

    </SafeAreaView>
  )
}
