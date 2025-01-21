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

export default function SearchBar () {
  const { search, results } = useSearch() // Obtiene la función `search` del contexto
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // const handleSearch = () => {
  //   search(query) // Llama a la búsqueda cuando el usuario realiza una acción
  // }

  const handleSearch = async (text: string) => {
    setQuery(text) // Actualiza la query conforme escribe
    if (!text.trim()) {
      search('') // Si no hay texto, muestra todo
      return
    }
    setLoading(true)
    await search(text)
    setLoading(false)
  }

  const clearSearch = () => {
    setQuery('') // Limpia el texto
    search('') // Muestra todos los elementos al limpiar
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
      {query.trim() ? ( // Muestra resultados solo si hay texto en la barra
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item.nombre}</Text>
              {/* <Text style={styles.resultCategory}>{item.categoria}</Text> */}
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noResults}>No se encontraron resultados.</Text>
          )}
        />
      ) : null}{' '}
      {/* Si no hay texto, no muestra nada */}
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
    borderWidth: 0, // Asegura que no haya bordes visibles
    outlineStyle: 'none' // Elimina el borde azul en web
  },
  clearIcon: {
    marginLeft: 10
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.muted
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.muted
  },
  resultCategory: {
    fontSize: 14,
    color: Colors.light.muted
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.light.muted
  }
})
