import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  updateQuantity: (id: number, size: string, quantity: number) => void
  removeFromCart: (id: number, size: string) => void
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart')
        if (storedCart) {
          setCart(JSON.parse(storedCart))
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error)
      }
    }
    loadCart()
  }, [])

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error al guardar el carrito:', error)
      }
    }
    saveCart()
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      )

      if (existingItemIndex !== -1) {
        // Si el ítem ya existe, sumamos la cantidad en lugar de bloquearlo
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        console.log(`🔄 Aumentando cantidad de ${item.name}:`, updatedCart)
        return updatedCart
      }

      console.log('✅ Nuevo item agregado:', item)
      return [...prevCart, item]
    })
  }

  const updateQuantity = (id: number, size: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const removeFromCart = (id: number, size: string) => {
    setCart(prev =>
      prev.filter(item => !(item.id === id && item.size === size))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems, // Cambia `cart.length` por `totalItems`
        addToCart,
        updateQuantity,
        removeFromCart,
        setCart,
        clearCart
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

//CODIGO FUNCIONAL AL 28 DE ENERO
// import React, { createContext, useContext, useState, ReactNode } from 'react'

// type CartItem = {
//   id: number
//   name: string
//   image: string | null
//   size: string
//   price: number
//   quantity: number
// }

// type CartContextType = {
//   cart: CartItem[]
//   totalItems: number
//   addToCart: (item: CartItem) => void
//   updateQuantity: (id: number, quantity: number) => void
//   removeFromCart: (id: number) => void
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([])

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

//   const addToCart = (item: CartItem) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(
//         cartItem => cartItem.id === item.id && cartItem.size === item.size
//       )
//       if (existingItem) {
//         console.log('El artículo ya está en el carrito con este tamaño.')
//         return prevCart // No agrega duplicados con el mismo tamaño
//       }
//       return [...prevCart, item] // Agrega un nuevo artículo con tamaño único
//     })
//   }

//   const updateQuantity = (id: number, quantity: number) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     )
//   }

//   const removeFromCart = (id: number) => {
//     setCart(prev => prev.filter(item => item.id !== id))
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         totalItems,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         setCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart debe usarse dentro de un CartProvider')
//   }
//   return context
// }
