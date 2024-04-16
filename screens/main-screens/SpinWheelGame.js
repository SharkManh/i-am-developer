import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react' 
import { AntDesign } from '@expo/vector-icons';
import NoMoreTicket from '../../components/main/NoMoreTicket';
import DarkOverlay from '../../components/ui/DarkOverlay';
import Reward from '../../components/main/Reward';
import SpinReward from '../../components/main/SpinReward';

const SpinTheWheel = () => {
    const bonuses = ["0", "1", "2", "3"]
    const [ticketNumber, setTicketNumber] = useState(0)
    const [result, setResult] = useState("")
    const [incomeReward, setIncomeReward] = useState(0)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isResultShown, setIsResultShown] = useState(false)
    const [isButtonActive, setIsButtonActive] = useState(true)
    const [isNoMoreTicketDisplayed, setIsNoMoreTicketDisplayed] = useState(false)
    const [rotateDeg, setRotateDeg] = useState(0)

    function watchAdsEarnTicket() {
        setTicketNumber((prevValue) => prevValue += 1)
        setIsNoMoreTicketDisplayed(false)
    }

    function cancel() {
        setIsNoMoreTicketDisplayed(false)
    }

    function playAgain() {
        setIsResultShown(false)
        setIsButtonActive(true)
    }

    function runGame() {
        if (ticketNumber > 0) {
            setTicketNumber((prevValue) => prevValue -= 1)
            setIsButtonActive(false)
            setRotateDeg(0)
            setIsGameStarted(true)
            setIsButtonActive(false)
            setIsNoMoreTicketDisplayed(false)
        } else {
            setIsNoMoreTicketDisplayed(true)
        }
    }

    function handleResult() {
        var remainder = rotateDeg % 360;

        // console.log(
        //     `rotateDeg: ${rotateDeg} 
        //     remainder: ${remainder}
        //     `
        // )

        // determine phần thưởng
        switch(Math.floor(remainder / 90)) {
            case 0: {
                setIncomeReward(1); break;
            }
            case 1: {
                setIncomeReward(3); break;
            }
            case 2: {
                setIncomeReward(2); break;
            }
            case 3: {
                setIncomeReward(0); break;
            }
        }
    }

    useEffect(() => {
        if (isGameStarted) {
            const rotateSpinArrow = setInterval(() => {
                setRotateDeg((prevValue) => prevValue += 1)
            }, 50)

            var randomTime = Math.random() * 15000 + 2000   // Random from 2000 -> 17000 = 5s -> 15s
            alert(randomTime)
            setTimeout(() => {
                clearInterval(rotateSpinArrow)
                setIsButtonActive(true)
                setIsGameStarted(false)
                setIsResultShown(true)
            }, randomTime)
        }
    }, [isGameStarted])

    useEffect(() => {
        handleResult()
    }, [isButtonActive])

    const rotateStyle = {
        transform: [{rotate: rotateDeg + "deg"}]
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
           
           <Text style={styles.title}>Spin To Win</Text>

           <View style={styles.flatListWrapper}>
                <FlatList 
                    style={styles.flatList}
                    data={bonuses}
                    renderItem={({ item }) => (
                        <View style={styles.bonusItemWrapper}>
                            <Text style={styles.bonusItem}>{item}</Text>
                        </View>
                    )}
                    numColumns={2}
                />
                <Image 
                    style={[styles.spinArrowImage, isGameStarted && rotateStyle]}
                    source={require("../../assets/spinArrow.png")}
                />
            </View>

            <Pressable
                style={
                    [styles.button, isGameStarted && styles.inactiveButton]
                }
                onPress={isGameStarted ? null : runGame}
            >
                <Text style={styles.buttonTitle}>Spin</Text>
            </Pressable>
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
                    <SpinReward incomeReward={incomeReward} playAgain={playAgain} />
                </>
            }
        </View>
    )
} 

export default SpinTheWheel

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        backgroundColor: "#f2ef9b",
        alignItems: "center",
        justifyContent: "space-around",
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
    inactiveButton: {
        opacity: 0.5
    },

    // --------------- Flat List ---------------
    title: {
        fontSize: 35, fontWeight: "bold",
        textAlign: "center",
    },

    flatList: {
        borderWidth: 1, borderColor: "blue",
    },
    flatListWrapper: {  // Vì height không support cho flatList nên dùng wrapper để giới hạn height size nó
        height: 202,
        justifyContent: "center", alignItems: "center"
    },
    bonusItemWrapper: {
        width: 100, height: 100,
        backgroundColor: "white",
        borderWidth: 1, borderColor: "black",
        justifyContent: "center", alignItems: "center"
    },
    bonusItem: {
        fontSize: 20, fontWeight: "bold"
    },
    spinArrowImage: {
        width: 120, height: 120,
        position: "absolute",
        // borderWidth: 1, borderColor: "red"
    },

    // ----------------- Button ------------
    button: {
        width: 120,
        borderWidth: 1, borderColor: "black",
        borderBottomWidth: 5,
        backgroundColor: "#ebc634",
        borderRadius: 20,
    }, 
    buttonTitle: {
        textAlign: "center",
        fontWeight: "bold", fontSize: 20,
    },
    inactiveButton: {
        opacity: 0.5
    }
})