import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable
} from 'react-native'
import { Colors } from '@/constants/Colors'

export default function Banner () {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ImageBackground
      source={require('../../../assets/images/products/pizza-banner.png')}
      style={styles.banner}
    >
      <Text style={styles.bannerText}>¡Crea tu pizza personalizada!</Text>
      <Pressable
        style={[
          styles.bannerButton,
          isHovered && { backgroundColor: Colors.dark.hoverButton } // Cambiar color en hover
        ]}
        onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra
        onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale
      >
        <Text style={styles.bannerButtonText}>Empezar</Text>
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  bannerText: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  bannerButton: {
    backgroundColor: Colors.dark.button,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    transition: 'background-color 0.3s' // Suaviza el cambio de color
  },
  bannerButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
