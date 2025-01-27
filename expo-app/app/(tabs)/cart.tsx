import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'

export default function CartScreen () {
  const cart = [
    { id: 1, name: 'Pizza Margarita', price: 20, quantity: 2 },
    { id: 2, name: 'Pizza Pepperoni', price: 12, quantity: 1 }
  ]

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const promoDiscount = subtotal > 30 ? 5 : 0
  const total = subtotal - promoDiscount

  const [isHoveredContinue, setIsHoveredContinue] = useState(false)
  const [isHoveredPay, setIsHoveredPay] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price * item.quantity}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => console.log(`Restar 1 a ${item.name}`)}
                  >
                    <Text style={styles.actionText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => console.log(`Sumar 1 a ${item.name}`)}
                  >
                    <Text style={styles.actionText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log(`Eliminar ${item.name}`)}
                  >
                    <Text style={styles.removeText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Subtotal: ${subtotal.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              Promo: -${promoDiscount.toFixed(2)}
            </Text>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          </View>

          <View style={styles.buttons}>
            {/* Botón de Seguir Comprando */}
            <TouchableOpacity
              style={[styles.button, isHoveredContinue && styles.buttonHover]}
              onPress={() => console.log('Seguir comprando')}
              onMouseEnter={() => setIsHoveredContinue(true)}
              onMouseLeave={() => setIsHoveredContinue(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  isHoveredContinue && styles.buttonHoverText
                ]}
              >
                Seguir Comprando
              </Text>
            </TouchableOpacity>

            {/* Botón de Pagar */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.payButton,
                isHoveredPay && styles.buttonHover
              ]}
              onPress={() => console.log('Pagar')}
              onMouseEnter={() => setIsHoveredPay(true)}
              onMouseLeave={() => setIsHoveredPay(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  isHoveredPay && styles.buttonHoverText
                ]}
              >
                Pagar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000'
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
    marginBottom: 8
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
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginTop: 16,
    paddingTop: 16
  },
  summaryText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 4
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  button: {
    flex: 1,
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  payButton: {
    backgroundColor: '#FFA500'
  },
  buttonHover: {
    backgroundColor: '#FFF'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonHoverText: {
    color: '#000'
  }
})
