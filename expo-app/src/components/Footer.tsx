import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Footer () {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handlePress = () => {
    router.push('/terms-and-conditions') // Redirigir a la página de Términos y Condiciones
  }

  return (
    <View style={styles.container}>
      {/* Texto del copyright */}
      <Text style={styles.text}>© 2025 Oh my pizza</Text>

      {/* Link a Términos y Condiciones */}
      <Pressable
        onPress={() => router.push('../../terms-and-conditions')}
        {...(Platform.OS === 'web' //solo se usa en la web para celulares no funciona React Native no la reconoce onMOuseEnter y onMOuseLeave
          ? {
              onMouseEnter: () => console.log('Hover in'),
              onMouseLeave: () => console.log('Hover out')
            }
          : {})}
      >
        <Text
          style={[
            styles.linkText,
            isHovered && { color: Colors.light.background } // Cambiar solo el color del texto al hacer hover
          ]}
        >
          Términos y Condiciones
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: screenWidth * 0.05,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#777',
    marginTop: screenHeight * 0.001
  },
  text: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.03,
    textAlign: 'left'
  },
  linkText: {
    color: '#FF5722',
    fontSize: screenWidth * 0.03,
    textDecorationLine: 'none',
    textAlign: 'right'
  }
})
