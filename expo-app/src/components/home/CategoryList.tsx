import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
  Animated
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
  const isMobile = width < 600

  const handlePress = (categoryId: string) => {
    router.push(`/${categoryId}`)
  }

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
          <CategoryItem
            key={category.id}
            category={category}
            onPress={() => handlePress(category.id)}
          />
        ))}
      </View>
    </View>
  )
}

const CategoryItem = ({ category, onPress }: any) => {
  const [scale] = useState(new Animated.Value(1)) // Animación de escala

  const handleMouseEnter = () => {
    Animated.spring(scale, {
      toValue: 1.1, // Aumentar el tamaño en hover
      useNativeDriver: true
    }).start()
  }

  const handleMouseLeave = () => {
    Animated.spring(scale, {
      toValue: 1, // Volver al tamaño original
      useNativeDriver: true
    }).start()
  }

  return (
    <Pressable
      onPress={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.categoryItem}
    >
      <Animated.Image
        source={category.image}
        style={[styles.image, { transform: [{ scale }] }]}
      />
      <Text style={styles.categoryTitle}>{category.title}</Text>
    </Pressable>
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
    justifyContent: 'space-between'
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
