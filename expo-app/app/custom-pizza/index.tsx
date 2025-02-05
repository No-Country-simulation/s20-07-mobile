import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView
} from 'react-native'
import { useNavigation } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import axios from 'axios'
import BackArrow from '@/components/BackArrow'
import { useCart } from '@/contexts/CartContext'

const CustomPizzaScreen = () => {
  const router = useRouter()
  const { addToCart } = useCart()

  // Estado para tamaños, precios e ingredientes
  const [sizes, setSizes] = useState<{ name: string; basePrice: number }[]>([])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [ingredients, setIngredients] = useState<
    { id: number; name: string; price: number }[]
  >([])
  const [selectedIngredients, setSelectedIngredients] = useState<
    { id: number; name: string; price: number }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    const fetchSizesAndIngredients = async () => {
      try {
        const sizesResponse = await axios.get('http://localhost:3000/api/sizes')
        const ingredientsResponse = await axios.get(
          'http://localhost:3000/api/ingredients'
        )

        // Accediendo correctamente a los datos
        const { sizes } = sizesResponse.data
        const { ingredients } = ingredientsResponse.data
        const normalizedIngredients = normalizeIngredients(ingredients)

        setSizes(sizes) // Guardando tamaños
        setIngredients(normalizedIngredients) // Guardando ingredientes

        if (Array.isArray(sizes) && sizes.length > 0) {
          setSelectedSize(sizes[0].name)
          setSelectedPrice(sizes[0].basePrice)
        }
      } catch (err) {
        console.error('Error fetching sizes or ingredients:', err)
        setError('Error al obtener los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchSizesAndIngredients()
  }, [])

  const normalizeIngredients = (
    ingredients: {
      id: number
      name?: string
      nombre?: string
      Costoextra?: number
      extraCost?: number
      Costeextra?: number
      'costo adicional'?: number
    }[]
  ) => {
    return ingredients.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name || ingredient.nombre || 'Ingrediente desconocido',
      price:
        ingredient.Costoextra ||
        ingredient.extraCost ||
        ingredient.Costeextra ||
        ingredient['costo adicional'] ||
        0
    }))
  }

  const toggleIngredient = (ingredient: {
    id: number
    name: string
    price: number
  }) => {
    setSelectedIngredients(prevSelected => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter(item => item !== ingredient)
      } else {
        return [...prevSelected, ingredient]
      }
    })
  }

  const calculateTotalPrice = () => {
    const ingredientsPrice = selectedIngredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    )

    const total = ((selectedPrice || 0) + ingredientsPrice) * quantity
    return total
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    )
  }

  const handleAddToCart = () => {
    if (selectedIngredients.length < 4) {
      setError(
        'Para personalizar tu pizza, debes seleccionar mínimo cuatro ingredientes. Gracias por elegirnos 😊'
      )
      return
    }

    const newPizza = {
      id: new Date().getTime(),
      name: 'Pizza Personalizada',
      size: selectedSize,
      price: calculateTotalPrice(), // ✅ Incluye tamaño, ingredientes y cantidad
      quantity,
      image:
        'https://saboresmendoza.com/wp-content/uploads/2024/02/pizza-de-muzzarella-sabores-1.jpg',
      ingredients: selectedIngredients.map(ing => ing.name)
    }

    addToCart(newPizza)
    router.push('/cart')
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con ícono y título */}
      <BackArrow />
      <View style={styles.header}>
        {/* <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <AntDesign name='close' size={28} color='white' />
        </TouchableOpacity> */}
        <Text style={styles.title}>¡Vamos a crear tu pizza!</Text>
      </View>

      {/* Vista previa de la pizza */}
      <View style={styles.pizzaPreviewContainer}>
        <Image
          source={require('../../assets/images/pizza_base.png')}
          style={styles.pizzaBase}
        />
        <Image
          source={require('../../assets/images/salsa_golf.png')}
          style={styles.pizzaSauce}
        />
      </View>

      {/* Selección de tamaño */}
      <View style={styles.sizeSelectorContainer}>
        <Text style={styles.subtitle}>Elige el tamaño:</Text>
        <View style={styles.sizeContainer}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size.name}
              onPress={() => {
                setSelectedSize(size.name)
                setSelectedPrice(size.basePrice)
              }}
              style={[
                styles.sizeButton,
                selectedSize === size.name && styles.selectedSizeButton
              ]}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  selectedSize === size.name && styles.selectedSizeButtonText
                ]}
              >
                {size.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selección de ingredientes */}
      <ScrollView style={styles.ingredientsContainer}>
        {ingredients.map(ingredient => (
          <View key={ingredient.id} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={styles.ingredientPrice}>
              ${ingredient.price.toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={() => toggleIngredient(ingredient)}
              style={styles.checkbox}
            >
              {selectedIngredients.includes(ingredient) && (
                <AntDesign name='check' size={16} color='#ffc107' />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Resumen del pedido */}
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderTitle}>Tu pedido</Text>
        <View style={styles.orderRow}>
          <TouchableOpacity
            onPress={() => {
              setSelectedIngredients([])
              setSelectedSize(sizes[0].name)
              setSelectedPrice(sizes[0].basePrice)
              setQuantity(1)
            }}
            style={styles.clearButton}
          >
            <AntDesign name='closecircle' size={24} color='#EB6334' />
          </TouchableOpacity>

          {/* ✅ Controles de cantidad */}
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <AntDesign name='minus' size={16} color='#EB6334' />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <AntDesign name='plus' size={16} color='#EB6334' />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.totalPrice}>
          Total: ${calculateTotalPrice().toFixed(2)}
        </Text>
      </View>
      <View style={styles.orderSummaryContainer}>
        <TouchableOpacity
          onPress={handleAddToCart}
          style={[
            styles.addButton,
            selectedIngredients.length < 4 && styles.disabledButton
          ]}
          disabled={selectedIngredients.length < 4}
        >
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 40
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  closeButton: {
    marginRight: 10
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  },
  pizzaPreviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120
  },
  pizzaBase: {
    width: 200,
    height: 200,
    position: 'absolute'
  },
  pizzaSauce: {
    width: 180,
    height: 180,
    position: 'absolute'
  },
  sizeSelectorContainer: {
    marginTop: 80
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    borderRadius: 10
  },
  selectedSizeButton: {
    backgroundColor: '#EB6334'
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#fff'
  },
  selectedSizeButtonText: {
    fontWeight: 'bold',
    color: '#000'
  },
  ingredientsContainer: {
    marginTop: 20
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  ingredientName: {
    color: '#fff',
    fontSize: 16,
    flex: 1
  },
  ingredientPrice: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  priceContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  priceLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107'
  },
  errorText: {
    color: '#f00',
    fontSize: 16
  },
  orderSummaryContainer: {
    backgroundColor: '#333',
    borderRadius: 10
  },
  orderTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  orderRow: {
    flexDirection: 'row', // ✅ Todo en una línea
    alignItems: 'center',
    justifyContent: 'space-between', // ✅ Distribución uniforme
    paddingHorizontal: 10,
    marginVertical: 10
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#EB6334',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#EB6334',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalPrice: {
    fontSize: 18,
    color: '#FFC107',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  clearButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  disabledButton: {
    backgroundColor: '#555' // ❌ Botón gris cuando está deshabilitado
  }
})

export default CustomPizzaScreen
