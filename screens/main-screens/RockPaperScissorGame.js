import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react' 
import NoMoreTicket from '../../components/main/NoMoreTicket';
import DarkOverlay from '../../components/ui/DarkOverlay';
import Reward from '../../components/main/Reward';
import Money from '../../components/main/Money';
import Ticket from '../../components/main/Ticket';
import Exit from "../../components/main/Exit"

const RockPaperScissorGame = ({ navigation }) => {
    const [opponentOption, setOpponentOption] = useState(0)
    const [playerOption, setPlayerOption] = useState(0)
    const [numberTicket, setNumberTicket] = useState(0)
    const [result, setResult] = useState("")
    const [isResultShown, setIsResultShown] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isNoMoreTicketDisplayed, setIsNoMoreTicketDisplayed] = useState(false)
    const [imageOpponentChoiceStyles, setImageOpponentChoiceStyles] = useState({
        opacity: 0,
        width: 150, height: 150,
    })
    const [imagePlayerChoiceStyles, setImagePlayerChoiceStyles] = useState({
        opacity: 0,
        width: 150, height: 150,
    })

    function watchAdsEarnTicket() {
        navigation.navigate("AdvertiseScreen")
        setNumberTicket((prevValue) => prevValue += 1)
        setIsNoMoreTicketDisplayed(false)
    }

    function cancel() {
        setIsNoMoreTicketDisplayed(false)
    }

    function exit() {
        navigation.goBack()
    }

    useEffect(() => {
        function handleResult() {
            if (playerOption == opponentOption) {
                setResult("Tie")
            } else {
                if ((playerOption == 0 && opponentOption == 1) || 
                (playerOption == 1 && opponentOption == 2) || 
                (playerOption == 2 && opponentOption == 0)) {
                    setResult("Lose")
                } else {
                    setResult("Win")
                }
            }
        }

        if (isGameStarted) {
            setTimeout(() => {
                handleResult();
                setIsGameStarted(false)
                setIsResultShown(true)
            }, 3000)
        }
    }, [isGameStarted])


    function playAgain() {
        setIsResultShown(false)
    }

    function handleGame(playerOption) {
        // Trừ 1 lần chơi
        setNumberTicket((prevValue) => prevValue -= 1)

        setOpponentOption(Math.floor(Math.random() * 3));
        setPlayerOption(playerOption)
        
        setImageOpponentChoiceStyles((prevValue) => {
            return(
                {...prevValue, opacity: 1,}
            )
        })
        setImagePlayerChoiceStyles((prevValue) => {
            return(
                {...prevValue, opacity: 1,}
            )
        })

    }   // end runGame()

    
    function runGame(playerOption) {
        if (numberTicket > 0) {
            setIsGameStarted(true)
            setIsNoMoreTicketDisplayed(false)
            handleGame(playerOption);
        } else {
            setIsNoMoreTicketDisplayed(true)
        }
    }

    return (
        <View style={styles.container}>
            <Exit onPress={exit}/>
            <Ticket numberTicket={numberTicket} onPress={watchAdsEarnTicket}/>
            <Money 
                containerCustomStyle={styles.moneyContainer}  
                moneyImageCustomStyle={styles.moneyImage}
                moneyAmountCustomStyle={styles.moneyAmount}
            />
            <View style={styles.opponent}>
                {
                    isGameStarted && 
                    <>
                        <Text style={styles.prompt}>Opponent Choice</Text>
                        <Image 
                            style={imageOpponentChoiceStyles}
                            source={
                                (opponentOption == 0) 
                                    ? require("../../assets/scissor.png")
                                    : (opponentOption == 1)
                                        ? require("../../assets/rock.png")
                                        : require("../../assets/paper.png")
                                }
                        />
                    </>
                }
                {
                    !isGameStarted && 
                    <Text style={styles.opponentWaitingText}>Your opponent is waiting...</Text>
                }
            </View>   
            <View style={styles.player}>
                <Image 
                    style={[imagePlayerChoiceStyles, !isGameStarted && {opacity: 0} ]}
                    source={
                        (playerOption == 0) 
                            ? require("../../assets/scissor.png")
                            : (playerOption == 1)
                                ? require("../../assets/rock.png")
                                : require("../../assets/paper.png")
                        }
                />
                <Text style={styles.prompt}>Choose</Text>
                <View style={styles.buttonGroup}>
                    <Pressable
                        style={
                           [styles.button ,isGameStarted && styles.inactiveButton]
                        }
                        onPress={isGameStarted ? null : () => runGame(0)}
                    >
                        <Image 
                            style={styles.image}
                            source={require("../../assets/scissor.png")}
                        />
                    </Pressable>
                    <Pressable
                        style={
                            [styles.button ,isGameStarted && styles.inactiveButton]
                        }
                        onPress={isGameStarted ? null : () => runGame(1)}
                    >
                        <Image 
                            style={styles.image}
                            source={require("../../assets/rock.png")}
                        />
                    </Pressable>

                    <Pressable
                        style={
                            [styles.button ,isGameStarted && styles.inactiveButton]
                        }
                        onPress={isGameStarted ? null : () => runGame(2)}
                    >
                        <Image 
                            style={styles.image}
                            source={require("../../assets/paper.png")}
                        />
                    </Pressable>
                </View>
            </View>         
            {
                isNoMoreTicketDisplayed && 
                <>
                    <DarkOverlay />
                    <NoMoreTicket 
                        onWatchAdsEarnTicket={watchAdsEarnTicket}
                        onCancel={cancel}
                    /> 
                </>
            }
            {
                isResultShown && 
                <>
                    <DarkOverlay />
                    <Reward resultTitle={result} playAgain={playAgain}/>
                </>
            }
        </View>
    )
} 

export default RockPaperScissorGame

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        backgroundColor: "#f2ef9b",
        alignItems: "center",
        justifyContent: "center",
    },

    // ------------- Money ------------
    moneyContainer: {
        position: "absolute", right: 10, top: 10,
        marginTop: 0,

        // override default style
        paddingHorizontal: 20,
        paddingVertical: 0, paddingHorizontal: 5,
        borderWidth: 1, borderColor: "black",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center"
    },
    moneyImage: {
        width: 30, height: 30
    },
    moneyAmount: {
        fontSize: 24,
        color: "black"
    },

    // ------------- Opponent ----------
    opponent: {
        marginTop: 50,
        position: "absolute", top: 20,
        alignItems: "center",
    },
    opponentWaitingText: {
        marginTop: 50,
        fontSize: 24, fontWeight: "bold",
    },
    inactiveButton: {
        opacity: 0.5
    },

    // ---------- Player ------------
    prompt: {
        fontSize: 35, fontWeight: "bold",
        textAlign: "center",
        marginTop: 30,  // Đẩy bản thân xuống dưới gần với 3 button groups
    },
    player: {
        position: "absolute",
        alignItems: "center",
        bottom: 10,
        width: "80%", height: "40%",
        justifyContent: "space-between",
        // borderWidth: 1, borderColor: "green",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
    },
    pressed: {
        opacity: 0.7
    },
    image: {
        
        width: 60, height: 60,
    },


    
    
})