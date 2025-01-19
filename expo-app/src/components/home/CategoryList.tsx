import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions
} from 'react-native'
import { useRouter } from 'expo-router'
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
  const router = useRouter()
  const { width } = useWindowDimensions() // Obtener el ancho de la pantalla

  const handlePress = (categoryId: string) => {
    router.push(`/${categoryId}`)
  }
  // Cambiar el diseño según el tamaño de la pantalla
  const isMobile = width < 600

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <View
        style={[
          styles.categoryList,
          isMobile ? styles.categoryListMobile : styles.categoryListDesktop
        ]}
      >
        {categories.map(category => (
          <Pressable
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handlePress(category.id)}
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
    marginBottom: 25,
    textAlign: 'left'
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between' //
  },
  categoryListDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryListMobile: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 10,
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
