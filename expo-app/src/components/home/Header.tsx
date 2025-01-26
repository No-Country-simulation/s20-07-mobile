import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CartIcon from './CartIcon'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Oh My Pizza</Text>
      <CartIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default Header
