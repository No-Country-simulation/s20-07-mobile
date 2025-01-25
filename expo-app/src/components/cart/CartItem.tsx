import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

export default function CartItem ({ item, updateQuantity }: any) {
  return (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>
          {item.description || 'Descripción del producto'}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantityControls}>
        <Pressable
          style={styles.decreaseButton}
          onPress={() =>
            updateQuantity(item.id, Math.max(0, item.quantity - 1))
          }
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text>{item.quantity}</Text>
        <Pressable
          style={styles.increaseButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9'
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  productDetails: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 14,
    color: '#666'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'left',
    color: '#000'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },
  decreaseButton: {
    backgroundColor: '#FF7F7F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 5
  },
  increaseButton: {
    backgroundColor: '#7FFF7F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 5
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
