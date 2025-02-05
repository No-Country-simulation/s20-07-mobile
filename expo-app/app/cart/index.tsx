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
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'
import { useNavigation } from 'expo-router'
import BackArrow from '@/components/BackArrow'
import axios from 'axios'

import { Colors } from '@/constants/Colors'

export default function CartScreen () {
  const { cart, updateQuantity, removeFromCart, setCart, clearCart } = useCart()
  const [orderSuccess, setOrderSuccess] = useState(false)
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
    console.log('📦 Estado del carrito actualizado:', cart)

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart))
      } catch (error) {
        console.error('❌ Error al guardar el carrito:', error)
      }
    }

    saveCart()
  }, [cart]) // 💡 Se ejecuta cada vez que `cart` cambia

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
            extraData={cart}
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
                  <Text>{item.name}</Text>
                  <Text>Tamaño: {item.size}</Text>
                  <Text>Precio: ${item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, item.size!, item.quantity - 1)
                    }
                  >
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantity}>
                    {isNaN(item.quantity) ? 1 : item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, item.size!, item.quantity + 1)
                    }
                  >
                    <Text>+</Text>
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
  container: { flex: 1, backgroundColor: '#000', padding: screenWidth * 0.02 },
  title: {
    fontSize: screenWidth * 0.04,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02
  },
  emptyText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
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
  name: { fontSize: screenWidth * 0.03, color: '#fff' },
  price: { fontSize: screenWidth * 0.03, color: '#FFC107' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionText: {
    fontSize: screenWidth * 0.03,
    color: '#FFC107',
    paddingHorizontal: screenWidth * 0.03
  },
  removeText: {
    fontSize: screenWidth * 0.03,
    color: '#FF0000',
    paddingHorizontal: screenWidth * 0.03
  },
  quantity: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    paddingHorizontal: screenWidth * 0.03
  },
  summaryContainer: {
    paddingVertical: screenHeight * 0.02,
    borderTopWidth: 1,
    borderTopColor: '#555'
  },
  summaryText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    marginBottom: screenHeight * 0.01
  },
  totalText: {
    fontSize: screenWidth * 0.03,
    color: '#FFC107',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.02
  },
  continueButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
    marginRight: screenWidth * 0.02,
    alignItems: 'center',
    borderColor: '#FF5722',
    borderWidth: 1
  },
  payButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
    marginLeft: screenWidth * 0.02,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: screenWidth * 0.003,
      height: screenHeight * 0.003
    },
    textShadowRadius: 2
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: screenHeight * 0.03
  },
  successText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: '#FF5722',
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
    marginTop: screenHeight * 0.02
  },
  itemImage: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.02,
    marginRight: screenWidth * 0.03
  },
  itemDetails: { flex: 1, marginLeft: screenWidth * 0.03 },
  clearCartButton: {
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
    alignItems: 'center',
    marginVertical: screenHeight * 0.02,
    width: screenWidth * 0.3,
    alignSelf: 'center',
    borderColor: '#FF5722',
    borderWidth: 1
  },
  clearCartText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: screenWidth * 0.003,
      height: screenHeight * 0.003
    },
    textShadowRadius: 2
  },
  disabledButton: {
    backgroundColor: '#777',
    opacity: 0.3
  }
})

//despues del anterior
// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity
// } from 'react-native'
// import { screenWidth, screenHeight } from '@/utils/dimensions'
// import { useCart } from '@/contexts/CartContext'
// import { useRouter } from 'expo-router'
// import { useNavigation } from 'expo-router'
// import BackArrow from '@/components/BackArrow'
// import axios from 'axios'
// import { Colors } from '@/constants/Colors'

// export default function CartScreen () {
//   const { cart, updateQuantity, removeFromCart, setCart, clearCart } = useCart()
//   const [orderSuccess, setOrderSuccess] = useState(false)
//   const router = useRouter()
//   const navigation = useNavigation()

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false })
//   }, [navigation])

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/cart')
//         setCart(response.data.cart)
//       } catch (error) {
//         console.error('Error al cargar el carrito:', error)
//       }
//     }

//     fetchCart()
//   }, [setCart])

