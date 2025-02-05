import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { useRouter } from 'expo-router'
import CartIcon from './CartIcon'

const Header = () => {
  const [isHoveredTitle, setIsHoveredTitle] = useState(false)

  const router = useRouter()

  return (
    <View style={styles.header}>
      {/* Título con hover */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        onMouseEnter={() => setIsHoveredTitle(true)}
        onMouseLeave={() => setIsHoveredTitle(false)}
      >
        <Text style={[styles.title, isHoveredTitle && styles.hoverTitle]}>
          <Image
            source={require('../../../assets/images/products/logo.svg')}
            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }}
          ></Image>
        </Text>
      </TouchableOpacity>
      <CartIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.08,
    paddingVertical: screenHeight * 0.015,
    backgroundColor: '#000'
  },
  title: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: '#FFF'
  },
  hoverTitle: {
    color: '#EB6334'
  },
  cartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 0.025
  }
})

export default Header
