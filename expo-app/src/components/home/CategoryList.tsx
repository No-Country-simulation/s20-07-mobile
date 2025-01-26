import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import PizzasItem from './PizzasItem'
import DrinkItem from './DrinkItem'

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
          <PizzasItem
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image}
            onPress={handlePress}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginTop: 30
  },
  scrollContent: {
    paddingBottom: 10
  }
})
