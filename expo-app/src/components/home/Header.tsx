import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import CartIcon from './CartIcon'

const Header = () => {
  const [isHoveredTitle, setIsHoveredTitle] = useState(false)

  const router = useRouter()

  return (
    <View style={styles.header}>
      {/* Título con hover */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        onMouseEnter={() => setIsHoveredTitle(true)}
        onMouseLeave={() => setIsHoveredTitle(false)}
      >
        <Text style={[styles.title, isHoveredTitle && styles.hoverTitle]}>
          Oh My Pizza
        </Text>
      </TouchableOpacity>
      <CartIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF' // Blanco por defecto
  },
  hoverTitle: {
    color: '#FFA500' // Naranja al hacer hover
  },
  cartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    cursor: 'pointer' // Cambia el cursor al pasar sobre el carrito
  }
})

export default Header
