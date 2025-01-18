// import React, { useState } from 'react'
// import { View, Text, StyleSheet, Pressable } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

// const HomeScreen = () => {
//   const navigation = useNavigation()
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>¡Bienvenido a la Pizzería 🍕!</Text>
//       <Text style={styles.subtitle}>
//         Elige tus pizzas favoritas y agrégalas al carrito.
//       </Text>
//       <Pressable
//         onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra al botón
//         onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale del botón
//         style={[
//           styles.cartButton,
//           isHovered && styles.cartButtonHover // Aplica el estilo hover cuando `isHovered` es true
//         ]}
//         onPress={() => navigation.navigate('cart')}
//       >
//         <Text
//           style={[
//             styles.cartButtonText,
//             isHovered && styles.cartButtonTextHover
//           ]}
//         >
//           Ver Carrito
//         </Text>
//       </Pressable>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20
//   },
//   welcome: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20
//   },
//   cartButton: {
//     backgroundColor: 'rgb(255, 47, 0)',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5
//   },
//   cartButtonHover: {
//     backgroundColor: '#7fdf67', // Color de fondo al hacer hover
//     cursor: 'pointer' // Cambia el cursor al estilo pointer
//   },
//   cartButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   cartButtonTextHover: {
//     color: 'black' // Cambia el color del texto al hacer hover
//   }
// })

// export default HomeScreen

import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SearchBar from '@/components/home/SearchBar'
import Banner from '@/components/home/Banner'
import CategoryList from '@/components/home/CategoryList'
import Slider from '@/components/home/Slider'

export default function HomeScreen () {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <Banner />
      <CategoryList />
      <Slider />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10
  }
})
