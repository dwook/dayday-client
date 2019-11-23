import React, {Component} from 'react';
import {Animated, Dimensions} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Voice from 'react-native-voice';
const screenHeight = Dimensions.get('window').height;

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  state = {
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
    selectedDiary: {},
    diary_list: [],
    recordedText: '',
    date: new Date(),
    isYearPickerOpen: false,
    isMonthPickerOpen: false,
    modalTop: new Animated.Value(screenHeight),
    toggleModal: action => {
      if (action === 'open') {
        Animated.spring(this.state.modalTop, {
          toValue: 0,
        }).start();
      }
      if (action === 'close') {
        Animated.spring(this.state.modalTop, {
          toValue: screenHeight,
        }).start();
      }
    },
    setYear: () => {
      this.setState({
        isYearPickerOpen: !this.state.isYearPickerOpen,
        isMonthPickerOpen: false,
      });
    },
    setMonth: () => {
      this.setState({
        isMonthPickerOpen: !this.state.isMonthPickerOpen,
        isYearPickerOpen: false,
      });
    },
    changeYear: item => {
      const newDate =
        item +
        moment(this.state.date)
          .format('YYYY-MM')
          .slice(4);
      this.setState(
        {
          date: new Date(newDate),
          isYearPickerOpen: false,
        },
        this.state.getMonthDiary,
      );
    },
    changeMonth: item => {
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
    },
    onSpeechRecognized: e => {
      console.log('onSpeechRecognized: ', e);
    },
    onSpeechResults: e => {
      console.log('onSpeechResults: ', e);
      this.setState({
        recordedText: e.value,
      });
    },
    setUser: user => {
      this.setState({
        user: {
          id: user._id,
          name: user.name,
          profile_image: user.profile_image,
        },
      });
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
    },
    getDiary: async ({writer, begin, end, type}) => {
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDiaryById: async id => {
      await axios
        .get('http://localhost:3000/diaries/' + id)
        .then(data => {
          const diary = data.data.diary;
          this.setState(currentState => {
            return {
              ...currentState,
              selectedDiary: diary,
            };
          });
          this.state.toggleModal('open');
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
      const startOfMonth = moment(this.state.date)
        .startOf('month')
        .format('YYYY-MM-DD');
      const endOfMonth = moment(this.state.date)
        .endOf('month')
        .format('YYYY-MM-DD');
      this.state.getDiary({
        writer: this.state.user.id,
        begin: startOfMonth,
        end: endOfMonth,
      });
    },
    sendDiary: async () => {
      await axios
        .post('http://localhost:3000/diaries', {
          diary: this.state.diary,
          user: this.state.user,
          date: moment(new Date()).format('YYYY-MM-DD'),
        })
        .then(() => {
          this.state.getMonthDiary();
        })
        .catch(err => {
          console.log(err);
        });
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
