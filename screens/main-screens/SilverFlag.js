import React from 'react'
import { View, Text, Image } from 'react-native'
import IconButton from '../../components/ui/IconButton'
import MoneyIcon from '../../assets/icons/money.png'
import { StyleSheet } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'

const handleExit = () => {
          alert('Exit');
}

const Balance = ({data}) => {
          return(
                    <View style={balanceStyles.balance}>
                              <Image source={MoneyIcon} style={balanceStyles.balanceIcon} />
                              <Text style={balanceStyles.balanceAmount}> {data}</Text>
                    </View>
          )
};

const balanceStyles = StyleSheet.create(
          {
                    header: {
                              flex: 1,
                    },
                    balance: {
                              height: 50,
                              // width: "",
                              alignSelf: "baseline",
                              textAlign: 'center',
                              alignItems: 'center',
                              flexDirection: "row",
                              marginLeft: 5,
                              marginTop: 5,
                              borderRadius: 10,
                              borderBlockColor: "black",
                              borderWidth: 1,
                              padding: 3

                    },
                    balanceIcon: {
                              width: 42,
                              height: 42,
                    },
                    balanceAmount: {
                              color: "black",
                              marginTop: 10,
                              fontSize: 26,
          //     borderWidth: 1, borderColor: "red",
              textAlign: 'center',
                              alignItems: 'center'
                    }
          }
)

const SilverFlag = () => {
  return (
    <View>
          <View style={styles.header}>
                    <Balance data={"200"} />
                    <IconButton onPress={handleExit} style={styles.closeButton} iconImageURL={require("../../assets/close.png")} />
          </View>
    </View>
  )
}

export default SilverFlag

const styles = StyleSheet.create({
          container: {
              flex: 1,
              backgroundColor: "yellow",
              display: "flex", flexDirection: "column",
              alignItems: "center",
          },
          closeButton: {
              position: "absolute", right: 10, top: 10, zIndex: 1,
          //     borderWidth: 1, borderColor: "red"
          },
          header:{
                    flex: 1,
          },
          test: {
              alignSelf: "flex-end",
              borderWidth: 1, borderColor: "red"
          },
      
          // ---------------- Age Increasing-------------
          ageUpWrapper: {
              flexDirection: "row",
              justifyContent: "space-between", alignItems: "center", 
              width: "40%",
              marginTop: 50,
              // borderWidth: 1, borderColor: "red"
          }, 
          ageText: {
              fontSize: 30, fontWeight: "bold",
              zIndex: 1,
          },
          starWrapper: {
              position: "relative",
              // borderWidth: 1, borderColor: "blue",
              justifyContent: "center",
              alignItems: "center"
          },
          starImage: {
              width: 440/5, height: 440/5,
              // borderWidth: 1, borderColor: "red"
          }, 
          lightEffect: {
              width: 1000,
              height: 1000,
              opacity: 0.6,
              position: "absolute",
          },
          ageNum: {
              position: "absolute", 
              fontSize: 25, fontWeight: "bold"
          },
          
          // --------------- Unlock --------------
          unlockWrapper: {
              marginTop: 40,
              width: "80%",
              height: 300,
              borderWidth: 1, borderColor: "red",
              borderRadius: 20,
              backgroundColor: "white"
          },
          linearGradient: {
              borderTopLeftRadius: 20, borderTopRightRadius: 20,
          },
          unlockText: {
              fontSize: 40, fontWeight: "bold", 
              color: "white",
              textAlign: "center",
          },
      
          // --------- Income ---------------
          incomeContainer: {
              marginTop: 40,
              alignItems: "center",
          },
          getText: {
              fontWeight: "bold", fontSize: 30
          },
          incomeWrapper: {
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1, borderColor: "black",
              borderBottomWidth: 5,
              backgroundColor: "#ebc634",
              borderRadius: 20,
              paddingHorizontal: 10,
          },
          incomeImage: {
              width: 40, height: 40,
          },
          incomeText: {
              fontSize: 25, fontWeight: "bold"
          }, 
          // -------------Button group ---------------
          buttonGroup: {
              position: "absolute", bottom: 20,
              flexDirection: "row",
              justifyContent: "space-between", alignItems: "center",
              width: "70%"
          },
          button: {
              // paddingHorizontal: 10, 
              paddingVertical: 5,
              borderColor: "black", borderWidth: 1,
              borderBottomWidth: 5,
              borderRadius: 20,
              backgroundColor: "purple",
              width: 120,
          },
          buttonTitle: {
              fontSize: 20, fontWeight: "bold",
              textAlign: "center",
              color: "white",
          },
          pressed: {
              opacity: 0.7
          }
      })