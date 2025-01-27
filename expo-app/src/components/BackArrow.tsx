import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRouter } from 'expo-router'

export default function BackArrow () {
  const router = useRouter()

  const handleBack = () => {
    router.back() // Navega a la pantalla anterior
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
  },
  backText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  }
})
