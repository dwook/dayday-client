import React from 'react';
import {TouchableOpacity, Dimensions, Text, View} from 'react-native';
import {AppContext} from '../src/Provider';
import styled from 'styled-components';
import {CloseIcon} from './Icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Modal extends React.Component {
  render() {
    return (
      <Container>
        <AppContext.Consumer>
          {context => (
            <View>
              <CloseIconWrap>
                <TouchableOpacity onPress={context.toggleModal}>
                  <CloseIcon stroke={'#000'} />
                </TouchableOpacity>
              </CloseIconWrap>
              <Content>
                <ContentText>{context.modalDiary.good}</ContentText>
                <ContentText>{context.modalDiary.bad}</ContentText>
                <ContentText>{context.modalDiary.plan}</ContentText>
              </Content>
            </View>
          )}
        </AppContext.Consumer>
      </Container>
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

const Content = styled.View`
  padding-top: 20px;
`;

const ContentText = styled.Text`
  color: #000;
  font-size: 16px;
`;

const CloseIconWrap = styled.View`
  color: #000;
  margin-left: auto;
`;
