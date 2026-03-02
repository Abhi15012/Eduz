
import React from 'react';
import { Text, TouchableNativeFeedback, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}



export function Button({
  label,
  onPress,
  loading = false,
  disabled = false,

  
}: ButtonProps) {
  

  return (
    <TouchableOpacity
      onPress={onPress}
    
        disabled={disabled || loading}
        className='rounded-3xl '
      
    >
        <LinearGradient
         colors={[ '#6366f1', '#0ea5e9',]} // reversed for better text contrast (darker → lighter)
        start={{ x: 0.1, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          width: '100%',
        //   paddingHorizontal: 16,    // ≈ px-4
          paddingVertical: 10,      // ≈ py-4
          alignItems: 'center',
          borderRadius: 30,
          justifyContent: 'center',
          minHeight: 52,
        }}    
          >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-base font-l-semibold ">{label}</Text>
      )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

