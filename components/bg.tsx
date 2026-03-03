
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'

export default function Bg({opacity}:{opacity?:number}) {
  const {height} = Dimensions.get('window')
  return (
     <LinearGradient
          colors={[ 'transparent','#6366f1', '#06b6d4', "transparent"]} // reversed for better text contrast (darker → lighter)
         start={{ x: 0, y: 0 }}
         end={{ x: 0.7, y: 1 }}
         style={{
           
         position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           opacity: opacity || 0.1,
        
           paddingVertical: 10,  
        height: height,
               
           alignItems: 'center',
         
     
         }}    
           />
  )
}