import React, { useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable
} from 'react-native'
import { Colors } from '@/constants/Colors'

const sliderImages = [
  require('../../../assets/images/slider/slider1.png'),
  require('../../../assets/images/slider/slider2.png'),
  require('../../../assets/images/slider/slider3.png'),
  require('../../../assets/images/slider/slider4.png'),
  require('../../../assets/images/slider/slider5.png'),
  require('../../../assets/images/slider/slider6.png')
]

const screenWidth = Dimensions.get('window').width

export default function Slider () {
  const scrollViewRef = useRef<ScrollView>(null)
  let currentIndex = 0

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        currentIndex = (currentIndex + 1) % sliderImages.length
        scrollViewRef.current.scrollTo({
          x: currentIndex * (screenWidth / 2.5),
          animated: true
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      {/* Contenedor superpuesto para texto y botón */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Pizzas destacadas</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Empezar</Text>
        </Pressable>
      </View>

      {/* Slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
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
    marginBottom: 20,
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -50 }],
    zIndex: 10,
    alignItems: 'center'
  },
  title: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    backgroundColor: Colors.dark.button,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  buttonText: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  slider: {
    flexDirection: 'row',
    marginTop: 10
  },
  sliderContent: {
    paddingHorizontal: 10
  },
  slide: {
    width: screenWidth / 2.5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10
  }
})
