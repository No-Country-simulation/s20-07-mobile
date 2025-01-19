import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Pizzas () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizzas</Text>
      <Text style={styles.text}>Lista de todas las pizzas disponibles.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
})
