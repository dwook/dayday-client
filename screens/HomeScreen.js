import React from 'react';
import {
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  Button,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {AppContext} from '../src/Provider';
import Circle from '../components/Circle';

export default class Home extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/space.png')}>
        <SafeAreaView>
          <View style={styles.container}>
            <AppContext.Consumer>
              {context => (
                <View>
                  <Circle />
                  <Circle />
                  <Circle />
                  <Text style={styles.notice}>
                    {context.diary.good &&
                      context.diary.bad &&
                      context.diary.plan &&
                      '오늘 모든 일기를 쓰셨네요!'}
                  </Text>
                </View>
              )}
            </AppContext.Consumer>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notice: {
    color: '#fff',
  },
  modal: {
    paddingTop: 100,
    paddingLeft: 100,
    paddingRight: 100,
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
  },
  background: {
    flex: 1,
  },
});
