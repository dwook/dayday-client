import React from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';

export default class AppLoading extends React.Component {
  constructor() {
    super();
    this.load();
  }

  load = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <Container>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
