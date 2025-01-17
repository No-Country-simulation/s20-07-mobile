import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Alert
} from 'react-native'
import { useCart } from '../contexts/CartContext'

export default function CartView () {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
  const [coupon, setCoupon] = useState<string>('')
  const [discount, setDiscount] = useState<number>(5) // Descuento inicial fijo

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    // Agregar productos iniciales
    addToCart({
      id: '1',
      name: 'Pizza Margarita',
      price: 10,
      quantity: 1,
      image: require('../../assets/images/products/margarita.png'),
      description: 'Salsa de tomate, mozzarella, albahaca'
    })

    addToCart({
      id: '2',
      name: 'Pizza Pepperoni',
      price: 12,
      quantity: 1,
      image: require('../../assets/images/products/pepperoni.png'),
      description: 'Salsa de tomate, mozzarella, pepperoni'
    })
  }, []) // Se ejecuta solo al cargar la pantalla

  const handleUseCoupon = () => {
    if (coupon === 'DESCUENTO10') {
      setDiscount(10)
      Alert.alert('Cupón aplicado', 'Se ha aplicado un descuento de $10')
    } else {
      Alert.alert('Cupón inválido', 'El cupón ingresado no es válido')
    }
  }

  const handleClearCart = () => {
    removeFromCart('all') // Establece las cantidades en 0
    Alert.alert('Carrito vaciado', 'Todos los productos están en 0.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu carrito</Text>

      {/* Mostrar productos */}
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>
                  {item.description || 'Descripción del producto'}
                </Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <View style={styles.quantityControls}>
                <Pressable
                  style={[styles.button, styles.decreaseButton]}
                  onPress={() =>
                    updateQuantity(item.id, Math.max(0, item.quantity - 1))
                  }
                >
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable
                  style={[styles.button, styles.increaseButton]}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Tu carrito está vacío.</Text>
      )}

      {/* Subtotal y total */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Subtotal: ${calculateSubtotal()}</Text>
        <Text style={styles.summaryText}>Descuentos: -${discount}</Text>
        <Text style={styles.totalText}>
          Total: ${Math.max(0, calculateSubtotal() - discount)}
        </Text>
      </View>

      {/* Cuadro de cupón y botones */}
      <TextInput
        style={styles.couponInput}
        placeholder='Cupón de descuento'
        value={coupon}
        onChangeText={setCoupon}
      />
      <Pressable
        style={[styles.button, styles.useCouponButton]}
        onPress={handleUseCoupon}
      >
        <Text style={styles.buttonText}>Usar</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.clearCartButton]}
        onPress={handleClearCart}
      >
        <Text style={styles.buttonText}>Eliminar carrito</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.payButton]}>
        <Text style={styles.buttonText}>Ir a pagar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9'
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  productDetails: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 14,
    color: '#666'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    padding: 5,
    borderRadius: 5
  },
  decreaseButton: {
    backgroundColor: '#FF7F7F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 5
  },
  increaseButton: {
    backgroundColor: '#7FFF7F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  summary: {
    marginVertical: 20
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  couponInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  useCouponButton: {
    backgroundColor: '#FFA500',
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  clearCartButton: {
    backgroundColor: '#FF4500',
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  payButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#666'
  }
})
