import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from "./screens/auth-screens/SignInScreen";
import LogoScreen from "./screens/auth-screens/LogoScreen";
import SignUpScreen from "./screens/auth-screens/SignUpScreen";
import MainScreen from "./screens/main-screens/MainScreen";
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import CharacterContextProvider, { CharacterContext } from './store/character-context';
import IntroScreen from './screens/intro-screens/IntroScreen';
import AgeUp from './screens/main-screens/AgeUp';
import AdvertiseScreen from "./screens/main-screens/AdvertiseScreen"
import RockPaperScissorGame from './screens/main-screens/RockPaperScissorGame';
import GamesScreen from './screens/main-screens/GamesScreen';
import SpinWheelGame from './screens/main-screens/SpinWheelGame';
import { useNavigation } from '@react-navigation/native';
import DateScreen from './screens/main-screens/DateScreen';

const Stack = createNativeStackNavigator();


function ScreenStackHandler() {
  const authCtx = useContext(AuthContext);
  const characterCtx = useContext(CharacterContext)
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
      {/* <AdvertiseScreen /> */}
      {/* <AgeUp /> */}
      {/* <RockPaperScissorGame /> */}
      {/* <SpinWheelGame /> */}
      {/* <GamesScreen /> */}
      {/* <MainScreenStack /> */}
      <DateScreen />
      {/* <WelcomeScreen /> */}
      {/* <IntroScreen /> */}
      {/* <IntroScreenStack /> */}
      {/* <SignInScreen /> */}
      {/* <SignUpScreen /> */}
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
        name="LogoScreen" 
        component={LogoScreen}
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="SignInScreen" 
        component={SignInScreen} 
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="SignUpScreen"  
        component={SignUpScreen} 
        options={{headerShown: false}}
        />
    </Stack.Navigator>
  )
}

function IntroScreenStack({ navigateMainScreenStack} ) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setParams({ navigateMainScreenStack });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name="IntroScreen" 
        component={IntroScreen}
        options={{ headerShown: false }}
        initialParams={{ navigateMainScreenStack }}
      />
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
        name="RockPaperScissorGame" 
        component={RockPaperScissorGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdvertiseScreen" 
        component={AdvertiseScreen}
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
  }
})