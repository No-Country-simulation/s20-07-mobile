import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'

export default function FeaturedPizzas () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizzas Destacadas</Text>
      <Text style={styles.description}>
        Aquí puedes seleccionar nuestras Pizzas Destacadas
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: screenWidth * 0.05
  },
  title: {
    fontSize: screenWidth * 0.06, // Ajustado al ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02
  },
  description: {
    fontSize: screenWidth * 0.045,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: screenWidth * 0.05
  }
})
