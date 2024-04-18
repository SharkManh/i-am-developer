import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { CharacterContext } from '../../store/character-context';
import CloseButton from '../../components/main/CloseButton';
import Money from '../../components/main/Money';

const AgeUp = ({ navigation }) => {
    const [rotateDeg] = useState(new Animated.Value(0));
    const characterCtx = useContext(CharacterContext);
    const [isX2RewardButtonVisible, setIsX2RewardButtonVisible] = useState(true)

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
    
    function exit() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <CloseButton positionStyle={styles.positionCloseButton} onPress={exit} iconImageURL={require("../../assets/XCloseButton.png")}/>
            <View style={styles.ageUpWrapper}>
                <Text style={styles.ageText}>Age</Text>
                <Image style={styles.miniStarImage01} source={require("../../assets/star.png")}/>
                <Image style={styles.miniStarImage02} source={require("../../assets/star.png")}/>

                <View style={styles.starWrapper}>
                    <Animated.Image style={[styles.lightEffect, rotateStyle]} source={require("../../assets/lightEffect.png")} />
                    <Image style={styles.starImage} source={require("../../assets/star.png")}/>
                    <Text style={styles.ageNum}>{characterCtx.age}</Text>
                </View>
            </View>
            <View style={styles.incomeContainer}>
                <View style={styles.moneyWrapper}>
                    <Image style={styles.moneyImage} source={require("../../assets/money.png")}/>
                    <Text style={styles.moneyText}> 0</Text>
                </View>
            </View>
            <View style={styles.unlockWrapper}>
                <LinearGradient
                    colors={[ '#9A57DA', '#2A034A']}
                    style={styles.linearGradient}
                >
                    <Text style={styles.unlockText}>UNLOCKED</Text>
                </LinearGradient>
            </View>
        </View>
    )
}

export default AgeUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9C43B",
        display: "flex", flexDirection: "column",
        alignItems: "center",
    },
    positionCloseButton: {
        position: "absolute", right: 10, top: 10, zIndex: 1,
        // borderWidth: 1, borderColor: "red"
    },
    test: {
        alignSelf: "flex-end",
        borderWidth: 1, borderColor: "red"
    },

    // ---------------- Age -------------
    ageUpWrapper: {
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center", 
        width: "50%",
        marginTop: 50,
        // borderWidth: 1, borderColor: "red"
    }, 
    ageText: {
        zIndex: 1,
        fontSize: 40, fontWeight: "bold",
        color: "white", 
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    ageNum: {
        position: "absolute", 
        fontSize: 25, fontWeight: "bold",
        color: "white"
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
    miniStarImage01: {
        position: "absolute", top: 20, left: -10,
        width: 15, height: 15,
    },
    miniStarImage02: {
        position: "absolute", top: 5, left: 10,
        width: 20, height: 20,
    },
    lightEffect: {
        width: 1000,
        height: 1000,
        opacity: 0.6,
        position: "absolute",
    },
    
    
    // --------------- Unlock --------------
    unlockWrapper: {
        marginTop: 40,
        width: "80%",
        height: 300,
        borderWidth: 1, borderColor: "black",
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
        // borderWidth: 1, borderColor: "red",
        alignItems: "center",
    },
    rewardText: {
        fontSize: 40, fontWeight: "bold",
        color: "black"
        // color: "white", 
        // textShadowColor: 'black',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 1,
    },
    moneyWrapper: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1, borderColor: "black",
        borderBottomWidth: 3,
        backgroundColor: "#D7A97E",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    moneyImage: {
        width: 40, height: 40,
    },
    moneyText: {
        fontSize: 30, fontWeight: "bold",
        color: "white",
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