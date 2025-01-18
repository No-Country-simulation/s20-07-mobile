// import React, { useState, useEffect } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Pressable,
//   TextInput,
//   FlatList,
//   Alert
// } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { useCart } from '../../contexts/CartContext'
// import BackArrow from '../BackArrow'
// //import { Dimensions } from 'react-native';

// //const { width, height } = Dimensions.get('window');

// export default function CartView () {
//   const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
//   const [coupon, setCoupon] = useState<string>('')
//   const [discount, setDiscount] = useState<number>(5) // Descuento inicial fijo

//   const calculateSubtotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0)

//   useEffect(() => {
//     // Agregar productos iniciales
//     addToCart({
//       id: '1',
//       name: 'Pizza Margarita',
//       price: 10,
//       quantity: 1,
//       image: require('../../assets/images/products/margarita.png'),
//       description: 'Salsa de tomate, mozzarella, albahaca'
//     })

//     addToCart({
//       id: '2',
//       name: 'Pizza Pepperoni',
//       price: 12,
//       quantity: 1,
//       image: require('../../assets/images/products/pepperoni.png'),
//       description: 'Salsa de tomate, mozzarella, pepperoni'
//     })
//   }, []) // Se ejecuta solo al cargar la pantalla

//   const handleUseCoupon = () => {
//     if (coupon === 'DESCUENTO10') {
//       setDiscount(10)
//       Alert.alert('Cupón aplicado', 'Se ha aplicado un descuento de $10')
//     } else {
//       Alert.alert('Cupón inválido', 'El cupón ingresado no es válido')
//     }
//   }

//   const handleClearCart = () => {
//     removeFromCart('all') // Establece las cantidades en 0
//     Alert.alert('Carrito vaciado', 'Todos los productos están en 0.')
//   }

//   return (
//     <View style={styles.container}>
//       <BackArrow />
//       <Text style={styles.title}>Tu carrito</Text>

//       {/* Mostrar productos */}
//       {cart.length > 0 ? (
//         <FlatList
//           data={cart}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.productContainer}>
//               <Image source={item.image} style={styles.productImage} />
//               <View style={styles.productDetails}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.productDescription}>
//                   {item.description || 'Descripción del producto'}
//                 </Text>
//                 <Text style={styles.productPrice}>${item.price}</Text>
//               </View>
//               <View style={styles.quantityControls}>
//                 <Pressable
//                   style={styles.decreaseButton}
//                   onPress={() =>
//                     updateQuantity(item.id, Math.max(0, item.quantity - 1))
//                   }
//                 >
//                   <Text style={styles.buttonText}>-</Text>
//                 </Pressable>
//                 <Text>{item.quantity}</Text>
//                 <Pressable
//                   style={styles.increaseButton}
//                   onPress={() => updateQuantity(item.id, item.quantity + 1)}
//                 >
//                   <Text style={styles.buttonText}>+</Text>
//                 </Pressable>
//               </View>
//             </View>
//           )}
//         />
//       ) : (
//         <Text style={styles.emptyMessage}>Tu carrito está vacío.</Text>
//       )}

//       {/* Subtotal y total */}
//       <View style={styles.summary}>
//         <View style={styles.row}>
//           <Text style={styles.summaryLabel}>Subtotal:</Text>
//           <Text style={styles.summaryValue}>${calculateSubtotal()}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.summaryLabel}>Descuentos:</Text>
//           <Text style={styles.summaryValue}>-${discount}</Text>
//         </View>
//         <View style={styles.divider}></View>
//         <View style={styles.row}>
//           <Text style={styles.totalLabel}>Total:</Text>
//           <Text style={styles.totalValue}>
//             ${Math.max(0, calculateSubtotal() - discount)}
//           </Text>
//         </View>
//       </View>

//       {/* Cuadro de cupón y botones */}
//       <View style={styles.couponContainer}>
//         <TextInput
//           style={styles.couponInput}
//           placeholder='Cupón de descuento'
//           value={coupon}
//           onChangeText={setCoupon}
//         />
//         <Pressable style={styles.useCouponButton} onPress={handleUseCoupon}>
//           <Text style={styles.useCouponText}>Usar</Text>
//         </Pressable>
//       </View>

//       <Pressable style={styles.clearCartButton} onPress={handleClearCart}>
//         <Icon name='trash' style={styles.trashIcon} />
//         <Text style={styles.clearCartText}>Eliminar carrito</Text>
//       </Pressable>
//       <Pressable style={styles.payButton}>
//         <Text style={styles.payButtonText}>Ir a pagar</Text>
//       </Pressable>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     paddingTop: 50
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 70,
//     textAlign: 'center'
//   },

//   productContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     backgroundColor: '#f9f9f9'
//   },
//   productImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 5,
//     marginRight: 10
//   },
//   productDetails: {
//     flex: 1
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   productDescription: {
//     fontSize: 14,
//     color: '#666'
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//     textAlign: 'left', // Esto asegura que el precio quede alineado al inicio
//     color: '#000' // Cambia el color del texto si es necesario
//   },
//   summary: {
//     marginVertical: 20
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: '#666'
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginVertical: 10
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000'
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'right'
//   },
//   couponContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   couponInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     width: '70%'
//   },
//   useCouponButton: {
//     borderWidth: 1,
//     borderColor: '#FFA500',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '25%'
//   },
//   useCouponHover: {
//     backgroundColor: '#FFD700'
//   },
//   useCouponText: {
//     color: '#FFA500',
//     fontWeight: 'bold'
//   },
//   clearCartButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10
//   },
//   clearCartHover: {
//     backgroundColor: '#FF4500'
//   },
//   trashIcon: {
//     fontSize: 18,
//     color: '#FFA500',
//     marginRight: 5
//   },
//   clearCartText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFA500'
//   },
//   payButton: {
//     alignItems: 'center',
//     padding: 10,
//     marginTop: 10,
//     backgroundColor: 'rgb(255, 47, 0)',
//     borderRadius: 5
//   },
//   payButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   emptyMessage: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#666'
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   decreaseButton: {
//     backgroundColor: '#FF7F7F',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginRight: 5
//   },
//   increaseButton: {
//     backgroundColor: '#7FFF7F',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginLeft: 5
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   quantityText: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     fontWeight: 'bold'
//   }
// })

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { useCart } from '../../contexts/CartContext'
import BackArrow from '../BackArrow'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import CouponInput from './CouponInput'
import CartActions from './CartActions'

export default function CartView () {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
  const [coupon, setCoupon] = useState<string>('')
  const [discount, setDiscount] = useState<number>(5)

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    addToCart({
      id: '1',
      name: 'Pizza Margarita',
      price: 10,
      quantity: 1,
      image: require('../../../assets/images/products/margarita.png'),
      description: 'Salsa de tomate, mozzarella, albahaca'
    })
    addToCart({
      id: '2',
      name: 'Pizza Pepperoni',
      price: 12,
      quantity: 1,
      image: require('../../../assets/images/products/pepperoni.png'),
      description: 'Salsa de tomate, mozzarella, pepperoni'
    })
  }, [])

  const handleClearCart = () => {
    removeFromCart('all')
    Alert.alert('Carrito vaciado', 'Todos los productos están en 0.')
  }

  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.title}>Tu carrito</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CartItem item={item} updateQuantity={updateQuantity} />
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Tu carrito está vacío.</Text>
      )}
      <CartSummary subtotal={calculateSubtotal()} discount={discount} />
      <CouponInput
        coupon={coupon}
        setCoupon={setCoupon}
        setDiscount={setDiscount}
      />
      <CartActions handleClearCart={handleClearCart} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center'
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#666'
  }
})
