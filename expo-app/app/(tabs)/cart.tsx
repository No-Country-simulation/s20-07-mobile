import React from 'react'
import { useCart } from '@/contexts/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  )
}

export default Cart
