import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { useCart } from '@/contexts/CartContext'

type Drink = {
  id: number
  name: string
  content: string
  price: number
  image: string
}

export default function DrinksDetail () {
  const router = useRouter()
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get<Drink[]>(
          'http://localhost:3000/api/drinks'
        )
        setDrinks(response.data)
      } catch (error) {
        console.error('Error al cargar las bebidas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDrinks()
  }, [])

  const handleAddToCart = (drink: Drink) => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      quantity: 1
    })

    console.log(`Añadido al carrito: ${drink.name}`)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando bebidas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drinks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode='contain'
              />
              <View style={styles.textContainer}>
                <View style={styles.namePriceContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleAddToCart(item)} // Pasa el objeto completo
            >
              <Text style={styles.cartButtonText}>Agregar al carrito 🛒</Text>
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
    backgroundColor: '#111',
    padding: screenWidth * 0.04
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: screenWidth * 0.04,
    color: '#FF5722',
    marginTop: screenHeight * 0.01
  },
  item: {
    backgroundColor: '#222',
    borderRadius: screenWidth * 0.025,
    marginBottom: screenHeight * 0.015,
    padding: screenWidth * 0.04
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: screenWidth * 0.03,
    marginRight: screenWidth * 0.03
  },
  textContainer: {
    flex: 1
  },
  namePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.005
  },
  name: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  price: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'right'
  },
  content: {
    fontSize: screenWidth * 0.04,
    color: '#ccc'
  },
  cartButton: {
    marginTop: screenHeight * 0.02,
    backgroundColor: '#FF5722',
    borderRadius: screenWidth * 0.025,
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015
  },
  cartButtonText: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#fff'
  }
})
