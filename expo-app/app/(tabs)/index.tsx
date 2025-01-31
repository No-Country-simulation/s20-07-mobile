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
      {/* 🔹 Header + SearchBar en un solo bloque fijo */}
      <SafeAreaView style={styles.fixedHeader}>
        <Header />
        <View style={styles.searchContainer}>
          <SearchBar />
        </View>
      </SafeAreaView>

      {/* 🔹 Todo lo demás se desplaza */}
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
    backgroundColor: '#000',
    paddingBottom: 0
  },
  searchContainer: {
    marginTop: -5,
    paddingHorizontal: screenWidth * 0.03,
    position: 'sticky'
  },
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: screenWidth * 0.03
  }
})
