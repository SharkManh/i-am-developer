import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const SpinReward = ({incomeReward, playAgain }) => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [inputNameFormHeight, setInputNameFormHeight] = useState(0);
    const [inputNameFormWidth, setInputNameFormWidth] = useState(0);
    const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);

    const [containerPositionStyles, setContainerPositionStyles] = useState("")

    function getContainerSize(event) {
        const { height } = event.nativeEvent.layout;
        setContainerPositionStyles({
            position: "absolute",
            top: screenHeight/2,
            transform: [{translateY: -height/2}],
        })
    }

    return (
        <View style={[styles.container, containerPositionStyles]} onLayout={getContainerSize}>
            <LinearGradient
                colors={[ '#72063c', '#ddb52f']}
                style={styles.linearGradient}
            >
                <Text style={styles.resultTitle}>WIN</Text>
            </LinearGradient>
            <View style={styles.reward}>
                <Text style={styles.getText}>Get</Text>
                <View style={styles.incomeRewardWrapper}>
                    <Image 
                        style={styles.incomeImage}
                        source={require("../../assets/income.png")}
                    />
                    <Text style={styles.incomeReward}>  {incomeReward}</Text>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <Pressable 
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    // onPress={onCancel}
                >
                    <Text style={styles.buttonTitle}>Out</Text>
                </Pressable>
                <Pressable 
                    style={
                        ({ pressed }) => [styles.button, pressed && styles.pressed]
                    }
                    onPress={playAgain}
                >
                    <Text style={styles.buttonTitle}>Again</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SpinReward

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "80%",
        height: 300,
        borderWidth: 1, borderColor: "red",
        borderRadius: 20,
        backgroundColor: "white",
        zIndex: 2,
    },
    linearGradient: {
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    resultTitle: {
        fontSize: 35, fontWeight: "bold", 
        color: "white",
        textAlign: "center",
    },
    getText: {
        fontSize: 30, fontWeight: "bold"
    },
    incomeImage: {
        width: 50, height: 50
    },
    reward: {
        flex: 1,
        alignItems: "center", justifyContent: "center"
    }, 
    incomeRewardWrapper: {
        flexDirection: "row",
        justifyContent: "center", alignItems: "center"
    }, 
    incomeReward: {
        fontWeight: "bold", fontSize: 40,
    },

    // --------------- Button group --------------
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "20%"
    },
    button: {
        width: 120,
        borderWidth: 1, borderColor: "black",
        borderBottomWidth: 5,
        backgroundColor: "#ebc634",
        borderRadius: 20,
    }, 
    buttonTitle: {
        textAlign: "center",
        fontWeight: "bold", fontSize: 20,
    },
    pressed: {
        opacity: 0.6
    }
})