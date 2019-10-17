import React from 'react';
import {
  AsyncStorage,
  ImageBackground,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  View,
} from 'react-native';
import {AppContext} from '../../src/Provider';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components';
import {TypeIcon, RecordIcon} from '../../components/Icons';

const screenWidth = Dimensions.get('window').width;

export default class GoodScreen extends React.Component {
  render() {
    return (
      <Background source={require('../../assets/space.png')}>
        <Container>
          <AppContext.Consumer>
            {context => (
              <View>
                <VoiceWrap>
                  <RecordButton>
                    <TouchableOpacity onPress={() => context.sendDiary()}>
                      <RecordWrap>
                        <RecordIcon />
                      </RecordWrap>
                    </TouchableOpacity>
                  </RecordButton>
                </VoiceWrap>
                <DiaryInput
                  multiline
                  onChangeText={text => context.enterText(text)}
                />
                <TypeWrap>
                  <TypeIcon />
                </TypeWrap>
                <TouchableOpacity onPress={() => context.sendDiary()}>
                  <SendButton>완료</SendButton>
                </TouchableOpacity>
              </View>
            )}
          </AppContext.Consumer>
        </Container>
      </Background>
    );
  }

  sendDiary = async () => {};
}

const Container = styled.View`
  flex: 1;
  background: yellow;
  flex-direction: column;
  align-content: flex-start;
`;

const VoiceWrap = styled.View`
  position: absolute;
  top: 100px;
  left: ${screenWidth * 0.5};
  width: 280px;
  height: 280px;
  border-radius: 140px;
  background: #eb5757;
  transform: translateX(-140px);
`;

const RecordButton = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #fff;
  position: absolute;
  top: 110px;
  left: 140px;
  transform: translateX(-30px);
`;

const RecordWrap = styled.View`
  position: absolute;
  top: 20px
  right: 12px;
  transform: translateX(-6px);
  z-index: 100;
`;

const DiaryInput = styled.TextInput`
  position: absolute;
  width: 360px;
  height: 58px;
  top: 300px;
  left: ${screenWidth * 0.5};
  transform: translateX(-180px);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 50;
`;

const TypeWrap = styled.View`
  position: absolute;
  right: 50;
  top: 315;
  z-index: 100;
`;

const Background = styled.ImageBackground`
  flex: 1;
`;

const SendButton = styled.Text`
  margin-left: 20px;
  padding: 15px;
  background: #fff;
  color: #000;
  font-size: 16px;
  width: 20%;
  text-align: center;
`;
