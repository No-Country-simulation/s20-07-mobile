import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import { screenHeight, screenWidth } from '@/utils/dimensions'

interface CategoryItemProps {
  id: string
  title: string
  image: any // Tipo `require` para imágenes locales
  onPress: (id: string) => void
}

export default function CategoryItem ({
  id,
  title,
  image,
  onPress
}: CategoryItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(id)} style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 25
  },
  image: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.05
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: screenHeight * 0.01,
    textAlign: 'center'
  }
})
