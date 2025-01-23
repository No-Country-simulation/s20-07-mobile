# 🍕 OhMyPizza
## Aplicación para Gestión de Ventas de Pizzas

Bienvenido al repositorio de **[OhMyPizza](https://github.com/No-Country-simulation/s20-07-mobile)**. Esta aplicación móvil está diseñada para una **cadena de pizzerías**, facilitando la gestión de pedidos, personalización de pizzas y seguimiento del carrito de compras.

## 🛠️ Tecnologías Utilizadas

### **Backend** (en desarrollo)
- **Framework**: Express.js (pendiente de desarrollo)
- **Base de Datos**: PostgreSQL (opcional por definir)

### **Frontend**
- **Framework**: React Native + Expo
- **Estado Global**: Context API (`UserContext`, `CartContext`, `PizzaContext`, `SearchContext`)
- **Navegación**: React Navigation + Expo Router
- **Estilo Visual**: Temas claro y oscuro


## 🚀 Funcionalidades Principales
  ### **Backend** (en desarrollo)
- **API REST**: Desarrollo de endpoints para gestionar pedidos, usuarios y productos.
- **Gestión del Carrito**: Rutas para sincronizar el carrito entre la app y la base de datos.
- **Seguridad**: Autenticación y autorización con JWT.


### **Frontend**
- **Gestión de Usuarios**: Implementación de un `UserContext` para almacenar y actualizar datos de los usuarios (nombre, correo, teléfono).
- **Gestión del Carrito de Compras**:
  - Implementación de un `CartContext` para manejar productos seleccionados, cantidades y totales.
  - Funciones para agregar, eliminar y actualizar productos en el carrito.
- **Gestión de la Página Principal (Home)**:
  - Slider con imágenes destacadas.
  - Categorías interactivas con efectos al pasar el mouse.
  - Banner principal con call-to-action.
- **Navegación Dinámica**: Rutas optimizadas con Expo Router.

## 🎨 Diseño
- Los diseños de la aplicación móvil están disponibles en **Figma**:
  - [Diseño General]*(https://www.figma.com/design/ORzGDg55YyM33x8abzZUPW/Oh-my-pizza).*
  - [Prototipo Interactivo]*(https://www.notion.so/albbasanchez/Wireframes).*

    ![diseño-home](https://github.com/user-attachments/assets/24023287-479c-46c8-bbc9-b03abb8ffef6)

## 📚 Documentación

### **Backend** (en desarrollo)
- [Endpoints de la API](./docs/api.md): Descripción de los endpoints disponibles.
- [Configuración del Servidor](./docs/server-setup.md): Guía para iniciar el backend.
- [Base de Datos](./docs/database.md): Detalles sobre la estructura y manejo de la base de datos.

### **Frontend**
- [Gestión de Contextos](./docs/context.md): Información general sobre los contextos globales utilizados.
- [UserContext](./docs/user-context.md): Implementación y uso del `UserContext`.
- [CartContext](./docs/cart-context.md): Implementación y uso del `CartContext`.
- [Gestión del Carrito](./docs/cart.md): Documentación completa del módulo `Cart`.
- [Página Principal (Home)](./docs/home.md): Documentación del módulo `Home`.
- [Setup del Proyecto](./docs/setup.md): Guía para configurar y ejecutar el proyecto.
- [Arquitectura del Proyecto](./docs/architecture.md): Estructura del código y detalles técnicos.

## 🧑‍💻 Configuración Rápida

### **Backend y Frontend**
1. *Clonar el repositorio*
git clone https://github.com/No-Country-simulation/s20-07-mobile.git
cd s20-07-mobile

2. *Configurar y ejecutar el backend*
cd express-server
npm install
npm start

3. *Configurar y ejecutar el frontend*
cd ..
cd expo-app
npm install
npm start

## 📧 Contacto
Para preguntas o sugerencias, puedes escribirnos a: **ohmypizza.nocountry@gmail.com**

