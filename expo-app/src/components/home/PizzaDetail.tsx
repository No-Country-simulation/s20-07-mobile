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
import { useLocalSearchParams, useRouter } from 'expo-router' // Importar useRouter
import axios from 'axios'
import { useCart } from '@/contexts/CartContext'
import BackArrow from '../BackArrow'

type Pizza = {
  id: number
  name: string
  image: string | null
  description: string | null
  pizzaIngredients: { ingredient: { name: string } }[]
  predefinedPizzas: { size: { name: string }; price: number }[]
}

export default function PizzaDetail () {
  const { itemId } = useLocalSearchParams<{ itemId: string }>()
  const [pizza, setPizza] = useState<Pizza | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>('Pequeña')
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const { addToCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pizzas/${itemId}`
        )
        setPizza(response.data.pizza)
      } catch (error) {
        console.error('Error al cargar los detalles de la pizza:', error)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchPizza()
  }, [itemId])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    if (!pizza || !selectedPrice) return

    const item = {
      id: pizza.id,
      name: `${pizza.name}, Tamaño: ${selectedSize}`,
      price: selectedPrice,
      quantity: 1
    }

    addToCart(item)
  }

  //   console.log('Ítem enviado al carrito:', item) // LOG PARA DEBUG

  //   addToCart(item)
  // }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    )
  }

  if (!pizza) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la pizza.</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackArrow />
      <Text style={styles.title}>{pizza.name}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pizza.image || 'https://via.placeholder.com/250' }}
          style={styles.image}
        />
      </View>
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>
        {pizza.description || 'Descripción no disponible'}
      </Text>
      <Text style={styles.sectionTitle}>Selecciona el tamaño de tu pizza</Text>
      <View style={styles.sizeContainer}>
        {['Pequeña', 'Mediana', 'Grande'].map(size => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeSelect(size)}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton
            ]}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === size && styles.selectedSizeButtonText
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: screenWidth * 0.07,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.02
  },
  image: {
    width: '100%',
    height: screenHeight * 0.3,
    borderRadius: screenWidth * 0.03
  },
  sectionTitle: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: screenHeight * 0.01
  },
  description: {
    fontSize: screenWidth * 0.045,
    color: '#CCC',
    marginBottom: screenHeight * 0.02
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: screenHeight * 0.03
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.015,
    borderRadius: screenWidth * 0.03,
    backgroundColor: '#333',
    alignItems: 'center'
  },
  selectedSizeButton: {
    backgroundColor: '#FFC107'
  },
  sizeButtonText: {
    fontSize: screenWidth * 0.45,
    color: '#FFF'
  },
  selectedSizeButtonText: {
    fontWeight: 'bold',
    color: '#000'
  },
  cartButton: {
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.03,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    marginTop: screenHeight * 0.02
  },
  cartButtonText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: '#FFF'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },
  loadingText: {
    fontSize: screenWidth * 0.04,
    color: '#FF5722',
    marginTop: screenHeight * 0.01
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },
  errorText: {
    fontSize: screenWidth * 0.045,
    color: 'red'
  }
})
