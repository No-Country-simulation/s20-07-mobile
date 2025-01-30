import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import PizzasItem from './PizzasItem'

const categories = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    image: require('../../../assets/images/categories/pizzas2.png')
  },
  {
    id: 'drinks',
    title: 'Bebidas',
    image: require('../../../assets/images/categories/drinks3.png')
  },
  {
    id: 'promotions',
    title: 'Promociones',
    image: require('../../../assets/images/categories/promotions4.png')
  }
  // {
  //   id: 'desserts',
  //   title: 'Postres',
  //   image: require('../../../assets/images/categories/dessert4.png')
  // }
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
        showsHorizontalScrollIndicator={false} // Oculta el indicador de scroll
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
    paddingHorizontal: screenWidth * 0.025,
    paddingBottom: screenHeight * 0.02,
    backgroundColor: '#111'
  },
  title: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginVertical: screenHeight * 0.03
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.02,
    justifyContent: 'space-around'
  }
})
