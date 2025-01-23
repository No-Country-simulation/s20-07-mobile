import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import { AppProviders } from '@/contexts/AppProviders'

// Evitar que la pantalla de carga se oculte antes de tiempo
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const colorScheme = useColorScheme()

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Rutas principales */}
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

          {/* Rutas adicionales */}
          <Stack.Screen
            name='custom-pizzas'
            options={{ title: 'Personalizadas' }}
          />
          <Stack.Screen name='pizzas' options={{ title: 'Pizzas' }} />
          <Stack.Screen name='drinks' options={{ title: 'Bebidas' }} />
          <Stack.Screen name='promotions' options={{ title: 'Promociones' }} />
          <Stack.Screen name='desserts' options={{ title: 'Postres' }} />
          <Stack.Screen
            name='featured-pizzas'
            options={{ title: 'Destacadas' }}
          />
          <Stack.Screen
            name='terms-and-conditions'
            options={{ title: 'Términos y Condiciones' }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </AppProviders>
  )
}
