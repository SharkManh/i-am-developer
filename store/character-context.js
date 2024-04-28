import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const CharacterContext = createContext({
  userEmail: "",
  characterName: "",
  income: 0,
  lifeTimeCounter: 0,
  healthPoint: 100,
  age: 0,
  education: {},
  happinessPoint: 0,
  activityHistories: [],
  dateInfo: {},
  dailyRewardTracking: {},
  financialManagement: [{date: new Date(), transactionType: "", description: "", transactionCoin: 0}],
  setFinancialManagement: () => {},
  setDailyRewardTracking: (dailyRewardTracking) => {},
  setLifeTimeCounter: (lifeTimeCounter) => {},
  setUserEmail: (userEmail) => {},
  createCharacterName: (characterName) => {},
  addIncome: (amount) => {},
  minusIncome: (amount) => {},
  setAge: (age) => {},
  setHealthPoint: (healthPoint) => {},
  setEducation: (education) => {},
  setHappinessPoint: (happinessPoint) => {},
  addActivityHistory: (newActivityHistory) => {},
  setDateInfo: (dateInfo) => {},
  setDateInfo: (dateInfo) => {},
});

function CharacterContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [income, setIncome] = useState(0);
  const [age, setAge] = useState(0);
  const [activityHistories, setActivitiesHistories] = useState([]);
  const [lifeTimeCounter, setLifeTimeCounter] = useState(0)
  const [healthPoint, setHealthPoint] = useState(100)
  const [happinessPoint, setHappinessPoint] = useState(0)
  const [dateInfo, setDateInfo] = useState({
    isLoveAccepted: false,
    lovePoint: 0,
  })
  const [dailyRewardTracking, setDailyRewardTracking] = useState({
    isDay01Got: false,
    isDay01AllowGot: true,
    isDay02Got: false,
    isDay02AllowGot: false,
    isDay03Got: false,
    isDay03AllowGot: false,
    isDay04Got: false,
    isDay04AllowGot: false,
  })
  const [financialManagement, setFinancialManagement] = useState([])

  const [education, setEducation] = useState({
    "primary" : {
      "mathematics" : false,
      "english": false,
    },
    "secondary" : {
      "mathematics": false,
      "english": false,
      "physics": false,
    },
    "highSchool": {
      "mathematics": false,
      "english": false,
      "physics": false,
      "informatics": false,
    }
  })

  function createCharacterName(characterName) {
    setCharacterName(characterName);
  }

  function addIncome(amount, description) {
    setFinancialManagement(( prevValue ) => {
      return(
        [...prevValue, {date: new Date(), transactionType: "income", description: description, transactionCoin: amount}]
      )
    })
    setIncome((prevIncome) => (prevIncome += amount));
  }

  function minusIncome(amount, description) {
    setFinancialManagement((prevValue) => {
      return(
        [...prevValue, {date: new Date(), transactionType: "expense", description: description, transactionCoin: amount}]
      )
    })
    setIncome((prevIncome) => (prevIncome -= amount));
  }

  function addActivityHistory(activityHistory) {
    setActivitiesHistories((prevHistories) => {
      [...prevHistories, activityHistory];
    });
  }

  // Chuyện j sẽ xảy ra nếu tên biến hoặc function không giống như cái CharacterContext nhề
  const value = {
    userEmail: userEmail,
    characterName: characterName,
    income: income,
    activityHistories: activityHistories,
    age: age,
    healthPoint: healthPoint,
    education: education,
    dateInfo: dateInfo,
    happinessPoint: happinessPoint,
    lifeTimeCounter: lifeTimeCounter,
    dailyRewardTracking: dailyRewardTracking,
    financialManagement: financialManagement,
    setFinancialManagement: setFinancialManagement,
    setEducation: setEducation,
    setUserEmail: setUserEmail,
    createCharacterName: createCharacterName,
    addIncome: addIncome,
    minusIncome: minusIncome,
    setAge: setAge,
    setHealthPoint: setHealthPoint,
    setDateInfo: setDateInfo,
    setHappinessPoint: setHappinessPoint,
    setLifeTimeCounter: setLifeTimeCounter,
    setDailyRewardTracking: setDailyRewardTracking,
    addActivityHistory: addActivityHistory,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

export default CharacterContextProvider;
