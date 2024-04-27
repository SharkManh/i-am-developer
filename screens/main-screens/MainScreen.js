import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/styles';
import { CharacterContext } from '../../store/character-context';
import { LinearGradient } from 'expo-linear-gradient';
import Money from '../../components/main/Money';
import Prompt from '../../components/main/Prompt';
import MainButton from '../../components/main/MainButton';
import AgeUp from './AgeUp';
import DailyReward from '../../components/main/DailyReward';
import DarkOverlay from '../../components/ui/DarkOverlay';
import TextButton from '../../components/ui/TextButton';
import InputNameForm from '../../components/main/InputNameForm';

const MainScreen = ({ navigation }) => {
    const [characterName, setCharacterName] = useState("")
    const characterCtx = useContext(CharacterContext);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [inputNameFormHeight, setInputNameFormHeight] = useState(0);
    const [inputNameFormWidth, setInputNameFormWidth] = useState(0);
    const [isCharacterNamed, setIsCharacterNamed] = useState((characterCtx.characterName == "" ? false : true));
    const [isSkipBabyStagePromptVisible, setIsSkipBabyStagePromptVisible] = useState(true)
    const [characterImage, setCharacterImage] = useState(require("../../assets/character-image/characterAge00.png"))
    const [characterStyle, setCharacterStyle] = useState({});
    const [characterSizeStyle, setCharacterSizeStyle] = useState({});
    const [isDailyRewardVisible, setIsDailyRewardVisible] = useState(false)
    const [lifetime, setLifetime] = useState(96)
    const [timeStyle, setTimeStyle] = useState({
        paddingLeft: lifetime, 
    })

    useEffect(() => {
        if (isCharacterNamed) {
            setInterval(() => {
                setLifetime((prevValue) => prevValue += 12)
            }, 6000)
        }
    }, [isCharacterNamed])

    useEffect(() => {
        if (lifetime >= 120) {
            characterCtx.age += 1
            setLifetime(0)
        } else {
            setTimeStyle({
                paddingLeft: lifetime
            })
        }
    }, [lifetime])    

    function openDailyReward() {
        setIsDailyRewardVisible(true)
    }

    function closeDailyReward() {
        setIsDailyRewardVisible(false)
    }

    function skipBabyStage() {
        characterCtx.increaseAge(6);
        setIsSkipBabyStagePromptVisible(false)
    }

    useEffect(() => {
        if (characterCtx.age > 0 ) {    // Xóa hiển thị AgeUp do đặc tính của useEffect khi component render first
            navigation.navigate("AgeUp")
        }

        if (characterCtx.age < 6) {
            setCharacterImage(require("../../assets/character-image/characterAge00.png"))
            setCharacterSizeStyle({
                width: 200, height: 200,
            })
        } else if ( 6 <= characterCtx.age && characterCtx.age < 10 ){
            setCharacterImage(require("../../assets/character-image/characterAge06.png"))
            setCharacterSizeStyle({
                width: 240, height: 240,
            })
        } else if ( 11 <= characterCtx.age && characterCtx.age < 14 ){
            setCharacterImage(require("../../assets/character-image/characterAge11.png"))
            setCharacterSizeStyle({
                width: 280, height: 280,
            })
        } else if ( 15 <= characterCtx.age && characterCtx.age < 18 ){
            setCharacterImage(require("../../assets/character-image/characterAge15.png"))
            setCharacterSizeStyle({
                width: 320, height: 320,
            })
        } else if ( 18 <= characterCtx.age && characterCtx.age < 24 ){
            setCharacterImage(require("../../assets/character-image/characterAge18.png"))
            setCharacterSizeStyle({
                width: 360, height: 360,
            })
        } else if ( 24 <= characterCtx.age && characterCtx.age < 30 ){
            setCharacterImage(require("../../assets/character-image/characterAge24.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 30 <= characterCtx.age && characterCtx.age < 35 ){
            setCharacterImage(require("../../assets/character-image/characterAge30.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 35 <= characterCtx.age && characterCtx.age < 40 ){
            setCharacterImage(require("../../assets/character-image/characterAge35.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 40 <= characterCtx.age && characterCtx.age < 50 ){
            setCharacterImage(require("../../assets/character-image/characterAge40.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 50 <= characterCtx.age && characterCtx.age < 60 ){
            setCharacterImage(require("../../assets/character-image/characterAge50.png"))
            setCharacterSizeStyle({
                width: 380, height: 380,
            })
        } else if ( 60 <= characterCtx.age && characterCtx.age < 100 ){
            setCharacterImage(require("../../assets/character-image/characterAge60.png"))
            setCharacterSizeStyle({
                width: 370, height: 370,
            })
        } else if ( 100 <= characterCtx.age ){
            setCharacterImage(require("../../assets/character-image/characterAge100.png"))
            setCharacterSizeStyle({
                width: 370, height: 370,
            })
        }
        
    }, [characterCtx.age])

    function getInputNameFormSize(event) {
        const { width, height } = event.nativeEvent.layout;
        setInputNameFormWidth(width);
        setInputNameFormHeight(height);
    }
    function getCharacterSize(event) {
        const { width, height } = event.nativeEvent.layout;
        setCharacterStyle({
            position: "absolute", bottom: 90,
            left: screenWidth/2,
            transform: [{translateX: -width/2}],
        })
    }

    function handleInputName() { 
        characterCtx.createCharacterName(characterName)
        setIsCharacterNamed(true)
        characterCtx.addIncome(10)
    }
    
    function navigateGamesScreen() {
        navigation.navigate("GamesScreen")
    }

    function navigateDateScreen() {
        navigation.navigate("DateScreen")
    }


    // --------- Skip Age (Test) -----------
    const ageSkipStyle = {
        position: "absolute", top: 150, right: 10, 
        borderColor: "red", borderWidth: 2,
        borderRadius: 10, 
        backgroundColor: "black",
        zIndex: 1,
        paddingHorizontal: 10, paddingVertical: 5
    }
    const skipAgeTextStyle = {
        fontSize: 25, fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }
    function skipAge() {
        characterCtx.increaseAge(1)
    }
    // -------------------------------------
    return (
        <View style={styles.container}>
             <Pressable style={ageSkipStyle} onPress={skipAge}>
                <Text style={skipAgeTextStyle}>Skip Age &gt;&gt;</Text>
            </Pressable>

            <Image style={styles.backgroundStyle} source={require("../../assets/background.png")} />
            <Image style={[characterStyle, characterSizeStyle]} source={characterImage} onLayout={getCharacterSize}/>
            <View style={styles.characterInfo}>
                <View style={styles.infoTop}>
                    <View style={styles.ageContainer}>
                        <View style={styles.ageWrapper}>
                            <Text style={styles.age}>{characterCtx.age}</Text>
                        </View>
                        <View style={styles.timeWrapper}>
                            <LinearGradient
                                colors={[ 'orange', '#9EC600']}
                                style={[styles.time, timeStyle]}
                            >
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={styles.healthPointContainer}>
                        <View style={styles.hearthImageWrapper}>
                            <Image style={styles.heartImage} source={require("../../assets/health.png")} />
                        </View>
                        <View style={styles.healthPointWrapper}>
                            <LinearGradient 
                                colors={[ "#FF3232", "#C60000"]}
                                style={styles.healthPoint}
                            />
                        </View>
                    </View>
                    <View style={styles.happinessPointContainer}>
                        <View style={styles.happinessImageWrapper}>
                            <Image style={styles.happinessImage} source={require("../../assets/happiness.png")} />
                        </View>
                        <View style={styles.happinessPointWrapper}>
                            <LinearGradient 
                                colors={[ "orange", "#DFCF3C"]}
                                style={styles.happinessPoint}
                            />
                        </View>
                    </View>
                </View>
                <Money style={styles.moneyComponent}/>
            </View>
            <View style={styles.middleScreenButtonGroup}>
                <Pressable
                    style={( {pressed }) => [pressed && styles.pressed]}
                    onPress={openDailyReward}
                >
                    <Image
                        style={styles.dailyRewardButtonImage}
                        source={require("../../assets/dailyRewardButton.png")}
                    />
                </Pressable>
            </View>
            {
                isDailyRewardVisible &&
                <>
                    <DarkOverlay />
                    <DailyReward onPress={closeDailyReward} />
                </>
            }

            {
                !isCharacterNamed && 
                <>
                    <View style={styles.darkOverlay}></View>
                    <InputNameForm 
                        onPress={handleInputName}
                        onLayout={getInputNameFormSize}
                        setCharacterName={setCharacterName}
                    />
                </>
            }
            
            {
                (isCharacterNamed && isSkipBabyStagePromptVisible)&& 
                <>
                    <View style={styles.darkOverlay}></View>
                    <Prompt 
                        message={"During this time you don't have enough awareness, do you want to skip to 6 years old?"}
                        buttonNoFunction={() => setIsSkipBabyStagePromptVisible(false)}
                        buttonYesFunction={skipBabyStage}
                    />
                </>
            }
            <View style={styles.bottomButtonGroup}>
                <MainButton
                    positionStyle={styles.bottomButton}
                    // imageURL={require("../../assets/mainButton.png")}
                />
                <MainButton
                    positionStyle={styles.bottomButton}
                    // imageURL={require("../../assets/mainButton.png")}
                />
                <MainButton
                    positionStyle={styles.bottomButton}
                    imageURL={require("../../assets/letterIcon.png")}
                    onPress={navigateDateScreen}
                />
                <MainButton
                    positionStyle={styles.bottomButton}
                    onPress={navigateGamesScreen}
                    imageURL={require("../../assets/game.png")}
                />
            </View>
        </View>
    )
}


export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundStyle: {
        width: "100%",
        position: "absolute",
        height: "100%",
    },
    characterInfo: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    infoTop: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ageContainer: {
    },
    ageWrapper: {
        backgroundColor: "#3F1E00",
        borderRadius: 30, borderWidth: 2, borderColor: "#FFBD13",
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
        backgroundColor: "#3F1E00",
        width: 50, height: 25,
        paddingLeft: 120,
        borderWidth: 2, borderColor: "#FFBD13",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }, 
    time: {
        position: "absolute",
        backgroundColor: "yellow",
        borderRadius: 7,
        borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
        height: 20,
    },
    healthPointContainer: {
        // borderWidth: 1, borderColor: "blue"
    },
    healthPointWrapper: {
        position: "absolute", right: 0, top: 8, zIndex: 0,
        justifyContent: "center",
        backgroundColor: "#3F1E00",
        borderWidth: 2, borderColor: "#FFBD13",
        width: 50, height: 25,
        paddingLeft: 120,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    hearthImageWrapper: {
        position: "absolute", right: 115,
        backgroundColor: "#3F1E00",
        borderRadius: 30, borderWidth: 2, borderColor: "#FFBD13",
        justifyContent: "center", alignItems: "center",
        width: 40, height: 40,
        zIndex: 1,
    },
    heartImage: {
        width: 30,
        height: 30,
    },
    healthPoint: {
        position: "absolute",
        backgroundColor: "red",
        paddingLeft: 100, 
        borderRadius: 7,
        height: 20,
    },
    happinessPointContainer: {
        position: "absolute", right: 0, top: 58, zIndex: 0,
        justifyContent: "center",
    },
    happinessPointWrapper: {
        backgroundColor: "#3F1E00",
        borderWidth: 2, borderColor: "#FFBD13",
        width: 50, height: 25,
        paddingLeft: 120,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    happinessImageWrapper: {
        position: "absolute", right: 115,
        backgroundColor: "#3F1E00",
        borderRadius: 30, borderWidth: 2, borderColor: "#FFBD13",
        justifyContent: "center", alignItems: "center",
        width: 40, height: 40,
        zIndex: 1,
    },
    happinessImage: {
        width: 30,
        height: 30,
    },
    happinessPoint: {
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
    },

    // ------------------ Money ------------
    moneyComponent: {
        marginTop: 10, 
    },

    // ------------------ Task ----------------
    middleScreenButtonGroup: {
        marginTop: 10,
        // borderWidth: 1, borderColor: "red",
        marginLeft: 15,
    },
    dailyRewardButtonImage: {
        width: 60, height: 60,
    },
    // ------------------ Input Character Name ----------------
    // inputNameFormStyleWrapper: {
    //     position: "absolute", top: 0,
    //     width: "100%", height: "100%",
    //     justifyContent: "center", alignItems: "center",
    //     zIndex: 1, 
    // },
    // inputNameFormStyle: {
    //     width: 330, height: 594,
    //     justifyContent: "center", alignItems: "center",
    //     borderWidth: 1, borderColor: "red",
    // },

    // inputNameFormImage: {
    //     width: 330, height: 594,
    //     position: "absolute",
    //     borderWidth: 1, borderColor: "blue",
    // },
    // inputNameHandlerButton: {
    //     position: "absolute", bottom: 90,
    // },
    // inputNameHandlerButtonImage: {
    //     width: 327/2.5, height: 115/2.5,
    // },

    // // inputNamePrompt: {
    // //     fontSize: 25, fontWeight: 'bold',
    // //     color: "white",
    // // },
    // inputBox: {
    //     width: 200,
    //     position: "absolute", top: 224,
    //     fontSize: 20, fontWeight: "bold",
    //     color: "white",
    //     padding: 10,
    // }, 
    // inputNameButton: {
    //     backgroundColor: Colors.authButtonBackground,
    //     width: "80%",
    //     paddingVertical: 6,
    //     paddingHorizontal: 12,
    // }, 
    // inputNameButtonText: {
    //     textAlign: "center",
    //     color: "white",
    // }, 
    pressed: {
        opacity: 0.7,
    },
    bottomButtonGroup: {
        position: "absolute", bottom: 10, 
        width: "100%", 
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
})