import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors'
import { useSearch } from '@/contexts/SearchContext'
import { useRouter } from 'expo-router'

export default function SearchBar () {
  const router = useRouter()
  const { search, results } = useSearch()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (text: string) => {
    setQuery(text)
    if (!text.trim()) {
      search('')
      return
    }
    setLoading(true)
    await search(text)
    setLoading(false)
  }

  const clearSearch = () => {
    setQuery('')
    search('')
  }

  const handlePressItem = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pizzas':
        router.push('/pizzas')
        break
      case 'bebidas':
        router.push('/drinks')
        break
      case 'promociones':
        router.push('/promotions')
        break
      case 'postres':
        router.push('/desserts')
        break
      default:
        console.warn('Categoría desconocida:', category)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <Icon name='search' size={20} color={Colors.light.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar pizzas...'
          placeholderTextColor={Colors.light.muted}
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={() => handleSearch(query)}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name='times-circle' size={20} color={Colors.light.muted} />
          </TouchableOpacity>
        )}
        {loading && (
          <ActivityIndicator size='small' color={Colors.light.muted} />
        )}
      </View>
      {/* Resultados */}
      {query.trim() ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            console.log('Elemento renderizado:', item)
            return (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handlePressItem(item.categoria)}
              >
                <Text style={[styles.resultText, { color: '#FFFFFF' }]}>
                  {item.nombre}
                </Text>
              </TouchableOpacity>
            )
          }}
          ListEmptyComponent={() => (
            <Text style={styles.noResults}>No se encontraron resultados.</Text>
          )}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    minHeight: 50
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.dark.text1,
    borderWidth: 0,
    outlineStyle: 'none'
  },
  clearIcon: {
    marginLeft: 10
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF', // Borde blanco
    backgroundColor: '#333333' // Fondo oscuro
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  // resultCategory: {
  //   fontSize: 14,
  //   color: Colors.light.muted
  // },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.light.muted
  }
})
