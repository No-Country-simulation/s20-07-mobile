import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'
import { useNavigation } from 'expo-router'
import BackArrow from '@/components/BackArrow'
import Header from '@/components/home/Header'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'

export default function CartScreen () {
  const { cart, updateQuantity, removeFromCart, setCart, clearCart } = useCart()
  const router = useRouter()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

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

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error al guardar el carrito:', error)
      }
    }
    saveCart()
  }, [cart])

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Calcular el descuento
  const discount = subtotal >= 50 ? 5 : 0
  const total = subtotal - discount

  return (
    <View style={styles.container}>
      <BackArrow />
      <Header />
      <Text style={styles.title}>Tu Carrito</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cart}
          extraData={cart}
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

              <View style={styles.itemContent}>
                {/* Nombre, Tamaño y Total alineados */}
                <View style={styles.itemHeader}>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>
                      Tamaño: {item.size}
                    </Text>
                  </View>
                  <View style={styles.itemTotalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.itemTotal}>
                      ${item.price * item.quantity}
                    </Text>
                  </View>
                </View>

                {/* Controles de cantidad y cesto de basura alineados */}
                <View style={styles.actionsContainer}>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(item.id, item.size!, item.quantity - 1)
                      }
                      style={styles.circleButton}
                    >
                      <AntDesign name='minus' size={16} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(item.id, item.size!, item.quantity + 1)
                      }
                      style={styles.circleButton}
                    >
                      <AntDesign name='plus' size={16} color='white' />
                    </TouchableOpacity>
                  </View>

                  {/* Cesto de basura alineado */}
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id, item.size)}
                    style={styles.trashIcon}
                  >
                    <AntDesign name='delete' size={18} color='white' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
      {/* Resumen del pedido */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryAmount}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Descuentos</Text>
          <Text style={styles.summaryAmount}>${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
      </View>
      // Botones "Seguir Comprando" y "Ir a Pagar"
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Seguir Comprando</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.buttonText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
        <AntDesign name='delete' size={18} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  emptyText: { fontSize: 16, color: '#fff', textAlign: 'center' },

  /* Diseño de los elementos del carrito */
  item: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  itemContent: { flex: 1 },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: { flex: 1 },
  itemName: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  itemDescription: { fontSize: 14, color: '#aaa' },
  itemTotalContainer: { alignItems: 'flex-end' },
  itemTotal: { fontSize: 16, color: '#FFC107', fontWeight: 'bold' },

  /* Controles de cantidad y cesto alineados */
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  quantity: { fontSize: 16, color: 'white', paddingHorizontal: 10 },
  trashIcon: { marginLeft: 10 },

  /* Resumen del pedido */
  summaryContainer: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    marginTop: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center'
  },
  summaryText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  summaryAmount: { fontSize: 16, color: '#fff' },
  divider: { height: 1, backgroundColor: '#fff', marginVertical: 5 },
  totalText: { fontSize: 16, color: '#FFC107', fontWeight: 'bold' },
  totalAmount: { fontSize: 16, color: '#FFC107' },

  /* Botones */
  payButton: {
    backgroundColor: '#EB6334',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  continueButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
    marginRight: 10
  },
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginTop: 10
  }
})
