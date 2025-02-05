import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'

export default function CartScreen () {
  const { cart, updateQuantity, removeFromCart, setCart, clearCart } = useCart()
  const [orderSuccess, setOrderSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cart')
        setCart(response.data.cart)
      } catch (error) {
        console.error('Error al cargar el carrito:', error)
      }
    }

    fetchCart()
  }, [setCart])

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const promo = subtotal > 50 ? -5 : 0
  const total = subtotal + promo

  const handlePay = () => {
    clearCart()
    setOrderSuccess(true)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  if (orderSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText}>🎉 Pedido realizado con éxito 😊</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Seguir Comprando</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <FontAwesome name='arrow-left' size={24} color='white' />
      </TouchableOpacity>

      <Text style={styles.title}>Carrito de Compras</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${item.size}`}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  source={{
                    uri:
                      item.image ||
                      'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg'
                  }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.size}>Tamaño: {item.size}</Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
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
                    <FontAwesome name='trash' size={20} color='red' />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Subtotal: ${subtotal.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>Promo: ${promo.toFixed(2)}</Text>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Seguir Comprando</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePay}
          disabled={cart.length === 0}
        >
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: screenWidth * 0.02 },
  title: { fontSize: screenWidth * 0.06, color: '#fff', fontWeight: 'bold' },
  emptyText: {
    fontSize: screenWidth * 0.045,
    color: '#777',
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: screenWidth * 0.03,
    backgroundColor: '#333',
    borderRadius: screenWidth * 0.02,
    marginBottom: screenHeight * 0.02
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
    backgroundColor: '#FF5722',
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold'
  },
  backButton: {
    padding: screenWidth * 0.02
  },
  itemImage: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: screenWidth * 0.02
  },
  itemDetails: {
    flex: 1,
    marginLeft: screenWidth * 0.02
  },
  size: {
    fontSize: screenWidth * 0.045,
    color: '#FFF'
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successText: {
    fontSize: screenWidth * 0.06,
    color: '#FFF',
    textAlign: 'center'
  }
})
