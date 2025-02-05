# CartContext

El `CartContext` es un contexto global que se encarga de gestionar el carrito de compras en la aplicación. Permite manejar productos seleccionados por el usuario, actualizar cantidades y calcular totales.

---

## Propósito

El objetivo principal del `CartContext` es proporcionar un estado centralizado para el carrito de compras. Esto incluye:
- Agregar productos al carrito.
- Eliminar productos del carrito.
- Actualizar la cantidad de productos en el carrito.

---

## Tipos Definidos

### **Tipo de Producto (`CartItem`)**
```typescript
type CartItem = {
  id: string; // Identificador único del producto
  name: string; // Nombre del producto
  price: number; // Precio del producto
  quantity: number; // Cantidad de unidades seleccionadas
};
