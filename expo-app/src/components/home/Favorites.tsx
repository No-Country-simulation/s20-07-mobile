import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useRouter } from 'expo-router'
import { screenHeight, screenWidth } from '@/utils/dimensions'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function Favorites () {
  const { favorites, removeFavorite } = useFavorites()
  const router = useRouter()

  console.log('📌 Favoritos actuales:', favorites)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => router.push(`/detail/${item.id}`)} // 🔹 Ahora sí funciona el click
              ></TouchableOpacity>
              <Image
                source={{
                  uri:
                    item.image ||
                    'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg'
                }}
                style={styles.image}
              />
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
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
    marginTop: screenHeight * 0.02
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15
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
