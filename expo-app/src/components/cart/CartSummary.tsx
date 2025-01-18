import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CartSummary ({ subtotal, discount }: any) {
  return (
    <View style={styles.summary}>
      <View style={styles.row}>
        <Text style={styles.summaryLabel}>Subtotal:</Text>
        <Text style={styles.summaryValue}>${subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.summaryLabel}>Descuentos:</Text>
        <Text style={styles.summaryValue}>-${discount}</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>
          ${Math.max(0, subtotal - discount)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  summary: {
    marginVertical: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666'
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right'
  }
})
