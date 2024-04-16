import axios from 'axios';

const API_KEY = 'AIzaSyBuFytn-n4BOd8AmayX2ef0qmPfHjt9j8g';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  idToken = response.data.idToken;
  // console.log(
  //   `
  //     {
  //       "localId": ${response.data.localId},
  //       "email": ${response.data.email},
  //       "displayName": ${response.data.displayName},
  //       "idToken": ${response.data.idToken},
  //       "registered": ${response.data.registered},
  //       "refreshToken": ${response.data.refreshToken},
  //       "expiresIn": ${response.data.expiresIn}
  //     }
  //   `
  // )
  return idToken;
}

export async function createUser(email, password) {
  return await authenticate('signUp', email, password);
}

export async function login(email, password) {
  return await authenticate('signInWithPassword', email, password);
}