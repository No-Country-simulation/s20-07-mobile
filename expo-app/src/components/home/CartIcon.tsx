import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons' // Íconos
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'

const CartIcon = () => {
  const { totalItems } = useCart()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false) // Estado para manejar el hover

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isHovered && styles.hoverContainer // Cambia el fondo en hover
      ]}
      onPress={() => router.push('/cart')} // Navega al carrito
      onMouseEnter={() => setIsHovered(true)} // Activa el hover
      onMouseLeave={() => setIsHovered(false)} // Desactiva el hover
    >
      <FontAwesome
        name='shopping-cart'
        size={24}
        color={isHovered ? '#FFA500' : '#FFFFFF'} // Cambia el color dinámicamente
      />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Añade el estilo de cursor para la web
    padding: 10
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  hoverContainer: {
    backgroundColor: '#333'
  }
})

export default CartIcon

// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import { FontAwesome } from '@expo/vector-icons' // Íconos
// import { useCart } from '@/contexts/CartContext'
// import { useRouter } from 'expo-router'

// const CartIcon = () => {
//   const { totalItems } = useCart()
//   const router = useRouter()
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => router.push('/cart')}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <FontAwesome
//         name='shopping-cart'
//         size={24}
//         color={isHovered ? '#EB6334' : '#FFFFFF'}
//       />
//       {totalItems > 0 && (
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>{totalItems}</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//     cursor: 'pointer'
//   },
//   badge: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     minWidth: 20,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   }
// })

// export default CartIcon
