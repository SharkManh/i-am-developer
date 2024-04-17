import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/styles'

const IntroScreen = ({ navigation, route, navigateMainScreenStack }) => {
    const intro1 = {
        imageURL: require("../../assets/characterGrowth.png"),
        description: `Welcome to "I am developer" - a game simulating the fascinating journey from childhood to old age of a child. Developed by a talented and creative team, this game is a unique adventure where you will experience every aspect of life.
        `
    }
    const intro2 = {
        imageURL: require("../../assets/characterGrowth.png"),
        description: `Start your journey from when you were just a 1-year-old child, when the world was still something entirely new and waiting for you to explore. From the first steps in development and learning, you will face important decisions about education, work, and life.`
    }
    const intro3 = {
        imageURL: require("../../assets/characterGrowth.png"),
        description: `In "I am developer", you will have to complete diverse tasks, from learning and skill-building to working and building a career. Work diligently to achieve your goals and become a successful developer.`
    }
    const intro4 = {
        imageURL: require("../../assets/characterGrowth.png"),
        description: `Join this adventure and explore every aspect of life, from daily joys to big challenges and deep emotions. Start today and create a memorable journey from childhood to old age!`
    }

    const [content, setContent] = useState(intro1)


    function switchIntro() {
        if (content.description == intro1.description) {
            setContent(intro2);
        } else if (content.description == intro2.description) {
            setContent(intro3)
        } else if (content.description == intro3.description) {
            setContent(intro4)
        } else if (content.description == intro4.description) {
            route.params.navigateMainScreenStack()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={content.imageURL}
                />
                <Text style={styles.description}>
                    {content.description}
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