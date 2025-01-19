import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function TermsAndConditions () {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.paragraph}>
        Al utilizar esta aplicación, aceptas los siguientes términos y
        condiciones:
      </Text>
      <Text style={styles.subTitle}>1. Uso de la Aplicación</Text>
      <Text style={styles.paragraph}>
        Esta aplicación está diseñada para facilitar la compra de pizzas y
        gestionar tus pedidos. Cualquier uso indebido, como actividades
        fraudulentas, está prohibido.
      </Text>
      <Text style={styles.subTitle}>2. Pagos</Text>
      <Text style={styles.paragraph}>
        Todos los pagos se procesan a través de Mercado Pago, garantizando
        transacciones seguras y confiables.
      </Text>
      <Text style={styles.subTitle}>3. Política de Devoluciones</Text>
      <Text style={styles.paragraph}>
        Una vez realizado el pedido, no se aceptan devoluciones ni cambios. Por
        favor, revisa tu pedido antes de confirmar.
      </Text>
      <Text style={styles.subTitle}>4. Privacidad</Text>
      <Text style={styles.paragraph}>
        Tus datos serán tratados de forma confidencial y solo serán utilizados
        para procesar tus pedidos.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.orangeText,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.orangeText,
    marginTop: 20,
    marginBottom: 10
  },
  paragraph: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 22,
    textAlign: 'justify'
  }
})
