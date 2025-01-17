import React from 'react'
import { View, Text, Button } from 'react-native'
import { useCart } from '../contexts/CartContext'

export default function CartView () {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
  console.log(cart) // Log para verificar el contenido del carrito

  return (
    <View>
      <Text>Carrito de Compras:</Text>
      {cart.map(item => (
        <View key={item.id}>
          <Text>
            {item.name} - {item.quantity} x ${item.price}
          </Text>
          <Button title='Eliminar' onPress={() => removeFromCart(item.id)} />
          <Button
            title='Agregar Cantidad'
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          />
        </View>
      ))}
      <Button
        title='Agregar Producto'
        onPress={() =>
          addToCart({
            id: '1',
            name: 'Pizza Margarita',
            price: 10,
            quantity: 1
          })
        }
      />
    </View>
  )
}
