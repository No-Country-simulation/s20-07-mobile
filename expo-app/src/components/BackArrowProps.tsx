import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRouter } from 'expo-router'

interface BackArrowProps {
  overrideBack?: () => void // Función opcional para personalizar la navegación
}

export default function BackArrow ({ overrideBack }: BackArrowProps) {
  const router = useRouter()

  const handleBack = () => {
    if (overrideBack) {
      overrideBack() // Si se proporciona una función personalizada, úsala
    } else {
      router.back() // De lo contrario, vuelve atrás normalmente
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
