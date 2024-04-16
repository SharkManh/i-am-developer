import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import IconButton from '../../components/ui/IconButton'

const GamesScreen = () => {
  return (
    <View style={styles.container}>
        <IconButton style={styles.closeButton} iconImageURL={require("../../assets/close.png")}/>
        <View style={styles.header}>
          <Text style={styles.heading}>Games</Text>
        </View>
        <View style={styles.gameGroup}>
          <Pressable style={styles.game}>
            <Image 
              style={styles.gameImage}
              source={require("../../assets/ScissorRockPaper.png")}
            />
            <View style={styles.gameNameWrapper}>
              <Text style={styles.gameName}>Scissor Rock Paper</Text>
            </View>
          </Pressable>
          <Pressable 
            style={styles.game}>
            <Image 
              style={styles.gameImage}

            />
            <Text style={styles.gameName}></Text>
          </Pressable>
        </View>
    </View>
  )
}

export default GamesScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "yellow",
      display: "flex", flexDirection: "column",
      alignItems: "center",
    }, 
    closeButton: {
      position: "absolute", right: 10, top: 10, zIndex: 1,
  },
  header: {
    height: "10%",
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "center", alignItems: "center"
  }, 
  heading: {
    fontSize: 40, fontWeight: "bold",
    color: "white"
  },

  // ---------------- Game --------------
  gameGroup: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly", alignItems: "center"
  },
  game: {
    height: 200, 
    width: "40%",
    backgroundColor: "white",
    borderColor: "black", borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5, 
    alignItems: "center"
  }, 
  gameImage: {
    marginTop: 10,
    width: 130, height: 130,
    borderRadius: 10
  }, 
  gameNameWrapper: {
    flex: 1,
    justifyContent: "center", alignItems: "center"
  },
  gameName: {
    width: "100%",
    textAlign: "center",
    fontWeight: 'bold'
  }
})