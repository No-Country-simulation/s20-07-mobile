import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons' // Asegúrate de tener react-native-vector-icons instalado
import { useNavigation } from '@react-navigation/native'

const BackArrow = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      style={styles.backButton}
      onPress={() => navigation.goBack()} // Navega a la página anterior
    >
      <Icon name='arrow-back' size={24} color='#000' style={styles.icon} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    borderRadius: 50, // Hace que sea un círculo
    backgroundColor: '#f0f0f0', // Fondo claro
    position: 'absolute', // Posiciona de forma absoluta
    top: 50, // Margen desde arriba
    left: 30, // Margen desde la izquierda
    zIndex: 1000 // Asegúrate de que esté sobre otros elementos
  },
  icon: {
    alignSelf: 'center'
  }
})

export default BackArrow
