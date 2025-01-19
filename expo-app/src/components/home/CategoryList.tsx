import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router' // Cambiar a useRouter para Expo Router
import { Colors } from '@/constants/Colors'

const categories = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    image: require('../../../assets/images/categories/pizzas.png')
  },
  {
    id: 'drinks',
    title: 'Bebidas',
    image: require('../../../assets/images/categories/drinks.png')
  },
  {
    id: 'promotions',
    title: 'Promociones',
    image: require('../../../assets/images/categories/promotions.png')
  }
]

export default function CategoryList () {
  const router = useRouter() // Usa el enrutador de Expo Router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.categoryList}>
        {categories.map(category => (
          <Pressable
            key={category.id}
            style={styles.categoryItem}
            onPress={() => router.push(category.id)} // Navega a la ruta correspondiente
          >
            <Image source={category.image} style={styles.image} />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 50
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center'
  }
})
