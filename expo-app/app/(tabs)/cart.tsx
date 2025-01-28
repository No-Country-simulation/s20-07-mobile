import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'
import BackArrow from '@/components/BackArrow'
import axios from 'axios'
import { Colors } from '@/constants/Colors'

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
  const promo = subtotal > 50 ? -5 : 0 // Ejemplo: $5 de descuento si el subtotal supera $50
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
        <Text style={styles.successText}>
          🎉 Felicidades, su orden ha sido creada con éxito 😊
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Seguir Comprando</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleClearCart = () => {
    clearCart()
  }

  return (
    <View style={styles.container}>
      <BackArrow />
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
                      'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg' // Imagen por defecto
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

                  <Text style={styles.quantity}>
                    {isNaN(item.quantity) ? 1 : item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.actionText}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id, item.size)}
                  >
                    <Text style={styles.removeText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.clearCartButton}
            onPress={handleClearCart}
          >
            <Text style={styles.clearCartText}>Vaciar Carrito</Text>
          </TouchableOpacity>
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
          style={[styles.payButton, cart.length === 0 && styles.disabledButton]}
          onPress={handlePay}
          disabled={cart.length === 0}
        >
          <Text style={styles.buttonText}>
            {cart.length === 0 ? 'Carrito vacío' : 'Pagar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  emptyText: { fontSize: 18, color: '#fff', textAlign: 'center' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10
  },
  name: { fontSize: 16, color: '#fff' },
  price: { fontSize: 14, color: '#FFC107' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 18, color: '#FFC107', paddingHorizontal: 10 },
  removeText: { fontSize: 14, color: '#FF0000', paddingHorizontal: 10 },
  quantity: { fontSize: 16, color: '#fff', paddingHorizontal: 10 },
  summaryContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#555'
  },
  summaryText: { fontSize: 16, color: '#fff', marginBottom: 5 },
  totalText: { fontSize: 18, color: '#FFC107', fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  continueButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    borderColor: '#FF5722', // Borde naranja para un contraste sutil
    borderWidth: 1
  },
  payButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // Texto blanco para mantener contraste
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra para destacar el texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20
  },
  successText: { fontSize: 20, color: '#fff', textAlign: 'center' },
  backButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  itemImage: {
    width: 50,
    borderRadius: 8,
    marginRight: 10
  },
  itemDetails: { flex: 1, marginLeft: 10 },
  clearCartButton: {
    backgroundColor: 'rgba(255, 87, 34, 0.2)', // Naranja con opacidad (Color RGBA)
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '30%',
    alignSelf: 'center',
    borderColor: '#FF5722', // Borde naranja para un contraste sutil
    borderWidth: 1
  },
  clearCartText: {
    color: '#FFFFFF', // Texto blanco para resaltar
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombras para destacar el texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  disabledButton: {
    backgroundColor: '#777', // Color grisáceo para indicar que está deshabilitado
    opacity: 0.6 // Reduce opacidad
  }
})
