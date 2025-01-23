import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors'
import { useSearch } from '@/contexts/SearchContext'

export default function SearchBar () {
  const { search, results } = useSearch()
  const [query, setQuery] = useState('')

  const handleSearch = (text: string) => {
    setQuery(text)
    search(text) // Realiza la búsqueda al cambiar el texto
  }

  const clearSearch = () => {
    setQuery('')
    search('') // Restablece los resultados
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
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name='times-circle' size={20} color={Colors.light.muted} />
          </TouchableOpacity>
        )}
      </View>
      {/* Resultados */}
      {query.trim() && (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem}>
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
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333333',
    borderWidth: 0, // Elimina bordes
    outlineStyle: 'none' // Evita la línea azul en navegadores web
  },
  clearIcon: {
    marginLeft: 10
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#000000'
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff'
  }
})
