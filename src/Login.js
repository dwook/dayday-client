import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import Touchable from '@appandflow/touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {authToken} from '../../utils/constants';
import {startMainApp} from '../../Nav';

const styles = StyleSheet.create({});

class LoginScreen extends Component {
  state = {
    loading: false,
  };

  _onLoginFbPress = async () => {
    this.setState({loading: true});

    let res;
    try {
      res = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
      ]);
    } catch (error) {
      console.log('====================================');
      console.log('error', error);
      console.log('====================================');
    }

    if (res.grantedPermissions && !res.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();

      if (data) {
        const serverResponse = await this.props.loginMutation({
          variables: {
            provider: 'FACEBOOK',
            token: data.accessToken,
          },
        });

        const {token} = serverResponse.data.login;

        try {
          await AsyncStorage.setItem(authToken, token);

          this.setState({loading: false});

          startMainApp();
        } catch (error) {
          throw error;
        }
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.root}>
          <ActivityIndicator size="large" color="#318DEE" />
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <Text>Continue with Facebook</Text>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($provider: Provider, $token: String) {
    login(provider: $provider, token: $token) {
      token
    }
  }
`;

export default graphql(loginMutation, {name: 'loginMutation'})(LoginScreen);
