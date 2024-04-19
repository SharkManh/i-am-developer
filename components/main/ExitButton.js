import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

const ExitScreen = ({ onPress }) => {
  return (
    <Pressable
        style={
            ({ pressed }) => [pressed && styles.pressed, styles.container]
        }
        onPress={onPress}
    >
        <Image 
            style={styles.outScreenImage}
            source={require("../../assets/exitScreen.png")}
        />
    </Pressable>
  )
}

export default ExitScreen

const styles = StyleSheet.create({
    container: {
        position: "absolute", top: 10, left: 10
    },
    outScreenImage: {
        width: 35, height: 35,
    },
})