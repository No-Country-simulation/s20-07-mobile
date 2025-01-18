import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function CartActions ({ handleClearCart }: any) {
  return (
    <>
      <Pressable style={styles.clearCartButton} onPress={handleClearCart}>
        <Icon name='trash' style={styles.trashIcon} />
        <Text style={styles.clearCartText}>Eliminar carrito</Text>
      </Pressable>
      <Pressable style={styles.payButton}>
        <Text style={styles.payButtonText}>Ir a pagar</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  clearCartHover: {
    backgroundColor: '#FF4500'
  },
  trashIcon: {
    fontSize: 18,
    color: '#FFA500',
    marginRight: 5
  },
  clearCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500'
  },
  payButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgb(255, 47, 0)',
    borderRadius: 5
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
