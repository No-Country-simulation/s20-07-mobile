import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const CustomPizzaScreen = () => {
  const router = useRouter();

  // Estado para tamaños y precios
  const [sizes, setSizes] = useState<{ id: number, name: string; basePrice: number; }[]>([]);
  /*  */
  const [ingredients, setIngredients] = useState<{
    id: number,
    name: string,
    extraCost: number;
  }[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [selectedSize, setSelectedSize] = useState<{ id: number, name: string; basePrice: number; } | {}>({});

  /* piña => revisa si en este array  selectedIngredients está piña. Si está la saca, si no está la pone*/
  const [selectedIngredients, setSelectedIngredients] = useState<{
    id: number,
    name: string,
    extraCost: number;
  }[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    // Armar la pizza personalizada


  };
  /* 
      chica - muzzarella - piña
      crearla en la base de datos (hacer post a la api con cierta in formación)
  
      POST http://localhost:3000/api/custom-pizzas
      {
      "customPizza": {
          "sizeId": 1,
          "ingredients": [
              {
                  "id": 1,
                  "name": "Salsa de tomate",
                  "extraCost": 0.5
              },
              {
                  "id": 30,
                  "name": "Queso provolone",
                  "extraCost": 1.8
              },
              {
                  "id": 8,
                  "name": "Aceitunas verdes",
                  "extraCost": 0.8
              }
          ]
      }
    }
      agregarla al carrito
  */

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sizes");
        const data = response.data;

        setSizes(data); console.log(sizes);
        if (data.length > 0) {
          setSelectedSize(data[0].name); // Seleccionar el primer tamaño por defecto
          setSelectedPrice(data[0].basePrice); // Seleccionar el precio base del primer tamaño
        }
      } catch (err) {
        setError("Error fetching sizes");
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con ícono y título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <AntDesign name="close" size={28} color="white" /> {/* Ícono más grande */}
        </TouchableOpacity>
        <Text style={styles.title}>¡Vamos a crear tu pizza!</Text>
      </View>

      {/* Vista previa de la pizza */}
      <View style={styles.pizzaPreviewContainer}>
        <Image source={require("../../assets/images/pizza_base.png")} style={styles.pizzaBase} />
        <Image source={require("../../assets/images/salsa_golf.png")} style={styles.pizzaSauce} />
      </View>

      {/* Selección de tamaño */}
      <View style={styles.sizeSelectorContainer}>
        <Text style={styles.subtitle}>Elige el tamaño:</Text>
        <FlatList
          data={sizes}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sizeButton,
                selectedSize === item.name && styles.selectedSizeButton,
              ]}
              onPress={() => {
                setSelectedSize(item.name);
                setSelectedPrice(item.basePrice);
              }}
            >
              <Text style={styles.sizeButtonText}>{item.name}</Text>
              {selectedSize === item.name && (
                <AntDesign name="checkcircle" size={16} color="#ffc107" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Mostrar precio seleccionado */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Precio: ${selectedPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fondo negro
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  closeButton: {
    marginRight: 10, // Reduce el espacio entre la X y el título
  },
  title: {
    color: "#fff", // Texto blanco
    fontSize: 24,
    fontWeight: "bold",
  },
  pizzaPreviewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80, // Mueve las imágenes más abajo
  },
  pizzaBase: {
    width: 200,
    height: 200,
    position: "absolute",
  },
  pizzaSauce: {
    width: 180, // Hacer la imagen de salsa más pequeña
    height: 180,
    position: "absolute",
  },
  sizeSelectorContainer: {
    marginTop: 40,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedSizeButton: {
    backgroundColor: "#ffc107",
    borderColor: "#ffc107",
  },
  sizeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkIcon: {
    marginLeft: 8,
  },
  priceContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  priceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
  },
});

export default CustomPizzaScreen;
