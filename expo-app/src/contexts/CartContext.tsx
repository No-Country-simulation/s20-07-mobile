import React, { createContext, useContext, useState, ReactNode } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}
