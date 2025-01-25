// TestPizzaDetail.tsx
import React from 'react'
import { View, StyleSheet } from 'react-native'
import PizzaDetail from '@/components/PizzaDetail' // Ajusta la ruta según tu estructura

const TestPizzaDetail = () => {
  const mockPizza = {
    id: '1',
    name: 'Muzzarella',
    image: 'https://example.com/muzzarella.jpg',
    description:
      'La clásica de siempre: salsa de tomate, abundante muzzarella derretida y un toque de orégano.',
    ingredients: ['Tomate', 'Muzzarella', 'Orégano'],
    price: 10
  }

  return (
    <View style={styles.container}>
      <PizzaDetail pizza={mockPizza} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TestPizzaDetail
