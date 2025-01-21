import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '../src/hooks/useColorScheme'
import { AppProviders } from '@/contexts/AppProviders'
import { SearchProvider } from '@/contexts/SearchContext'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AppProviders>
      <SearchProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            {/* Ruta principal */}
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

            {/* Rutas adicionales */}
            <Stack.Screen
              name='custom-pizzas'
              options={{ title: 'Personalizadas' }}
            />
            <Stack.Screen name='pizzas' options={{ title: 'Pizzas' }} />
            <Stack.Screen name='drinks' options={{ title: 'Bebidas' }} />
            <Stack.Screen
              name='promotions'
              options={{ title: 'Promociones' }}
            />
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
      </SearchProvider>
    </AppProviders>
  )
}
