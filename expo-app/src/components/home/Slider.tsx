import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Animated
} from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const sliderImages = [
  require('../../../assets/images/slider/img.svg'),
  require('../../../assets/images/slider/descuento.svg'),
  require('../../../assets/images/slider/veggie.svg')
]

export default function Slider () {
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % sliderImages.length
        setCurrentIndex(nextIndex)
        scrollViewRef.current.scrollTo({
          x: nextIndex * screenWidth,
          animated: true
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
        contentContainerStyle={styles.sliderContent}
      >
        {sliderImages.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth, // Asegura que ocupe toda la pantalla
    height: screenHeight * 0.3, // Ajuste dinámico de altura
    alignSelf: 'center',
    marginBottom: screenHeight * 0.03
  },
  slider: {
    flexDirection: 'row'
  },
  sliderContent: {
    alignItems: 'center'
  },
  slide: {
    width: screenWidth, // Asegura que cada slide ocupe toda la pantalla
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: screenWidth * 0.9, // Ajusta el ancho de la imagen
    height: screenHeight * 0.2, // Ajusta la altura de la imagen
    borderRadius: screenWidth * 0.02,
    resizeMode: 'contain' // Evita distorsión
  }
})
