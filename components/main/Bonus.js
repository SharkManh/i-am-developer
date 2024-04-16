import { View, Text, StyleSheet, Image, Animated, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import IconButton from '../ui/IconButton';
import { LinearGradient } from 'expo-linear-gradient';

const Bonus = () => {
    const bonuses = ["x0.5", "x1", "x2", "x3"]

    return (
        <View style={styles.container}>
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
                {/* <Image source={}/> */}
            </View>
        </View>
    );
}

export default Bonus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        borderWidth: 1, borderColor: "blue",
    },
    flatListWrapper: {  // Vì height không support cho flatList nên dùng wrapper để giới hạn height size nó
        height: 202
    },
    bonusItemWrapper: {
        width: 100, height: 100,
        backgroundColor: "white",
        borderWidth: 1, borderColor: "black",
        justifyContent: "center", alignItems: "center"
    },
    bonusItem: {
        fontSize: 20, fontWeight: "bold"
    }
})