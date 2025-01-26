import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import { useRouter } from 'expo-router'
import axios from 'axios'

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando bebidas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
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
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#222',
    borderRadius: 8
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10
  },
  textContainer: {
    flex: 1
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
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107'
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
