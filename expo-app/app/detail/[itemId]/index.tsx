import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'

type Pizza = {
  id: number
  name: string
  description: string | null
  image: string | null
  pizzaIngredients: { ingredient: { name: string } }[]
}

export default function PizzaDetail () {
  const { itemId } = useLocalSearchParams<{ itemId: string }>()
  const [pizza, setPizza] = useState<Pizza | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>('Pequeña')

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pizzas/${itemId}`
        )
        console.log('Datos de la pizza recibidos:', response.data.pizza)
        setPizza(response.data.pizza)
      } catch (error) {
        console.error('Error al cargar los detalles de la pizza:', error)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchPizza()
  }, [itemId])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    console.log(`Añadido al carrito: ${pizza?.name}, Tamaño: ${selectedSize}`)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF5722' />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    )
  }

  if (!pizza) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la pizza.</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>{pizza.name || 'Nombre no disponible'}</Text>

      {/* Imagen */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              pizza.image ||
              'https://img.freepik.com/fotos-premium/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg'
          }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => console.log('Añadido a favoritos')}
        >
          <Text style={styles.heartText}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Descripción */}
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>
        {pizza.description ? pizza.description : 'Descripción no disponible'}
      </Text>

      {/* Ingredientes */}
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      <Text style={styles.ingredients}>
        {pizza.pizzaIngredients.length > 0
          ? pizza.pizzaIngredients.map(ing => ing.ingredient.name).join(', ')
          : 'No hay ingredientes disponibles.'}
      </Text>

      {/* Selector de tamaño */}
      <Text style={styles.sectionTitle}>Selecciona el tamaño de tu pizza</Text>
      <View style={styles.sizeContainer}>
        {['Pequeña', 'Mediana', 'Grande'].map(size => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeSelect(size)}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton
            ]}
          >
            <Text
              style={[
                styles.sizeButtonText,
                selectedSize === size && styles.selectedSizeButtonText
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de añadir al carrito */}
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Añadir al carrito</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1E1E1E'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  heartText: {
    fontSize: 24,
    color: 'red'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'justify',
    marginBottom: 20
  },
  ingredients: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center'
  },
  selectedSizeButton: {
    backgroundColor: '#FFC107'
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#fff'
  },
  selectedSizeButtonText: {
    fontWeight: 'bold',
    color: '#000'
  },
  cartButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    marginTop: 20
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },
  loadingText: {
    fontSize: 16,
    color: '#FF5722',
    marginTop: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E'
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  }
})

// mockPizza
// if (!pizza) {
//   const mockPizza = {
//     id: 1,
//     name: 'Muzzarella',
//     image: 'https://example.com/muzzarella.jpg',
//     description: 'La clásica de siempre: salsa de tomate, abundante muzzarella derretida y un toque de orégano.',
//     pizzaIngredients: [
//       { id: 1, name: 'Salsa de tomate', extraCost: 0.5 },
//       { id: 2, name: 'Mozzarella', extraCost: 1.5 },
//     ],
//     price: 10,
//   };

//   return <PizzaDetail pizza={mockPizza} />;
// }
