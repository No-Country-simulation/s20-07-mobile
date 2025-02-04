import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { screenWidth, screenHeight } from '@/utils/dimensions';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import BackArrow from '@/components/BackArrow';

// Define el tipo de una pizza
type Pizza = {
  id: number;
  name: string;
  pizzaIngredients: { ingredient: { name: string; }; }[];
};

export default function PizzasPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pizzas');
        setPizzas(response.data.pizzas);
      } catch (error) {
        console.error('Error al cargar las pizzas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando pizzas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.title}>Nuestras Pizzas</Text>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/detail/${item.id}`)}
          >
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>
              {item.pizzaIngredients
                .map(ing => ing.ingredient?.name || 'Ingrediente desconocido')
                .join(', ')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * 0.06,
    backgroundColor: '#111'
  },
  title: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: screenHeight * 0.02,
    marginTop: screenHeight * 0.02
  },
  item: {
    padding: screenWidth * 0.04,
    marginBottom: screenHeight * 0.02,
    backgroundColor: '#222',
    borderRadius: screenWidth * 0.02
  },
  itemTitle: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff'
  },
  itemSubtitle: {
    fontSize: screenWidth * 0.02,
    color: '#ccc'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    fontSize: screenWidth * 0.04
  }
});
