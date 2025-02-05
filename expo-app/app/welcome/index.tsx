import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { useRouter } from 'expo-router'

export default function WelcomeScreen () {
  const router = useRouter()

  return (
    <ImageBackground
      //   source={require('../assets/images/logo.svg')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          Oh{'\n'}My{'\n'}Pizza
        </Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.push('../home')} // Redirige a Home
        >
          <Text style={styles.guestText}>Continuar como invitado</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  buttonContainer: {
    width: '80%'
  },
  loginButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  guestButton: {
    borderColor: '#FF5722',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  guestText: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
