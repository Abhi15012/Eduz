import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
        width: 35,
        height: 35,
        margin: 10,
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