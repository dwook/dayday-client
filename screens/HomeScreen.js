import React from 'react';
import {
  AsyncStorage,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/space.png')}>
        <View style={styles.container}>
          <Button title="User" onPress={this.showUser} />
          <Button title="Diary" onPress={this.showDiary} />
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Diary')}>
            <Text style={styles.text}>Diary</Text>
          </TouchableHighlight>
          <Button title="Test" onPress={this.showTest} />
        </View>
      </ImageBackground>
    );
  }

  showUser = () => {
    this.props.navigation.navigate('User');
  };
  showDiary = () => {
    this.props.navigation.navigate('Diary');
  };
  showTest = () => {
    this.props.navigation.navigate('Test');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
