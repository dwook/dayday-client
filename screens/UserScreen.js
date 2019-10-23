import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../src/Provider';
import styled from 'styled-components';
import {LogoutIcon} from '../components/Icons';

export default class User extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Background source={require('../assets/space.png')}>
            <Container>
              <View>
                <ProfileWrap>
                  <ProfileImage source={{uri: context.user.profile_image}} />
                  <ProfileText>
                    {context.user.name}님,{'\n'}안녕하세요!
                  </ProfileText>
                </ProfileWrap>
                <ButtonWrap>
                  <TouchableOpacity onPress={() => {}}>
                    <GoodButton>
                      <ButtonText>Good</ButtonText>
                    </GoodButton>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <BadButton>
                      <ButtonText>Bad</ButtonText>
                    </BadButton>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <PlanButton>
                      <ButtonText>Plan</ButtonText>
                    </PlanButton>
                  </TouchableOpacity>
                </ButtonWrap>
                <TouchableOpacity onPress={this.logout}>
                  <LogoutIcon />
                </TouchableOpacity>
              </View>
            </Container>
          </Background>
        )}
      </AppContext.Consumer>
    );
  }

  logout = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Login');
    console.log('로그아웃');
  };
}

const Background = styled.ImageBackground`
  flex: 1;
  background: #000;
  padding: 70px 40px;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-content: flex-start;
`;

const ProfileWrap = styled.View`
  flex-direction: row;
  margin-top: 60px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const ProfileText = styled.Text`
  margin-left: 20px;
  margin-top: 5px;
  color: #fff;
  font-size: 20px;
`;

const ButtonWrap = styled.View`
  margin: 30px 0;
  padding: 30px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
  border-top-width: 0.5px;
  border-top-color: #fff;
  border-style: solid;
`;

const GoodButton = styled.View`
  background: #eb5757;
  height: 60px;
  margin: 3px 0;
  padding: 20px 30px;
  border-radius: 30px;
`;

const BadButton = styled.View`
  background: #6fcf97;
  height: 60px;
  margin: 3px 0;
  padding: 20px 30px;
  border-radius: 30px;
`;

const PlanButton = styled.View`
  background: #bb6bd9;
  height: 60px;
  margin: 3px 0;
  padding: 20px 30px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
