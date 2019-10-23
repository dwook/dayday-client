import React from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import Modal from '../components/Modal';
import {AppContext} from '../src/Provider';
import moment from 'moment';
import styled from 'styled-components';
import {THEME_COLOR} from '../constant';

const screenWidth = Dimensions.get('window').width;
const YearData = ['2017', '2018', '2019'];
const MonthData = [
  {value: '01', name: 'Jan'},
  {value: '02', name: 'Feb'},
  {value: '03', name: 'Mar'},
  {value: '04', name: 'Apr'},
  {value: '05', name: 'May'},
  {value: '06', name: 'Jun'},
  {value: '07', name: 'Jul'},
  {value: '08', name: 'Aug'},
  {value: '09', name: 'Sep'},
  {value: '10', name: 'Oct'},
  {value: '11', name: 'Nov'},
  {value: '12', name: 'Dec'},
];

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

function DateList(type, changeDate) {
  return (
    <ItemList
      data={type === 'year' ? YearData : MonthData}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => changeDate(type === 'year' ? item : item.value)}>
            <ItemWrap>
              <ItemText>{type === 'year' ? item : item.name}</ItemText>
            </ItemWrap>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => (type === 'year' ? item : item.value)}
      horizontal={true}
    />
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
          <Container>
            <Modal />
            <Background source={require('../assets/space.png')}>
              <View>
                <DatePickerWrap>
                  <DateWrap>
                    <TouchableOpacity onPress={context.setYear}>
                      <DateText>{moment(context.date).format('YYYY')}</DateText>
                    </TouchableOpacity>
                  </DateWrap>
                  <DateWrap>
                    <TouchableOpacity onPress={context.setMonth}>
                      <DateText>{moment(context.date).format('MMM')}</DateText>
                    </TouchableOpacity>
                  </DateWrap>
                  <DateSelection>
                    {context.isYearPickerOpen &&
                      DateList('year', context.changeYear)}
                    {context.isMonthPickerOpen &&
                      DateList('month', context.changeMonth)}
                  </DateSelection>
                </DatePickerWrap>
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
              </View>
            </Background>
          </Container>
        )}
      </AppContext.Consumer>
    );
  }
}

Home.contextType = AppContext;

const Background = styled.ImageBackground`
  padding: 70px 40px;
`;

const Container = styled.View`
  flex: 1;
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
  width: 100%;
  height: 300px;
`;

const DatePickerWrap = styled.View`
  flex-direction: row;
  margin-bottom: 100px;
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

const DateSelection = styled.View`
  position: absolute;
  top: 60px;
  height: 60px;
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

const ItemWrap = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 0.5px;
  border-color: #fff;
`;

const ItemText = styled.Text`
  color: #fff;
`;

const ItemList = styled.FlatList`
  width: ${screenWidth * 0.8};
`;
