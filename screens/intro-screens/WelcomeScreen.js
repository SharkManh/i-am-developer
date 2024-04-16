import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { CharacterContext } from '../../store/character-context';

function WelcomeScreen({ navigation }) {
    const characterCtx = useContext(CharacterContext)

    useEffect(() => {
      setTimeout(() => {
        navigation.replace("Intro")
      }, 5000)
    }, [])
    return (
        <View style={styles.rootContainer}>
          <Text style={styles.title}>Welcome {characterCtx.characterName}!</Text>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});