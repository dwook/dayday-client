import React from 'react';
import {Text, View, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import {GoodScreen, BadScreen, PlanScreen} from '../screens/DiaryScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeIcon, WriteIcon, MenuIcon, CloseIcon} from '../components/Icons';
import {AppContext} from '../src/Provider';

import styled from 'styled-components';

const CloseIconWrap = styled.View`
  color: #fff;
  padding-left: 40px;
`;

const SendDiaryWrap = styled.View`
  position: absolute;
  right: 40px;
  top: 0px;
  color: #fff;
`;
const SendDiary = styled.Text`
  font-size: 20px;
  color: #fff;
`;

const Header = styled.View`
  flex-direction: column;
`;

function SafeAreaDiaryTabBar(props) {
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <AppContext.Consumer>
        {context => (
          <View>
            <Header>
              <CloseIconWrap>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Home')}>
                  <CloseIcon />
                </TouchableOpacity>
              </CloseIconWrap>
              <SendDiaryWrap>
                <TouchableOpacity
                  onPress={() => {
                    context.sendDiary();
                    props.navigation.navigate('Home');
                  }}>
                  <SendDiary>전송</SendDiary>
                </TouchableOpacity>
              </SendDiaryWrap>
            </Header>
            <MaterialTopTabBar {...props} />
          </View>
        )}
      </AppContext.Consumer>
    </SafeAreaView>
  );
}

function SafeAreaBottomTabBar(props) {
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}

export const DiaryTabs = createMaterialTopTabNavigator(
  {
    Good: GoodScreen,
    Bad: BadScreen,
    Plan: PlanScreen,
  },
  {
    tabBarComponent: SafeAreaDiaryTabBar,
    tabBarOptions: {
      tabStyle: {
        height: 70,
        backgroundColor: '#000',
      },
      labelStyle: {
        fontSize: 20,
      },
    },
  },
);

export const DiaryStack = createStackNavigator(
  {
    DiaryTabs,
  },
  {
    headerMode: 'none',
  },
);

export const MainStack = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <HomeIcon stroke={focused ? '#fff' : '#495057'} />
        ),
      },
    },
    Diary: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({navigation}) => navigation.navigate('DiaryStack'),
        tabBarIcon: ({focused}) => (
          <WriteIcon stroke={focused ? '#fff' : '#495057'} />
        ),
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: 'User',
        tabBarIcon: ({focused}) => (
          <MenuIcon stroke={focused ? '#fff' : '#495057'} />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: SafeAreaBottomTabBar,
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      tabStyle: {
        height: 70,
        backgroundColor: 'red',
      },
    },
  },
);

export const AppStack = createStackNavigator(
  {
    MainStack,
    DiaryStack,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#000',
    },
  },
);

export const AuthStack = createStackNavigator(
  {Login: LoginScreen},
  {
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      AppLoading: AppLoadingScreen,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AppLoading',
    },
  ),
);
