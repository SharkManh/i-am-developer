import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'

const MainButton = ({ positionStyle, onPress, imageURL }) => {
  return (
    <Pressable
        style={[styles.container, positionStyle]}
        onPress={onPress}
    >
        <Image 
            source={require("../../assets/mainButton.png")}
            style={styles.backgroundImage}
        />
        <Image 
            source={imageURL}
            style={styles.buttonImage}
        />
    </Pressable>
  )
}

export default MainButton

const styles = StyleSheet.create({
    container: {
        justifyContent: "center", alignItems: "center",
        // borderWidth: 1, borderColor: "red"
    },
    backgroundImage: {
        width: 50, height: 50,
        // borderWidth: 1, borderColor: "green"
    },
    buttonImage: {
        position: "absolute",
        width: 30, height: 30,
        // borderWidth: 1, borderColor: "blue"
    }
})