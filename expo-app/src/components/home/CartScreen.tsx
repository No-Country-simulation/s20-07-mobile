import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useCart } from '@/contexts/CartContext'
import { FontAwesome } from '@expo/vector-icons'

export default function CartScreen () {
  const { cart, updateQuantity, removeFromCart } = useCart()
  console.log('Contenido del carrito:', cart)

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const promo = subtotal > 50 ? -5 : 0 // Ejemplo: $5 de descuento si el subtotal supera $50
  const total = subtotal + promo

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
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
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
                  <FontAwesome name='times-circle' size={24} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Subtotales y botones */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Promo: ${promo.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Seguir Comprando</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: screenWidth * 0.04
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: screenHeight * 0.02
  },
  emptyText: {
    fontSize: screenWidth * 0.045,
    color: '#777',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#333',
    padding: screenWidth * 0.04,
    borderRadius: screenWidth * 0.02,
    marginBottom: screenHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: screenWidth * 0.05,
    color: '#FFF'
  },
  price: {
    fontSize: screenWidth * 0.045,
    color: '#FFA500'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    fontSize: screenWidth * 0.05,
    color: '#FFF',
    paddingHorizontal: screenWidth * 0.02
  },
  quantity: {
    fontSize: screenWidth * 0.045,
    color: '#FFF',
    marginHorizontal: screenWidth * 0.03
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    paddingTop: screenHeight * 0.02,
    marginTop: screenHeight * 0.02
  },
  summaryText: {
    fontSize: screenWidth * 0.045,
    color: '#FFF'
  },
  totalText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: screenHeight * 0.01
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.02
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#555',
    padding: screenWidth * 0.04,
    borderRadius: screenWidth * 0.02,
    alignItems: 'center',
    marginRight: screenWidth * 0.02
  },
  payButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: screenWidth * 0.04,
    borderRadius: screenWidth * 0.02,
    alignItems: 'center',
    marginLeft: screenWidth * 0.02
  },
  buttonText: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#FFF'
  }
})
