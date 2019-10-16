import React from 'react';
import {
  AsyncStorage,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../src/Provider';

export default class User extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/space.png')}>
        <View style={styles.container}>
          <AppContext.Consumer>
            {context => (
              <View>
                <TextInput
                  style={styles.textInput}
                  multiline
                  onChangeText={text => context.enterText(text)}
                />
                <TouchableOpacity onPress={() => context.sendDiary()}>
                  <View>
                    <Text style={styles.buttonText}>다이어리 작성완료</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </AppContext.Consumer>
        </View>
      </ImageBackground>
    );
  }

  sendDiary = async () => {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
    height: 300,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  background: {
    flex: 1,
  },
  buttonText: {
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  },
});
