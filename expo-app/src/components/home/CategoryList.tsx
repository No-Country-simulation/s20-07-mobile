import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const categories = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    image: require('../../../assets/images/categories/pizzas2.png')
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
  },
  {
    id: 'desserts',
    title: 'Postres',
    image: require('../../../assets/images/categories/dessert.png')
  }
]

export default function CategoryList () {
  const router = useRouter()

  const handlePress = (categoryId: string) => {
    console.log('Navegando a la categoría con ID:', categoryId)
    router.push(`categories/${categoryId}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handlePress(category.id)}
            style={styles.categoryItem}
          >
            <Image source={category.image} style={styles.image} />{' '}
            {/* category.image */}
            <Text style={styles.categoryTitle}>{category.title}</Text>{' '}
            {/* category.title */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingBottom: 10 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginTop: 30
  },
  scrollContent: { paddingBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 15, marginTop: 25 },
  image: { width: 140, height: 140, borderRadius: 10, marginBottom: 5 },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center'
  }
})
