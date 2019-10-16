import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  state = {
    token: '',
    user: {
      id: '',
      name: '',
      profile_image: '',
    },
    diary: {
      good: 'a',
      bad: 'a',
      plan: 'a',
    },
    setUser: user => {
      this.setState({
        user: {
          id: user._id,
          name: user.name,
          profile_image: user.profile_image,
        },
      });
      console.log('등록된유저정보', this.state.user);
    },
    saveToken: async userToken => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        console.log('유저토큰222', userToken);
      } catch (error) {
        this.setState({error});
      }
    },
    enterText: async text => {
      await this.setState(currentState => {
        return {
          ...currentState,
          diary: {
            ...currentState.diary,
            good: text,
          },
        };
      });
      console.log('내용작성', this.state.diary);
    },
    sendDiary: async () => {
      await axios
        .post('http://localhost:3000/diaries', {diary: this.state.diary})
        .catch(err => {
          console.log(err);
        });
    },
    removeToken: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        this.setState({error});
      }
    },
    getToken: async () => {
      try {
        await AsyncStorage.getItem('userToken');
      } catch (error) {
        this.setState({error});
      }
    },
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
