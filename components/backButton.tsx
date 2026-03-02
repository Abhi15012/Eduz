import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { themeStore } from '@/store/storeTheme'
import { useRouter } from 'expo-router'

export default function BackButton() {
    const router = useRouter()
  return (
    <TouchableOpacity
    onPress={()=>{
        router.back()
    }}
    style={{
        width: 40,
        height: 40,
        padding:"auto",
       alignItems: 'center',
       borderRadius: 20,
       backgroundColor: themeStore((state)=> state.isDark ? "#333" : "#eee"),  
       justifyContent: 'center',
    
    }}>
        <MaterialIcons
        name="chevron-left"
        size={28}
        color="#fff"
        />

    </TouchableOpacity>
  )
}