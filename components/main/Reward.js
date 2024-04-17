import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import DarkOverlay from '../ui/DarkOverlay';

const Reward = ({ resultTitle, playAgain }) => {
    const [imageURL, setImageURL] = useState()
    const [closeButtonPositionStyle, setCloseButtonPositionStyle] = useState({})

    useEffect(() => {
        switch(resultTitle) {
            case "Win": {
                setImageURL(require("../../assets/winGame.png"))
                setCloseButtonPositionStyle({
                    right: -20, top: 50
                })
                ; break;
            }
            case "Tie": {
                setImageURL(require("../../assets/tieGame.png")); 
                setCloseButtonPositionStyle({
                    right: -20, top: 75
                })
                ; break;
            }
            case "Lose": {
                setImageURL(require("../../assets/loseGame.png")); 
                setCloseButtonPositionStyle({
                    right: -20, top: 120
                })
                ; break;
            }
        }
    }, [resultTitle])

    return (
        <View style={styles.container}>
            <Image 
                style={styles.resultImage}
                source={imageURL}
            />
            <Pressable
                style={[styles.closeButton, closeButtonPositionStyle]}
                onPress={playAgain}
            >
                <Image 
                    style={styles.closeImage}
                    source={require("../../assets/closeGameResult.png")}
                />
            </Pressable>
        </View>
    )
}

export default Reward

const styles = StyleSheet.create({
    container: {
        position: "relative",
        // borderWidth: 1, borderColor: "red",
        zIndex: 2
    },
    resultImage: {
        width: 300, height: 300,
    },
    closeButton: {
        position: "absolute",
        // borderWidth: 1, borderColor: "red"
    },
    closeImage: {
        width: 40, height: 40,
    }
})