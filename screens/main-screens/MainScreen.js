import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/styles';
import { CharacterContext } from '../../store/character-context';

const MainScreen = ({ navigation }) => {
    const characterCtx = useContext(CharacterContext);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [inputNameFormHeight, setInputNameFormHeight] = useState(0);
    const [inputNameFormWidth, setInputNameFormWidth] = useState(0);
    const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);

    function onLayout(event) {
        const {width, height } = event.nativeEvent.layout;
        alert(width + " " + height)
    }

    const backgroundStyle = {
        width: screenWidth,
        position: "absolute",
        height: "100%",
    }
    const characterStyle = {
        position: "absolute",
        width: 132, height: 206,
        bottom: 0,
        left: screenWidth/2,
        transform: [{translateX: -132/2}],
    }

    return (
        <View style={styles.container} onLayout={onLayout}>
            <Image style={backgroundStyle} source={require("../../assets/background.png")} />
            <Image style={characterStyle} source={require("../../assets/baby.png") } />
            <View style={styles.characterInfo}>
                <View style={styles.infoTop}>
                    <View style={styles.ageContainer}>
                        <View style={styles.ageWrapper}>
                            <Text style={styles.age}>0</Text>
                        </View>
                        <View style={styles.timeWrapper}>
                            <View style={styles.time}></View>
                        </View>
                    </View>
                    <View style={styles.healthPointContainer}>
                        <Image style={styles.hpImage} source={require("../../assets/hp.png")} />
                        <View style={styles.healthPointWrapper}>
                            <View style={styles.hp}></View>
                        </View>
                    </View>
                </View>
                <Text style={styles.charName}>{characterCtx.characterName}</Text>
                <Text style={styles.income}>${characterCtx.income}</Text>
            </View>
            <View style={isDarkOverlayVisible && styles.darkOverlay}></View>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    characterInfo: {
        marginTop: 10,
        marginHorizontal: 20,
        // borderWidth: 1, borderColor: "red",
    },
    infoTop: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ageContainer: {
    },
    ageWrapper: {
        // position: "absolute",
        backgroundColor: "green",
        borderRadius: 30, borderWidth: 2, borderColor: "white",
        justifyContent: "center", alignItems: "center",
        width: 40, height: 40,
        zIndex: 1,
    },
    age: {
        color: "white",
        fontSize: 20, fontWeight: "bold"
    }, 
    timeWrapper: {
        position: "absolute", left: 35, top: 8, zIndex: 0,
        justifyContent: "center",
        backgroundColor: "white",
        width: 50, height: 25,
        paddingLeft: 120,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }, 
    time: {
        position: "absolute",
        backgroundColor: "yellow",
        paddingLeft: 60, 
        borderRadius: 7,
        height: 20,
    },
    healthPointContainer: {
        // borderWidth: 1, borderColor: "blue"
    },
    healthPointWrapper: {
        position: "absolute", right: 0, top: 8, zIndex: 0,
        justifyContent: "center",
        backgroundColor: "white",
        width: 50, height: 25,
        paddingLeft: 120,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    hpImage: {
        position: "absolute", right: 110,
        width: 448/10,
        height: 427/10,
        zIndex: 1,
    },
    hp: {
        position: "absolute",
        backgroundColor: "red",
        paddingLeft: 100, 
        borderRadius: 7,
        height: 20,
    },
    charName: {
        fontSize: 20, fontWeight: "bold"
    },
    darkOverlay: {
        position: "absolute", 
        backgroundColor: "black",
        opacity: 0.5,
        width: "100%", height: "100%",
        zIndex: 1,
    },
    pressed: {
        opacity: 0.7,
    }
})