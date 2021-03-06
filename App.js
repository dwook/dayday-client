import React from 'react';
import {StyleSheet, View, YellowBox} from 'react-native';
import AppNavigator from './src/Navigator';
import AppProvider from './src/Provider';

export default () => (
  <AppProvider>
    <View style={styles.container}>
      <AppNavigator />
    </View>
  </AppProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);
