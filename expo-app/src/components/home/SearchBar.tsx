import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors'
import { useSearch } from '@/contexts/SearchContext'
import { useRouter } from 'expo-router'

export default function SearchBar () {
  const router = useRouter()
  const { search, results } = useSearch() // Obtén resultados de búsqueda
  const [query, setQuery] = useState('')

  // Maneja la búsqueda
  const handleSearch = (text: string) => {
    setQuery(text)
    search(text)
  }

  // Limpia la búsqueda
  const clearSearch = () => {
    setQuery('')
    search('')
  }

  // Navega al detalle de pizzas o bebidas
  const handlePress = (id: number, type: string) => {
    console.log(`Navegando al detalle del ${type}: ${id}`)
    if (type === 'pizza') {
      router.push(`/detail/${id}`) // Ruta para pizzas
    } else if (type === 'drink') {
      router.push(`/detail-drink/${id}`) // Ruta para bebidas
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <Icon name='search' size={20} color={Colors.light.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar pizzas o bebidas...'
          placeholderTextColor={Colors.light.muted}
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name='times-circle' size={20} color={Colors.light.muted} />
          </TouchableOpacity>
        )}
      </View>
      {/* Lista de resultados */}
      {query.trim() && (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handlePress(item.id, item.type)} // Incluye el tipo (pizza o drink)
            >
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noResults}>No se encontraron resultados.</Text>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: screenWidth * 0.025,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.03
  },
  searchInput: {
    flex: 1,
    marginLeft: screenWidth * 0.02,
    color: '#333',
    borderWidth: 0,
    outlineStyle: 'none'
  },
  clearIcon: {
    marginLeft: screenWidth * 0.02
  },

  resultItem: {
    padding: screenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center'
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  resultImage: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: screenWidth * 0.06,
    marginRight: screenWidth * 0.03
  },
  resultText: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  noResults: {
    textAlign: 'center',
    marginTop: screenHeight * 0.02,
    color: '#ffffff'
  }
})
