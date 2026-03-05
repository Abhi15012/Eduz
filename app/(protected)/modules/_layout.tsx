import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
   <Stack     screenOptions={{
    headerShown: false,
   }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="topics"
            options={{  
                headerShown: false,
                headerTitle: "Course Details",
                headerStyle: {
                    backgroundColor: "#0ea5e9",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                animation: "slide_from_right",
                presentation: "formSheet",
                   sheetAllowedDetents: [0.8], 
            sheetCornerRadius: 24,
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
                   
            }}
        />
        <Stack.Screen name="content" />
    </Stack>
  )
}
