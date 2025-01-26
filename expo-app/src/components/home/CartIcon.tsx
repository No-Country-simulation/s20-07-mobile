import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useCart } from '@/contexts/CartContext'
import { FontAwesome } from '@expo/vector-icons' // Font Awesome de react-native-vector-icons
import { useRouter } from 'expo-router' // Para navegación con Expo

const CartIcon = () => {
  const { cart } = useCart()
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const router = useRouter()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/cart')} // Navega al carrito
    >
      <FontAwesome name='shopping-cart' size={40} color='#FFA500' />{' '}
      {/* Ícono naranja */}
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default CartIcon
