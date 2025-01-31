import React { createContext, useContext, useState, ReactNode } from 'react'


type FavoritesContextType = {
  favorites: number[]
  addToFavorites: (id: number) => void
  removeFromFavorites: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([])

  const addToFavorites = (id: number) => {
    setFavorites(favorites => [...favorites, id])
  }

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites => favorites.filter(fav => fav !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

