## **Módulo Cart**

### **Descripción General**
El módulo `Cart` gestiona toda la lógica y la interfaz del carrito de compras, permitiendo:
- Agregar productos.
- Actualizar cantidades.
- Calcular subtotales, descuentos y totales.
- Aplicar cupones de descuento.
- Vaciar el carrito.
- Proceder al pago.

Está diseñado de forma modular para facilitar su mantenimiento y reutilización.

---

### **Estructura del Módulo**
El módulo está compuesto por los siguientes componentes:

1. **`CartView`**: Componente principal que une toda la funcionalidad del carrito.
2. **`CartItem`**: Renderiza un producto dentro del carrito.
3. **`CartSummary`**: Muestra el subtotal, descuentos y total.
4. **`CouponCartActions`**: Gestiona el ingreso de cupones y las acciones globales (vaciar carrito y pagar).
5. **`BackArrow`**: Botón reutilizable para regresar a la pantalla anterior.
6. **Contexto (`CartContext`)**: Maneja el estado global del carrito.

---

### **Componentes**

#### **1. `CartView`**
Componente principal que combina los subcomponentes y gestiona la lógica global del carrito.

- **Ubicación**: `src/screens/CartView.tsx`

- **Responsabilidades**:
  - Mostrar la lista de productos en el carrito.
  - Integrar el resumen del carrito.
  - Manejar cupones y acciones del carrito.

#### **2. `CartItem`**
Renderiza un producto individual dentro del carrito.

- **Props**:
  - `item`: Información del producto.
  - `updateQuantity`: Función para actualizar la cantidad.

- **Ubicación**: `src/components/CartItem.tsx`

---

#### **3. `CartSummary`**
Muestra el resumen del carrito (subtotal, descuentos y total).

- **Props**:
  - `subtotal`: Subtotal del carrito.
  - `discount`: Descuento aplicado.

- **Ubicación**: `src/components/CartSummary.tsx`

---

#### **4. `CouponCartActions`**
Combina la funcionalidad de cupones y acciones globales.

- **Props**:
  - `coupon`: Código del cupón ingresado.
  - `setCoupon`: Función para actualizar el cupón.
  - `setDiscount`: Función para actualizar el descuento.
  - `handleClearCart`: Vacía el carrito.

- **Ubicación**: `src/components/CouponCartActions.tsx`

---

#### **5. `BackArrow`**
Botón reutilizable para regresar a la pantalla anterior.

- **Ubicación**: `src/components/BackArrow.tsx`

---

### **Contexto del Carrito**
El `CartContext` permite manejar el estado global del carrito.

- **Funciones principales**:
  - `addToCart(item)`: Agregar un producto al carrito.
  - `removeFromCart(id)`: Eliminar un producto del carrito.
  - `updateQuantity(id, quantity)`: Actualizar la cantidad de un producto.

- **Ubicación**: `src/contexts/CartContext.tsx`

---

### **Flujo del Carrito**

1. **Productos iniciales**: Los productos se cargan al iniciar la pantalla mediante `useEffect`.
2. **Interacción con productos**:
   - Los usuarios pueden aumentar o disminuir cantidades.
   - Los cambios se reflejan en el subtotal y total.
3. **Aplicación de cupones**:
   - Los usuarios ingresan un cupón, que se valida y actualiza el descuento.
4. **Acciones del carrito**:
   - Pueden vaciar el carrito.
   - Proceder al pago (botón "Ir a pagar").

---

### **Estilos**
Los estilos están centralizados en los archivos de cada componente, utilizando `StyleSheet` de React Native. Esto permite que cada componente mantenga sus propios estilos encapsulados.

---

### **Ventajas del Diseño Modular**
1. **Reutilización**: Los componentes pueden ser usados en otras pantallas o contextos.
2. **Mantenimiento**: Los cambios se realizan en componentes específicos, sin afectar la funcionalidad global.
3. **Escalabilidad**: Permite agregar nuevas funciones sin alterar la estructura principal.

---

### **Posibles Mejoras Futuras**
1. **Integración con API**:
   - Sincronizar el estado del carrito con un backend.
2. **Flujo de Pago**:
   - Implementar una pasarela de pago en el botón "Ir a pagar".
3. **Animaciones**:
   - Añadir transiciones al agregar o eliminar productos.

---

### **Cómo Integrarlo**
1. Asegúrate de que los siguientes archivos están disponibles en sus respectivas rutas:
   - `CartView.tsx`
   - `CartItem.tsx`
   - `CartSummary.tsx`
   - `CouponCartActions.tsx`
   - `BackArrow.tsx`
   - `CartContext.tsx`
2. Importa y utiliza el `CartView` en la pantalla donde quieras mostrar el carrito.