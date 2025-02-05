import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Button
} from 'react-native'
import { useCart } from '@/src/contexts/CartContext'

const Navbar = () => {
  const { cart, removeFromCart } = useCart()
  const [isCartVisible, setCartVisible] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Pizzería 🍕</Text>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setCartVisible(true)}
      >
        <Text style={styles.cartIcon}>🛒</Text>
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal para mostrar el carrito */}
      <Modal visible={isCartVisible} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Tu Carrito</Text>
          {cart.length > 0 ? (
            <FlatList
              data={cart}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text>
                    {item.name} - {item.quantity} x ${item.price}
                  </Text>
                  <Button
                    title='Eliminar'
                    onPress={() => removeFromCart(item.id)}
                  />
                </View>
              )}
            />
          ) : (
            <Text>Tu carrito está vacío</Text>
          )}
          <Button title='Cerrar' onPress={() => setCartVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFA500'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  cartButton: {
    position: 'relative'
  },
  cartIcon: {
    fontSize: 24
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  cartItem: {
    marginBottom: 15
  }
})
export default Navbar
