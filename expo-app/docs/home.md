## **Módulo Home**

### **Descripción General**
El módulo `Home` es la pantalla principal de la aplicación y sirve como punto de entrada para los usuarios. Contiene los siguientes componentes y funcionalidades:

- **Categorías**: Enlaces a secciones específicas como Pizzas, Bebidas y Promociones.
- **Barra de Búsqueda (SearchBar)**: Permite a los usuarios buscar elementos específicos y navegar a sus detalles o categorías.
- **Slider**: Carrusel automático de imágenes destacadas.
- **Banner**: Mensaje destacado con un botón interactivo.
- **Footer**: Información complementaria y enlaces importantes.

---

### **Estructura del Módulo**

El módulo está compuesto por los siguientes componentes:

1. **`SearchBar`**: Barra de búsqueda interactiva con resultados dinámicos y navegación.
2. **`Banner`**: Componente destacado con un mensaje principal y un botón de acción.
3. **`Slider`**: Carrusel de imágenes que rota automáticamente.
4. **`CategoryList`**: Lista de categorías con enlaces a diferentes secciones.
5. **`Footer`**: Información al pie de la página con enlaces.

---

### **Componentes**

#### **1. `SearchBar`**
Barra de búsqueda interactiva que permite a los usuarios buscar elementos por nombre o categoría y navegar a sus respectivas vistas.

- **Descripción**: 
Realiza búsquedas dinámicas mientras el usuario escribe.
Filtra resultados según coincidencias en el nombre o categoría de los elementos.
Permite redirigir a las categorías específicas (Pizzas, Bebidas, Postres, Promociones) o a la vista de detalles de un ítem seleccionado.
- **Principales Funcionalidades**:
*Búsqueda dinámica*: Actualiza los resultados en tiempo real mientras el usuario escribe.
*Redirección*: Los elementos de la lista permiten navegar a rutas específicas usando expo-router.
*Limpieza de resultados*: Incluye un botón para limpiar el texto y los resultados.
- **Detalles Técnicos**:
*Hook utilizado*: useRouter para la navegación.
*Redirección*: Basada en la categoría seleccionada.
*Validación*: Se asegura de no realizar búsquedas vacías.
- **Props**: No recibe props directamente.
- **Ubicación**: src/components/home/SearchBar.tsx

#### **2. `Banner`**
Componente que muestra un mensaje destacado y un botón de acción.

- **Props**: No recibe props.
- **Ubicación**: `src/components/home/Banner.tsx`

#### **3. `Slider`**
Carrusel automático de imágenes destacadas.

- **Props**: No recibe props.
- **Ubicación**: `src/components/home/Slider.tsx`

#### **4. `CategoryList`**
Lista interactiva de categorías con enlaces a secciones como Pizzas, Bebidas y Promociones.

- **Descripción**:
Muestra una lista de categorías con imágenes y nombres representativos.
Cada categoría redirige a una página específica mediante useRouter.
- **Principales Funcionalidades**:
*Navegación por *categoría*: Al hacer clic en una categoría, redirige a la vista correspondiente (/pizzas, /drinks, /desserts, /promotions).
*Interacción visual*: Se incluye una animación de escala al pasar el cursor sobre los elementos.
- **Props**: No recibe props.
- **Ubicación**: `src/components/home/CategoryList.tsx`

#### **5. `Footer`**
Componente al pie de la pantalla con información adicional y enlaces a términos y condiciones.

**Props**: No recibe props.
**Ubicación**: src/components/home/Footer.tsx

### **Ventajas del Diseño Modular**
1. **Reutilización**: Cada componente puede ser utilizado en otras pantallas o contextos.
2. **Mantenimiento**: Los cambios se realizan de forma independiente en los componentes.
3. **Escalabilidad**: Permite agregar nuevas funcionalidades sin alterar la estructura principal.

### **Avances Específicos**
1. **Integración de barra de búsqueda**:
Incluye redirección dinámica a categorías o vistas de detalles según los resultados seleccionados.
Implementación de filtros dinámicos basados en nombre o categoría.
2. **Conexión entre SearchBar y CategoryList**:
Los resultados de la búsqueda pueden coincidir c

### **Enlaces Relacionados**
- [Arquitectura del Proyecto](./architecture.md)
- [Setup del Proyecto](./setup.md)
