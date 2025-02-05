import React from 'react'
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert
} from 'react-native'

export default function CouponInput ({ coupon, setCoupon, setDiscount }: any) {
  const handleUseCoupon = () => {
    if (coupon === 'DESCUENTO10') {
      setDiscount(10)
      Alert.alert('Cupón aplicado', 'Se ha aplicado un descuento de $10')
    } else {
      Alert.alert('Cupón inválido', 'El cupón ingresado no es válido')
    }
  }

  return (
    <View style={styles.couponContainer}>
      <TextInput
        style={styles.couponInput}
        placeholder='Cupón de descuento'
        value={coupon}
        onChangeText={setCoupon}
      />
      <Pressable style={styles.useCouponButton} onPress={handleUseCoupon}>
        <Text style={styles.useCouponText}>Usar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  couponInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '70%'
  },
  useCouponButton: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%'
  },
  useCouponHover: {
    backgroundColor: '#FFD700'
  },
  useCouponText: {
    color: '#FFA500',
    fontWeight: 'bold'
  }
})
