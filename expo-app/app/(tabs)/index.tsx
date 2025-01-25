import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  useWindowDimensions
} from 'react-native'
import Slider from '@/components/home/Slider'
import CategoryList from '@/components/home/CategoryList'
import SearchBar from '@/components/home/SearchBar'
import Banner from '@/components/home/Banner'
import Footer from '@/components/Footer'
import { mockPizza } from '@/mocks/mocksPizza'

export default function Home () {
  const { height, width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      {/* Header fijo (SearchBar + Banner) */}
      <SafeAreaView style={styles.fixedHeader}>
        <SearchBar />
        <Banner />
      </SafeAreaView>

      {/* Categorías desplazables */}
      <ScrollView
        style={[styles.scrollContainer, { height: height - 300 }]} // Ajustar altura dinámica
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CategoryList />
      </ScrollView>

      {/* Slider fijo */}
      <View style={[styles.sliderContainer, { width }]}>
        <Slider />
      </View>

      {/* Footer fijo */}
      <SafeAreaView style={[styles.fixedFooter, { width }]}>
        <Footer />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#000'
  },
  scrollContainer: {
    marginTop: 200,
    marginBottom: 160
  },
  scrollContent: {
    paddingHorizontal: 10
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 60,
    zIndex: 10,
    backgroundColor: '#000'
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#000'
  }
})
