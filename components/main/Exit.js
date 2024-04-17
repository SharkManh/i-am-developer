import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

const Exit = ({ onPress }) => {
  return (
    <Pressable
        style={
            ({ pressed }) => [pressed && styles.pressed, styles.container]
        }
        onPress={onPress}
    >
        <Image 
            style={styles.outScreenImage}
            source={require("../../assets/outScreen.png")}
        />
    </Pressable>
  )
}

export default Exit

const styles = StyleSheet.create({
    container: {
        position: "absolute", top: 10, left: 10
    },
    outScreenImage: {
        width: 35, height: 35,
    },
})