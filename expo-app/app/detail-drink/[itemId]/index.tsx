import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import BackArrow from '@/components/BackArrow'
import Header from '@/components/home/Header'
import { useNavigation } from 'expo-router'
import { useCart } from '@/contexts/CartContext' // Importa el contexto del carrito

type Drink = {
  id: number
  name: string
  content: string
  price: number
  image: string
}

export default function DrinkDetail () {
  const { itemId } = useLocalSearchParams<{ itemId: string }>()
  const [drink, setDrink] = useState<Drink | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/drinks/${itemId}`
        )
        setDrink(response.data.drink)
      } catch (error) {
        console.error('Error al cargar los detalles de la bebida:', error)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchDrink()
  }, [itemId])

  const handleAddToCart = () => {
    if (!drink) return

    const item = {
      id: `drink-${drink.id}`, // ID único para bebidas
      name: drink.name,
      image: drink.image,
      size: 'Bebida', // Para diferenciarlo en el carrito
      price: drink.price,
      quantity: 1
    }

    addToCart(item)
    console.log('🛒 Bebida agregada al carrito:', item)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    )
  }

  if (!drink) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la bebida.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackArrow />

      <Header />
      <Text style={styles.title}>{drink.name}</Text>
      <Image source={{ uri: drink.image }} style={styles.image} />
      <Text style={styles.content}>{drink.content}</Text>
      <Text style={styles.price}>${drink.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * 0.05,
    backgroundColor: '#111'
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: screenHeight * 0.03
  },
  image: {
    width: '100%',
    height: screenHeight * 0.35,
    borderRadius: 10,
    marginBottom: screenHeight * 0.03
  },
  content: {
    fontSize: screenWidth * 0.045,
    color: '#ccc',
    marginBottom: screenHeight * 0.015
  },
  price: {
    fontSize: screenWidth * 0.055,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: screenHeight * 0.025
  },
  cartButton: {
    width: '100%',
    padding: screenHeight * 0.02,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    alignItems: 'center'
  },
  cartButtonText: {
    fontSize: screenWidth * 0.045,
    color: '#fff',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: screenHeight * 0.01,
    fontSize: screenWidth * 0.04,
    color: '#FF5722'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: screenWidth * 0.045,
    color: 'red'
  }
})

// 🛒
