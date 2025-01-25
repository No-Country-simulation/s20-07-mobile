import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'

// Define el tipo de una pizza
type Pizza = {
  id: number
  name: string
  pizzaIngredients: { ingredient: { name: string } }[]
}

export default function CategoryItemsPage () {
  const { categoryId } = useLocalSearchParams() // Captura el parámetro de categoría
  const [pizzas, setPizzas] = useState<Pizza[]>([]) // Declara el tipo del estado
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Para manejar la navegación

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/${categoryId}`
        )
        console.log('Datos recibidos de la API:', response.data.pizzas) // Depura aquí
        setPizzas(response.data.pizzas)
      } catch (error) {
        console.error('Error al cargar las pizzas:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) fetchPizzas()
  }, [categoryId])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando pizzas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestras Pizzas</Text>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('Navigating to:', `/detail/${item.id}`) // Verifica el ID aquí
              router.push(`/detail/${item.id}`) // Navega al detalle
            }}
          >
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>
              {item.pizzaIngredients
                .map(ing => ing.ingredient?.name || 'Ingrediente desconocido')
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
    padding: 20,
    backgroundColor: '#111'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#222',
    borderRadius: 8
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#ccc'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    fontSize: 16
  }
})
