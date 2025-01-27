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
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333333',
    borderWidth: 0,
    outlineStyle: 'none'
  },
  clearIcon: {
    marginLeft: 10
  },
  resultItem: {
    padding: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
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

// import React, { useState } from 'react'
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   Image
// } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Colors } from '@/constants/Colors'
// import { useSearch } from '@/contexts/SearchContext'
// import { useRouter } from 'expo-router'

// export default function SearchBar () {
//   const router = useRouter()
//   const { search, results } = useSearch()
//   const [query, setQuery] = useState('')

//   const handleSearch = (text: string) => {
//     setQuery(text)
//     search(text)
//   }

//   const clearSearch = () => {
//     setQuery('')
//     search('')
//   }

//   const handlePress = (id: number) => {
//     console.log('Navegando al detalle de la pizza:', id)
//     router.push(`/detail/${id}`) // Ajusta la ruta aquí
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.searchBar}>
//         <Icon name='search' size={20} color={Colors.light.muted} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder='Buscar pizzas...'
//           placeholderTextColor={Colors.light.muted}
//           value={query}
//           onChangeText={handleSearch}
//         />
//         {query.length > 0 && (
//           <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
//             <Icon name='times-circle' size={20} color={Colors.light.muted} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {/* Resultados */}
//       {query.trim() && (
//         <FlatList
//           data={results}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.resultItem}
//               onPress={() => handlePress(item.id)} // Navega al detalle
//             >
//               <View style={styles.resultContent}>
//                 <Text style={styles.resultText}>{item.name}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={() => (
//             <Text style={styles.noResults}>No se encontraron resultados.</Text>
//           )}
//         />
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     margin: 10
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#333333',
//     borderWidth: 0,
//     outlineStyle: 'none'
//   },
//   clearIcon: {
//     marginLeft: 10
//   },
//   resultItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     backgroundColor: '#000000',
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   resultContent: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   resultImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10
//   },
//   resultText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ffffff'
//   },
//   noResults: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#ffffff'
//   }
// })
