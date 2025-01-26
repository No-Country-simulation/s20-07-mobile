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
import { useRouter } from 'expo-router'
import axios from 'axios'

type Drink = {
  id: number
  name: string
  content: string
  price: number
  image: string
}

export default function DrinksList () {
  const router = useRouter()
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleAddToCart = (drinkName: string) => {
    console.log(`Añadido al carrito: ${drinkName}`)
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
              onPress={() => handleAddToCart(item.name)}
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
    padding: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 16,
    color: '#FF5722',
    marginTop: 10
  },
  item: {
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  namePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign: 'right'
  },
  content: {
    fontSize: 14,
    color: '#ccc'
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
})
