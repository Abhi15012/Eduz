// app/_layout.tsx
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, useRouter } from 'expo-router';
import Bg from '@/components/bg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { themeStore } from '@/store/storeTheme';
import React, { useEffect } from 'react';
import { MotiView } from 'moti';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

export default function _layout() {



  const [header,setHeaderName] = React.useState<String>("Eduz")


const router = useRouter()
  const commonHeader = ()=>{

    return(
        <MotiView
         from={{opacity:0, translateY:-20}}
         animate={{opacity:1, translateY:0}}
         transition={{
            type:"timing",
            duration:500
         }}
        className='w-full h-50 px-4 justify-between items-center flex-row mb-4'>
    <View className='justify-start right-2 items-center flex-row '>
                 <Image
            source= {require("@/assets/images/icon.png")}
            style={{ width: 40, height: 40 }}
                className='mx-auto   '
                cachePolicy={"memory-disk"}
            />

            <Text className='text-center text-xl font-bold text-light-title dark:text-dark-title ml-2 '>
                {header}
            </Text>


    </View>


    <TouchableOpacity
    onPress={()=>{
    router.push("/profile")
    }} 
    >


            <MaterialIcons name="account-circle" size={28} color={themeStore((state)=> state.isDark ? "#999" : "#666")} />  

    </TouchableOpacity>



        </MotiView>


    )
  }





    
  return (
    <SafeAreaView className="flex-1 bg-light dark:bg-dark ">

     {commonHeader()}
     

      <Tabs
        initialRouteName="list"
        screenOptions={{
          headerShown: false,
           tabBarActiveTintColor: "#0ea5e9",
           tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
          backgroundColor : 'rgba(255,255,255,0.15)',
             borderColor:  'rgba(0,0,0,0.2)',
                borderWidth: 1,
             position: 'absolute',
            borderTopWidth: 0,
            elevation: 7,
            height: 60,
               marginHorizontal: 50,
              borderRadius: 35,
           overflow: 'hidden',
         
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={100}  
              tint={'light'}  
              style={[StyleSheet.absoluteFill,{
                borderRadius: 35,
                 overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)'
              }]}
            />
          ),
        }}
      >
        <Tabs.Screen name="list" options={{ headerShown: false,
            tabBarLabel: "Home",
         tabBarIcon: ({ focused }) => (
           <MaterialIcons
            name="home"
            size={24}
            color={focused ? '#0ea5e9' : '#9CA3AF'}
           />
         )
        
        
        } }
      
         
         />

              <Tabs.Screen name="myList" options={{ headerShown: false,
            tabBarLabel: "My Purchases",
            tabBarIcon: ({ focused }) => (
                <MaterialIcons
                    name="shopping-cart"
                    size={24}
                    color={focused ? '#0ea5e9' : '#9CA3AF'}
                />
             )
               }}
                
              />
    
   
      </Tabs>
    </SafeAreaView>
  );
}