import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import SignInScreen from "./screens/auth-screens/SignInScreen";
import LogoScreen from "./screens/auth-screens/LogoScreen";
import SignUpScreen from "./screens/auth-screens/SignUpScreen";
import MainScreen from "./screens/main-screens/MainScreen";
import AgeUp from "./screens/main-screens/AgeUp";
import FinancialManagementScreen from "./screens/main-screens/financial-management/FinancialManagementScreen";
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import CharacterContextProvider, { CharacterContext } from './store/character-context';
import IntroScreen from './screens/intro-screens/IntroScreen';
import AdvertiseScreen from "./screens/main-screens/AdvertiseScreen"
import RockPaperScissorScreen from "./screens/main-screens/RockPaperScissorScreen";
import GamesScreen from './screens/main-screens/GamesScreen';
import { useNavigation } from '@react-navigation/native';
import DateScreen from './screens/main-screens/DateScreen';
import QuizMenuScreen from './screens/main-screens/quiz/QuizMenuScreen';
import QuizScreen from './screens/main-screens/quiz/QuizScreen';
import TaiXiuScreen from './screens/main-screens/TaiXiuScreen';
import JobMainScreen from './screens/main-screens/job/JobMainScreen';
import JobOffersScreen from './screens/main-screens/job/JobOffersScreen';
import JobOfferDetailsScreen from './screens/main-screens/job/JobOfferDetailsScreen';
import WorkingScreen from './screens/main-screens/job/WorkingScreen';
import HospitalScreen from "./screens/main-screens/hospital/HospitalScreen";
import DoctorScreen from "./screens/main-screens/hospital/DoctorScreen";
import DoctorDetailScreen from "./screens/main-screens/hospital/DoctorDetailScreen";
import TreatingScreen from "./screens/main-screens/hospital/TreatingScreen";
import { storeCharacterInfo } from "./utils/http";
import { fetchCharacterInfo } from "./utils/http";
const Stack = createNativeStackNavigator();

function ScreenStackHandler() {
  const authCtx = useContext(AuthContext);
  const characterCtx = useContext(CharacterContext);

  return (
    <>
      {!authCtx.isAuthenticated && <AuthScreenStack />}
      {authCtx.isAuthenticated && <MainScreenStack />}
    </>
  );
}

function TestScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Stack.Screen 
        name="HospitalScreen"
        component={HospitalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TreatingScreen"
        component={TreatingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DoctorScreen"
        component={DoctorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DoctorDetailScreen"
        component={DoctorDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TestScreen() {
  return (
    <>
      {/* <TestScreenStack /> */}
      {/* <AdvertiseScreen /> */}
      {/* <AgeUp /> */}
      {/* <RockPaperScissorScreen /> */}
      {/* <SpinWheelGame /> */}
      {/* <GamesScreen /> */}
      {/* <MainScreenStack /> */}
      {/* <MainScreenStack /> */}
      {/* <MainScreen /> */}
      {/* <DateScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <IntroScreen /> */}
      {/* <IntroScreenStack /> */}
      {/* <SignInScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <TaiXiuScreen /> */}
      {/* <QuizMenuScreen /> */}
      {/* <FinancialManagementScreen /> */}
      {/* <WorkingScreen /> */}
      {/* <QuizScreen /> */}
      {/* <JobMainScreen /> */}
      {/* <JobOffersScreen /> */}
      {/* <JobOfferDetailsScreen offerData={jobOffersData[3]} /> */}
    </>
  );
}

function AuthScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      {/* <Stack.Screen
        name="LogoScreen"
        component={LogoScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function IntroScreenStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgeUp"
        component={AgeUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DateScreen"
        component={DateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GamesScreen"
        component={GamesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RockPaperScissorScreen"
        component={RockPaperScissorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdvertiseScreen"
        component={AdvertiseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuizMenuScreen" 
        component={QuizMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuizScreen" 
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="JobMainScreen"
        component={JobMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="JobOffersScreen"
        component={JobOffersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="JobOfferDetailsScreen"
        component={JobOfferDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinancialManagementScreen"
        component={FinancialManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaiXiuScreen"
        component={TaiXiuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="HospitalScreen"
        component={HospitalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TreatingScreen"
        component={TreatingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DoctorScreen"
        component={DoctorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DoctorDetailScreen"
        component={DoctorDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <AuthContextProvider>
        <CharacterContextProvider>
          <NavigationContainer>
            <ScreenStackHandler />
            {/* <TestScreen /> */}
            {/* <TestScreenStack /> */}
          </NavigationContainer>
        </CharacterContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
