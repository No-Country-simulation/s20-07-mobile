import React from 'react'
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import { screenWidth, screenHeight } from '@/utils/dimensions'
import Header from '@/components/home/Header'
import SearchBar from '@/components/home/SearchBar'
import Banner from '@/components/home/Banner'
import CategoryList from '@/components/home/CategoryList'
import Slider from '@/components/home/Slider'
import Footer from '@/components/Footer'

export default function Home () {
  return (
    <View style={styles.container}>
      {/* 🔹 Fijo: Header + SearchBar */}
      <SafeAreaView style={styles.fixedHeader}>
        <Header />
        <SearchBar />
      </SafeAreaView>

      {/* 🔹 Todo lo demás será desplazable */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner />
        <CategoryList />
        <Slider />
        <Footer />
      </ScrollView>
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
    flex: 1,
    marginTop: screenHeight * 0.12 // Ajuste para que no se sobreponga con el Header + SearchBar
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: screenWidth * 0.03
  }
})
