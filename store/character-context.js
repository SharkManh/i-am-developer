import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const CharacterContext = createContext({
  characterName: '',
  income: 0,
  level: 0,
  activityHistories: [],
  createCharacterName: (characterName) => {},
  addIncome: (amount) => {},
  minusIncome: (amount) => {},
  increaseLevel: (numIncreasedLevel) => {},
  addActivityHistory: (newActivityHistory) => {},
});

function CharacterContextProvider({ children }) {
  const [characterName, setCharacterName] = useState("");
  const [income, setIncome] = useState(0);
  const [level, setLevel] = useState(0)
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

  function increaseLevel(numIncreasedLevel) {
    setLevel((prevLevel) => prevLevel += numIncreasedLevel)
  }

  function addActivityHistory(activityHistory) {
    setActivitiesHistories((prevHistories) => {
      [...prevHistories, activityHistory]
    })
  }


  const value = {
    characterName: characterName,
    income: income,
    activityHistories: activityHistories,
    level: level,
    createCharacterName: createCharacterName,
    addIncome: addIncome,
    minusIncome: minusIncome,
    increaseLevel: increaseLevel,
    addActivityHistory: addActivityHistory,
  };

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export default CharacterContextProvider;