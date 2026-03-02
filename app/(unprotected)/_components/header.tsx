import { View, Text } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import { Image } from 'expo-image'

export default function Header() {
  return (
 <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="flex-row gap-2 items-center"
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 40, height: 40 }}
          cachePolicy="memory-disk"
        />
        <Text className="text-2xl font-bold font-l-bold dark:text-dark-title text-light-title">
          EduZ
        </Text>
      </MotiView>
  )
}