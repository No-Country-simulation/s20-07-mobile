import React, { ReactNode } from 'react'
import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'
import { SearchProvider } from './SearchContext'
import { CategoryProvider } from './CategoryContext'
import { PizzaProvider } from './PizzaContext'

export function AppProviders ({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <SearchProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </SearchProvider>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  )
}
