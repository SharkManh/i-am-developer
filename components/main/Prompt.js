import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const Prompt = ({ message, function01, function02 }) => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const [containerPositionStyles, setContainerPositionStyles] = useState("")

    function getContainerSize(event) {
        const {width, height } = event.nativeEvent.layout;
        setContainerPositionStyles({
            position: "absolute",
            top: screenHeight/2,
            // borderWidth: 1, borderColor: "red",
            left: screenWidth/2,
            transform: [
                {translateX: -width/2},
                {translateY: -height/2}
            ],
        })
    }

    return (
        <View style={[styles.container, containerPositionStyles]} onLayout={getContainerSize}>
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>
                    During this time you don't have enough awareness, do you want to skip to 6 years old?
                </Text>
            </View>
            <View style={styles.buttonGroup}>
                <Pressable 
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    onPress={function01}
                >
                    <Image 
                        style={styles.imageButton}
                        source={require("../../assets/no.png")}
                    />
                </Pressable>
                <Pressable 
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    onPress={function02}
                >
                    <Image 
                        style={styles.imageButton}
                        source={require("../../assets/yes.png")}
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default Prompt

const styles = StyleSheet.create({
    container: {
        width: "80%",
        // height: 300,
        borderWidth: 1, borderColor: "black",
        borderRadius: 20,
        backgroundColor: "white",
        zIndex: 2,
    },
    messageWrapper: {
        marginTop: 15, 
        justifyContent: "center", alignItems: "center",
        // borderWidth: 1, borderColor: "green"
    },
    message: {
        width: "90%", 
        // borderWidth: 1, borderColor: "blue"
        fontSize: 15, fontWeight: "bold"
    },
    // buttonGroupWrapper: {
        // borderWidth: 1, borderColor: "green",
        // height: 1, 
    // },
    buttonGroup: {
        // position: "absolute", bottom: 0, 
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around", alignItems: "center",
    },
    imageButton: {
        width: 90, height: 90,
    },
    pressed: {
        opacity: 0.6
    }
})