// QuizOption.js
/**
 * Phần tử của cái Quiz menu ở QuizMenuScreen
 */
import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import ItalicText from '../../../../components/ui/ItalicText';
import lockedImage from '../../../../assets/quiz/locked.png';
import doneIcon from '../../../../assets/quiz/done.png'

const QuizOption = ({ data, onNavigate, isLocked, isDone }) => {
  //onPress={isLocked ? null : onNavigate} 
  const isLocked1 = true;
  const isDone1 = true;
  return (
    <View style={styles.constainer} >
          <View style={styles.icon}>
              <Pressable 
                onPress={() => alert("buttonClicked")} 
                disabled={isLocked || isDone} 
                style={styles.pressable}
                >
                    <Image source={data.icon} style={styles.image} />
                    {isLocked && (
                              <View style={styles.lockOverlay}>
                              <Image 
                              source={lockedImage}
                              style={styles.lockIcon}
                              />
                              </View>
                              )}
                    {
                              (!isLocked && isDone) && (
                                        <View style={styles.doneOverlay}>
                                                  <Image 
                                                  source={doneIcon}
                                                  style={styles.done}
                                                  />
                                        </View>     
                              )
                    }
            </Pressable>
        </View>
        <ItalicText text={data.title} size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
          constainer: {
                    height: 'auto',
                    width: 'auto',
          },       
          icon: {
                    height: 160,
                    width: 160,
                    margin: 10,
                    borderWidth: 1,
                    borderColor: '#EBDD65',
                    backgroundColor: '#EBDD65',
                    borderRadius: 28,
                    position: 'relative', // Ensure this container can use absolute positioning for its children
          },
          pressable: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%', // Make sure pressable fills the container for proper positioning
                    height: '100%', // This also ensures the image and overlays cover the whole pressable area
          },
          image: {
                    width: '60%',
                    height: '60%',
                    marginBottom: 8,
          },
          lockOverlay: {
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
                    marginBottom: 8,
                    borderRadius: 28,
          },
          lockIcon: {
                    width: 50,
                    height: 50,
          },
          doneOverlay: {
                    position: 'absolute',
                    top: 0, // Position at the top
                    right: 0, // Position at the right
                    padding: 5, // Padding to keep the icon slightly inside the border
          },
          done: {
                    width: 30, // Smaller size as it's just a status indicator
                    height: 30,
          },
});
        

export default QuizOption;
