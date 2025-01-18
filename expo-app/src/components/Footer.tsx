import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function Footer () {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © 2025 Mi Pizzería. Todos los derechos reservados.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.light.border,
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
    color: Colors.light.text,
    fontSize: 14,
    textAlign: 'center'
  }
})
