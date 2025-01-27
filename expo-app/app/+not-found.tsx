import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemedText } from '../src/components/ThemedText'
import { ThemedView } from '../src/components/ThemedView'

export default function NotFoundScreen () {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type='title'>This screen doesn't exist.</ThemedText>
        <Link href='/' style={styles.link}>
          <ThemedText type='link'>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
})

//categories/[categoryId]/index.tsx
//lo que funcoina en pizzas

// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity
// } from 'react-native'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import axios from 'axios'

// // Define el tipo de una pizza
// type Pizza = {
//   id: number
//   name: string
//   pizzaIngredients: { ingredient: { name: string } }[]
// }

// export default function CategoryItemsPage () {
//   const { categoryId } = useLocalSearchParams()
//   const [pizzas, setPizzas] = useState<Pizza[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchPizzas = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/${categoryId}`
//         )
//         console.log('Datos recibidos de la API:', response.data.pizzas)
//         setPizzas(response.data.pizzas)
//       } catch (error) {
//         console.error('Error al cargar las pizzas:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (categoryId) fetchPizzas()
//   }, [categoryId])

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Cargando pizzas...</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nuestras Pizzas</Text>
//       <FlatList
//         data={pizzas}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.item}
//             onPress={() => {
//               console.log('Navigating to:', `/detail/${item.id}`)
//               router.push(`/detail/${item.id}`)
//             }}
//           >
//             <Text style={styles.itemTitle}>{item.name}</Text>
//             <Text style={styles.itemSubtitle}>
//               {item.pizzaIngredients
//                 .map(ing => ing.ingredient?.name || 'Ingrediente desconocido')
//                 .join(', ')}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#111'
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20
//   },
//   item: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#222',
//     borderRadius: 8
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   itemSubtitle: {
//     fontSize: 14,
//     color: '#ccc'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 16
//   }
// })

// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity
// } from 'react-native'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import axios from 'axios'

// // Define el tipo de una pizza
// type Pizza = {
//   id: number
//   name: string
//   pizzaIngredients: { ingredient: { name: string } }[]
// }

// export default function CategoryItemsPage () {
//   const { categoryId } = useLocalSearchParams()
//   const [pizzas, setPizzas] = useState<Pizza[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchPizzas = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/${categoryId}`
//         )
//         console.log('Datos recibidos de la API:', response.data.pizzas)
//         setPizzas(response.data.pizzas)
//       } catch (error) {
//         console.error('Error al cargar las pizzas:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (categoryId) fetchPizzas()
//   }, [categoryId])

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Cargando pizzas...</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nuestras Pizzas</Text>
//       <FlatList
//         data={pizzas}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.item}
//             onPress={() => {
//               console.log('Navigating to:', `/detail/${item.id}`)
//               router.push(`/detail/${item.id}`)
//             }}
//           >
//             <Text style={styles.itemTitle}>{item.name}</Text>
//             <Text style={styles.itemSubtitle}>
//               {item.pizzaIngredients
//                 .map(ing => ing.ingredient?.name || 'Ingrediente desconocido')
//                 .join(', ')}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#111'
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20
//   },
//   item: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#222',
//     borderRadius: 8
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   itemSubtitle: {
//     fontSize: 14,
//     color: '#ccc'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 16
//   }
// })

//--------------- CON DRINKS

// import React, { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator
// } from 'react-native'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import axios from 'axios'

// // Define el tipo de datos de cada categoría
// type Item = {
//   id: number
//   name: string
//   content?: string // Para bebidas
//   price?: number // Para bebidas
//   image?: string // Común para ambos
//   pizzaIngredients?: { ingredient: { name: string } }[] // Solo para pizzas
// }

// export default function CategoryItemsPage () {
//   const { categoryId } = useLocalSearchParams()
//   const [items, setItems] = useState<Item[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         let endpoint = ''
//         if (categoryId === 'pizzas') {
//           endpoint = 'http://localhost:3000/api/pizzas'
//         } else if (categoryId === 'drinks') {
//           endpoint = 'http://localhost:3000/api/drinks'
//         } else {
//           console.error('Categoría no reconocida:', categoryId)
//           return
//         }

//         const response = await axios.get(endpoint)
//         setItems(response.data[categoryId] || [])
//       } catch (error) {
//         console.error(`Error al cargar los datos de ${categoryId}:`, error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (categoryId) fetchItems()
//   }, [categoryId])

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size='large' color='#FF5722' />
//         <Text style={styles.loadingText}>Cargando {categoryId}...</Text>
//       </View>
//     )
//   }

//   if (!items.length) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>No se encontraron {categoryId}.</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Nuestras {categoryId === 'pizzas' ? 'Pizzas' : 'Bebidas'}
//       </Text>
//       <FlatList
//         data={items}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.item}
//             onPress={() => {
//               if (categoryId === 'pizzas') {
//                 router.push(`/detail/${item.id}`)
//               } else if (categoryId === 'drinks') {
//                 router.push(`/detail-drink/${item.id}`)
//               }
//             }}
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <View style={styles.textContainer}>
//               <Text style={styles.name}>{item.name}</Text>
//               {categoryId === 'drinks' && (
//                 <>
//                   <Text style={styles.content}>{item.content}</Text>
//                   <Text style={styles.price}>${item.price}</Text>
//                 </>
//               )}
//               {categoryId === 'pizzas' && (
//                 <Text style={styles.ingredients}>
//                   {item.pizzaIngredients
//                     ?.map(ing => ing.ingredient.name)
//                     .join(', ') || 'Ingredientes no disponibles'}
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#111'
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20
//   },
//   item: {
//     flexDirection: 'row',
//     backgroundColor: '#222',
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 10,
//     alignItems: 'center'
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10
//   },
//   textContainer: {
//     flex: 1
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   content: {
//     fontSize: 14,
//     color: '#ccc'
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFC107'
//   },
//   ingredients: {
//     fontSize: 14,
//     color: '#ccc'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#FF5722'
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#fff'
//   }
// })
