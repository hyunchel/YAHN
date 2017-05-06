/**
 * YAHN with React Native
 * https://github.com/hyunchel/YAHN
 * Hyunchel Kim
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import StoryScreen from './components/StoryScreen';

const YAHN = StackNavigator({
  Home: { screen: HomeScreen },
  Story: { screen: StoryScreen },
});

AppRegistry.registerComponent('YAHN', () => YAHN);