//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   )
//   const promo = subtotal > 50 ? -5 : 0 // Ejemplo: $5 de descuento si el subtotal supera $50
//   const total = subtotal + promo

//   const handlePay = () => {
//     clearCart()
//     setOrderSuccess(true)
//   }

//   const handleGoHome = () => {
//     router.push('/')
//   }

//   if (orderSuccess) {
//     return (
//       <View style={styles.successContainer}>
//         <Text style={styles.successText}>
//           🎉 Felicidades, su orden ha sido creada con éxito 😊
//         </Text>
//         <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
//           <Text style={styles.buttonText}>Seguir Comprando</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   const handleClearCart = () => {
//     clearCart()
//   }

//   return (
//     <View style={styles.container}>
//       <BackArrow />
//       <Text style={styles.title}>Carrito de Compras</Text>

//       {cart.length === 0 ? (
//         <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cart}
//             extraData={cart}
//             keyExtractor={(item, index) => `${item.id}-${item.size}`}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Image
//                   source={{
//                     uri:
//                       item.image ||
//                       'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg' // Imagen por defecto
//                   }}
//                   style={styles.itemImage}
//                 />

//                 <View style={styles.itemDetails}>
//                   <Text>{item.name}</Text>
//                   <Text>Tamaño: {item.size}</Text>
//                   <Text>Precio: ${item.price.toFixed(2)}</Text>
//                 </View>
//                 <View style={styles.actions}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       updateQuantity(item.id, item.size!, item.quantity - 1)
//                     }
//                   >
//                     <Text>-</Text>
//                   </TouchableOpacity>

//                   <Text style={styles.quantity}>
//                     {isNaN(item.quantity) ? 1 : item.quantity}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() =>
//                       updateQuantity(item.id, item.size!, item.quantity + 1)
//                     }
//                   >
//                     <Text>+</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => removeFromCart(item.id, item.size)}
//                   >
//                     <Text style={styles.removeText}>Eliminar</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           />
//           <TouchableOpacity
//             style={styles.clearCartButton}
//             onPress={handleClearCart}
//           >
//             <Text style={styles.clearCartText}>Vaciar Carrito</Text>
//           </TouchableOpacity>
//           <View style={styles.summaryContainer}>
//             <Text style={styles.summaryText}>
//               Subtotal: ${subtotal.toFixed(2)}
//             </Text>
//             <Text style={styles.summaryText}>Promo: ${promo.toFixed(2)}</Text>
//             <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
//           </View>
//         </>
//       )}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.continueButton} onPress={handleGoHome}>
//           <Text style={styles.buttonText}>Seguir Comprando</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.payButton, cart.length === 0 && styles.disabledButton]}
//           onPress={handlePay}
//           disabled={cart.length === 0}
//         >
//           <Text style={styles.buttonText}>
//             {cart.length === 0 ? 'Carrito vacío' : 'Pagar'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000', padding: screenWidth * 0.02 },
//   title: {
//     fontSize: screenWidth * 0.04,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: screenHeight * 0.02
//   },
//   emptyText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     textAlign: 'center'
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: screenWidth * 0.03,
//     backgroundColor: '#333',
//     borderRadius: screenWidth * 0.02,
//     marginBottom: screenHeight * 0.02
//   },
//   name: { fontSize: screenWidth * 0.03, color: '#fff' },
//   price: { fontSize: screenWidth * 0.03, color: '#FFC107' },
//   actions: { flexDirection: 'row', alignItems: 'center' },
//   actionText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FFC107',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   removeText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FF0000',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   quantity: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   summaryContainer: {
//     paddingVertical: screenHeight * 0.02,
//     borderTopWidth: 1,
//     borderTopColor: '#555'
//   },
//   summaryText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     marginBottom: screenHeight * 0.01
//   },
//   totalText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FFC107',
//     fontWeight: 'bold'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: screenHeight * 0.02
//   },
//   continueButton: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 87, 34, 0.2)',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginRight: screenWidth * 0.02,
//     alignItems: 'center',
//     borderColor: '#FF5722',
//     borderWidth: 1
//   },
//   payButton: {
//     flex: 1,
//     backgroundColor: '#FF5722',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginLeft: screenWidth * 0.02,
//     alignItems: 'center'
//   },
//   buttonText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: {
//       width: screenWidth * 0.003,
//       height: screenHeight * 0.003
//     },
//     textShadowRadius: 2
//   },
//   successContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1E1E1E',
//     padding: screenHeight * 0.03
//   },
//   successText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     textAlign: 'center'
//   },
//   backButton: {
//     backgroundColor: '#FF5722',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginTop: screenHeight * 0.02
//   },
//   itemImage: {
//     width: screenWidth * 0.1,
//     height: screenWidth * 0.1,
//     borderRadius: screenWidth * 0.02,
//     marginRight: screenWidth * 0.03
//   },
//   itemDetails: { flex: 1, marginLeft: screenWidth * 0.03 },
//   clearCartButton: {
//     backgroundColor: 'rgba(255, 87, 34, 0.2)',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     alignItems: 'center',
//     marginVertical: screenHeight * 0.02,
//     width: screenWidth * 0.3,
//     alignSelf: 'center',
//     borderColor: '#FF5722',
//     borderWidth: 1
//   },
//   clearCartText: {
//     color: '#FFFFFF',
//     fontSize: screenWidth * 0.03,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: {
//       width: screenWidth * 0.003,
//       height: screenHeight * 0.003
//     },
//     textShadowRadius: 2
//   },
//   disabledButton: {
//     backgroundColor: '#777',
//     opacity: 0.3
//   }
// })
//ultimo
//--------------------
// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity
// } from 'react-native'
// import { screenWidth, screenHeight } from '@/utils/dimensions'
// import { useCart } from '@/contexts/CartContext'
// import { useRouter } from 'expo-router'
// import { useNavigation } from 'expo-router'
// import BackArrow from '@/components/BackArrow'
// import axios from 'axios'
// import { Colors } from '@/constants/Colors'

