import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import SignInScreen from "./screens/auth-screens/SignInScreen";
import LogoScreen from "./screens/auth-screens/LogoScreen";
import SignUpScreen from "./screens/auth-screens/SignUpScreen";
import MainScreen from "./screens/main-screens/MainScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import CharacterContextProvider, {
  CharacterContext,
} from "./store/character-context";
import IntroScreen from "./screens/intro-screens/IntroScreen";
import AgeUp from "./screens/main-screens/AgeUp";
import AdvertiseScreen from "./screens/main-screens/AdvertiseScreen";
import RockPaperScissorScreen from "./screens/main-screens/RockPaperScissorScreen";
import GamesScreen from "./screens/main-screens/GamesScreen";
import { useNavigation } from "@react-navigation/native";
import DateScreen from "./screens/main-screens/DateScreen";
import TaiXiuScreen from "./screens/main-screens/TaiXiuScreen";
import QuizMenuScreen from "./screens/main-screens/quiz/QuizMenuScreen";
import QuizScreen from "./screens/main-screens/quiz/QuizScreen";
import FinancialManagementScreen from "./screens/main-screens/financial-management/FinancialManagementScreen";

const Stack = createNativeStackNavigator();

function ScreenStackHandler() {
  const authCtx = useContext(AuthContext);
  const characterCtx = useContext(CharacterContext);
  return (
    <>
      {!authCtx.isAuthenticated && <AuthScreenStack />}
      {authCtx.isAuthenticated && characterCtx.characterName == "" && (
        <IntroScreenStack />
      )}
      {authCtx.isAuthenticated && characterCtx.characterName != "" && (
        <MainScreenStack />
      )}
    </>
  );
}


function FinancialScreensHandler() {
 
}


function TestScreen() {
  return (
    <>
      {/* <AdvertiseScreen /> */}
      {/* <AgeUp /> */}
      {/* <RockPaperScissorScreen /> */}
      {/* <SpinWheelGame /> */}
      {/* <GamesScreen /> */}
      {/* <MainScreenStack /> */}
      {/* <DateScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <IntroScreen /> */}
      {/* <IntroScreenStack /> */}
      {/* <SignInScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <TaiXiuScreen /> */}
      {/* <QuizMenuScreen /> */}
      {/* <FinancialManagementScreen /> */}
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
      <Stack.Screen
        name="LogoScreen"
        component={LogoScreen}
        options={{ headerShown: false }}
      />
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
        name="TaiXiuScreen"
        component={TaiXiuScreen}
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
        name="FinancialManagementScreen"
        component={FinancialManagementScreen}
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
