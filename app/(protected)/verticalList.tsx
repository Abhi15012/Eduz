import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bg from '@/components/bg'
import BackButton from '@/components/backButton'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Course } from './(tabs)/list'
import LegendListComponent from './_components/legendList'

export default function SeeAll() {
    const {header, data} =  useLocalSearchParams() as {header: string, data: string}
    const courses = JSON.parse(decodeURIComponent(data)) as Course[]
 const router = useRouter()
  return (
<SafeAreaView className="flex-1  p-4 bg-light dark:bg-dark" >
    <Bg  />

  <View className="flex-row items-center mb-4" >
      <BackButton/>
        <Text className="text-xl font-bold text-light-title dark:text-dark-title ml-2 " >{header}</Text>
  </View>

  <View className="flex-1 items-center justify-center" >
<LegendListComponent
data={courses}
numberOfItems={courses.length}
isHorizontal={false}
header={header}
/>
  </View>

        
</SafeAreaView>
  )
}