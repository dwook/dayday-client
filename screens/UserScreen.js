import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../src/Provider';
import styled from 'styled-components';

export default class User extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Background source={require('../assets/space.png')}>
        <Container>
          <AppContext.Consumer>
            {context => (
              <View>
                <ProfileImage source={{uri: context.user.profile_image}} />
                <ProfileText>
                  {context.user.name}님,{'\n'}안녕하세요!
                </ProfileText>
                <TouchableOpacity
                  onPress={() => this.logoutAsync(context.removeToken)}>
                  <LogoutText>Logout</LogoutText>
                </TouchableOpacity>
              </View>
            )}
          </AppContext.Consumer>
        </Container>
      </Background>
    );
  }

  logoutAsync = async () => {
    await AsyncStorage.clear();
    console.log('로그아웃');
    this.props.navigation.navigate('Login');
  };
}

const Background = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-content: flex-start;
`;

const ProfileImage = styled.Image``;

const ProfileText = styled.Text`
  color: #fff;
`;

const LogoutText = styled.Text`
  color: #fff;
`;
