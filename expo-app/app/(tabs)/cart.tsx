import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { useCart } from '@/contexts/CartContext'
import { FontAwesome } from '@expo/vector-icons'

export default function CartScreen () {
  const { cart, updateQuantity, removeFromCart } = useCart()
  console.log('Contenido del carrito:', cart)

  useEffect(() => {
    console.log('Contenido del carrito en CartScreen:', cart)
  }, [cart])

  const [isHoveredContinue, setIsHoveredContinue] = useState(false)
  const [isHoveredPay, setIsHoveredPay] = useState(false)

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
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Promo: ${promo.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            isHoveredContinue && styles.hoverButton
          ]}
          onMouseEnter={() => setIsHoveredContinue(true)}
          onMouseLeave={() => setIsHoveredContinue(false)}
        >
          <Text
            style={[
              styles.buttonText,
              isHoveredContinue && styles.hoverButtonText
            ]}
          >
            Seguir Comprando
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.payButton, isHoveredPay && styles.hoverButton]}
          onMouseEnter={() => setIsHoveredPay(true)}
          onMouseLeave={() => setIsHoveredPay(false)}
        >
          <Text
            style={[styles.buttonText, isHoveredPay && styles.hoverButtonText]}
          >
            Pagar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    color: '#FFF'
  },
  price: {
    fontSize: 16,
    color: '#FFA500'
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
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    paddingTop: 16,
    marginTop: 16
  },
  summaryText: {
    fontSize: 16,
    color: '#FFF'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#555',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8
  },
  payButton: {
    flex: 1,
    backgroundColor: '#EB6334',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  },
  hoverButton: {
    backgroundColor: '#FFF'
  },
  hoverButtonText: {
    color: '#000'
  }
})
