import React, { ReactNode } from 'react'
import { UserProvider } from './UserContext'

export function AppProviders ({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
