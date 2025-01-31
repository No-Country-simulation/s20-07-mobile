import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function Favorites () {
  const { favorites, removeFavorite } = useFavorites()

  console.log('📌 Favoritos actuales:', favorites) // 🔹 Verifica si hay datos

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          numColumns={3} // 👉 Muestra en una cuadrícula
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => removeFavorite(item.id)}
              >
                <Text style={styles.heartFilled}>❤️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#111'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  item: {
    width: '30%',
    margin: 5,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 2
  },
  heartFilled: {
    fontSize: 18,
    color: 'red'
  }
})
