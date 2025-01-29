import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'

export default function Promotions () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promociones</Text>
      <Text style={styles.text}>
        Lista de todas las promociones disponibles.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 0.05
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.03
  },
  text: {
    fontSize: screenWidth * 0.045,
    textAlign: 'center',
    paddingHorizontal: screenWidth * 0.05
  }
})
