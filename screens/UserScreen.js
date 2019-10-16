import React from 'react';
import {
  AsyncStorage,
  ImageBackground,
  Image,
  Text,
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
                <Image
                  source={{uri: context.user.profile_image}}
                  style={styles.image}
                />
                <Text style={styles.text}>
                  {context.user.name}님,{'\n'}안녕하세요!
                </Text>
                <TouchableOpacity
                  onPress={() => this.logoutAsync(context.removeToken)}>
                  <View>
                    <Text style={styles.buttonText}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </AppContext.Consumer>
        </View>
      </ImageBackground>
    );
  }

  logoutAsync = async () => {
    await AsyncStorage.clear();
    console.log('로그아웃');
    this.props.navigation.navigate('Login');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  },
});
