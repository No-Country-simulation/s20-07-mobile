import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const BackArrow = () => {
  const navigation = useNavigation()

  return (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name='arrow-back' size={24} color='#ffffff' style={styles.icon} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 20,
    left: 30,
    zIndex: 1000
  },
  icon: {
    alignSelf: 'center'
  }
})

export default BackArrow
