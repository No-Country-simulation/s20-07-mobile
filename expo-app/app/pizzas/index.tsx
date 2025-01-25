import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'
import { useRouter } from 'expo-router'
import BackArrow from '@/components/BackArrow'

export default function Pizzas () {
  const router = useRouter()
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [loading, setLoading] = useState(true)

  // Función para cargar los datos de las pizzas
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get<Pizza[]>(
          'http://localhost:3000/api/pizzas'
        )
        setPizzas(response.data)
      } catch (error) {
        console.error('Error al cargar las pizzas:', error)
      }
    }

    fetchPizzas()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  if (!pizzas.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la pizza.</Text>
      </View>
    )
  }

  const handlePress = (pizzaId: string) => {
    console.log('Navegando al detalle de la pizza:', pizzaId)
    router.push(`/detail-itemId/${pizzaId}`)
  }

  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.title}>Nuestras Pizzas</Text>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.id)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.ingredients}>
              Ingredientes:{' '}
              {item.pizzaIngredients
                .map((ing: Ingredient) => ing.name)
                .join(', ')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    marginTop: 100
  },
  item: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  ingredients: {
    fontSize: 14,
    color: '#666'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 16,
    color: 'red'
  }
})
