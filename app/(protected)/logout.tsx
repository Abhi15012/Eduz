import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView, MotiText, AnimatePresence } from 'moti'
import { router } from 'expo-router'
import Bg from '@/components/bg'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Button } from '@/components/appButton'
import { clearToken } from '@/config/store.functions'

const { width } = Dimensions.get('window')

export default function Logout() {
  const [confirming, setConfirming] = useState(false)

  const handleLogout = () => {
clearToken() // Clear token from store
    router.replace('/signin') // Navigate to sign-in screen
  }

  return (
    <SafeAreaView className="flex-1 bg-light py-7 dark:bg-dark px-6">
      <Bg opacity={0.4} />

      <AnimatePresence exitBeforeEnter>
        (

          <MotiView
            key="retention"
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            transition={{ type: 'timing', duration: 420 }}
            className="flex-1 justify-center"
          >
         
            <MotiView
              from={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 100 }}
              className="items-center mb-8"
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#0ea5e920',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#0ea5e940',
                }}
              >
              <MaterialIcons name="logout" size={40} color="#0ea5e9" />
              </View>
            </MotiView>

            {/* Headline */}
            <MotiView
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 180 }}
              className="items-center mb-2"
            >
              <Text className="text-xl font-l-bold text-light-title dark:text-dark-title text-center">
                Before you go...
              </Text>
              <Text className="text-base font-l-regular text-light-subtitle dark:text-dark-subtitle text-center mt-2 leading-relaxed">
                We’d love to have you back! 
            </Text>
         
            </MotiView>

          


            <MotiView
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 560 }}
            >
               <Button
                onPress={() => router.back()}
                label="Actually, keep me logged in"
               
              />

              {/* Exit link — visually de-emphasised */}
              <TouchableOpacity
                onPress={() => handleLogout()}
                activeOpacity={0.7}

                className="items-center py-4 my-5  border border-gray-300 rounded-3xl mt-4"
              >
                <Text className="text-sm font-l-regular text-light-subtitle dark:text-dark-subtitle">
                  No thanks, I want to logout
                </Text>
              </TouchableOpacity>
            </MotiView>
          </MotiView>
        )
      </AnimatePresence>
    </SafeAreaView>
  )
}