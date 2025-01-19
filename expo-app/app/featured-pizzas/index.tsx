import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
