import { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SwitchAuthModeButton from './ui/SwitchAuthModeButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ title, isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        <Text style={styles.title}>{title}</Text>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <SwitchAuthModeButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </SwitchAuthModeButton>
        </View>
      </View>
    </View>

  );
}

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  authContent: {
    width: '90%',
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.authBackground,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 30, fontWeight: "bold",
    color: "white",
  },
  buttons: {
    marginTop: 8,
  },
});