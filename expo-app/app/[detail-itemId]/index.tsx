import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import axios from 'axios'

type Pizza = {
  id: string
  name: string
  image: string
  ingredients: string[]
}

export default function PizzaDetail () {
  const router = useRouter()
  const { itemId } = router.query // Captura el parámetro dinámico
  const [pizza, setPizza] = useState<Pizza | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pizzas/${itemId}`
        )
        setPizza(response.data)
      } catch (error) {
        console.error('Error al cargar los datos de la pizza:', error)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchPizza()
  }, [itemId])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando...</Text>
      </View>
    )
  }

  if (!pizza) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se encontró la pizza.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pizza.image }} style={styles.image} />
      <Text style={styles.title}>{pizza.name}</Text>
      <Text style={styles.ingredients}>
        Ingredientes: {pizza.ingredients.join(', ')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  text: { fontSize: 18 },
  image: { width: 200, height: 200, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  ingredients: { fontSize: 16, textAlign: 'center' }
})
