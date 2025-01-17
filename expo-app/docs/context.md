# UserContext

El `UserContext` es un contexto global que gestiona la información del usuario en la aplicación.

## Propósito
- Proveer datos del usuario (nombre, correo, teléfono).
- Permitir actualizar estos datos desde cualquier componente de la aplicación.

## Estado inicial
El estado inicial del contexto es:
```tsx
const [user, setUser] = useState<UserType | null>(null);

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
