import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface SearchContextType {
  results: { id: number; name: string }[] // Solo devolverá ID y nombre
  search: (query: string) => Promise<void>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<{ id: number; name: string }[]>([])

  // Función para eliminar acentos y normalizar texto
  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const search = async (query: string) => {
    try {
      if (!query.trim()) {
        setResults([]) // Si no hay texto, vacía los resultados
        return
      }

      // Llamar a la API con el término de búsqueda
      const response = await axios.get(`http://localhost:3000/api/pizzas`)
      const allPizzas = response.data.pizzas || []

      // Filtrar resultados ignorando acentos
      const filteredResults = allPizzas.filter((pizza: any) =>
        removeAccents(pizza.name.toLowerCase()).includes(
          removeAccents(query.toLowerCase())
        )
      )

      // Guardar los resultados filtrados
      setResults(
        filteredResults.map((pizza: any) => ({
          id: pizza.id,
          name: pizza.name
        }))
      )
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error)
      setResults([]) // Vaciar los resultados en caso de error
    }
  }

  return (
    <SearchContext.Provider value={{ results, search }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider')
  }
  return context
}
