import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
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
  },
  {
    id: 'desserts',
    title: 'Postres',
    image: require('../../../assets/images/categories/dessert4.png')
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
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#111',
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginVertical: 20
  },
  scrollContent: {
    flexDirection: 'row', // Asegura que los elementos estén en una fila
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  }
})
