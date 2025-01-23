import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface CategoryContextType {
  categoryData: any[]
  fetchCategoryData: (categoryId: string) => Promise<void>
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryData, setCategoryData] = useState<any[]>([])

  const fetchCategoryData = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/${categoryId}`
      )
      setCategoryData(response.data || [])
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error)
      setCategoryData([])
    }
  }

  return (
    <CategoryContext.Provider value={{ categoryData, fetchCategoryData }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory debe ser usado dentro de un CategoryProvider')
  }
  return context
}
