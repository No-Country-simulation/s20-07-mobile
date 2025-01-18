import React, { useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import { Colors } from '@/constants/Colors'

const sliderImages = [
  require('../../../assets/images/slider/slider.png'),
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
          x: currentIndex * screenWidth,
          animated: true
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizzas destacadas</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
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
    marginBottom: 20
  },
  title: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  slider: {
    flexDirection: 'row'
  },
  slide: {
    width: screenWidth,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: screenWidth - 20,
    height: 150,
    borderRadius: 10
  }
})
