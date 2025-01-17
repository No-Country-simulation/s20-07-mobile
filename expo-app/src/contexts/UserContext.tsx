import React, { createContext, useState, ReactNode, useContext } from 'react'

// Tipo para los datos del usuario
type UserType = {
  name: string
  email: string
  phone: string
}

// Tipo para el contexto
type UserContextType = {
  user: UserType | null
  updateUser: (newUser: UserType) => void
}

// Crear el contexto
const UserContext = createContext<UserContextType | undefined>(undefined)

// Crear el provider
export function UserProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)

  const updateUser = (newUser: UserType) => {
    setUser(newUser)
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook para acceder al contexto
export function useUser () {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
