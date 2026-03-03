import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { themeStore } from '@/store/storeTheme'
import { useRouter } from 'expo-router'

export default function BackButton({onPress}: {onPress?: () => void}) {
    const router = useRouter()
  return (
    <TouchableOpacity
    onPress={()=>{
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    }}
    style={{
        width: 40,
        height: 40,
        padding:"auto",
       alignItems: 'center',
       borderRadius: 20,
       backgroundColor: "#0ea5e9"+"53",  
       justifyContent: 'center',
    
    }}>
        <MaterialIcons
        name="chevron-left"
        size={26}
        color="#fff"
        />

    </TouchableOpacity>
  )
}