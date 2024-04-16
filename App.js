import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from "./screens/auth-screens/LoginScreen";
import LogoScreen from "./screens/auth-screens/LogoScreen";
import SignUpScreen from "./screens/auth-screens/SignUpScreen";
import NamingScreen from "./screens/intro-screens/NamingScreen";
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import CharacterContextProvider from './store/character-context';
import WelcomeScreen from './screens/intro-screens/WelcomeScreen';
import IntroScreen from './screens/intro-screens/IntroScreen';
import TempScreen from './screens/main-screens/TempScreen';
import MainScreen from './screens/main-screens/MainScreen';
import AgeUp from './screens/main-screens/AgeUp';
import Bonus from './components/main/Bonus';
import AdvertiseScreen from "./screens/main-screens/AdvertiseScreen"
import RockPaperScissorGame from './screens/main-screens/RockPaperScissorGame';
import SpinTheWheel from './screens/main-screens/SpinWheelGame';
import GamesScreen from './screens/main-screens/GamesScreen';

const Stack = createNativeStackNavigator();

function ScreenStackHandler() {
  const authCtx = useContext(AuthContext);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  
  function navigateMainScreenStack() {
    setIsIntroFinished(true);
  }
  return (
    <>
      {!authCtx.isAuthenticated && <AuthScreenStack />}
      {(authCtx.isAuthenticated && !isIntroFinished) && <IntroScreenStack navigateMainScreenStack={navigateMainScreenStack}/>}
      {(authCtx.isAuthenticated && isIntroFinished) && <MainScreenStack /> }
    </>
  )
}

function TestScreen() {
  return (
    <>
      {/* <Bonus /> */}
      {/* <AdvertiseScreen /> */}
      {/* <AgeUp /> */}
      <RockPaperScissorGame />
      {/* <SpinTheWheel /> */}
      {/* <GamesScreen /> */}
    </>
  )
}

function AuthScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name="Logo" 
        component={LogoScreen}
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Signup"  
        component={SignUpScreen} 
        options={{headerShown: false}}
        />
    </Stack.Navigator>
  )
}

function IntroScreenStack({ navigateMainScreenStack }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name="Naming" 
        component={NamingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Intro" 
        options={{ headerShown: false }}
        initialParams={{ navigateMainScreenStack }}
      />
        {/* {(props) => <IntroScreen {...props} navigateMainScreenStack={navigateMainScreenStack} />} */}
    </Stack.Navigator>
  )
}

function MainScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name="MainScreen" 
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <AuthContextProvider>
        <CharacterContextProvider>
          <NavigationContainer>
            {/* <ScreenStackHandler /> */}
            <TestScreen />
          </NavigationContainer>
        </CharacterContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})