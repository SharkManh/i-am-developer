import { View, Text, ImageBackground, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExitScreen from '../../components/main/ExitButton'
import Prompt from '../../components/main/Prompt'
import DarkOverlay from '../../components/ui/DarkOverlay'

const DateScreen = ({ navigation }) => {
    const [chanceLevel, setChanceLevel] = useState(0)
    const [isCoinButtonClickedFirstTime, setIsCoinButtonClickedFirstTime] = useState(false);
    const [chanceBarStyle, setChanceBarStyle] = useState({height: 0})
    const [isIncreaseChanceLevelPromptVisible, setIsIncreaseChanceLevelPromptVisible] = useState(false)
    const [isConfessPromptVisible, setIsConfessPromptVisible] = useState(false)
    const [isSuccessConfessVisible, setIsSuccessConfessVisible] = useState(false)
    const [isFailConfessVisible, setIsFailConfessVisible] = useState(false)
    

    function increaseChanceLevel() {
        if (chanceLevel < 300){ // = 100%
            setChanceLevel((prevLevel) => prevLevel += 6) // 300 height = 100% => 6 = 2%
        }
        setIsIncreaseChanceLevelPromptVisible(false)
    }

    useEffect(() => {
        setChanceBarStyle({
            height: chanceLevel
        })
    }, [chanceLevel])
    
    function handleCoinButtonClicked() {
        if (!isCoinButtonClickedFirstTime) {
            setIsCoinButtonClickedFirstTime(true)
            setIsIncreaseChanceLevelPromptVisible(true)
        } else {
            setIsIncreaseChanceLevelPromptVisible(false)
            increaseChanceLevel()
        }
    }

    function closePrompt() {
        setIsIncreaseChanceLevelPromptVisible(false)
        setIsConfessPromptVisible(false)
        setIsSuccessConfessVisible(false)
        setIsFailConfessVisible(false)
    }

    function handleHeartButtonClicked() {
        setIsConfessPromptVisible(true)
    }

    function handleConfession() {
        if ((Math.random() <= chanceLevel/300) ? true : false) {
            setIsSuccessConfessVisible(true)
        } else {
            setChanceLevel(false)
            setIsFailConfessVisible(true)
        }
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require("../../assets/dateBackground.png")}
            resizeMode='cover'
        >
            <ExitScreen onPress={() => {navigation.goBack()}}/>
            <View style={styles.chanceBarWrapper}>
                <View style={[styles.chanceBar, chanceBarStyle]}>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>Jessica 20</Text>
                <Text style={styles.description}>
                    This is the girl I've liked since elementary school. Every time I see them, my heart beats faster than usual. Their delicate eyes and cute smiles always confuse me. Every morning, I excitedly go to school just to be able to see that face in the classroom.
                </Text>
                <View style={styles.imageWrapper}>
                    <Image 
                        style={styles.image}
                        source={require("../../assets/addressIcon.png")}
                    />
                    <Text style={styles.text}>Phung Khoang, Hanoi, Vietnam</Text>
                </View>
                <View style={styles.imageWrapper}>
                    <Image 
                        style={styles.image}
                        source={require("../../assets/bagIcon.png")}
                    />
                    <Text style={styles.text}>Hanu University</Text>
                </View>
                <View style={styles.bottomButtonGroup}>
                    <Pressable
                        style={styles.button}
                        onPress={handleCoinButtonClicked}
                    >
                        <Image 
                            style={styles.buttonImage}
                            source={require("../../assets/money.png")}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={handleHeartButtonClicked}
                    >
                        <Image 
                            style={styles.buttonImage}
                            source={require("../../assets/hollowHeart.png")}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </View>
            {
                isIncreaseChanceLevelPromptVisible &&
                <>
                    <DarkOverlay />
                    <Prompt 
                        message={"Would you like to pay 500 coin to receive 2% chance of your crush's love?"}
                        buttonNoFunction={closePrompt}
                        buttonYesFunction={increaseChanceLevel}
                    />
                </>
            }
            {
                isConfessPromptVisible &&
                <>
                    <DarkOverlay />
                    <Prompt 
                        message={"Are you sure you want to confess your love to your crush?"}
                        buttonNoFunction={closePrompt}
                        buttonYesFunction={handleConfession}
                    />
                </>
                
            }
            {
                isSuccessConfessVisible && 
                <>
                    <DarkOverlay />
                    <Prompt 
                        message={"Congratulations on successfully confessing your love to your crush, now you and Jessica are a couple!!!!!"}
                        buttonYesFunction={closePrompt}
                        isNoButtonVisible={false}
                    />
                </>
            }
            {
                isFailConfessVisible && 
                <>
                    <DarkOverlay />
                    <Prompt 
                        message={"You failed to confess your love to your crush, Your crush has lost all feelings for you!!!!"}
                        buttonYesFunction={closePrompt}
                        isNoButtonVisible={false}
                    />
                </>
                
            }
        </ImageBackground>
    )
}

export default DateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    chanceBarWrapper: {
        position: "absolute", right: 24, top: 60,
        borderRadius: 20,
        backgroundColor: "#D9D9D9",
        width: 33, height: 300,
    },
    chanceBar: {
        position: "absolute", bottom: 0,
        borderRadius: 20,
        backgroundColor: "#F62060",
        width: 33, height: 0,
    },
    name: {
        marginTop: 15,
        fontSize: 32, fontWeight: "bold",
        color: "white",
    },
    info: {
        position: "absolute", bottom: 0,
        height: "50%",
        width: "100%",
        paddingHorizontal: 30,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    description: {
        color: "white",
        marginTop: 20,
    },
    text: {
        color: "white",
    },
    image: {
        width: 30, height: 30,
    },
    imageWrapper: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    bottomButtonGroup: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        width: 70, height: 70, 
        backgroundColor: "#D9D9D9",
        borderRadius: 35,
        justifyContent: "center", alignItems: "center"
    },
    buttonImage: {
        width: 40, height: 40,
    }
})