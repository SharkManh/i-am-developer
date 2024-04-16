import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import IconButton from '../../components/ui/IconButton';
import { LinearGradient } from 'expo-linear-gradient';

const AgeUp = () => {
    const [rotateDeg] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(rotateDeg, {
            toValue: 100,
            duration: 60000,    // 60s
            useNativeDriver: false, 
        }).start();
    }, [])

    const interpolatedRotate = rotateDeg.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '3600deg'],   // Xoay 10 vòng
      });

    const rotateStyle = {
        transform: [{ rotate: interpolatedRotate }]
    }
    
    function doubleIncome() {
        
    }

    return (
        <View style={styles.container}>
            <IconButton style={styles.closeButton} iconImageURL={require("../../assets/close.png")}/>
            <View style={styles.ageUpWrapper}>
                <Text style={styles.ageText}>Age</Text>
                <View style={styles.starWrapper}>
                    <Animated.Image style={[styles.lightEffect, rotateStyle]} source={require("../../assets/lightEffect.png")} />
                    <Image style={styles.starImage} source={require("../../assets/starNoFace.png")}/>
                    <Text style={styles.ageNum}>7</Text>
                </View>
            </View>
            <View style={styles.unlockWrapper}>
                <LinearGradient
                    colors={[ '#72063c', '#ddb52f']}
                    style={styles.linearGradient}
                >
                    <Text style={styles.unlockText}>Unlock</Text>
                </LinearGradient>
            </View>
            <View style={styles.incomeContainer}>
                <Text style={styles.getText}>Get</Text>
                <View style={styles.incomeWrapper}>
                    <Image style={styles.incomeImage} source={require("../../assets/income.png")}/>
                    <Text style={styles.incomeText}> 1600</Text>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                <Pressable
                    style={
                        ({ pressed }) => [ styles.button, pressed && styles.pressed ]
                    }
                >
                    <Text style={styles.buttonTitle}>Claim Now</Text>
                </Pressable>
                <Pressable
                    style={
                        ({ pressed }) => [ styles.button, pressed && styles.pressed ]
                    }
                >
                    <Text style={styles.buttonTitle}>X2 Income</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default AgeUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "yellow",
        display: "flex", flexDirection: "column",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute", right: 10, top: 10, zIndex: 1,
        // borderWidth: 1, borderColor: "red"
    },
    test: {
        alignSelf: "flex-end",
        borderWidth: 1, borderColor: "red"
    },

    // ---------------- Age Increasing-------------
    ageUpWrapper: {
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center", 
        width: "40%",
        marginTop: 50,
        // borderWidth: 1, borderColor: "red"
    }, 
    ageText: {
        fontSize: 30, fontWeight: "bold",
        zIndex: 1,
    },
    starWrapper: {
        position: "relative",
        // borderWidth: 1, borderColor: "blue",
        justifyContent: "center",
        alignItems: "center"
    },
    starImage: {
        width: 440/5, height: 440/5,
        // borderWidth: 1, borderColor: "red"
    }, 
    lightEffect: {
        width: 1000,
        height: 1000,
        opacity: 0.6,
        position: "absolute",
    },
    ageNum: {
        position: "absolute", 
        fontSize: 25, fontWeight: "bold"
    },
    
    // --------------- Unlock --------------
    unlockWrapper: {
        marginTop: 40,
        width: "80%",
        height: 300,
        borderWidth: 1, borderColor: "red",
        borderRadius: 20,
        backgroundColor: "white"
    },
    linearGradient: {
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    unlockText: {
        fontSize: 40, fontWeight: "bold", 
        color: "white",
        textAlign: "center",
    },

    // --------- Income ---------------
    incomeContainer: {
        marginTop: 40,
        alignItems: "center",
    },
    getText: {
        fontWeight: "bold", fontSize: 30
    },
    incomeWrapper: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1, borderColor: "black",
        borderBottomWidth: 5,
        backgroundColor: "#ebc634",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    incomeImage: {
        width: 40, height: 40,
    },
    incomeText: {
        fontSize: 25, fontWeight: "bold"
    }, 
    // -------------Button group ---------------
    buttonGroup: {
        position: "absolute", bottom: 20,
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        width: "70%"
    },
    button: {
        // paddingHorizontal: 10, 
        paddingVertical: 5,
        borderColor: "black", borderWidth: 1,
        borderBottomWidth: 5,
        borderRadius: 20,
        backgroundColor: "purple",
        width: 120,
    },
    buttonTitle: {
        fontSize: 20, fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    pressed: {
        opacity: 0.7
    }
})