import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ActivityIndicator } from 'react-native';
import ItalicText from '../../../components/ui/ItalicText';
import { QuizColors } from '../../../constants/styles';
import { eng } from '../../../store/QuizData';

const QuizScreen = () => {
    const data = eng[0];
    const [quizData, setQuizData] = useState([]);
    const [randomizedQuizData, setRandomizedQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);


    useEffect(() => {
        setQuizData(data);
        randomizeQuizData(data);
    }, []);

    const randomizeQuizData = (data) => {
        let shuffled = [...data].sort(() => 0.5 - Math.random());
        setRandomizedQuizData(shuffled.slice(0, 10)); // Get the first 10 questions
    };

    if (!quizData.length) {
        return (
            <View style={styles.container}>
                <Text>Error loading quiz data, try exiting app and reopen!</Text>
            </View>
        );
    }

    const handleAnswer = (selectedOption) => {
        if (selectedOption === randomizedQuizData[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        if  (currentQuestionIndex === 9){
            setCurrentQuestionIndex(10);
        }
        if (currentQuestionIndex < randomizedQuizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } 
    };

    return (
        <View style={styles.container}>
            <View>
                {currentQuestionIndex < randomizedQuizData.length ? (
                    <QuizTaking
                        question={randomizedQuizData[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        index={currentQuestionIndex + 1}
                    />
                ) : (
                    <QuizFinish score={score} retry={() => {
                        randomizeQuizData(data);
                        setScore(0);
                        setCurrentQuestionIndex(0);
                    }} />
                )}
            </View>
        </View>
    );
};

const QuizTaking = ({ question, onAnswer, index }) => {
    return (
        <View style={styles.container}>
            <ItalicText text={index + " of 10"} size={24} />
            <View style={styles.spacer}>

            </View>
            <Text style={styles.question}>{"Choose the correct answer: \n" + question.question}</Text>
            <View style={styles.quizContainer}>
                <Pressable style={styles.option} onPress={() => onAnswer('A')}>
                    <Text style={styles.optionText}>
                        A. {question.A}
                    </Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => onAnswer('B')}>
                    <Text style={styles.optionText}>
                        B. {question.B}
                    </Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => onAnswer('C')}>
                    <Text style={styles.optionText}>
                        C. {question.C}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const QuizFinish = ({ score, retry, gotoMenu }) => {
    return (
        <View style={styles.container}>
            <ItalicText text="RESULT" size={36} />
            <View style={styles.resultCircle}>
                <ItalicText text={((score / 10) * 100).toFixed(0) + "%"} size={30}/>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.retryButton} onPress={retry}>
                    <Text style={styles.buttonText}>
                        Retry   
                    </Text>
                </Pressable>
                <Pressable style={styles.menuButton} onPress={gotoMenu}>
                    <Text style={styles.buttonText}>
                        Menu
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    spacer: {
        minHeight: "10%",   
    },
    question: {
        height: "100px",
        minWidth: '60%',
        // borderWidth: 2,
        borderRadius: 16,
        padding: 20,
        backgroundColor: QuizColors.primary,
        fontFamily: "Inter_800ExtraBold",
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        maxHeight: '26%',
        minWidth: '50%'
    },
    option: {
        height: "100px",
        minWidth: '60%',
        // borderWidth: 2,
        borderRadius: 16,
        padding: 12,
        backgroundColor: QuizColors.primary,
    },
    optionText: {
        fontFamily: "Inter_800ExtraBold",
    },
    resultCircle:{
        minWidth: 200,
        minHeight: 200,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 16,
        borderColor: QuizColors.primary,
        borderRadius: 200,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: "20%",
        minWidth: "90%",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    retryButton: {
        padding: 16,
        minWidth: "30%",
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: QuizColors.buttonRetry,
        borderRadius: 30
    },
    menuButton: {
        padding: 16,
        minWidth: "30%",
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: QuizColors.buttonHome,
        borderRadius: 30
    },
    buttonText: {
        fontFamily: "Inter_800ExtraBold",
        fontSize: 16,
        color: "white",
    }
});
