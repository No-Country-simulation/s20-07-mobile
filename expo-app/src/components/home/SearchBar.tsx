import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors'

export default function SearchBar () {
  return (
    <View style={styles.searchBar}>
      <Icon name='search' size={20} color={Colors.light.muted} />
      <TextInput
        style={styles.searchInput}
        placeholder='Buscar pizzas...'
        placeholderTextColor={Colors.light.muted}
        underlineColorAndroid='transparent' // Elimina la línea en Android
        onFocus={e => e.preventDefault()} // Previene efectos visuales adicionales
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.border,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.light.text,
    borderWidth: 0, // Asegura que no haya bordes visibles
    outlineStyle: 'none' // Elimina el borde azul en web
  }
})
