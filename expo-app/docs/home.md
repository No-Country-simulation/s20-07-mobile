## **Módulo Home**

### **Descripción General**
El módulo `Home` es la pantalla principal de la aplicación y sirve como punto de entrada para los usuarios. Contiene los siguientes componentes y funcionalidades:

- **Categorías**: Enlaces a secciones específicas como Pizzas, Bebidas y Promociones.
- **Slider**: Carrusel automático de imágenes destacadas.
- **Banner**: Mensaje destacado con un botón interactivo.
- **Footer**: Información complementaria y enlaces importantes.

---

### **Estructura del Módulo**

El módulo está compuesto por los siguientes componentes:

1. **`Banner`**: Componente destacado con un mensaje principal y un botón de acción.
2. **`Slider`**: Carrusel de imágenes que rota automáticamente.
3. **`CategoryList`**: Lista de categorías con enlaces a diferentes secciones.
4. **`Footer`**: Información al pie de la página con enlaces.

---

### **Componentes**

#### **1. `Banner`**
Componente que muestra un mensaje destacado y un botón de acción.

- **Props**: No recibe props.
- **Ubicación**: `src/components/home/Banner.tsx`

#### **2. `Slider`**
Carrusel automático de imágenes destacadas.

- **Props**: No recibe props.
- **Ubicación**: `src/components/home/Slider.tsx`

#### **3. `CategoryList`**
Lista interactiva de categorías con enlaces a secciones como Pizzas, Bebidas y Promociones.

- **Props**: No recibe props.
- **Ubicación**: `src/components/home/CategoryList.tsx`

#### **4. `Footer`**
Componente al pie de la pantalla con información adicional y enlaces a términos y condiciones.

### **Ventajas del Diseño Modular**
1. **Reutilización**: Cada componente puede ser utilizado en otras pantallas o contextos.
2. **Mantenimiento**: Los cambios se realizan de forma independiente en los componentes.
3. **Escalabilidad**: Permite agregar nuevas funcionalidades sin alterar la estructura principal.


### **Enlaces Relacionados**
- [Arquitectura del Proyecto](./architecture.md)
- [Setup del Proyecto](./setup.md)
