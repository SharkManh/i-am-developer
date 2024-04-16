import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react' 
import { AntDesign } from '@expo/vector-icons';
import NoMoreTicket from '../../components/main/NoMoreTicket';
import DarkOverlay from '../../components/ui/DarkOverlay';
import Reward from '../../components/main/Reward';

const RockPaperScissorGame = () => {
    const [opponentOption, setOpponentOption] = useState(0)
    const [playerOption, setPlayerOption] = useState(0)
    const [ticketNumber, setTicketNumber] = useState(0)
    const [result, setResult] = useState("")
    const [isResultShown, setIsResultShown] = useState(false)
    const [isButtonActive, setIsButtonActive] = useState(true)
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
        setTicketNumber((prevValue) => prevValue += 1)
        setIsNoMoreTicketDisplayed(false)
    }

    function cancel() {
        setIsNoMoreTicketDisplayed(false)
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

        if (!isButtonActive) {
            setTimeout(() => {
                handleResult();
                setIsResultShown(true)
            }, 3000)
        }
    }, [isButtonActive])


    function playAgain() {
        setIsResultShown(false)
        setIsButtonActive(true)
    }

    function handleGame(playerOption) {
        // Trừ 1 lần chơi
        setTicketNumber((prevValue) => prevValue -= 1)

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
        if (ticketNumber > 0) {
            setIsButtonActive(false)
            setIsNoMoreTicketDisplayed(false)
            handleGame(playerOption);
        } else {
            setIsNoMoreTicketDisplayed(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.ticketContainer}>
                <AntDesign style={styles.plusIconButton} onPress={watchAdsEarnTicket} name="pluscircle" size={20} color="black" />

                <View style={styles.ticketWrapper}>
                    <Image 
                        style={styles.ticketImage}
                        source={require("../../assets/ticket.png")}
                    />
                    <Text style={styles.ticketNum}>  {ticketNumber}</Text>
                </View>
            </View>
            <View style={styles.opponent}>
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
            </View>   
            <View style={styles.player}>
                <Image 
                    style={imagePlayerChoiceStyles}
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
                           [styles.button ,!isButtonActive && styles.inactiveButton]
                        }
                        onPress={!isButtonActive ? null : () => runGame(0)}
                    >
                        <Image 
                            style={styles.image}
                            source={require("../../assets/scissor.png")}
                        />
                    </Pressable>
                    <Pressable
                        style={
                            [styles.button ,!isButtonActive && styles.inactiveButton]
                        }
                        onPress={!isButtonActive ? null : () => runGame(1)}
                    >
                        <Image 
                            style={styles.image}
                            source={require("../../assets/rock.png")}
                        />
                    </Pressable>

                    <Pressable
                        style={
                            [styles.button ,!isButtonActive && styles.inactiveButton]
                        }
                        onPress={!isButtonActive ? null : () => runGame(2)}
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
    ticketContainer: {
        position: "absolute", right: 10, top: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    plusIconButton: {
        position: "absolute", top: 20, right: -5, 
        zIndex: 1,
        backgroundColor: "white",   // che đi cái border của ticketWrapper do cái dấu cộng xuyên thấu
        borderRadius: 20
    },
    ticketWrapper: {
        paddingHorizontal: 20, 
        borderWidth: 1, borderColor: "black",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center"
    },
    ticketImage: {
        width: 30, height: 30
    },
    ticketNum: {
        fontSize: 24,
    },
    opponent: {
        marginTop: 50,
        position: "absolute", top: 20,
        alignItems: "center"
        // borderWidth: 1, borderColor: "black"
    },
    inactiveButton: {
        opacity: 0.5
    },

    // ---------- Player ------------
    prompt: {
        fontSize: 35, fontWeight: "bold",
        textAlign: "center",
        marginTop: 30,  // Đẩy bản thân xuống dưới gần 3 button groups
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
    image: {
        width: 60, height: 60,
    },
    
})