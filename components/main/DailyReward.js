import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react'
import { CharacterContext } from '../../store/character-context';
import DailyRewardCongratsAlert from './DailyRewardCongratsAlert';
import DarkOverlay from '../ui/DarkOverlay';
import CloseButton from './CloseButton';

const DailyReward = ({ onPress }) => {
    const characterCtx = useContext(CharacterContext);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [rewardMoney, setRewardMoney] = useState(0)
    const [isRewardDay1Got, setIsRewardDay1Got] = useState(false)
    const [isRewardDay2Got, setIsRewardDay2Got] = useState(false)
    const [isRewardDay3Got, setIsRewardDay3Got] = useState(false)
    const [isRewardDay4Got, setIsRewardDay4Got] = useState(false)

    function closeAlert() {
        setIsAlertVisible(false)
    }

    function handleGetDailyReward(dayNumber) {
        switch(dayNumber) {
            case 1: {
                setRewardMoney(10);
                setIsAlertVisible(true);
                characterCtx.addIncome(10);
                setIsRewardDay1Got(true);
                break;
            }
            case 2: {
                setRewardMoney(20);
                setIsAlertVisible(true);
                characterCtx.addIncome(20);
                setIsRewardDay2Got(true);
                break;
            }
            case 3: {
                setRewardMoney(30);
                setIsAlertVisible(true);
                characterCtx.addIncome(30);
                setIsRewardDay3Got(true);
                break;
            }
            case 4: {
                setRewardMoney(40);
                setIsAlertVisible(true);
                characterCtx.addIncome(40);
                setIsRewardDay4Got(true);
                break;
            }
        }
        setIsAlertVisible(true)
    }

    const closeButtonPositionStyle = {
        position: "absolute", top: 5, right: 0, zIndex: 1,
    }
    return (
        <View style={styles.dailyRewardContainer}>
            <View style={styles.dailyRewardBackgroundWrapper}>
                <CloseButton positionStyle={closeButtonPositionStyle} onPress={onPress} iconImageURL={require("../../assets/redCloseButton.png")}/>
                <Image 
                    style={styles.dailyRewardBackgroundImage} 
                    resizeMode='contain'
                    source={require("../../assets/dailyReward.png")}
                />
                <View style={styles.before4DaysWrapper}>
                    <View style={styles.dailyRewardItemWrapper}>
                        <Pressable
                            style={styles.dailyRewardItem}
                            onPress={() => handleGetDailyReward(1)}
                        >
                            <Text style={styles.dayNumber}>Day 1</Text>
                            <Image 
                                style={styles.dailyRewardCoinImage}
                                source={require("../../assets/dailyRewardCoin.png")}
                            />
                            <LinearGradient
                                colors={["#C8F170", "#55D349"]}
                                style={styles.moneyDailyRewardWrapper}>
                                <Text style={styles.moneyDailyReward}>+10</Text>
                            </LinearGradient>

                        </Pressable>
                        {
                            isRewardDay1Got && 
                            <View style={styles.rewardGot}>
                                <Image 
                                    style={styles.greenTickImage}
                                    source={require("../../assets/greenTick.png")}
                                />
                            </View>     
                        }
                        
                    </View>
                    <View style={styles.dailyRewardItemWrapper}>
                        <Pressable
                            style={styles.dailyRewardItem}
                            onPress={() => handleGetDailyReward(2)}

                        >
                            <Text style={styles.dayNumber}>Day 2</Text>
                            <Image 
                                style={styles.dailyRewardCoinImage}
                                source={require("../../assets/dailyRewardCoin.png")}
                            />
                            <LinearGradient
                                colors={["#C8F170", "#55D349"]}
                                style={styles.moneyDailyRewardWrapper}>
                                <Text style={styles.moneyDailyReward}>+20</Text>
                            </LinearGradient>
                        </Pressable>
                        {
                            isRewardDay2Got && 
                            <View style={styles.rewardGot}>
                                <Image 
                                    style={styles.greenTickImage}
                                    source={require("../../assets/greenTick.png")}
                                />
                            </View>     
                        }
                    </View>
                    
                    <View style={styles.dailyRewardItemWrapper}>
                        <Pressable
                            style={styles.dailyRewardItem}
                            onPress={() => handleGetDailyReward(3)}
                        >
                            <Text style={styles.dayNumber}>Day 3</Text>
                            <Image 
                                style={styles.dailyRewardCoinImage}
                                source={require("../../assets/dailyRewardCoin.png")}
                            />
                            <LinearGradient
                                colors={["#C8F170", "#55D349"]}
                                style={styles.moneyDailyRewardWrapper}>
                                <Text style={styles.moneyDailyReward}>+30</Text>
                            </LinearGradient>
                        </Pressable>
                        {
                            isRewardDay3Got && 
                            <View style={styles.rewardGot}>
                                <Image 
                                    style={styles.greenTickImage}
                                    source={require("../../assets/greenTick.png")}
                                />
                            </View>     
                        }
                    </View>
                </View>
                <View style={styles.after4DaysWrapper}>
                    <Pressable
                        style={styles.after4DayItem}
                        onPress={() => handleGetDailyReward(4)}
                    >
                        <Text style={styles.dayNumber}>Day 4+</Text>
                        <Image 
                            style={styles.dailyRewardCoinImage}
                            source={require("../../assets/dailyRewardCoin.png")}
                        />
                        <LinearGradient
                            colors={["#C8F170", "#55D349"]}
                            style={styles.moneyDailyRewardWrapper}>
                            <Text style={styles.moneyDailyReward}>+40</Text>
                        </LinearGradient>
                    </Pressable>
                    {
                            isRewardDay4Got && 
                            <View style={styles.rewardGot}>
                                <Image 
                                    style={styles.greenTickImage}
                                    source={require("../../assets/greenTick.png")}
                                />
                            </View>     
                        }
                </View>
            </View>
            {
                isAlertVisible && 
                <>
                    <DarkOverlay />
                    <DailyRewardCongratsAlert rewardMoney={rewardMoney} onPress={closeAlert} />
                </>
            }
        </View>
    )
}

