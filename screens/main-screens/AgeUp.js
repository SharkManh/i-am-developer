import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import IconButton from '../../components/ui/IconButton';
import { LinearGradient } from 'expo-linear-gradient';
import { CharacterContext } from '../../store/character-context';

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

    function claimReward() {
        characterCtx.addIncome(1600)
        navigation.goBack()
    }

    function claimX2Reward() {
        navigation.navigate("AdvertiseScreen")
        characterCtx.addIncome(3200)
        setIsX2RewardButtonVisible(false)
    }

    return (
        <View style={styles.container}>
            <IconButton style={styles.closeButton} onPress={exit} iconImageURL={require("../../assets/close.png")}/>
            <View style={styles.ageUpWrapper}>
                <Text style={styles.ageText}>Age</Text>
                <Image style={styles.miniStarImage01} source={require("../../assets/star.png")}/>
                <Image style={styles.miniStarImage02} source={require("../../assets/star.png")}/>

                <View style={styles.starWrapper}>
                    <Animated.Image style={[styles.lightEffect, rotateStyle]} source={require("../../assets/lightEffect.png")} />
                    <Image style={styles.starImage} source={require("../../assets/star.png")}/>
                    <Text style={styles.ageNum}>6</Text>
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
            <View style={styles.incomeContainer}>
                <Text style={styles.rewardText}>Reward</Text>
                <View style={styles.moneyWrapper}>
                    <Image style={styles.moneyImage} source={require("../../assets/money.png")}/>
                    <Text style={styles.moneyText}> 1600</Text>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                <Pressable
                    style={
                        ({ pressed }) => [pressed && styles.pressed ]
                    }
                    onPress={claimReward}
                >
                    <LinearGradient
                        colors={[ '#9A57DA', '#2A034A']}
                        style={styles.button}
                    >
                        <Text style={styles.buttonTitle}>Claim Now</Text>
                    </LinearGradient>
                </Pressable>
                {
                    isX2RewardButtonVisible && 
                    <Pressable
                        style={
                            ({ pressed }) => [pressed && styles.pressed ]
                        }
                        onPress={claimX2Reward}
                    >
                        <LinearGradient
                            colors={[ '#9A57DA', '#2A034A']}
                            style={styles.button}
                        >
                            <Text style={styles.buttonTitle}>x2 Reward</Text>
                        </LinearGradient>
                    </Pressable>
                }
                
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
    closeButton: {
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
    rewardText: {
        fontSize: 40, fontWeight: "bold",
        color: "black"
        // color: "white", 
        // textShadowColor: 'black',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 1,
    },
    moneyWrapper: {
        marginTop: 10,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1, borderColor: "black",
        borderBottomWidth: 5,
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