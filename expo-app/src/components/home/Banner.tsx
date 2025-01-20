import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable
} from 'react-native'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Banner () {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handlePress = () => {
    router.push('/custom-pizza') // Ruta hacia la creación de pizza personalizada
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/products/pizza-banner.png')}
      style={styles.banner}
    >
      <Text style={styles.bannerText}>¡Crea tu pizza personalizada!</Text>
      <Pressable
        style={[
          styles.bannerButton,
          isHovered && { backgroundColor: Colors.dark.hoverButton } // Cambiar color en hover
        ]}
        onPress={handlePress}
        onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra
        onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale
      >
        <Text style={styles.bannerButtonText}>Empezar</Text>
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background
  },
  bannerText: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  bannerButton: {
    backgroundColor: Colors.dark.button,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    transition: 'background-color 0.3s'
  },
  bannerButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   Pressable
// } from 'react-native'
// import { Colors } from '@/constants/Colors'
// import { useRouter } from 'expo-router'

// export default function Banner () {
//   const router = useRouter()
//   const [isHovered, setIsHovered] = useState(false)

//   const handlePress = () => {
//     router.push('/custom-pizza') // Ruta hacia la creación de pizza personalizada
//   }

//   return (
//     <ImageBackground
//       source={require('../../../assets/images/products/pizza-banner.png')}
//       style={styles.banner}
//     >
//       <Text style={styles.bannerText}>¡Crea tu pizza personalizada!</Text>
//       <Pressable
//         style={[
//           styles.bannerButton,
//           isHovered && { backgroundColor: Colors.dark.hoverButton } // Cambiar color en hover
//         ]}
//         onPress={handlePress}
//         onMouseEnter={() => setIsHovered(true)} // Detecta cuando el mouse entra
//         onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale
//       >
//         <Text style={styles.bannerButtonText}>Empezar</Text>
//       </Pressable>
//     </ImageBackground>
//   )
// }

// const styles = StyleSheet.create({
//   banner: {
//     position: 'absolute', // Fija el banner
//     top: 0, // Posición en la parte superior
//     width: '100%', // Ocupa todo el ancho de la pantalla
//     height: 150,
//     borderRadius: 10,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10, // Asegura que el banner esté sobre otros elementos
//     backgroundColor: Colors.light.background
//   },
//   bannerText: {
//     color: Colors.light.text,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10
//   },
//   bannerButton: {
//     backgroundColor: Colors.dark.button,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     transition: 'background-color 0.3s' // Suaviza el cambio de color
//   },
//   bannerButtonText: {
//     color: Colors.light.text,
//     fontSize: 16,
//     fontWeight: 'bold'
//   }
// })
