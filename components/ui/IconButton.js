import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'

const IconButton = ({ style, iconImageURL, onPress }) => {
  return (
    <Pressable
        style={
            ({ pressed }) => [pressed && styles.pressed , style]
        }
        onPress={onPress}
    >
        <Image style={styles.image} source={iconImageURL}/>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center", alignItems: "center",
        // borderWidth: 1, borderColor: "red",
        // width: 40, height: 40,
    },
    pressed: {
        opacity: 0.7
    }, 
    image: {
        width: 40, height: 40,
    }
})