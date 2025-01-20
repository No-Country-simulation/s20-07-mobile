// import React from 'react'
// import { ScrollView, StyleSheet, View } from 'react-native'
// import Slider from '@/components/home/Slider'
// import CategoryList from '@/components/home/CategoryList'
// import SearchBar from '@/components/home/SearchBar'
// import Banner from '@/components/home/Banner'
// import Footer from '@/components/Footer'

// export default function Home () {
//   return (
//     <View style={styles.container}>
//       {/* Contenido principal desplazable */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <SearchBar />
//         <Banner />
//         <CategoryList />
//       </ScrollView>

//       {/* Slider */}
//       <View style={styles.fixedContent}>
//         <Slider />
//         <Footer />
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000' // Fondo negro de toda la pantalla
//   },
//   scrollContent: {
//     paddingHorizontal: 10,
//     paddingBottom: 10
//   },
//   fixedContent: {
//     backgroundColor: '#000' // Asegura que el fondo del slider y footer también sea negro
//   }
// })

import React from 'react'
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import Slider from '@/components/home/Slider'
import CategoryList from '@/components/home/CategoryList'
import SearchBar from '@/components/home/SearchBar'
import Banner from '@/components/home/Banner'
import Footer from '@/components/Footer'

export default function Home () {
  return (
    <View style={styles.container}>
      {/* Contenedor fijo para SearchBar y Banner */}
      <SafeAreaView style={styles.fixedHeader}>
        <SearchBar />
        <Banner />
      </SafeAreaView>

      {/* Contenido desplazable */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
      >
        <CategoryList />
      </ScrollView>

      {/* Contenedor fijo para Slider y Footer */}
      <SafeAreaView style={styles.fixedFooter}>
        <Slider />
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
  scrollContent: {
    paddingTop: 200,
    paddingBottom: 200,
    paddingHorizontal: 10
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
