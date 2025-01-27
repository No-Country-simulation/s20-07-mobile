import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface SearchContextType {
  results: { id: number; name: string; type: string }[] // Incluye el tipo (pizza o drink)
  search: (query: string) => Promise<void>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<
    { id: number; name: string; type: string }[]
  >([])

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const search = async (query: string) => {
    try {
      if (!query.trim()) {
        setResults([]) // Limpia los resultados si no hay texto
        return
      }

      // Llama a la API para obtener pizzas y bebidas
      const [pizzasResponse, drinksResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/pizzas'),
        axios.get('http://localhost:3000/api/drinks')
      ])

      const pizzas = pizzasResponse.data.pizzas || []
      const drinks = drinksResponse.data.drinks || []

      // Filtra resultados y normaliza el texto
      const filteredPizzas = pizzas.filter((pizza: any) =>
        removeAccents(pizza.name.toLowerCase()).includes(
          removeAccents(query.toLowerCase())
        )
      )
      const filteredDrinks = drinks.filter((drink: any) =>
        removeAccents(drink.name.toLowerCase()).includes(
          removeAccents(query.toLowerCase())
        )
      )

      // Combina resultados con el tipo correspondiente
      setResults([
        ...filteredPizzas.map((pizza: any) => ({
          id: pizza.id,
          name: pizza.name,
          type: 'pizza'
        })),
        ...filteredDrinks.map((drink: any) => ({
          id: drink.id,
          name: drink.name,
          type: 'drink'
        }))
      ])
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error)
      setResults([])
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
