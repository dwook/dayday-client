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
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

export const AppStack = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Good: GoodScreen,
    Bad: BadScreen,
    Plan: PlanScreen,
    User: UserScreen,
  },
  {
    tabBarPosition: 'bottom',
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
