// QuizMenuScreen.js
import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ItalicText from '../../../components/ui/ItalicText';
import QuizOption from './components/QuizOption';
import { QuizLevels } from '../../../store/QuizData';

// const QuizMenuScreen = ({ navigation }) => {
const QuizMenuScreen = () => {
          const [levelData, setLevelData] = useState();
          useEffect(() => {
            setLevelData(QuizLevels[0]);
          }, [])
          
          if(!levelData){
                    return <ActivityIndicator />;
          }
  return (
    <View style={styles.container}>
          <View>
                    <ItalicText text="QUIZZ" size={30} />
                    {/* <Text>
                      {JSON.stringify(QuizLevels)}
                    </Text> */}
          </View>
          <View style={styles.grid}>
                    <View style={styles.row}>
                    <QuizOption 
                              data={levelData.option1}
                              //onNavigate={() => navigation.navigate('ExampleQuiz')} 
                    />
                    <QuizOption 
                              data={levelData.option2}
                              //onNavigate={() => navigation.navigate('ExampleQuiz')} 
                    />
                    </View>
                    <View style={styles.row}>
                    <QuizOption 
                              data={levelData.option3}
                              //onNavigate={() => navigation.navigate('ExampleQuiz')} 
                    />
                    <QuizOption 
                              data={levelData.option4}
                              //onNavigate={() => navigation.navigate('ExampleQuiz')} 
                    />
                    </View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    padding: 10,
                    marginTop: 25,
                    justifyContent: 'center',
          },
          grid: {
                    flex: 1, // Make the container take up the full screen
                    justifyContent: 'space-a', // Center items vertically
                    alignItems: 'center', // Center items horizontally
                    flexDirection: 'column', // Default direction but added for clarity
                    padding: 10, // Padding around the grid
          },      
          row: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%'
          }
});

export default QuizMenuScreen;
