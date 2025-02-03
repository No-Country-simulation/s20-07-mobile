import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native' // ✅ Importa desde React Navigation

interface BackArrowProps {
  overrideBack?: () => void // Función opcional para personalizar la navegación
}

export default function BackArrow ({ overrideBack }: BackArrowProps) {
  const navigation = useNavigation() // ✅ Usa useNavigation en lugar de expo-router

  const handleBack = () => {
    if (overrideBack) {
      overrideBack() // Si se proporciona una función personalizada, úsala
    } else if (navigation.canGoBack()) {
      navigation.goBack() // ✅ Solo vuelve atrás si es posible
    } else {
      console.log('No hay pantalla anterior, redirigiendo a la Home')
      navigation.navigate('home')
    }
  }

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <Ionicons name='arrow-back' size={24} color='#fff' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    marginBottom: 16,
    borderRadius: 5
  }
})
