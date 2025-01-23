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

export default function Pizzas () {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)

  // Función para cargar los datos de las pizzas
  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pizzas') // Ajusta la URL según tu API
      setPizzas(response.data.pizzas) // Asegúrate de que el backend devuelva un array en `pizzas`
    } catch (error) {
      console.error('Error al cargar las pizzas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPizzas()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF6347' />
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
          <TouchableOpacity style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.ingredients}>
              Ingredientes:{' '}
              {item.pizzaIngredients.map(ing => ing.name).join(', ')}
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
    color: '#333'
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
  }
})
