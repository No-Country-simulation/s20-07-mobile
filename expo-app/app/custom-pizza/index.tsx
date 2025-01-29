import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'

export default function CustomPizza () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu Pizza Personalizada</Text>
      <Text style={styles.description}>
        Aquí podrás seleccionar ingredientes, tamaño y más.
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
    padding: screenWidth * 0.05
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02
  },
  description: {
    fontSize: screenWidth * 0.04,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: screenWidth * 0.05
  }
})
