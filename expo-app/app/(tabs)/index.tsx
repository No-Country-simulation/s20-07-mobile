// import { Image, StyleSheet, Platform } from 'react-native'

// import { HelloWave } from '../../src/components/HelloWave'
// import ParallaxScrollView from '../../src/components/ParallaxScrollView'
// import { ThemedText } from '../../src/components/ThemedText'
// import { ThemedView } from '../../src/components/ThemedView'

// export default function HomeScreen () {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type='title'>Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit{' '}
//           <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>{' '}
//           to see changes. Press{' '}
//           <ThemedText type='defaultSemiBold'>
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12'
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this
//           starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText>{' '}
//           to get a fresh <ThemedText type='defaultSemiBold'>app</ThemedText>{' '}
//           directory. This will move the current{' '}
//           <ThemedText type='defaultSemiBold'>app</ThemedText> to{' '}
//           <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute'
//   }
// })

import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido a la Pizzería 🍕!</Text>
      <Text style={styles.subtitle}>
        Elige tus pizzas favoritas y agrégalas al carrito.
      </Text>
      <Pressable
        onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra al botón
        onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale del botón
        style={[
          styles.cartButton,
          isHovered && styles.cartButtonHover // Aplica el estilo hover cuando `isHovered` es true
        ]}
        onPress={() => navigation.navigate('cart')}
      >
        <Text
          style={[
            styles.cartButtonText,
            isHovered && styles.cartButtonTextHover
          ]}
        >
          Ver Carrito
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  cartButton: {
    backgroundColor: 'rgb(255, 47, 0)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  cartButtonHover: {
    backgroundColor: '#7fdf67', // Color de fondo al hacer hover
    cursor: 'pointer' // Cambia el cursor al estilo pointer
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cartButtonTextHover: {
    color: 'black' // Cambia el color del texto al hacer hover
  }
})

export default HomeScreen
