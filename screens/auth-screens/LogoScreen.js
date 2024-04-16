import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';

const LogoScreen = ({navigation}) => {
    // const [colorValue] = useState(new Animated.Value(0));
    const [positionValue] = useState(new Animated.Value(0))
    const windowHeight =Dimensions.get('window').height

    const [elementHeight, setElementHeight] = useState(0);

    function onLayout(event) {
        const { height } = event.nativeEvent.layout;
        setElementHeight(height);
    }

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login")
        }, 5000)
    }, [])

    useEffect(() => {
    //   Animated.timing(colorValue, {
    //     toValue: 1,
    //     duration: 3000,
    //     useNativeDriver: false, 
    //   }).start();

      Animated.timing(positionValue, {
        toValue: windowHeight/2,
        duration: 2000,
        useNativeDriver: false, 
      }).start();
    }, [])
  
    // const interpolateColor = colorValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['white', GlobalStyles.colors.headerBackgroundColor],
    // });
    
    const introElementsWrapperStyle = {
        marginTop: positionValue,
        transform: [{translateY: -elementHeight/2}],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", alignItems: "center",
    }

    return (
        <View style={styles.container}>
            <Animated.View style={introElementsWrapperStyle} onLayout={onLayout}>
                <Image style={styles.image} source={require("../../assets/logo.png")} />
                <Animated.Text style={[styles.name]}>I Am Developer</Animated.Text>
            </Animated.View>
        </View>
    )
}

export default LogoScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: {
        width: 200,
        height: 200,
    },
    name: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "bold",
    }, 
})