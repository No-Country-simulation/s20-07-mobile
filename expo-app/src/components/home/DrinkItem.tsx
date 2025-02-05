import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import BackArrow from '../BackArrow'

interface CategoryItemProps {
  id: string
  title: string
  image: any
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
      <BackArrow />
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
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center'
  }
})
