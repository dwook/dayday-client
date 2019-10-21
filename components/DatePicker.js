import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {AppContext} from '../src/Provider';

const YearData = ['2017', '2018', '2019'];
const MonthData = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default class DatePicker extends React.Component {



  render() {
    return (
      <Container>
        <AppContext.Consumer>
          {context => (
            <View>
              <DateWrap>
                <TouchableOpacity
                  onPress={() => {
                    context;
                  }}>
                  <DateText>{this.props.children}</DateText>
                </TouchableOpacity>
              </DateWrap>
              
            </View>
          )}
        </AppContext.Consumer>
      </Container>
    );
  }
}

const Container = styled.View`
  height: 100px;
  margin-bottom: 30px;
`;

const DateWrap = styled.View`
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  color: #000;
  font-size: 16px;
`;

const ItemText = styled.View`
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;
const ItemList = styled.FlatList`
  position: absolute;
  top: 50px;
  width: 400px;
`;
