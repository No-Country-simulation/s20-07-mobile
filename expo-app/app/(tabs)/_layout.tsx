import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { HapticTab } from '../../src/components/HapticTab'
import { IconSymbol } from '../../src/components/ui/IconSymbol'
import TabBarBackground from '../../src/components/ui/TabBarBackground'
import { Colors } from '../../src/constants/Colors'
import { useColorScheme } from '../../src/hooks/useColorScheme'
import { FontAwesome } from '@expo/vector-icons'

export default function TabLayout () {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='house.fill'
              color={Colors.dark.button}
            />
          )
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' size={24} color={Colors.dark.button} />
          )
        }}
      />
    </Tabs>
  )
}
