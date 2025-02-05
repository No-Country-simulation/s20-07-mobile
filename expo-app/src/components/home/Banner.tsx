import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Platform
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Banner () {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handlePress = () => {
    router.push('/custom-pizza')
  }

  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={require('../../../assets/images/products/pizza-banner-original.png')}
        style={styles.banner}
      >
        <Text style={styles.bannerText}>¡Crea tu pizza personalizada!</Text>
        <Pressable
          style={[
            styles.bannerButton,
            isHovered && { backgroundColor: Colors.light.background }
          ]}
          onPress={handlePress}
          {...(Platform.OS === 'web' //solo se usa para web no lo reconoce React Native
            ? {
                onMouseEnter: () => console.log('Hover in'),
                onMouseLeave: () => console.log('Hover out')
              }
            : {})} // Solo para la web
        >
          <Text style={[styles.bannerText, isHovered && { color: 'black' }]}>
            Empezar
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1
  },
  banner: {
    width: '100%',
    height: screenHeight * 0.2, // 20% de la pantalla
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    marginTop: screenHeight * 0.2
  },
  bannerText: {
    color: Colors.light.text,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.03
  },
  bannerButton: {
    backgroundColor: Colors.dark.button,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.03,
    borderRadius: screenWidth * 0.02,
    marginBottom: screenHeight * 0.05
  },
  bannerButtonText: {
    color: Colors.light.text,
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold'
  }
})
