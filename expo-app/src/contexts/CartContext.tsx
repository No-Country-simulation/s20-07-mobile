import React, { createContext, useContext, useState, ReactNode } from 'react'

type CartItem = {
  id: number
  name: string
  image: string | null
  size: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  totalItems: number
  addToCart: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      )
      if (existingItem) {
        console.log('El artículo ya está en el carrito con este tamaño.')
        return prevCart // No agrega duplicados con el mismo tamaño
      }
      return [...prevCart, item] // Agrega un nuevo artículo con tamaño único
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
      value={{
        cart,
        totalItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}
