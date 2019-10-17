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
  Animated,
  Keyboard,
  View,
} from 'react-native';
import {AppContext} from '../../src/Provider';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components';
import {
  TypeIcon,
  RecordIcon,
  MaxmizeIcon,
  MinimizeIcon,
} from '../../components/Icons';

const screenWidth = Dimensions.get('window').width;

export default class GoodScreen extends React.Component {
  state = {
    keyboardState: 'closed',
    isExpandedTextMode: false,
    DiaryInputWrapHeight: new Animated.Value(58),
    DiaryInputWrapTop: new Animated.Value(300),
    DiaryInputHeight: new Animated.Value(26),
  };

  toggleTextMode = () => {
    if (!this.state.isExpandedTextMode) {
      console.log('텍스트 작성모드 ON');
      this.setState({
        isExpandedTextMode: true,
      });
      Animated.spring(this.state.DiaryInputWrapHeight, {
        toValue: 300,
      }).start();
      Animated.spring(this.state.DiaryInputWrapTop, {
        toValue: 80,
      }).start();
      Animated.spring(this.state.DiaryInputHeight, {
        toValue: 300,
      }).start();
    } else {
      console.log('텍스트 작성모드 OFF');
      this.setState({
        isExpandedTextMode: false,
      });
      Animated.spring(this.state.DiaryInputWrapHeight, {
        toValue: 58,
      }).start();
      Animated.spring(this.state.DiaryInputWrapTop, {
        toValue: 300,
      }).start();
      Animated.spring(this.state.DiaryInputHeight, {
        toValue: 26,
      }).start();
    }
  };

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
                      <RecordIconWrap>
                        <RecordIcon />
                      </RecordIconWrap>
                    </TouchableOpacity>
                  </RecordButton>
                </VoiceWrap>
                <TouchableOpacity onPress={this.toggleTextMode}>
                  <AnimatedDiaryInputWrap
                    style={{
                      height: this.state.DiaryInputWrapHeight,
                      top: this.state.DiaryInputWrapTop,
                    }}>
                    <AnimatedDiaryInput
                      multiline
                      scrollEnabled
                      onChangeText={text => context.enterText(text)}
                      onSubmitEditing={Keyboard.dismiss}
                      onFocus={this.toggleTextMode}
                      style={{
                        height: this.state.DiaryInputHeight,
                      }}
                    />
                    <IconWrap>
                      {this.state.isExpandedTextMode ? (
                        <TouchableOpacity onPress={this.toggleTextMode}>
                          <MinimizeIcon />
                        </TouchableOpacity>
                      ) : (
                        <MaxmizeIcon />
                      )}
                    </IconWrap>
                  </AnimatedDiaryInputWrap>
                </TouchableOpacity>
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

const RecordIconWrap = styled.View`
  position: absolute;
  top: 20px
  right: 12px;
  transform: translateX(-6px);
  z-index: 100;
`;

const DiaryInput = styled.TextInput`
  height: 20px;
  padding-right: 60px;
  overflow: hidden;
  line-height: 20px;
`;

const DiaryInputWrap = styled.View`
  position: absolute;
  width: 360px;
  height: 58px;
  top: 300px;
  left: ${screenWidth * 0.5};
  transform: translateX(-180px);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 30px 20px 20px;
  z-index: 50;
`;

const AnimatedDiaryInput = Animated.createAnimatedComponent(DiaryInput);
const AnimatedDiaryInputWrap = Animated.createAnimatedComponent(DiaryInputWrap);

const IconWrap = styled.View`
  position: absolute;
  right: 23;
  top: 18;
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
