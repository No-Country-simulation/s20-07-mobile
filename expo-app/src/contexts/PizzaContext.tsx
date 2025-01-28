import React, { createContext, useContext, useEffect, useState } from 'react'

interface Pizza {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface PizzaContextProps {
  pizzas: Pizza[]
  featuredPizzas: Pizza[]
  loading: boolean
  error: string | null
}

const PizzaContext = createContext<PizzaContextProps | undefined>(undefined)

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [featuredPizzas, setFeaturedPizzas] = useState<Pizza[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pizzas')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPizzas(data)
        setFeaturedPizzas(data.filter((pizza: Pizza) => pizza.id < 5))
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPizzas()
  }, [])

  return (
    <PizzaContext.Provider value={{ pizzas, featuredPizzas, loading, error }}>
      {children}
    </PizzaContext.Provider>
  )
}

export const usePizza = () => {
  const context = useContext(PizzaContext)

  if (!context) {
    throw new Error('usePizza must be used within a PizzaProvider')
  }

  return context
}

export default PizzaContext
