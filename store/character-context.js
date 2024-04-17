import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const CharacterContext = createContext({
  characterName: '',
  income: 0,
  age: 0,
  activityHistories: [],
  createCharacterName: (characterName) => {},
  addIncome: (amount) => {},
  minusIncome: (amount) => {},
  increaseAge: (increaseAge) => {},
  addActivityHistory: (newActivityHistory) => {},
});

function CharacterContextProvider({ children }) {
  const [characterName, setCharacterName] = useState("");
  const [income, setIncome] = useState(0);
  const [age, setAge] = useState(0)
  const [activityHistories, setActivitiesHistories] = useState([])

  function createCharacterName(characterName) {
    setCharacterName(characterName)
  }

  function addIncome(amount) {
    setIncome((prevIncome) => prevIncome += amount)
  }

  function minusIncome(amount) {
    setIncome((prevIncome) => prevIncome -= amount)
  }

  function increaseAge(numIncreasedAge) {
    setAge((prevAge) => prevAge += numIncreasedAge)
  }

  function addActivityHistory(activityHistory) {
    setActivitiesHistories((prevHistories) => {
      [...prevHistories, activityHistory]
    })
  }

// Chuyện j sẽ xảy ra nếu tên biến hoặc function không giống như cái CharacterContext nhề
  const value = {
    characterName: characterName,
    income: income,
    activityHistories: activityHistories,
    age: age,
    createCharacterName: createCharacterName,
    addIncome: addIncome,
    minusIncome: minusIncome,
    increaseAge: increaseAge,
    addActivityHistory: addActivityHistory,
  };

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export default CharacterContextProvider;