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
  totalItems: number
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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// import React, { createContext, useState, ReactNode, useContext } from 'react'

// // Tipo para un producto en el carrito
// type CartItem = {
//   id: string // Identificador único del producto
//   name: string // Nombre del producto
//   price: number // Precio del producto
//   quantity: number // Cantidad del producto
//   image: string // URL de la imagen del producto
//   description?: string // Descripción del producto (opcional)
// }

// // Tipo para el contexto
// type CartContextType = {
//   cart: CartItem[] // Lista de productos en el carrito
//   addToCart: (item: CartItem) => void // Agregar un producto al carrito
//   removeFromCart: (id: string) => void // Eliminar un producto del carrito
//   updateQuantity: (id: string, quantity: number) => void // Actualizar la cantidad de un producto
// }

// // Crear el contexto
// const CartContext = createContext<CartContextType | undefined>(undefined)

// // Proveedor del contexto
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([])

//   // Función para agregar un producto al carrito
//   const addToCart = (item: CartItem) => {
//     console.log('Agregando al carrito:', item)
//     setCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
//       if (existingItem) {
//         return prevCart.map(cartItem =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
//             : cartItem
//         )
//       }
//       return [...prevCart, item]
//     })
//   }

//   // Función para eliminar un producto del carrito
//   // Modifica esta función en CartContext
//   const removeFromCart = (id: string | 'all') => {
//     if (id === 'all') {
//       // En lugar de vaciar el carrito, establece las cantidades en 0
//       setCart(prevCart =>
//         prevCart.map(item => ({
//           ...item,
//           quantity: 0 // Restablece la cantidad a 0
//         }))
//       )
//     } else {
//       setCart(prevCart => prevCart.filter(item => item.id !== id))
//     }
//   }

//   // Función para actualizar la cantidad de un producto
//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return // Prevenir cantidades menores a 1
//     setCart(prevCart =>
//       prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
//     )
//   }

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// // Hook para usar el contexto
// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart debe usarse dentro de un CartProvider')
//   }
//   return context
// }
