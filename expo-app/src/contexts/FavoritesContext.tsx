import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Favorite {
  id: string
  name: string
  image: string
}

interface FavoritesContextType {
  favorites: Favorite[]
  addFavorite: (favorite: Favorite) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites')
      if (storedFavorites) {
        console.log('Cargando favoritos desde AsyncStorage:', storedFavorites) // 🔹 Verifica si hay datos guardados
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error)
    }
  }

  const saveFavorites = async (newFavorites: Favorite[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error('Error guardando favoritos:', error)
    }
  }

  const addFavorite = (favorite: Favorite) => {
    if (!favorites.some(fav => fav.id === favorite.id)) {
      const updatedFavorites = [...favorites, favorite]
      console.log(`✅ Favorito agregado: ${favorite.name} (ID: ${favorite.id})`)
      saveFavorites(updatedFavorites)
    } else {
      console.log(
        `⚠️ Intento de agregar un favorito duplicado: ${favorite.name} (ID: ${favorite.id})`
      )
    }
  }

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== id)
    console.log(`❌ Eliminando favorito: ID ${id}`)
    saveFavorites(updatedFavorites)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider')
  }
  return context
}
