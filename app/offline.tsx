import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'

export default function Offline() {
  return (
   <SafeAreaView className="flex-1 h-screen  p-4 items-center justify-center bg-light dark:bg-dark" >
    <Image
    source={require('@/assets/images/icon.png')}
    style={{ width: 100, height: 100 }}
    className="mb-4"
    cachePolicy={"memory-disk"}
    />
    <Text className="text-base text-center text-light-title dark:text-dark-title" >You are currently offline. Please check your internet connection.</Text>
   </SafeAreaView>
  )
}