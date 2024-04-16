import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/styles'

const IntroScreen = ({ navigateMainScreenStack }) => {
    const [content, setContent] = useState(<FirstIntro />)

    function FirstIntro() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/characterGrowth.png")}
                    />
                    <Text style={styles.description}>
                        "I am a Developer" is a career simulation experience that spans every life stage. From early childhood to the pinnacle of your career, you will make decisions that shape your path in the tech world. With each in-game year equating to 12 real-life minutes, every choice is critical.
                    </Text>
                </View>
                <Pressable
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    onPress={switchIntro}
                >
                    <Text style={styles.buttonName}>Next</Text>
                </Pressable>
            </View>
        )
    }

    function SecondIntro() {
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.description}>
                        Enjoy this journey, have fun playing game
                    </Text>
                </View>
                <Pressable
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    onPress={navigateMainScreenStack}
                >
                    <Text style={styles.buttonName}>Let's Play</Text>
                </Pressable>
            </View>
        )
    }

    function switchIntro() {
        setContent(<SecondIntro />)
    }

    return (
        <>
            {content}
        </>
    )
}

export default IntroScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", alignItems: "center",
    },
    content: {
        justifyContent: "center", alignItems: "center",
        width: "100%"
    }, 
    image: {
        width: 1792/5,
        height: 1024/5,
    }, 
    description: {
        width: "80%",
        marginTop: 20,
        textAlign: "justify",
    },
    button: {
        position: "absolute",
        bottom: 10, right: 10,
        backgroundColor: Colors.authButtonBackground,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    buttonName: {
        fontSize: 20, fontWeight: "bold",
        color: "white",
    },
    pressed: {
        opacity: 0.7
    }
})