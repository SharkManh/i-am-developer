import { StyleSheet, Text, View, Image, Modal, Pressable, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { JobScreenHeader } from './JobMainScreen'
import WorkingCover from '../../../assets/job/working_cover.png'
import { useFonts } from 'expo-font'
import { Bungee_400Regular } from '@expo-google-fonts/bungee'
import { HoltwoodOneSC_400Regular } from '@expo-google-fonts/holtwood-one-sc'
import { Gluten_400Regular } from '@expo-google-fonts/gluten'
import {LinearGradient} from 'expo-linear-gradient';
import MoneyIcon from '../../../assets/money.png';

const WorkingScreen = ({ onFinish }) => {
          const [showModal, setShowModal] = useState(false);
          const [text, setText] = useState('Working');
          let [fontsLoaded] = useFonts({
          Bungee_400Regular,
          HoltwoodOneSC_400Regular,
          Gluten_400Regular
          });
          

          useEffect(() => {
                    const interval = setInterval(() => {
                              setText((prevText) => {
                                        if (prevText === 'Working...') return 'Working';
                                        if (prevText === 'Working..') return 'Working...';
                                        if (prevText === 'Working') return 'Working..';
                              });
                    }, 500);

                    const timeout = setTimeout(() => {
                              clearInterval(interval);
                              setShowModal(true);
                    }, 5000);

                    return () => {
                              clearInterval(interval);
                              clearTimeout(timeout);
                    };
          }, []);
          const handleCloseModal = () => {
                    setShowModal(false);
          }
          const handleDoneWorking = (money) => {
                    alert('done working + ' + money + '$');
          }
          if (!fontsLoaded) {
                    return null;
          }
  return (
    <View style={styles.container}>
          <JobScreenHeader title='working environment' onLeave={() => alert('leaving ...')} />
          <View style={styles.imageContainer}>
                    <Image source={WorkingCover} />
          </View>
          <View style={{...styles.footerContainer}}>
                    <Text
                              style={{
                                        fontFamily: 'Bungee_400Regular',
                                        fontSize: 30,
                                        letterSpacing: 2,
                              }}
                    >{text}</Text>
          </View>
          <MyModal 
          visibility={showModal} 
          onSetVisibility={() => handleCloseModal()} 
          money={200}
          onOkPressed={(money) => handleDoneWorking(money)}
          />
    </View>
  )
}

export default WorkingScreen

const styles = StyleSheet.create({
          container: {
          backgroundColor: '#fff',
          alignItems: 'center',
          height: Dimensions.get('window').height,
          },
          imageContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          },
          footerContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          }
})

const MyModal = ({visibility, onSetVisibility, money, onOkPressed}) => {
          const handleSetVisibility = () => {
                    if(typeof onSetVisibility === 'function'){
                    onSetVisibility();
                    }
          }
          const handleOkPressed = () => {
                    handleSetVisibility();
                    if(typeof onOkPressed === 'function'){
                    onOkPressed(money);
                    }
          }
          return (
          <Modal
                    animationType="fade"
                    transparent={visibility}
                    visible={visibility}
                    statusBarTranslucent={true}
                    onRequestClose={() => handleSetVisibility()}
          >
          <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    //padding: 60,
                    paddingHorizontal: 30,
                    paddingVertical: 320,
                    height: Dimensions.get('window').height,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
          }}>
                    <LinearGradient
                              colors={
                                        ['#F77F7A', '#FCC0BE']
                              }
                              style={{
                                        backgroundColor: 'white',
                                        opacity: 1,
                                        padding: 20,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 20,
                                        flex: 1,
                                        height: Dimensions.get('window').height * 0.3,
                              
                              }}
                    >
                              <Text style={{
                                        fontFamily: 'HoltwoodOneSC_400Regular',
                                        fontSize: 24,
                                        color: '#fced77',
                              }}>
                                        Congrat!
                              </Text>
                              <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                              }}>
                                        <Text
                                        style={{
                                                  fontSize: 20,
                                                  paddingVertical: 10,
                                                  fontFamily: 'Gluten_400Regular',
                                        }}
                                        >
                                        You got &#8203;  
                                        </Text>
                                        <Image style={{height: 30, width: 30}} source={MoneyIcon} />
                                        <Text
                                        style={{
                                                  fontSize: 20,
                                                  paddingVertical: 10,
                                                  fontFamily: 'Gluten_400Regular',
                                        }}
                                        >
                                        &#8203; {money} from work      
                                        </Text>
                              </View>
                              <Pressable
                                        onPress={
                                                  () => handleOkPressed()
                                        }
                              >
                                        <LinearGradient 
                                                  colors={['#C8F170', '#55D349']}
                                                  style={{
                                                            paddingHorizontal: 30,
                                                            paddingVertical: 2,
                                                            marginVertical: 10,
                                                            borderRadius: 25,
                                                  }}          
                                        >
                                                  <Text
                                                            style={{
                                                                      fontSize: 16,
                                                                      paddingVertical: 10,
                                                                      fontFamily: 'HoltwoodOneSC_400Regular',
                                                            }}
                                                  >Ok</Text>
                                        </LinearGradient>
                              </Pressable>
                    </LinearGradient>
                    </View>
          </Modal>
          );
};
        