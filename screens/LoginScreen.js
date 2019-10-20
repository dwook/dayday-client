import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AppContext} from '../src/Provider';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import styled from 'styled-components';
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
      <Background source={require('../assets/space.png')}>
        <Container>
          <IntroText>오늘,{'\n'}어떤 하루를 보내셨나요?</IntroText>
          <AppContext.Consumer>
            {context => (
              <TouchableOpacity
                onPress={() =>
                  this.loginWithFacebook(context.saveToken, context.setUser)
                }>
                <FacebookButton>
                  <FacebookText>Login with Facebook</FacebookText>
                </FacebookButton>
              </TouchableOpacity>
            )}
          </AppContext.Consumer>
        </Container>
      </Background>
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
  align-content: flex-start;
`;

const IntroText = styled.Text`
  margin-top: 200px;
  margin-left: 20px;
  margin-bottom: 300px;
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
  font-size: 18px;
`;