// export default function CartScreen () {
//   const { cart, updateQuantity, removeFromCart, setCart, clearCart } = useCart()
//   const [orderSuccess, setOrderSuccess] = useState(false)
//   const router = useRouter()
//   const navigation = useNavigation()

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false })
//   }, [navigation])

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/cart')
//         setCart(response.data.cart)
//       } catch (error) {
//         console.error('Error al cargar el carrito:', error)
//       }
//     }

//     fetchCart()
//   }, [setCart])

//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   )
//   const promo = subtotal > 50 ? -5 : 0 // Ejemplo: $5 de descuento si el subtotal supera $50
//   const total = subtotal + promo

//   const handlePay = () => {
//     clearCart()
//     setOrderSuccess(true)
//   }

//   const handleGoHome = () => {
//     router.push('/')
//   }

//   if (orderSuccess) {
//     return (
//       <View style={styles.successContainer}>
//         <Text style={styles.successText}>
//           🎉 Felicidades, su orden ha sido creada con éxito 😊
//         </Text>
//         <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
//           <Text style={styles.buttonText}>Seguir Comprando</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   const handleClearCart = () => {
//     clearCart()
//   }

//   return (
//     <View style={styles.container}>
//       <BackArrow />
//       <Text style={styles.title}>Carrito de Compras</Text>

//       {cart.length === 0 ? (
//         <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cart}
//             keyExtractor={(item, index) => `${item.id}-${item.size}`}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Image
//                   source={{
//                     uri:
//                       item.image ||
//                       'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg' // Imagen por defecto
//                   }}
//                   style={styles.itemImage}
//                 />

//                 <View style={styles.itemDetails}>
//                   <Text style={styles.name}>{item.name}</Text>
//                   <Text style={styles.size}>Tamaño: {item.size}</Text>
//                   <Text style={styles.price}>${item.price.toFixed(2)}</Text>
//                 </View>
//                 <View style={styles.actions}>
//                   <TouchableOpacity
//                     onPress={() => updateQuantity(item.id, item.quantity - 1)}
//                   >
//                     <Text style={styles.actionText}>-</Text>
//                   </TouchableOpacity>

