import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import { } from 'nativewind'

export default function BackButton({onPress}: {onPress?: () => void}) {
    const router = useRouter()
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
  return (
    <TouchableOpacity
    onPress={()=>{
       
            router.back();
       
    }}
    style={{
        width: 35,
        height: 35,
        margin: 10,
        padding:"auto",
       alignItems: 'center',
       borderRadius: 20,
       backgroundColor: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.7)",
       justifyContent: 'center',
    
    }}>
        <MaterialIcons
        name="chevron-left"
        size={26}
        color={isDark ? "#000" : "#000"}
        />

    </TouchableOpacity>
  )
}