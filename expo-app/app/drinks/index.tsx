import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'
import BackArrow from '@/components/BackArrow'

type Drink = {
  id: number
  name: string
  content: string
  price: number
  image: string
}

export default function DrinksList () {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/drinks')
        setDrinks(response.data.drinks || [])
      } catch (error) {
        console.error('Error al cargar las bebidas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDrinks()
  }, [])

  const handleAddToCart = (id: number) => {
    console.log(`Bebida con ID ${id} añadida al carrito.`)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando bebidas...</Text>
      </View>
    )
  }

  if (!drinks.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No se encontraron bebidas.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <BackArrow />
      </View>
      <Text style={styles.title}>Nuestras bebidas</Text>
      <FlatList
        data={drinks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.content}>{item.content}</Text>
              </View>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleAddToCart(item.id)}
            >
              <Text style={styles.cartButtonText}>🛒</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  content: {
    fontSize: 14,
    color: '#ccc'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107'
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  cartButtonText: {
    fontSize: 20,
    color: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 16,
    color: '#FF5722'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#fff'
  },
  backArrow: {
    zIndex: 30
  }
})
