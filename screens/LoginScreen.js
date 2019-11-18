import React from 'react';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../src/Provider';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import axios from 'axios';
import styled from 'styled-components/native';

export default class LoginScreen extends React.Component {
  loginWithFacebook = setUser => {
    try {
      LoginManager.logInWithPermissions(['public_profile']).then(
        async result => {
          if (result.isCancelled) {
            console.log('Login is cancelled.');
          } else {
            let userToken;
            await AccessToken.getCurrentAccessToken().then(data => {
              userToken = data.accessToken.toString();
              console.log('유저토큰', userToken);
            });
            await axios
              .post('http://localhost:3000/auth/facebook', {token: userToken})
              .then(data => {
                setUser(data.data.user);
                console.log('유저세팅', data.data.user);
              })
              .catch(err => {
                console.log(err);
              });
            await AsyncStorage.setItem('userToken', userToken);
            this.props.navigation.navigate('Home');
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Background source={require('../assets/space.png')}>
            <Container>
              <IntroText>오늘,{'\n'}어떤 하루를 보내셨나요?</IntroText>
              <TouchableOpacity
                onPress={() => this.loginWithFacebook(context.setUser)}>
                <FacebookButton>
                  <FacebookText>Login with Facebook</FacebookText>
                </FacebookButton>
              </TouchableOpacity>
            </Container>
          </Background>
        )}
      </AppContext.Consumer>
    );
  }
}

const Background = styled.ImageBackground`
  flex: 1;
  background: #000;
  padding: 30px;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const IntroText = styled.Text`
  margin-bottom: 200px;
  margin-left: 20px;
  font-size: 22px;
  color: #fff;
`;

const FacebookButton = styled.View`
  background: #fff;
  height: 60px;
  margin: 0 20px;
  padding: 20px 30px;
  border-radius: 30px;
`;

const FacebookText = styled.Text`
  text-align: center;
  font-size: 15px;
`;