//                   <Text style={styles.quantity}>
//                     {isNaN(item.quantity) ? 1 : item.quantity}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => updateQuantity(item.id, item.quantity + 1)}
//                   >
//                     <Text style={styles.actionText}>+</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => removeFromCart(item.id, item.size)}
//                   >
//                     <Text style={styles.removeText}>Eliminar</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           />
//           <TouchableOpacity
//             style={styles.clearCartButton}
//             onPress={handleClearCart}
//           >
//             <Text style={styles.clearCartText}>Vaciar Carrito</Text>
//           </TouchableOpacity>
//           <View style={styles.summaryContainer}>
//             <Text style={styles.summaryText}>
//               Subtotal: ${subtotal.toFixed(2)}
//             </Text>
//             <Text style={styles.summaryText}>Promo: ${promo.toFixed(2)}</Text>
//             <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
//           </View>
//         </>
//       )}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.continueButton} onPress={handleGoHome}>
//           <Text style={styles.buttonText}>Seguir Comprando</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.payButton, cart.length === 0 && styles.disabledButton]}
//           onPress={handlePay}
//           disabled={cart.length === 0}
//         >
//           <Text style={styles.buttonText}>
//             {cart.length === 0 ? 'Carrito vacío' : 'Pagar'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000', padding: screenWidth * 0.02 },
//   title: {
//     fontSize: screenWidth * 0.04,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: screenHeight * 0.02
//   },
//   emptyText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     textAlign: 'center'
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: screenWidth * 0.03,
//     backgroundColor: '#333',
//     borderRadius: screenWidth * 0.02,
//     marginBottom: screenHeight * 0.02
//   },
//   name: { fontSize: screenWidth * 0.03, color: '#fff' },
//   price: { fontSize: screenWidth * 0.03, color: '#FFC107' },
//   actions: { flexDirection: 'row', alignItems: 'center' },
//   actionText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FFC107',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   removeText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FF0000',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   quantity: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     paddingHorizontal: screenWidth * 0.03
//   },
//   summaryContainer: {
//     paddingVertical: screenHeight * 0.02,
//     borderTopWidth: 1,
//     borderTopColor: '#555'
//   },
//   summaryText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     marginBottom: screenHeight * 0.01
//   },
//   totalText: {
//     fontSize: screenWidth * 0.03,
//     color: '#FFC107',
//     fontWeight: 'bold'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: screenHeight * 0.02
//   },
//   continueButton: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 87, 34, 0.2)',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginRight: screenWidth * 0.02,
//     alignItems: 'center',
//     borderColor: '#FF5722',
//     borderWidth: 1
//   },
//   payButton: {
//     flex: 1,
//     backgroundColor: '#FF5722',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginLeft: screenWidth * 0.02,
//     alignItems: 'center'
//   },
//   buttonText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: {
//       width: screenWidth * 0.003,
//       height: screenHeight * 0.003
//     },
//     textShadowRadius: 2
//   },
//   successContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1E1E1E',
//     padding: screenHeight * 0.03
//   },
//   successText: {
//     fontSize: screenWidth * 0.03,
//     color: '#fff',
//     textAlign: 'center'
//   },
//   backButton: {
//     backgroundColor: '#FF5722',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     marginTop: screenHeight * 0.02
//   },
//   itemImage: {
//     width: screenWidth * 0.1,
//     height: screenWidth * 0.1,
//     borderRadius: screenWidth * 0.02,
//     marginRight: screenWidth * 0.03
//   },
//   itemDetails: { flex: 1, marginLeft: screenWidth * 0.03 },
//   clearCartButton: {
//     backgroundColor: 'rgba(255, 87, 34, 0.2)',
//     padding: screenHeight * 0.02,
//     borderRadius: screenWidth * 0.02,
//     alignItems: 'center',
//     marginVertical: screenHeight * 0.02,
//     width: screenWidth * 0.3,
//     alignSelf: 'center',
//     borderColor: '#FF5722',
//     borderWidth: 1
//   },
//   clearCartText: {
//     color: '#FFFFFF',
//     fontSize: screenWidth * 0.03,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: {
//       width: screenWidth * 0.003,
//       height: screenHeight * 0.003
//     },
//     textShadowRadius: 2
//   },
//   disabledButton: {
//     backgroundColor: '#777',
//     opacity: 0.3
//   }
// })
