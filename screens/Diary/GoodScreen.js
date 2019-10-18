import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Animated,
  Keyboard,
  NativeModules,
  View,
} from 'react-native';
import {AppContext} from '../../src/Provider';
import styled from 'styled-components';
import {
  RecordIcon,
  SquareIcon,
  MaxmizeIcon,
  MinimizeIcon,
} from '../../components/Icons';
import Voice from 'react-native-voice';
const locale = NativeModules.SettingsManager.settings.AppleLocale;
// console.log('언어', locale);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class GoodScreen extends React.Component {
  state = {
    isExpandedTextMode: false,
    isRecordMode: false,
    VoiceWrapTop: new Animated.Value(100),
    VoiceWrapLeft: new Animated.Value(screenWidth * 0.5 - 140),
    VoiceWrapZIndex: new Animated.Value(-1000),
    VoiceWrapWidth: new Animated.Value(280),
    VoiceWrapHeight: new Animated.Value(280),
    VoiceWrapBorderRadius: new Animated.Value(140),
    DiaryInputWrapHeight: new Animated.Value(58),
    DiaryInputWrapTop: new Animated.Value(300),
    DiaryInputHeight: new Animated.Value(26),
    recordedText: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechResults = this.onSpeechResults;
  }

  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
  };

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      recordedText: e.value,
    });
  };

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

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

  toggleRecordMode = async (enterText, diary) => {
    if (!this.state.isRecordMode) {
      console.log('보이스 작성모드 ON');

      Keyboard.dismiss();
      this.setState({
        isRecordMode: true,
      });
      Animated.spring(this.state.VoiceWrapTop, {
        toValue: 0,
      }).start();
      Animated.spring(this.state.VoiceWrapLeft, {
        toValue: 0,
      }).start();
      Animated.spring(this.state.VoiceWrapWidth, {
        toValue: screenWidth,
      }).start();
      Animated.spring(this.state.VoiceWrapHeight, {
        toValue: screenHeight,
      }).start();
      Animated.spring(this.state.VoiceWrapZIndex, {
        toValue: 1000,
      }).start();
      Animated.spring(this.state.VoiceWrapBorderRadius, {
        toValue: 0,
      }).start();
      try {
        await Voice.start('ko-KR');
        console.log('보이스시작');
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('보이스 작성모드 OFF');
      const newText = diary.good + (this.state.recordedText[0] || '');
      await enterText(newText);
      this.setState({
        isRecordMode: false,
      });
      Animated.spring(this.state.VoiceWrapTop, {
        toValue: 100,
      }).start();
      Animated.spring(this.state.VoiceWrapLeft, {
        toValue: screenWidth * 0.5 - 140,
      }).start();
      Animated.spring(this.state.VoiceWrapWidth, {
        toValue: 280,
      }).start();
      Animated.spring(this.state.VoiceWrapHeight, {
        toValue: 280,
      }).start();
      Animated.spring(this.state.VoiceWrapZIndex, {
        toValue: -1000,
      }).start();
      Animated.spring(this.state.VoiceWrapBorderRadius, {
        toValue: 140,
      }).start();
      try {
        await Voice.destroy();
        console.log('보이스끝');
      } catch (e) {
        console.error(e);
      }
    }
  };

  render() {
    return (
      <Background source={require('../../assets/space.png')}>
        <Container>
          <AppContext.Consumer>
            {context => (
              <View>
                <AnimatedVoiceWrap
                  style={{
                    top: this.state.VoiceWrapTop,
                    left: this.state.VoiceWrapLeft,
                    width: this.state.VoiceWrapWidth,
                    height: this.state.VoiceWrapHeight,
                    zIndex: this.state.VoiceWrapZIndex,
                    borderRadius: this.state.VoiceWrapBorderRadius,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.toggleRecordMode(context.enterText, context.diary)
                    }>
                    <RecordButton>
                      <RecordIconWrap>
                        {this.state.isRecordMode ? (
                          <SquareIcon />
                        ) : (
                          <RecordIcon />
                        )}
                      </RecordIconWrap>
                    </RecordButton>
                  </TouchableOpacity>
                </AnimatedVoiceWrap>
                <TouchableOpacity onPress={this.toggleTextMode}>
                  <AnimatedDiaryInputWrap
                    style={{
                      height: this.state.DiaryInputWrapHeight,
                      top: this.state.DiaryInputWrapTop,
                    }}>
                    <AnimatedDiaryInput
                      multiline
                      scrollEnabled
                      placeholder={'Write your day'}
                      onChangeText={text => context.enterText(text)}
                      onSubmitEditing={Keyboard.dismiss}
                      onFocus={this.toggleTextMode}
                      value={context.diary.good}
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
                {/* <Text>{locale}</Text> */}
                {/* <TouchableOpacity onPress={() => context.sendDiary()}>
                  <SendButton>완료</SendButton>
                </TouchableOpacity> */}
              </View>
            )}
          </AppContext.Consumer>
        </Container>
      </Background>
    );
  }

  sendDiary = async () => {};
}

GoodScreen.contextType = AppContext;

const Container = styled.View`
  flex: 1;
  background: yellow;
  flex-direction: column;
  align-content: flex-start;
`;

const VoiceWrap = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  background: #eb5757;
`;

const RecordButton = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #fff;
`;

const RecordIconWrap = styled.View`
  position: absolute;
  top: 20px
  right: 12px;
  transform: translateX(-6px);
`;

const DiaryInput = styled.TextInput`
  padding-right: 60px;
  overflow: hidden;
  line-height: 20px;
`;

const DiaryInputWrap = styled.View`
  position: absolute;
  width: 360px;
  left: ${screenWidth * 0.5};
  transform: translateX(-180px);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 30px 20px 20px;
`;

const AnimatedVoiceWrap = Animated.createAnimatedComponent(VoiceWrap);
const AnimatedDiaryInput = Animated.createAnimatedComponent(DiaryInput);
const AnimatedDiaryInputWrap = Animated.createAnimatedComponent(DiaryInputWrap);

const IconWrap = styled.View`
  position: absolute;
  right: 23;
  top: 18;
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
