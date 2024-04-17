import { useContext, useState } from 'react';
import { Alert, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AuthContent from '../../components/auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from '../../store/auth-context';
import { createUser } from '../../utils/auth';
import {LinearGradient} from 'expo-linear-gradient';

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Image 
          style={styles.topContentImageBackground}
          source={require("../../assets/logo.png")}
        />
        <LinearGradient 
          colors={["black", "#4A3A1D"]}
          style={styles.topContentLinearGradientBackground}
        />
        <Image 
          style={styles.authLogo}
          source={require("../../assets/authLogo.png")}
        />
      </View>
      <AuthContent title="Sign Up" onAuthenticate={signupHandler} />
    </View>
  )
  
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 

  },
  topContent: {
    flex: 1,
    justifyContent: "center", alignItems: "center",
    // borderWidth: 1, borderColor: "red",
  },
  topContentImageBackground: {
    position: "absolute",
  },
  topContentLinearGradientBackground: {
    position: "absolute",
    opacity: 0.9,
    width: "100%",
    height: "100%",
    // borderWidth: 2, borderColor: "blue",
  },
  authLogo: {
    width: 180, height: 180,
  }
})