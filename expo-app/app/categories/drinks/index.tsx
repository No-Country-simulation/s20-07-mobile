import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { useCart } from '@/contexts/CartContext' // Importar el contexto del carrito
import BackArrow from '@/components/BackArrow'

type Drink = {
  id: number
  name: string
  content: string
  price: number
  image: string
}

export default function DrinksPage () {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/drinks')
        setDrinks(response.data.drinks)
      } catch (error) {
        console.error('Error al cargar las bebidas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDrinks()
  }, [])

  const handleAddToCart = (drink: Drink) => {
    const item = {
      id: `drink-${drink.id}`, // ID único para bebidas
      name: drink.name,
      image: drink.image,
      size: 'Bebida', // Para diferenciar en el carrito
      price: drink.price,
      quantity: 1
    }

    addToCart(item)
    console.log('🛒 Bebida agregada al carrito:', item)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando bebidas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.title}>Nuestras Bebidas</Text>
      <FlatList
        data={drinks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.content}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * 0.06,
    backgroundColor: '#111'
  },
  title: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: screenHeight * 0.02,
    marginTop: screenHeight * 0.03
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenWidth * 0.02,
    marginBottom: screenHeight * 0.02,
    backgroundColor: '#222',
    borderRadius: screenWidth * 0.02
  },
  image: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.02,
    marginRight: screenWidth * 0.03
  },
  textContainer: {
    flex: 1
  },
  itemTitle: {
    fontSize: screenWidth * 0.02,
    fontWeight: 'bold',
    color: '#fff'
  },
  itemSubtitle: {
    fontSize: screenWidth * 0.02,
    color: '#ccc'
  },
  price: {
    fontSize: screenWidth * 0.02,
    fontWeight: 'bold',
    color: '#FFC107'
  },
  addButton: {
    backgroundColor: '#FF5722',
    padding: screenHeight * 0.015,
    borderRadius: screenWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    fontSize: screenWidth * 0.02,
    color: '#fff',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    fontSize: screenWidth * 0.03
  }
})
