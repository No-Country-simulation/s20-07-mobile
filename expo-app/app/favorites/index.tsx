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

export default function FavoritesScreen () {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {/* 🔹 Imagen de la pizza */}
              <Image source={{ uri: item.image }} style={styles.image} />

              {/* 🔹 Botón del corazón para eliminar de favoritos */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => removeFavorite(item.id)}
              >
                <Text style={styles.heartFilled}>❤️</Text>
              </TouchableOpacity>

              {/* 🔹 Nombre de la pizza */}
              <Text style={styles.pizzaName}>{item.name}</Text>
            </View>
          )}
        />
      )}
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
    marginBottom: 10,
    textAlign: 'center'
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  item: {
    width: '48%',
    margin: '1%',
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5
  },
  heartFilled: {
    fontSize: 20,
    color: 'red'
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center'
  }
})