export default DailyReward

const styles = StyleSheet.create({
    dailyRewardContainer: {
        position: "absolute", zIndex: 1,
        width: "100%", height: "100%",
        // borderWidth: 1, borderColor: "red",
        justifyContent: "center", alignItems: "center",
    },
    dailyRewardBackgroundWrapper: {
        position: "relative",
        width: 395/1.2, height: 616/1.2,
        alignItems: "center",
        // borderWidth: 1, borderColor: "blue",
    },
    dailyRewardBackgroundImage: {
        width: 395/1.2, height: 616/1.2,
        // borderWidth: 1, borderColor: "green",
    },
    before4DaysWrapper: {
        position: "absolute", top: 120,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        // borderWidth: 1, borderColor: "green",
    },
    dailyRewardItemWrapper: {
        backgroundColor: "#CB975F",
        borderRadius: 20,
        width: "30%", height: 150,
        justifyContent: "center", alignItems: "center",
    },
    dailyRewardItem: {
        width: "100%", height: "100%",
        justifyContent: "space-around", alignItems: "center",
    },
    dayNumber: {
        fontSize: 20, fontWeight: "bold",
        color: "#C22222",
    },
    dailyRewardCoinImage: {
        width: 60, height: 60,
    },
    moneyDailyRewardWrapper: {
        width: 55,
        paddingHorizontal: 5,
        borderRadius: 30,
    },
    moneyDailyReward: {
        fontSize: 20, fontWeight: "bold",
        textAlign: "center",
        color: "#F1ED8A",
        textShadowColor: "#467100",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    after4DaysWrapper: {
        position: "absolute", top: 290,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        // borderWidth: 1, borderColor: "green",
    },
    after4DayItem: {
        backgroundColor: "#CB975F",
        borderRadius: 20,
        width: "100%", height: 150,
        // borderWidth: 1, borderColor: "blue",
        justifyContent: "space-around", alignItems: "center",
    },
    rewardGot: {
        position: "absolute",
        width: "100%", height: "100%",
        justifyContent: "center", alignItems: "center",
        backgroundColor: "rgba(0, 0 , 0, 0.6)",
        borderRadius: 20,
    },
    greenTickImage: {
        width: 50, height: 50,
    }
})