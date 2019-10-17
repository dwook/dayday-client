import React from 'react';
import {Text, View, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import DiaryScreen from '../screens/DiaryScreen';
import TestScreen from '../screens/TestScreen';
import ModalScreen from '../screens/ModalScreen';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import GoodScreen from '../screens/Diary/GoodScreen';
import BadScreen from '../screens/Diary/BadScreen';
import PlanScreen from '../screens/Diary/PlanScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeIcon, WriteIcon, MenuIcon, CloseIcon} from '../components/Icons';

import styled from 'styled-components';

const CloseIconWrap = styled.View`
  margin-left: auto;
  padding-right: 40px;
  font-size: 16px;
  color: #fff;
`;

function SafeAreaDiaryTabBar(props) {
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <CloseIconWrap>
          <CloseIcon />
        </CloseIconWrap>
      </TouchableOpacity>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}

function SafeAreaBottomTabBar(props) {
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
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
        backgroundColor: 'black',
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
        backgroundColor: 'black',
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
  },
);

export const AuthStack = createStackNavigator({Login: LoginScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: AppLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AppLoading',
    },
  ),
);
