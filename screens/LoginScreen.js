import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import {AppContext} from '../src/Provider';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  loginWithFacebook = (saveToken, setUser) => {
    try {
      LoginManager.logInWithPermissions(['public_profile']).then(
        async result => {
          if (result.isCancelled) {
            console.log('Login is cancelled.');
          } else {
            let userToken;
            await AccessToken.getCurrentAccessToken().then(data => {
              userToken = data.accessToken.toString();
            });
            await axios
              .post('http://localhost:3000/auth/facebook', {token: userToken})
              .then(async data => {
                console.log('돌아온 데이터', data.data.user);
                await setUser(data.data.user);
              })
              .catch(err => {
                console.log(err);
              });
            await saveToken(userToken).then(() => {
              this.props.navigation.navigate('Home');
            });
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/space.png')}>
        <View style={styles.container}>
          <Text style={styles.title}>오늘,{'\n'}어떤 하루를 보내셨나요?</Text>
          <AppContext.Consumer>
            {context => (
              <TouchableOpacity
                onPress={() =>
                  this.loginWithFacebook(context.saveToken, context.setUser)
                }>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Login with Facebook</Text>
                </View>
              </TouchableOpacity>
            )}
          </AppContext.Consumer>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginRight: 'auto',
    paddingLeft: 60,
    marginBottom: 300,
    fontSize: 22,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
  },
  background: {
    flex: 1,
  },
});
