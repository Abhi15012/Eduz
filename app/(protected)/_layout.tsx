import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

export default function _layout() {
  return (
 <Stack screenOptions={{
  headerShown:false
}}>
  <Stack.Screen name={"list"} options={{headerShown:false,
      animation: "slide_from_right"
  }} />
  <Stack.Screen name={"details"} options={{headerShown:false,
      animation: "slide_from_right"
  }} />

  <Stack.Screen name={"content"} options={{headerShown:false,
      animation: "slide_from_right"
  }} />

  <Stack.Screen 
  name="tutor"
  
  options={{
    headerShown: false,
     presentation: "formSheet",
   
     
      headerTitle: "Cohort Details",
            sheetAllowedDetents: [0.8], 
            sheetCornerRadius: 24,
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
    animation: "slide_from_bottom",
  }}
/>

  <Stack.Screen 
  name="logout"
  
  options={{
    headerShown: false,
     presentation: "formSheet",


      headerTitle: "Cohort Details",
            sheetAllowedDetents: [0.4], 
            sheetCornerRadius: 24,
            sheetElevation: 7,
           
            sheetGrabberVisible: true,
    animation: "slide_from_bottom",
  }}
/>
</Stack>
  )
}