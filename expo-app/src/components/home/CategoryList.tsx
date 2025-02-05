import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { screenWidth, screenHeight } from '@/utils/dimensions';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import PizzasItem from './PizzasItem';

const categories = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    image: require('../../../assets/images/categories/pizzas-clasicas.svg')
  },
  {
    id: 'drinks',
    title: 'Bebidas',
    image: require('../../../assets/images/categories/drinks4.svg')
  },
  {
    id: 'promotions',
    title: 'Promociones',
    image: require('../../../assets/images/categories/promotions4.png')
  }
];

export default function CategoryList() {
  const router = useRouter();

  const categoryRoutes: Record<
    string,
    '/categories/pizzas' | '/categories/drinks' | '/promotions'
  > = {
    pizzas: '/categories/pizzas',
    drinks: '/categories/drinks',
    promotions: '/promotions'
  };

  const handlePress = (categoryId: string) => {
    const path = categoryRoutes[categoryId];
    if (path) {
      router.push(path);
    } else {
      console.error('Categoría inválida:', categoryId);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('pizza')}>
        {/* <Text style={styles.categoryText}>Pizzas</Text> */}
      </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.025,
    paddingBottom: screenHeight * 0.02,
    backgroundColor: '#111',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.02,
    height: screenHeight * 0.02
  },
  categoryButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'left',
    marginVertical: screenHeight * 0.03
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.02,
    justifyContent: 'space-around',
    marginBottom: screenHeight * 0.01
  }
});
