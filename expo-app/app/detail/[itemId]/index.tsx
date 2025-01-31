import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import BackArrow from '@/components/BackArrow'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import Header from '@/components/home/Header'

type Pizza = {
  id: number
  name: string
  image: string | null
  ingredients: string
  pizzaIngredients: { ingredient: { name: string } }[]
  predefinedPizzas: { size: { name: string }; price: number }[]
}

export default function PizzaDetail () {
  const { itemId } = useLocalSearchParams<{ itemId: string }>()
  const [pizza, setPizza] = useState<Pizza | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { addFavorite, removeFavorite, favorites } = useFavorites()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pizzas/${itemId}`
        )
        const fetchedPizza = response.data.pizza

        setPizza({
          id: fetchedPizza.id,
          name: fetchedPizza.name,
          image: fetchedPizza.image,
          ingredients: fetchedPizza.ingredients,
          pizzaIngredients: fetchedPizza.pizzaIngredients,
          predefinedPizzas: fetchedPizza.predefinedPizzas
        })

        // Establecer el precio y tamaño por defecto
        if (fetchedPizza.predefinedPizzas.length > 0) {
          setSelectedSize(fetchedPizza.predefinedPizzas[0].size.name)
          setSelectedPrice(fetchedPizza.predefinedPizzas[0].price)
        }
      } catch (error) {
        console.error('Error al cargar los detalles de la pizza:', error)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchPizza()
  }, [itemId])

  const handleAddToCart = () => {
    if (!pizza || !selectedPrice) {
      console.error('Pizza o precio no definidos.')
      return
    }

    const uniqueId = `${pizza.id}-${selectedSize}-${Date.now()}`

    const item: CartItem = {
      id: uniqueId, // ID único como string
      pizzaId: pizza.id, // Mantiene el ID original
      name: `${pizza.name} (${selectedSize})`,
      image: pizza.image,
      size: selectedSize,
      price: selectedPrice,
      quantity: 1
    }

    addToCart(item)
    console.log('🛒 Pizza agregada al carrito:', item)
  }

  const handleAddFavorite = () => {
    if (!pizza) return

    // Verificamos si la pizza ya está en favoritos
    const isAlreadyFavorite = favorites.some(fav => fav.id === pizza.id)

    if (!isAlreadyFavorite) {
      console.log(`✅ Agregando a favoritos: ${pizza.name} (ID: ${pizza.id})`)
      addFavorite(pizza)
    } else {
      console.log(`⚠️ La pizza ${pizza.name} ya está en favoritos.`)
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    )
  }

  const isFavorite = favorites.some(fav => fav.id === pizza?.id) // ✅ Verifica si está en favoritos
  console.log(`📌 Pizza ID ${pizza?.id}, ¿Está en favoritos?`, isFavorite)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <BackArrow />
      <Text style={styles.title}>{pizza?.name || 'Nombre no disponible'}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              pizza?.image ||
              'https://www.clarin.com/2022/10/05/utIOlIIyB_2000x1500__1.jpg'
          }}
          style={styles.image}
        />
        {/* 🔹 Corazón posicionado sobre la imagen en la esquina superior derecha */}
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={handleAddFavorite} // 🔥 Ahora usa la función correcta
        >
          <Text style={isFavorite ? styles.heartFilled : styles.heartEmpty}>
            ❤️
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {pizza?.pizzaIngredients.map(ingredient => (
        <Text key={ingredient.ingredient.name} style={{ color: '#fff' }}>
          {ingredient.ingredient.name}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Selecciona el tamaño</Text>
      <View style={styles.sizeContainer}>
        {pizza?.predefinedPizzas.map(size => (
          <TouchableOpacity
            key={size.size.name}
            onPress={() => {
              setSelectedSize(size.size.name)
              setSelectedPrice(size.price)
            }}
            style={[
              styles.sizeButton,
              selectedSize === size.size.name && styles.selectedSizeButton
            ]}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === size.size.name && styles.selectedSizeButtonText
              ]}
            >
              {size.size.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Precio:</Text>
        <Text style={styles.priceValue}>
          {selectedPrice !== null ? `$${selectedPrice.toFixed(2)}` : 'N/A'}
        </Text>
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: screenWidth * 0.05,
    backgroundColor: '#1E1E1E'
  },
  imageWrapper: {
    position: 'relative'
  },
  title: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: screenHeight * 0.01,
    marginTop: screenHeight * 0.01
  },
  imageContainer: { alignItems: 'center', marginBottom: screenHeight * 0.03 },
  image: {
    width: '100%',
    height: screenHeight * 0.35,
    borderRadius: 10
  },
  heartIcon: {
    position: 'absolute',
    top: screenHeight * 0.01,
    right: screenWidth * 0.03,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: screenHeight * 0.005
  },
  heartEmpty: {
    fontSize: screenWidth * 0.07,
    color: '#000'
  },
  heartFilled: {
    fontSize: screenWidth * 0.07,
    color: '#FF0000'
  },
  sectionTitle: {
    fontSize: screenWidth * 0.02,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: screenHeight * 0.01,
    marginTop: screenHeight * 0.01
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: screenHeight * 0.02
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
    backgroundColor: '#333',
    alignItems: 'center',
    borderRadius: 10
  },
  selectedSizeButton: { backgroundColor: '#EB6334' },
  sizeButtonText: { fontSize: screenWidth * 0.02, color: '#fff' },
  selectedSizeButtonText: { fontWeight: 'bold', color: '#000' },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02
  },
  priceLabel: {
    fontSize: screenWidth * 0.02,
    color: '#fff',
    fontWeight: 'bold'
  },
  priceValue: {
    fontSize: screenWidth * 0.02,
    fontWeight: 'bold',
    color: '#FFC107'
  },
  cartButton: {
    padding: screenHeight * 0.01,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
    borderRadius: 10
  },
  cartButtonText: {
    fontSize: screenWidth * 0.025,
    fontWeight: 'bold',
    color: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },
  loadingText: {
    fontSize: screenWidth * 0.03,
    color: '#FF5722',
    marginTop: screenHeight * 0.01
  },
  heartIcon: {
    position: 'absolute',
    top: screenHeight * 0.02,
    right: screenWidth * 0.05,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: screenHeight * 0.01
  },
  heartEmpty: {
    fontSize: screenWidth * 0.06,
    color: '#000'
  },
  heartFilled: {
    fontSize: screenWidth * 0.06,
    color: '#FF0000'
  }
})

// mockPizza
// if (!pizza) {
//   const mockPizza = {
//     id: 1,
//     name: 'Muzzarella',
//     image: 'https://example.com/muzzarella.jpg',
//     description:
//       'La clásica de siempre: salsa de tomate, abundante muzzarella derretida y un toque de orégano.',
//     pizzaIngredients: [
//       { id: 1, name: 'Salsa de tomate', extraCost: 0.5 },
//       { id: 2, name: 'Mozzarella', extraCost: 1.5 }
//     ],
//     price: 10
//   }

//   return <PizzaDetail pizza={mockPizza} />
// }

//CODIGO FUNCIONAL AL 28 DE ENERO
// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator
// } from 'react-native'
// import { useLocalSearchParams } from 'expo-router'
// import axios from 'axios'
// import BackArrow from '@/components/BackArrow'
// import { useCart } from '@/contexts/CartContext'

// type Pizza = {
//   id: number
//   name: string
//   image: string | null
//   pizzaIngredients: { ingredient: { name: string } }[]
//   predefinedPizzas: { size: { name: string }; price: number }[]
// }

// export default function PizzaDetail () {
//   const { itemId } = useLocalSearchParams<{ itemId: string }>()
//   const [pizza, setPizza] = useState<Pizza | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedSize, setSelectedSize] = useState<string>('')
//   const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     const fetchPizza = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/pizzas/${itemId}`
//         )
//         const fetchedPizza = response.data.pizza

//         setPizza({
//           id: fetchedPizza.id,
//           name: fetchedPizza.name,
//           image: fetchedPizza.image,
//           pizzaIngredients: fetchedPizza.pizzaIngredients,
//           predefinedPizzas: fetchedPizza.predefinedPizzas
//         })

//         // Establecer el precio y tamaño por defecto
//         if (fetchedPizza.predefinedPizzas.length > 0) {
//           setSelectedSize(fetchedPizza.predefinedPizzas[0].size.name)
//           setSelectedPrice(fetchedPizza.predefinedPizzas[0].price)
//         }
//       } catch (error) {
//         console.error('Error al cargar los detalles de la pizza:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (itemId) fetchPizza()
//   }, [itemId])

//   const handleAddToCart = () => {
//     if (!pizza || !selectedPrice) {
//       console.error('Pizza o precio no definidos.')
//       return
//     }

//     const item = {
//       id: pizza.id,
//       name: `${pizza.name} (${selectedSize})`,
//       image: pizza.image, // Incluye la imagen
//       size: selectedSize, // Tamaño seleccionado
//       price: selectedPrice,
//       quantity: 1
//     }

//     addToCart(item)
//     console.log('Pizza agregada al carrito:', item)
//   }

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size='large' color='#FF5722' />
//         <Text style={styles.loadingText}>Cargando detalle...</Text>
//       </View>
//     )
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <BackArrow />
//       <Text style={styles.title}>{pizza?.name || 'Nombre no disponible'}</Text>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{
//             uri:
//               pizza?.image ||
//               'https://www.clarin.com/2022/10/05/utIOlIIyB_2000x1500__1.jpg'
//           }}
//           style={styles.image}
//         />
//       </View>
//       <Text style={styles.sectionTitle}>Selecciona el tamaño</Text>
//       <View style={styles.sizeContainer}>
//         {pizza?.predefinedPizzas.map(size => (
//           <TouchableOpacity
//             key={size.size.name}
//             onPress={() => {
//               setSelectedSize(size.size.name)
//               setSelectedPrice(size.price)
//             }}
//             style={[
//               styles.sizeButton,
//               selectedSize === size.size.name && styles.selectedSizeButton
//             ]}
//           >
//             <Text
//               style={[
//                 styles.sizeButtonText,
//                 selectedSize === size.size.name && styles.selectedSizeButtonText
//               ]}
//             >
//               {size.size.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.priceContainer}>
//         <Text style={styles.priceLabel}>Precio:</Text>
//         <Text style={styles.priceValue}>
//           {selectedPrice !== null ? `$${selectedPrice.toFixed(2)}` : 'N/A'}
//         </Text>
//       </View>
//       <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
//         <Text style={styles.cartButtonText}>Añadir al carrito</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: '#1E1E1E' },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 20
//   },
//   imageContainer: { alignItems: 'center', marginBottom: 20 },
//   image: { width: '100%', height: 250, borderRadius: 10 },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10
//   },
//   sizeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20
//   },
//   sizeButton: {
//     flex: 1,
//     marginHorizontal: 5,
//     paddingVertical: 10,
//     backgroundColor: '#333',
//     alignItems: 'center'
//   },
//   selectedSizeButton: { backgroundColor: '#FFC107' },
//   sizeButtonText: { fontSize: 16, color: '#fff' },
//   selectedSizeButtonText: { fontWeight: 'bold', color: '#000' },
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   priceLabel: { fontSize: 18, color: '#fff' },
//   priceValue: { fontSize: 18, fontWeight: 'bold', color: '#FFC107' },
//   cartButton: {
//     padding: 15,
//     backgroundColor: '#FF5722',
//     alignItems: 'center',
//     marginTop: 20,
//     borderRadius: 10
//   },
//   cartButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1E1E1E'
//   },
//   loadingText: { fontSize: 16, color: '#FF5722', marginTop: 10 }
// })

// mockPizza
// if (!pizza) {
//   const mockPizza = {
//     id: 1,
//     name: 'Muzzarella',
//     image: 'https://example.com/muzzarella.jpg',
//     description: 'La clásica de siempre: salsa de tomate, abundante muzzarella derretida y un toque de orégano.',
//     pizzaIngredients: [
//       { id: 1, name: 'Salsa de tomate', extraCost: 0.5 },
//       { id: 2, name: 'Mozzarella', extraCost: 1.5 },
//     ],
//     price: 10,
//   };

//   return <PizzaDetail pizza={mockPizza} />;
// }
