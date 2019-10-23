import React from 'react';
import {View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import {AppContext} from '../src/Provider';
import moment from 'moment';
import styled from 'styled-components';
import {THEME_COLOR} from '../constant';

const screenWidth = Dimensions.get('window').width;

function Item({date, day, good, bad, plan}) {
  return (
    <Diary>
      <DateWrap>
        <DateText>{date}</DateText>
        <DateText>{day}</DateText>
      </DateWrap>
      <ContentWrap>
        <TextWrap>
          <Dot color={THEME_COLOR.good} />
          <DiaryText numberOfLines={1} ellipsizeMode="tail">
            {good}
          </DiaryText>
        </TextWrap>
        <TextWrap>
          <Dot color={THEME_COLOR.bad} />
          <DiaryText numberOfLines={1} ellipsizeMode="tail">
            {bad}
          </DiaryText>
        </TextWrap>
        <TextWrap>
          <Dot color={THEME_COLOR.plan} />
          <DiaryText numberOfLines={1} ellipsizeMode="tail">
            {plan}
          </DiaryText>
        </TextWrap>
      </ContentWrap>
    </Diary>
  );
}

export default class Home extends React.Component {
  componentDidMount() {
    this.context.getTodayDiary();
    this.context.getMonthDiary();
  }
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Background source={require('../assets/space.png')}>
            <Container>
              <Modal />
              <DatePicker />
              {!(
                context.diary.good &&
                context.diary.bad &&
                context.diary.plan
              ) && (
                <Today>
                  <TodayDateWrap>
                    <TodayDateText>{moment().format('DD')}</TodayDateText>
                    <TodayDateText>{moment().format('ddd')}</TodayDateText>
                  </TodayDateWrap>
                  <TodayText>오늘 일기를 작성하지 않으셨네요!</TodayText>
                </Today>
              )}
              <FlatListWrap>
                <FlatList
                  data={this.context.diary_list}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => context.getDiaryById(item._id)}>
                      <Item
                        date={moment(item.created_at).format('DD')}
                        day={moment(item.created_at).format('ddd')}
                        good={item.good}
                        bad={item.bad}
                        plan={item.plan}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item._id}
                />
              </FlatListWrap>
            </Container>
          </Background>
        )}
      </AppContext.Consumer>
    );
  }
}

Home.contextType = AppContext;

const Background = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 40px;
`;

const DateWrap = styled.View`
  background: #fff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  color: #000;
  font-size: 16px;
`;

const Today = styled.View`
  flex-direction: row;
  align-items: center;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
  padding-bottom: 10px;
`;

const TodayDateWrap = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 0.5px;
  border-color: #fff;
`;

const TodayDateText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const TodayText = styled.Text`
  margin-left: 20px;
  font-size: 16px;
  color: #fff;
`;

const FlatListWrap = styled.View`
  height: 320px;
`;

const Diary = styled.View`
  flex-direction: row;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: #fff;
  padding: 10px 0;
  color: #fff;
  font-size: 16px;
`;

const ContentWrap = styled.View`
  width: ${screenWidth * 0.5};
  margin-left: 20px;
`;

const TextWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DiaryText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: #fff;
`;

const Dot = styled.View`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
`;
