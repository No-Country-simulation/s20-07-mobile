import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
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
      <Text style={styles.text}>© 2025 Mi Pizzería</Text>

      {/* Link a Términos y Condiciones */}
      <Pressable
        onPress={handlePress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Text
          style={[
            styles.linkText,
            isHovered && { color: Colors.light.background } // Cambiar solo el color del texto
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
    marginTop: 20,
    padding: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: Colors.light.text,
    fontSize: 12,
    textAlign: 'left'
  },
  linkText: {
    color: Colors.dark.orangeText, // Color inicial del texto
    fontSize: 12,
    textDecorationLine: 'none',
    textAlign: 'right',
    transition: 'color 0.3s' // Suavizar el cambio de color
  }
})
