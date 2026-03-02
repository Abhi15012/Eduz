import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {


  return (
   <Stack screenOptions={{
    headerShown:false
  }}>
    <Stack.Screen name={"signin"} options={{headerShown:false, 
        animation: "slide_from_left"
    }} />
    <Stack.Screen name={"register"} options={{headerShown:false,
        animation: "slide_from_right"
    }} />

        <Stack.Screen name={"fgp"} options={{headerShown:false,
        animation: "slide_from_right"
    }} />


        <Stack.Screen name={"reset_pwd"} options={{headerShown:false,
        animation: "slide_from_right"
    }} />

   </Stack>


  )
}