import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/backButton'
import Bg from '@/components/bg'
import { useTokenSync } from '@/config/store.functions'
import { MotiView } from 'moti'
import { jwtDecode } from 'jwt-decode'
import { useColorScheme } from 'nativewind'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


export default function Profile() {
  const token = useTokenSync()
  const decodedToken: any = token ? jwtDecode(token) : null

 const { colorScheme, toggleColorScheme } = useColorScheme();

const isDark = colorScheme === 'dark';
const [darkSwitch, setDarkSwitch] = useState(isDark);

useEffect(() => {
  setDarkSwitch(isDark);
}, [isDark]);

  console.log(isDark ? 'Dark mode is enabled' : 'Light mode is enabled');



  const handleLogout = () => {
   
    router.push('/logout')
  }
 const name: string = decodedToken?.name ?? decodedToken?.username ?? 'Unknown'
  const email: string = decodedToken?.email ?? '—'
  const role: string = decodedToken?.role ?? '—'
  const userId: string = decodedToken?.sub ?? decodedToken?.id ?? '—'


function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-3">
        <Text className="text-base">{icon}</Text>
        <Text className="text-light-subtitle dark:text-dark-subtitle font-l-regular text-sm">
          {label}
        </Text>
      </View>
      <Text
        className="text-light-title dark:text-dark-title font-l-medium text-sm max-w-[55%] text-right"
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {value}
      </Text>
    </View>
  )
}

function Divider() {
  return <View className="h-px bg-gray-200 dark:bg-gray-700 -mx-1" />
}
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <SafeAreaView className="bg-light dark:bg-dark flex-1 px-4">
      <Bg opacity={0.1} />


      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="w-full flex-row items-center gap-x-2 mb-6"
      >
        <BackButton />
        <Text className="text-lg font-l-semibold font-bold text-light-title dark:text-dark-title ml-2">
          Profile
        </Text>
      </MotiView>


      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
        className="items-center mb-6"
      >
        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-3 shadow-md">
          <Text className="text-white text-2xl font-l-bold">{initials}</Text>
        </View>
        <Text className="text-xl font-l-bold text-light-title dark:text-dark-title">
          {name}
        </Text>
   
      </MotiView>


      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
        className="bg-input-light/80 dark:bg-input-dark rounded-2xl px-5 py-4 mb-4 gap-y-4"
      >
        <InfoRow icon={<MaterialIcons name="email" size={20} color={isDark ? "#999" : "#777"} />}  label="Email" value={email} />
        <Divider />
        <InfoRow icon={<MaterialIcons name="badge" size={20} color={isDark ? "#999" : "#777"} />} label="Role" value={role} />
     
      </MotiView>

  
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
        className="bg-input-light/70 dark:bg-input-dark rounded-2xl px-5 py-4 mb-4"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-3">
        <MaterialIcons name="dark-mode" size={20} color={isDark ? "#999" : "#777"} />
            <View>
              <Text className="text-base font-l-semibold text-light-title dark:text-dark-title">
                Dark Mode
              </Text>
              <Text className="text-sm text-light-subtitle dark:text-dark-subtitle font-l-regular">
                {isDark ? 'Currently dark' : 'Currently light'}
              </Text>
            </View>
          </View>
          <Switch
            value={darkSwitch}
            onValueChange={() => {
              setDarkSwitch(prev => !prev);
              toggleColorScheme();
            }}
            trackColor={{ false: '#e5e7eb', true: '#0ea5e9' }}
            thumbColor="#ffffff"
          />
        </View>
      </MotiView>

    
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        className="mt-2"
      >
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="bg-red-500/10  rounded-2xl px-5 py-4 flex-row items-center justify-center gap-x-2"
        >
       <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text className="text-red-500 font-l-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  )
}

