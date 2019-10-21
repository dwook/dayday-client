import React, {Component} from 'react';
import {AsyncStorage} from '@react-native-community/async-storage';
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
    diary_list: [],
    recordedText: '',
    date: new Date(),
    isYearPickerOpen: false,
    isMonthPickerOpen: false,
    toggleYear: () => {
      this.setState({
        isYearPickerOpen: !this.state.isYearPickerOpen,
        isMonthPickerOpen: false,
      });
    },
    toggleMonth: () => {
      this.setState({
        isMonthPickerOpen: !this.state.isMonthPickerOpen,
        isYearPickerOpen: false,
      });
    },
    changeYear: item => {
      console.log('연도변경시작', item, this.state.date);
      const newDate =
        item +
        moment(this.state.date)
          .format('YYYY-MM')
          .slice(4);
      console.log(typeof newDate);
      this.setState(
        {
          date: new Date(newDate),
          isYearPickerOpen: false,
        },
        this.state.getMonthDiary,
      );
      console.log('연도변경완료', newDate, this.state.date);
    },
    changeMonth: item => {
      console.log('달변경', item, this.state.date);
      const newDate =
        moment(this.state.date)
          .format('YYYY-MM')
          .slice(0, 5) + item;
      this.setState(
        {
          date: new Date(newDate),
          isMonthPickerOpen: false,
        },
        this.state.getMonthDiary,
      );
      console.log('달변경완료', newDate, this.state.date);
    },
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
    getDiary: async (writer, begin, end, type) => {
      await axios
        .get('http://localhost:3000/diaries', {
          params: {
            writer,
            begin,
            end,
            type,
          },
        })
        .then(data => {
          this.setState({
            diary_list: data.data.diary,
          });
          console.log('들어온 이번달 일기들', this.state.diary_list);
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
            begin: moment(new Date()).format('YYYY-MM-DD'),
            end: moment(new Date()).format('YYYY-MM-DD'),
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
    getMonthDiary: async () => {
      console.log(
        '이번달 불러옵니다.',
        this.state.date,
        typeof this.state.date,
      );
      const startOfMonth = moment(this.state.date)
        .startOf('month')
        .format('YYYY-MM-DD');
      const endOfMonth = moment(this.state.date)
        .endOf('month')
        .format('YYYY-MM-DD');
      this.state.getDiary(this.state.user.id, startOfMonth, endOfMonth);
    },
    sendDiary: async () => {
      await axios
        .post('http://localhost:3000/diaries', {
          diary: this.state.diary,
          user: this.state.user,
          date: moment(new Date()).format('YYYY-MM-DD'),
        })
        .then((data, props) => {
          console.log('프롭스', data, props);
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
