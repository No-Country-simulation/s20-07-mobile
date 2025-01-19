import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'

export default function Footer () {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Texto del copyright */}
      <Text style={styles.text}>© 2025 Mi Pizzería</Text>

      {/* Link a Términos y Condiciones */}
      <Pressable onPress={() => navigation.navigate('terms-and-conditions')}>
        <Text style={styles.link}>Términos y Condiciones</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#000', // Fondo negro
    flexDirection: 'row', // Posiciona los elementos en fila
    justifyContent: 'space-between', // Separa los elementos a los extremos
    alignItems: 'center' // Centra verticalmente los elementos
  },
  text: {
    color: Colors.light.text,
    fontSize: 12,
    textAlign: 'left' // Alinea a la izquierda
  },
  link: {
    color: Colors.light.primary,
    fontSize: 12,
    textDecorationLine: 'underline', // Subrayado para indicar que es un enlace
    textAlign: 'right' // Alinea a la derecha
  }
})
