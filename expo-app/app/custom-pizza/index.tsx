import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20
  }
})
