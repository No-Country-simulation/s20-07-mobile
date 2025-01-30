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
  require('../../../assets/images/slider/slider1.png'),
  require('../../../assets/images/slider/slider2.png'),
  require('../../../assets/images/slider/slider3.png'),
  require('../../../assets/images/slider/slider4.png'),
  require('../../../assets/images/slider/slider5.png'),
  require('../../../assets/images/slider/slider6.png')
]

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
        <HoverButton />
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
          <SliderImage key={index} image={image} />
        ))}
      </ScrollView>
    </View>
  )
}

const HoverButton = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handlePress = () => {
    router.push('/featured-pizzas')
  }

  return (
    <Pressable
      style={[
        styles.button,
        isHovered && { backgroundColor: Colors.light.background }
      ]}
      onPress={handlePress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Text style={[styles.buttonText, isHovered && { color: 'black' }]}>
        Empezar
      </Text> */}
    </Pressable>
  )
}

const SliderImage = ({ image }: { image: any }) => {
  const [scale] = useState(new Animated.Value(1))

  const handleMouseEnter = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true
    }).start()
  }

  const handleMouseLeave = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start()
  }

  return (
    <Pressable
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.slide}
    >
      <Animated.Image
        source={image}
        style={[styles.image, { transform: [{ scale }] }]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: screenHeight * 0.03
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -screenHeight * 0.05 }],
    zIndex: 10,
    alignItems: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01
  },
  // button: {
  //   backgroundColor: Colors.dark.button,
  //   paddingVertical: 15,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  //   transition: 'background-color 0.3s'
  // },
  // buttonText: {
  //   color: Colors.light.text,
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // },
  slider: {
    flexDirection: 'row',
    marginTop: screenHeight * 0.015
  },
  sliderContent: {
    paddingHorizontal: screenWidth * 0.03
  },
  slide: {
    width: screenWidth / 2.5,
    marginRight: screenWidth * 0.03,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: screenHeight * 0.2,
    borderRadius: screenWidth * 0.025
  }
})
