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

const MainScreen = ({ navigation }) => {
    const [characterName, setCharacterName] = useState("")
    const characterCtx = useContext(CharacterContext);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [inputNameFormHeight, setInputNameFormHeight] = useState(0);
    const [inputNameFormWidth, setInputNameFormWidth] = useState(0);
    const [isCharacterNamed, setIsCharacterNamed] = useState((characterCtx.characterName == "" ? false : true));
    const [isSkipBabyStagePromptVisible, setIsSkipBabyStagePromptVisible] = useState(true)
    const [characterImage, setCharacterImage] = useState(require("../../assets/characterAge00.png"))
    const [characterStyle, setCharacterStyle] = useState({});
    const [characterSizeStyle, setCharacterSizeStyle] = useState({});
    
    function skipBabyStage() {
        characterCtx.increaseAge(6);
        setIsSkipBabyStagePromptVisible(false)
    }

    useEffect(() => {
        if (characterCtx.age > 0 ) {    // Xóa hiển thị AgeUp do đặc tính của useEffect khi component render first
            navigation.navigate("AgeUp")
        }

        if (characterCtx.age < 6) {
            setCharacterImage(require("../../assets/characterAge00.png"))
            setCharacterSizeStyle({
                width: 200, height: 200,
            })
        } else if ( 6 <= characterCtx.age && characterCtx.age < 10 ){
            setCharacterImage(require("../../assets/characterAge06.png"))
            setCharacterSizeStyle({
                width: 240, height: 240,
            })
        } else if ( 11 <= characterCtx.age && characterCtx.age < 14 ){
            setCharacterImage(require("../../assets/characterAge11.png"))
            setCharacterSizeStyle({
                width: 280, height: 280,
            })
        } else if ( 15 <= characterCtx.age && characterCtx.age < 18 ){
            setCharacterImage(require("../../assets/characterAge15.png"))
            setCharacterSizeStyle({
                width: 320, height: 320,
            })
        } else if ( 18 <= characterCtx.age && characterCtx.age < 24 ){
            setCharacterImage(require("../../assets/characterAge18.png"))
            setCharacterSizeStyle({
                width: 360, height: 360,
            })
        } else if ( 24 <= characterCtx.age && characterCtx.age < 30 ){
            setCharacterImage(require("../../assets/characterAge24.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 30 <= characterCtx.age && characterCtx.age < 35 ){
            setCharacterImage(require("../../assets/characterAge30.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 35 <= characterCtx.age && characterCtx.age < 40 ){
            setCharacterImage(require("../../assets/characterAge35.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 40 <= characterCtx.age && characterCtx.age < 50 ){
            setCharacterImage(require("../../assets/characterAge40.png"))
            setCharacterSizeStyle({
                width: 400, height: 400,
            })
        } else if ( 50 <= characterCtx.age && characterCtx.age < 60 ){
            setCharacterImage(require("../../assets/characterAge50.png"))
            setCharacterSizeStyle({
                width: 380, height: 380,
            })
        } else if ( 60 <= characterCtx.age && characterCtx.age < 100 ){
            setCharacterImage(require("../../assets/characterAge60.png"))
            setCharacterSizeStyle({
                width: 370, height: 370,
            })
        } else if ( 100 <= characterCtx.age ){
            setCharacterImage(require("../../assets/characterAge100.png"))
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
            // borderWidth: 1, borderColor: "red",
            left: screenWidth/2,
            transform: [{translateX: -width/2}],
        })
    }

    function handleInputName() { 
        // Sẽ tạo phần validate name
        characterCtx.createCharacterName(characterName)
        setIsCharacterNamed(true)
    }
    
    function navigateGamesScreen() {
        navigation.navigate("GamesScreen")
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

    const backgroundStyle = {
        width: "100%",
        position: "absolute",
        height: "100%",
    }

    // --------- Skip Age (Test) -----------
    const ageSkipStyle = {
        position: "absolute", top: 55, right: 10, 
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

            <Image style={backgroundStyle} source={require("../../assets/background.png")} />
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
                                style={styles.time}
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
                </View>
                <Money style={styles.moneyComponent}/>
            </View>
            {
                !isCharacterNamed && 
                <>
                <View style={styles.darkOverlay}></View>
                <View style={inputNameFormStyle} onLayout={getInputNameFormSize} >
                    <Text style={styles.inputNamePrompt}>Enter character name</Text>
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={(value) => setCharacterName(value)}
                    />
                    <Pressable 
                        style={
                            ({ pressed }) => 
                                [styles.inputNameButton, pressed && styles.pressed]}
                        onPress={handleInputName}
                    >
                        <Text style={styles.inputNameButtonText}>OK</Text>
                    </Pressable>
                </View>
                </>
            }
            
            {
                (isCharacterNamed && isSkipBabyStagePromptVisible)&& 
                <>
                    <View style={styles.darkOverlay}></View>
                    <Prompt 
                        function01={() => setIsSkipBabyStagePromptVisible(false)}
                        function02={skipBabyStage}
                    />
                </>
            }
            <View style={styles.mainButtonGroup}>
                <MainButton
                    positionStyle={styles.gameButton}
                    // imageURL={require("../../assets/mainButton.png")}
                />
                <MainButton
                    positionStyle={styles.gameButton}
                    // imageURL={require("../../assets/mainButton.png")}
                />
                <MainButton
                    positionStyle={styles.gameButton}
                    // imageURL={require("../../assets/mainButton.png")}
                />
                <MainButton
                    positionStyle={styles.gameButton}
                    onPress={navigateGamesScreen}
                    imageURL={require("../../assets/game.png")}
                    // onPress={}
                />
            </View>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative",
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
        paddingLeft: 60, 
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

    // ----------------- Money ------------
    moneyComponent: {
        marginTop: 10, 
    },
    // ------------------ Input Character Name ----------------
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
    },
    mainButtonGroup: {
        position: "absolute", bottom: 10, 
        width: "100%", 
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
})