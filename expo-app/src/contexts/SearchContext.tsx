import React, { createContext, useState, useContext, ReactNode } from 'react'
import axios from 'axios'

// Datos harcodeados para pruebas
const mockData = [
  { id: 1, nombre: 'Pizza Margarita', categoria: 'Pizzas' },
  { id: 2, nombre: 'Pizza Pepperoni', categoria: 'Pizzas' },
  { id: 3, nombre: 'Coca Cola', categoria: 'Bebidas' },
  { id: 4, nombre: 'Sprite', categoria: 'Bebidas' },
  { id: 5, nombre: 'Helado de Vainilla', categoria: 'Postres' },
  { id: 6, nombre: 'Brownie', categoria: 'Postres' },
  {
    id: 7,
    nombre: 'Pizza Clasica + Bebida 1.5 ltrs',
    categoria: 'Promociones'
  },
  { id: 8, nombre: 'Pizza Clasica + Postre', categoria: 'Promociones' }
]

// Define la estructura del contexto
// interface SearchContextType {
//   results: any // Cambiar `any` a un tipo más específico si tienes un modelo definido
//   search: (query: string) => Promise<void>
// }

interface SearchContextType {
  results: typeof mockData | null // Cambia `any` a un tipo más específico
  search: (query: string) => Promise<void>
}

// Crea el contexto
const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Proveedor del contexto
export function SearchProvider ({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<typeof mockData | null>(null)

  //   const search = async (query: string) => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/search?query=${query}`
  //       )
  //       console.log('response', response.data.products)
  //       setResults(response.data.products)
  //     } catch (error) {
  //       console.error('Error al realizar la búsqueda:', error)
  //     }
  //   }
  //   console.log('results', results)

  const search = async (query: string) => {
    try {
      if (!query.trim()) {
        setResults([]) // Si la búsqueda está vacía, no muestra nada
        return
      }

      // Filtra los datos harcodeados por coincidencias en el nombre o categoría
      const filteredResults = mockData.filter(
        item =>
          item.nombre.toLowerCase().includes(query.toLowerCase()) ||
          item.categoria.toLowerCase().includes(query.toLowerCase())
      )

      setResults(filteredResults)
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error)
    }
  }

  return (
    <SearchContext.Provider value={{ results, search }}>
      {children}
    </SearchContext.Provider>
  )
}

// Hook personalizado para consumir el contexto
export function useSearch () {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider')
  }
  return context
}
