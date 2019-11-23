import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Animated,
  Keyboard,
  View,
} from 'react-native';
import {RecordIcon, SquareIcon, MaxmizeIcon, MinimizeIcon} from './Icons';
import Voice from 'react-native-voice';
import {AppContext} from '../src/Provider';
import styled from 'styled-components';
import {THEME_COLOR} from '../constant';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedText: [],
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
    };
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  toggleTextMode = () => {
    if (!this.state.isExpandedTextMode) {
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

  toggleRecordMode = async (enterText, diary, recordedText) => {
    if (!this.state.isRecordMode) {
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
      } catch (e) {
        console.error(e);
      }
    } else {
      const newText = diary[this.props.type] + (recordedText[0] || '');
      await enterText(newText, this.props.type);
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
        this.toggleTextMode();
      } catch (e) {
        console.error(e);
      }
    }
  };

  render() {
    return (
      <Background source={require('../assets/space.png')}>
        <Container>
          <AppContext.Consumer>
            {context => (
              <View>
                {this.state.isRecordMode && (
                  <NoticeText>
                    말씀해주시는 내용을{'\n'}텍스트로 전환중이에요!
                  </NoticeText>
                )}
                <AnimatedVoiceWrap
                  style={{
                    top: this.state.VoiceWrapTop,
                    left: this.state.VoiceWrapLeft,
                    width: this.state.VoiceWrapWidth,
                    height: this.state.VoiceWrapHeight,
                    zIndex: this.state.VoiceWrapZIndex,
                    borderRadius: this.state.VoiceWrapBorderRadius,
                    backgroundColor: THEME_COLOR[this.props.type],
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.toggleRecordMode(
                        context.enterText,
                        context.diary,
                        context.recordedText,
                      )
                    }>
                    <RecordButton>
                      <RecordIconWrap>
                        {this.state.isRecordMode ? (
                          <SquareIcon stroke={THEME_COLOR[this.props.type]} />
                        ) : (
                          <RecordIcon stroke={THEME_COLOR[this.props.type]} />
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
                      onChangeText={text =>
                        context.enterText(text, this.props.type)
                      }
                      onSubmitEditing={Keyboard.dismiss}
                      onFocus={this.toggleTextMode}
                      value={context.diary[this.props.type]}
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
              </View>
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
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-content: flex-start;
`;

const NoticeText = styled.Text`
  flex: 1;
  position: absolute;
  z-index: 2000;
  top: 200px;
  left: 60px;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
`;

const VoiceWrap = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
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

const IconWrap = styled.View`
  position: absolute;
  right: 23;
  top: 18;
`;

const AnimatedVoiceWrap = Animated.createAnimatedComponent(VoiceWrap);
const AnimatedDiaryInput = Animated.createAnimatedComponent(DiaryInput);
const AnimatedDiaryInputWrap = Animated.createAnimatedComponent(DiaryInputWrap);
