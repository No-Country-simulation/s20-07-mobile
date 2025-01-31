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

  // ✅ Cargar favoritos al iniciar la app
  useEffect(() => {
    loadFavorites()
  }, [])

  // ✅ Escuchar cambios en favoritos y guardar en AsyncStorage
  useEffect(() => {
    if (favorites.length > 0) {
      AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(
        error => console.error('Error guardando favoritos:', error)
      )
    }
  }, [favorites]) // 👉 Se ejecuta cuando cambia `favorites`

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites')
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error)
    }
  }
  const addFavorite = (favorite: Favorite) => {
    if (!favorites.some(fav => fav.id === favorite.id)) {
      const updatedFavorite = {
        ...favorite,
        image: favorite.image || 'https://via.placeholder.com/150' // 🔥 Imagen por defecto si falta
      }

      const updatedFavorites = [...favorites, updatedFavorite]
      console.log(
        `✅ Agregado a favoritos: ${favorite.name} (ID: ${favorite.id})`
      )
      saveFavorites(updatedFavorites) // ✅ Guardamos la lista actualizada
    } else {
      console.log(
        `⚠️ Intento de agregar un favorito duplicado: ${favorite.name} (ID: ${favorite.id})`
      )
    }
  }

  const saveFavorites = async (newFavorites: Favorite[]) => {
    try {
      console.log('📌 Guardando favoritos:', newFavorites)
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error('❌ Error guardando favoritos:', error)
    }
  }

  const removeFavorite = (id: string) => {
    console.log(`❌ Eliminando favorito: ID ${id}`)

    const updatedFavorites = favorites.filter(item => item.id !== id)

    console.log('📌 Favoritos después de eliminar:', updatedFavorites)

    saveFavorites(updatedFavorites) // ✅ Ahora debería funcionar
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

//FUNCIONAL
// import React, { createContext, useContext, useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface Favorite {
//   id: string
//   name: string
//   image: string
// }

// interface FavoritesContextType {
//   favorites: Favorite[]
//   addFavorite: (favorite: Favorite) => void
//   removeFavorite: (id: string) => void
// }

// const FavoritesContext = createContext<FavoritesContextType | undefined>(
//   undefined
// )

// export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
//   children
// }) => {
//   const [favorites, setFavorites] = useState<Favorite[]>([])

//   // ✅ Cargar favoritos al iniciar la app
//   useEffect(() => {
//     loadFavorites()
//   }, [])

//   // ✅ Escuchar cambios en favoritos y guardar en AsyncStorage
//   useEffect(() => {
//     if (favorites.length > 0) {
//       AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(
//         error => console.error('Error guardando favoritos:', error)
//       )
//     }
//   }, [favorites]) // 👉 Se ejecuta cuando cambia `favorites`

//   const loadFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.getItem('favorites')
//       if (storedFavorites) {
//         setFavorites(JSON.parse(storedFavorites))
//       }
//     } catch (error) {
//       console.error('Error cargando favoritos:', error)
//     }
//   }
//   const addFavorite = (favorite: Favorite) => {
//     if (!favorites.some(fav => fav.id === favorite.id)) {
//       const updatedFavorites = [...favorites, favorite]
//       console.log(
//         `✅ Agregado a favoritos: ${favorite.name} (ID: ${favorite.id})`
//       )
//       saveFavorites(updatedFavorites) // ✅ Guardamos la lista actualizada
//     } else {
//       console.log(
//         `⚠️ Intento de agregar un favorito duplicado: ${favorite.name} (ID: ${favorite.id})`
//       )
//     }
//   }

//   const saveFavorites = async (newFavorites: Favorite[]) => {
//     try {
//       await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
//       setFavorites(newFavorites) // 🔥 Guarda los favoritos en el estado
//     } catch (error) {
//       console.error('❌ Error guardando favoritos:', error)
//     }
//   }

//   const removeFavorite = (id: string) => {
//     console.log(`❌ Eliminando favorito: ID ${id}`)

//     const updatedFavorites = favorites.filter(item => item.id !== id)

//     console.log('📌 Favoritos después de eliminar:', updatedFavorites)

//     saveFavorites(updatedFavorites) // ✅ Ahora debería funcionar
//   }

//   return (
//     <FavoritesContext.Provider
//       value={{ favorites, addFavorite, removeFavorite }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   )
// }

// export const useFavorites = () => {
//   const context = useContext(FavoritesContext)
//   if (!context) {
//     throw new Error('useFavorites debe usarse dentro de un FavoritesProvider')
//   }
//   return context
// }
