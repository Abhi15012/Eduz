import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bg from '@/components/bg'
import { MotiImage, MotiText, MotiView } from 'moti'
import { Button } from '@/components/appButton'
import { storage } from '@/constants/storage'
import { Redirect, useRouter } from 'expo-router'
import { getTokenAsync, useTokenSync } from '@/config/store.functions'


type tokenType = string | null 

export default function index() {

const router = useRouter();
const isFirstLaunchDone = storage.getBoolean('isFirstLaunch')
console.log("Is first launch done?", isFirstLaunchDone)
const [target, setTarget] = React.useState<string | null>(null)

const navigate =async()=>
{

  await getTokenAsync();
  const token : tokenType = useTokenSync();
  
  if(token)
  {
   setTarget("list") 
  }
  else{
   setTarget ("signin")
  }
}


 useEffect(() => {

  setTimeout(() => {
    navigate();
  }, 1500);
 

  }, [])

  if (target !== null && isFirstLaunchDone !== undefined) {
    return <Redirect href={`/${target}`} />;
  }

  return (
    <SafeAreaView className = "flex-1 justify-center items-center p-4 bg-light dark:bg-dark">
      <Bg opacity={0.05} />
      <MotiImage
        source={require('@/assets/images/icon.png')}
        style={{ width: 150, height: 150 }}
 
        className="mb-4"
        from={{ opacity: 0, translateY: -20, rotate: '0deg' }}
        animate={{ opacity: 1, translateY: 0, rotate: '360deg' }}
        transition={{ type: 'timing', duration: 1000,
        
         }}
      />
      <MotiText
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 200 }}
        className="text-2xl font-bold font-l-bold dark:text-dark-title text-light-title"
      >
     {
        isFirstLaunchDone ? "EduZ" : "Welcome to EduZ!"
     }
      </MotiText>

  {
    !isFirstLaunchDone && (    <MotiText
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 400 }}
        className="text-center mt-2 text-light-subtitle dark:text-dark-subtitle"
      >
        Your personalized learning companion. Let's get started!
      </MotiText>)
  }

 {
   !isFirstLaunchDone && ( 
       <MotiView className='w-full  mt-20'>

      <Button
        label="Get Started"
        onPress={() => {
              storage.set('isFirstLaunch', true) 
      router.replace("/register");
        }}
        

      />
 </MotiView>)
}

   {
    !isFirstLaunchDone && (    <MotiText
    onPress={() => {
        storage.set('isFirstLaunch', true)
      router.replace("/signin");
          
    }}
    style={{
      textDecorationLine: 'underline',
    }}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 400 }}
        className="text-center mt-10 font-l-semibold text-base text-light-body dark:text-dark-body"
      >
     Already Have Account
      </MotiText>)
  }


 

 




    </SafeAreaView>
  )
}
   

