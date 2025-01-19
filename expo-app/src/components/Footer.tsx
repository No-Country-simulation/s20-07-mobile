import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Footer () {
  const router = useRouter()

  return (
    <View style={styles.container}>
      {/* Texto del copyright */}
      <Text style={styles.text}>© 2025 Mi Pizzería</Text>

      {/* Link a Términos y Condiciones */}
      <Pressable onPress={() => router.push('/terms-and-conditions')}>
        <Text style={styles.link}>Términos y Condiciones</Text>
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
  link: {
    color: Colors.dark.orangeText,
    fontSize: 12,
    textDecorationLine: 'none',
    textAlign: 'right'
  }
})
