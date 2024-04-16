import { View, Text, StyleSheet, Image, TextInput, Button, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/styles';
import { CharacterContext } from '../../store/character-context';
import { useNavigation } from '@react-navigation/native';

const NamingScreen = ({ navigation }) => {
    const characterCtx = useContext(CharacterContext);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [inputNameFormHeight, setInputNameFormHeight] = useState(0);
    const [inputNameFormWidth, setInputNameFormWidth] = useState(0);
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

    function onLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        setInputNameFormWidth(width);
        setInputNameFormHeight(height);
    }

    const inputNameFormStyle = {
        position: "absolute",
        top: screenHeight/2, left: screenWidth/2,
        transform: [
            {translateX: -inputNameFormWidth/2},
            {translateY: -inputNameFormHeight/2}
        ],
        width:"80%",
        height: 150,
        justifyContent: "space-around", alignItems: "center",
        backgroundColor: Colors.authBackground,
        borderRadius: 8,
        zIndex: 1, 
    }

    function switchScreen() {
        navigation.navigate("Welcome")
    }

    return (
        <View style={styles.container}>
            <Image style={backgroundStyle} source={require("../../assets/background.png")} />
            <Image style={characterStyle} source={require("../../assets/baby.png") } />
            <View style={styles.ageContainer}>
                <View style={styles.ageWrapper}>
                    <Text style={styles.age}>0</Text>
                </View>
                <View style={styles.timeWrapper}>
                    <View style={styles.time}></View>
                </View>
            </View>
            <View style={styles.darkOverlay}></View>
            <View style={inputNameFormStyle} onLayout={onLayout} >
                <Text style={styles.inputNamePrompt}>Enter character name</Text>
                <TextInput 
                    style={styles.inputBox}
                    onChangeText={(value) => characterCtx.createCharacterName(value)}
                />
                <Pressable 
                    style={
                        ({ pressed }) => 
                            [styles.inputNameButton, pressed && styles.pressed]}
                    onPress={switchScreen}
                >
                    <Text style={styles.inputNameButtonText}>OK</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default NamingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ageContainer: {
        position: "relative",
        marginLeft: 15, marginTop: 15,
    },
    ageWrapper: {
        position: "absolute",
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
        position: "absolute", left: 35, top: 8,
        justifyContent: "center",
        backgroundColor: "white",
        width: 50, height: 25,
        paddingLeft: 120,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }, 
    time: {
        position: "absolute",
        paddingLeft: 60, 
        height: 20,
        backgroundColor: "yellow"
    },
    darkOverlay: {
        position: "absolute", 
        backgroundColor: "black",
        opacity: 0.5,
        width: "100%", height: "100%",
        zIndex: 1,
    },
    inputNamePrompt: {
        fontSize: 25, fontWeight: 'bold',
        color: "white",
    },
    inputBox: {
        width: "80%",
        backgroundColor: Colors.authInputBoxBackground,
        fontSize: 20,
        padding: 10,
        borderRadius: 10
    }, 
    inputNameButton: {
        backgroundColor: Colors.authButtonBackground,
        width: "80%",
        paddingVertical: 6,
        paddingHorizontal: 12,
    }, 
    inputNameButtonText: {
        textAlign: "center",
        color: "white",
    }, 
    pressed: {
        opacity: 0.7,
    }

})