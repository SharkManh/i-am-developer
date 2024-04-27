import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import ItalicText from "../../../components/ui/ItalicText";
import QuizOption from "./components/QuizOption";
import ExitButton from "../../../components/main/ExitButton";
import { CharacterContext } from "../../../store/character-context";
import { eng, math, physics, tech } from '../../../constants/quizData';
import { useFocusEffect } from "@react-navigation/native";
import MathIcon from "../../..//assets/quiz/math.png";
import EngIcon from "../../../assets/quiz/eng.png";
import PhysicsIcon from "../../../assets/quiz/physics.png";
import InfoIcon from "../../../assets/quiz/informatics.png";

const QuizMenuScreen = ({ navigation }) => {
  const characterCtx = useContext(CharacterContext)
  const [isMathLocked, setIsMathLocked] = useState(true)
  const [isEnglishLocked, setIsEnglishLocked] = useState(true)
  const [isPhysicsLocked, setIsPhysicsLocked] = useState(true)
  const [isInformaticsLocked, setIsInformaticsLocked] = useState(true)
  const [isMathDone, setIsMathDone] = useState(false)
  const [isEnglishDone, setIsEnglishDone] = useState(false)
  const [isPhysicsDone, setIsPhysicsDone] = useState(false)
  const [isInformaticsDone, setIsInformaticsDone] = useState(false)
  const [educationLevel, setEducationLevel] = useState("")
  const [mathQuizData, setMathQuizData] = useState([{}])
  const [englishQuizData, setEnglishQuizData] = useState([{}])
  const [physicsQuizData, setPhysicsQuizData] = useState([{}])
  const [informaticsQuizData, setInformaticsQuizData] = useState([{}])

  
  useEffect(() => {
    if (characterCtx.age >=6 && characterCtx.age < 11) {
      setEducationLevel("primary")
    } else if (characterCtx.age >=11 && characterCtx.age < 15) {
      setEducationLevel("secondary")
    } else if (characterCtx.age >=15 && characterCtx.age < 18) {
      setEducationLevel("highSchool")
    }
  }, [characterCtx.age])

  useEffect(() => {
    switch(educationLevel) {
      case "primary": {
        setIsMathLocked(false)
        setIsEnglishLocked(false)
        setMathQuizData(math[0])
        setEnglishQuizData(eng[0])
        break;
      }
      case "secondary": {
        setIsMathLocked(false)
        setIsEnglishLocked(false)
        setIsPhysicsLocked(false)
        setMathQuizData(math[1])
        setEnglishQuizData(eng[1])
        setPhysicsQuizData(physics[0])
        break;
      }
      case "highSchool": {
        setIsMathLocked(false)
        setIsEnglishLocked(false)
        setIsPhysicsLocked(false)
        setIsInformaticsLocked(false)
        setMathQuizData(math[2])
        setEnglishQuizData(eng[2])
        setPhysicsQuizData(physics[1])
        setInformaticsQuizData(physics[0])
        break;
      }
    }
  }, [educationLevel])

  useFocusEffect(
    useCallback(() => {
      switch(educationLevel) {
        case "primary": {
          setIsMathDone(characterCtx.education.primary.mathematics)
          setIsEnglishDone(characterCtx.education.primary.english)
          break;
        }
        case "secondary": {
          setIsMathDone(characterCtx.education.secondary.mathematics)
          setIsEnglishDone(characterCtx.education.secondary.english)
          setIsPhysicsDone(characterCtx.education.secondary.physics)
          break;
        }
        case "highSchool": {
          alert(characterCtx.education.highSchool.english)
          setIsMathDone(characterCtx.education.highSchool.mathematics)
          setIsEnglishDone(characterCtx.education.highSchool.english)
          setIsPhysicsDone(characterCtx.education.highSchool.physics)
          setIsInformaticsDone(characterCtx.education.highSchool.informatics)
          break;
        }
      }
    })
  )

  function exit() {
    navigation.goBack();
  }

  return (
    <ImageBackground
      source={require("../../../assets/backgroundGameQuiz.png")}
      style={styles.container}>
      <ExitButton onPress={exit} />

      <View style={styles.header}>
        <ItalicText text="QUIZZ" size={40} />
      </View>
      <View style={styles.levelWrapper}>
          <ItalicText text= { "LEVEL: " + educationLevel.toUpperCase()} size={26} />
      </View>
      <View style={styles.grid}>
        <View style={styles.row}>
          <QuizOption isLocked={isMathLocked} isDone={isMathDone} educationLevel={educationLevel} subjectName={"MATHEMATICS"} subjectData={mathQuizData} imageSource={MathIcon} title={"Mathematics"} />
          <QuizOption isLocked={isEnglishLocked} isDone={isEnglishDone} educationLevel={educationLevel} subjectName={"ENGLISH"} subjectData={englishQuizData} imageSource={EngIcon} title={"English"} />
        </View>
        <View style={styles.row}>
          <QuizOption isLocked={isPhysicsLocked} isDone={isPhysicsDone} educationLevel={educationLevel} subjectName={"PHYSICS"} subjectData={physicsQuizData} imageSource={PhysicsIcon} title={"Physics"} />
          <QuizOption isLocked={isInformaticsLocked} isDone={isInformaticsDone} educationLevel={educationLevel} subjectName={"INFORMATICS"} subjectData={informaticsQuizData} imageSource={InfoIcon} title={"Informatics"} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    width: "100%",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  levelWrapper: {
    marginTop: 30,
    
  },
  level: {
    fontSize: 26, fontWeight: "bold",
  },
  grid: {
    flex: 1, // Make the container take up the full screen
    justifyContent: "space-a", // Center items vertically
    alignItems: "center", // Center items horizontally
    flexDirection: "column", // Default direction but added for clarity
    padding: 10, // Padding around the grid
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default QuizMenuScreen;
