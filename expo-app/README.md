# 🍕 Aplicación para Gestión de Ventas de Pizzas

Bienvenido al repositorio de **[No-Country-simulation/s20-07-mobile](https://github.com/No-Country-simulation/s20-07-mobile)**. Esta aplicación móvil está diseñada para una **cadena de pizzerías**, facilitando la gestión de pedidos, personalización de pizzas, y seguimiento del carrito de compras.

---

## 🛠️ Tecnologías Utilizadas
- **Frontend**: React Native + Expo
- **Estado Global**: Context API (UserContext, CartContext)
- **Navegación**: React Navigation + Expo Router
- **Estilo Visual**: Temas claro y oscuro

---

## 🚀 Funcionalidades Principales
- **Gestión de Usuarios**: Implementación de un `UserContext` para almacenar y actualizar datos de los usuarios (nombre, correo, teléfono).
- **Gestión del Carrito de Compras**: 
  - Implementación de un `CartContext` para manejar productos seleccionados, cantidades y totales.
  - Funciones para agregar, eliminar y actualizar productos en el carrito.
- **Gestión de la Página Principal (Home)**: 
  - Slider con imágenes destacadas.
  - Categorías interactivas con efectos al pasar el mouse.
  - Banner principal con call-to-action.
- **Navegación Dinámica**: Rutas optimizadas con Expo Router.

---

## 📚 Documentación
Consulta la documentación detallada en los siguientes enlaces:
- [Gestión de Contextos](./docs/context.md): Información general sobre los contextos globales utilizados.
- [UserContext](./docs/user-context.md): Implementación y uso del `UserContext`.
- [CartContext](./docs/cart-context.md): Implementación y uso del `CartContext`.
- [Gestión del Carrito](./docs/cart.md): Documentación completa del módulo `Cart`.
- [Página Principal (Home)](./docs/home.md): Documentación del módulo `Home`.
- [Setup del Proyecto](./docs/setup.md): Guía para configurar y ejecutar el proyecto.
- [Arquitectura del Proyecto](./docs/architecture.md): Estructura del código y detalles técnicos.

---

## 🧑‍💻 Configuración Rápida
Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/No-Country-simulation/s20-07-mobile.git
   cd s20-07-mobile/expo-app
