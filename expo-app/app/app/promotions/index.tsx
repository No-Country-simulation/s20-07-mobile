import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function Promotions () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sección de Promociones</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background
  },
  title: {
    fontSize: 18,
    color: Colors.dark.background
  }
})
