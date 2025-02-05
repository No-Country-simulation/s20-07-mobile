import React, { ReactNode } from 'react'
import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'
import { SearchProvider } from './SearchContext'
import { CategoryProvider } from './CategoryContext'
import { PizzaProvider } from './PizzaContext'
import { FavoritesProvider } from './FavoritesContext'

export function AppProviders ({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <SearchProvider>
            <CategoryProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </CategoryProvider>
          </SearchProvider>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  )
}
