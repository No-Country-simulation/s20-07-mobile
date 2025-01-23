import React, { ReactNode } from 'react'
import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'
import { SearchProvider } from './SearchContext'
import { CategoryProvider } from './CategoryContext'

export function AppProviders ({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>
        <SearchProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </SearchProvider>
      </CartProvider>
    </UserProvider>
  )
}
