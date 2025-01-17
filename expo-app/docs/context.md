# Gestión de Contextos

## AppProviders
El componente `AppProviders` combina múltiples contextos para mantener la estructura del código limpia y organizada.

### Contextos Incluidos:
1. **UserContext**: Gestión de datos del usuario.
2. **CartContext**: Manejo del carrito de compras.

### Uso:
En `app/_layout.tsx`, la aplicación se envuelve con `AppProviders`:

```tsx
import { AppProviders } from '@/contexts/AppProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      {children}
    </AppProviders>
  );
}


### tsx
## Tipos Utilizados
type UserType = {
  name: string;
  email: string;
  phone: string;
};

type UserContextType = {
  user: UserType | null;
  updateUser: (newUser: UserType) => void;
};


# Cómo usar el contexto
## Envolver la aplicación
## En app/_layout.tsx, la app se envuelve en el UserProvider:
import { UserProvider } from '@/contexts/UserContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

# Acceso desde un componente
## Usa el hook useUser para acceder y actualizar los datos del usuario:

import { useUser } from '@/contexts/UserContext';

const { user, updateUser } = useUser();

updateUser({ name: 'Adriana', email: 'adriana@mail.com', phone: '123456789' });
