import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
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
  },
  {
    id: 'desserts',
    title: 'Postres',
    image: require('../../../assets/images/categories/dessert.png')
  }
]

export default function CategoryList () {
  const router = useRouter()
  const { width } = useWindowDimensions() // Obtener el ancho de la pantalla
  const isMobile = width < 500

  const handlePress = (categoryId: string) => {
    router.push(`/${categoryId}`)
  }

  return (
    <View style={styles.container}>
      {/* Título fijo */}
      <Text style={styles.title}>Categorías</Text>

      {/* Scroll para las imágenes */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
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
      </ScrollView>
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
    //position: 'absolute',
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginTop: 80
  },
  scrollContent: {
    paddingBottom: 20 // Espacio adicional para evitar colisiones
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  categoryListDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryListMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryItem: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    width: '45%'
  },
  image: {
    width: 140,
    height: 140,
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
