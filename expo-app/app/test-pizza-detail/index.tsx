import React from 'react'
import PizzaDetail from '@/components/home/PizzaDetail' // Asegúrate de la ruta correcta al componente

const mockPizza = {
  id: '1',
  name: 'Muzzarella',
  image: 'https://example.com/muzzarella.jpg',
  description:
    'La clásica de siempre: salsa de tomate, abundante muzzarella derretida y un toque de orégano.',
  ingredients: ['Tomate', 'Muzzarella', 'Orégano'],
  price: 10
}

export default function TestPizzaDetail () {
  return <PizzaDetail pizza={mockPizza} />
}
