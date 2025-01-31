import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Text style={[styles.bannerText, isHovered && { color: 'black' }]}>
          Empezar
        </Text>
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: screenHeight * 0.2, // 20% de la pantalla
    borderRadius: screenWidth * 0.02,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    marginTop: screenHeight * 0.1
  },
  bannerText: {
    color: Colors.light.text,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01
  },
  bannerButton: {
    backgroundColor: Colors.dark.button,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.03,
    borderRadius: screenWidth * 0.02
  },
  bannerButtonText: {
    color: Colors.light.text,
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold'
  }
})
