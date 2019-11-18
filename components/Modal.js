import React from 'react';
import {Animated, TouchableOpacity, Dimensions, View} from 'react-native';
import {AppContext} from '../src/Provider';
import styled from 'styled-components/native';
import {CloseIcon} from './Icons';
import {THEME_COLOR} from '../constant';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Modal extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <AnimatedContainer style={{top: context.modalTop}}>
            <CloseIconWrap>
              <TouchableOpacity
                onPress={() => {
                  context.toggleModal('close');
                }}>
                <CloseIcon stroke={'#000'} />
              </TouchableOpacity>
            </CloseIconWrap>
            <ContentWrap>
              <Content>
                <TitleWrap>
                  <Dot color={THEME_COLOR.good} />
                  <TitleText color={THEME_COLOR.good}> GOOD</TitleText>
                </TitleWrap>
                <DiaryText>{context.selectedDiary.good}</DiaryText>
              </Content>
              <Content>
                <TitleWrap>
                  <Dot color={THEME_COLOR.bad} />
                  <TitleText color={THEME_COLOR.bad}> BAD</TitleText>
                </TitleWrap>
                <DiaryText>{context.selectedDiary.bad}</DiaryText>
              </Content>
              <Content>
                <TitleWrap>
                  <Dot color={THEME_COLOR.plan} />
                  <TitleText color={THEME_COLOR.plan}> PLAN</TitleText>
                </TitleWrap>
                <DiaryText>{context.selectedDiary.plan}</DiaryText>
              </Content>
            </ContentWrap>
          </AnimatedContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

const Container = styled.View`
  background: #fff;
  width: ${screenWidth};
  height: ${screenHeight}
  padding: 50px;
  position: absolute;
  z-index: 100;
`;

export const ContentWrap = styled.View`
  padding-top: 20px;
`;
ContentWrap.displayName = 'ContentWrap';

const Content = styled.View`
  flex-direction: column;
`;

const TitleWrap = styled.Text`
  font-size: 20px;
`;

const TitleText = styled.Text`
  color: ${props => props.color};
`;

const DiaryText = styled.Text`
  margin: 10px 0 40px;
  font-size: 16px;
  color: #000;
`;

const Dot = styled.View`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
`;

const CloseIconWrap = styled.View`
  color: #000;
  margin-left: auto;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
