import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'

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
      <Text style={styles.title}>{drink.name}</Text>
      <Image source={{ uri: drink.image }} style={styles.image} />
      <Text style={styles.content}>{drink.content}</Text>
      <Text style={styles.price}>${drink.price}</Text>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => console.log(`Añadido al carrito: ${drink.name}`)}
      >
        <Text style={styles.cartButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20
  },
  content: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 20
  },
  cartButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    alignItems: 'center'
  },
  cartButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF5722'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  }
})

// 🛒
