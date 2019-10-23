import React from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {AppContext} from '../src/Provider';
import moment from 'moment';
import styled from 'styled-components';

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

export default function DatePicker() {
  return (
    <AppContext.Consumer>
      {context => (
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
            {context.isYearPickerOpen && DateList('year', context.changeYear)}
            {context.isMonthPickerOpen &&
              DateList('month', context.changeMonth)}
          </DateSelection>
        </DatePickerWrap>
      )}
    </AppContext.Consumer>
  );
}

const DatePickerWrap = styled.View`
  flex-direction: row;
  height: 150px;
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
