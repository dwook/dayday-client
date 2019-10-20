import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Voice from 'react-native-voice';
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
      good: '',
      bad: '',
      plan: '',
    },
    recordedText: '',
    onSpeechRecognized: e => {
      console.log('onSpeechRecognized: ', e);
    },
    onSpeechResults: e => {
      console.log('onSpeechResults: ', e);
      this.setState({
        recordedText: e.value,
      });
      console.log('스테이트에 들어감', this.state.recordedText);
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
    enterText: async (text, type) => {
      await this.setState(currentState => {
        return {
          ...currentState,
          diary: {
            ...currentState.diary,
            [type]: text,
          },
        };
      });
      console.log('내용작성', this.state.diary);
    },
    getDiary: async (writer, date, type, pagination) => {
      await axios
        .get('http://localhost:3000/diaries', {
          params: {
            writer,
            date,
            type,
            pagination,
          },
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTodayDiary: async () => {
      await axios
        .get('http://localhost:3000/diaries', {
          params: {
            writer: this.state.user.id,
            date: moment(new Date()).format('YYYY-MM-DD'),
          },
        })
        .then(data => {
          console.log('투데이', data.data.diary);
          const {good, bad, plan} = data.data.diary[0];
          this.setState(currentState => {
            return {
              ...currentState,
              diary: {
                good,
                bad,
                plan,
              },
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendDiary: async () => {
      await axios
        .post('http://localhost:3000/diaries', {
          diary: this.state.diary,
          user: this.state.user,
          date: moment(new Date()).format('YYYY-MM-DD'),
        })
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

  constructor(props) {
    super(props);
    Voice.onSpeechRecognized = this.state.onSpeechRecognized;
    Voice.onSpeechResults = this.state.onSpeechResults;
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
