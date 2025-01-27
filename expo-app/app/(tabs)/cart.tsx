import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { useCart } from '@/contexts/CartContext'

const CartScreen = () => {
  const { cart, updateQuantity, removeFromCart } = useCart()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price * item.quantity}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.actionText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    color: '#CCC',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  name: {
    fontSize: 18,
    color: '#FFF'
  },
  price: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 8
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    fontSize: 18,
    color: '#FFF',
    paddingHorizontal: 8
  },
  quantity: {
    fontSize: 16,
    color: '#FFF',
    marginHorizontal: 8
  },
  removeText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 16
  }
})

export default CartScreen
