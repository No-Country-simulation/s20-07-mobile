import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { useCart } from '@/contexts/CartContext'

export default function CartScreen () {
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
    backgroundColor: '#FFF' // Fondo blanco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Texto negro
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  name: {
    fontSize: 18,
    color: '#000'
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
    color: '#000',
    paddingHorizontal: 8
  },
  quantity: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 8
  },
  removeText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 16
  }
})
