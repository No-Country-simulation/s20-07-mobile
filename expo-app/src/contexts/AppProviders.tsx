import React, { ReactNode } from 'react'
import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'

export function AppProviders ({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  )
}
