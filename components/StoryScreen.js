import React, { Component } from 'react';
import { WebView } from 'react-native';
import styles from '../styles';

class StorySreen extends Component {
  static navigationOptions = {
    title: 'Story',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView
        source={{uri: params.url}} 
      />
    );
  }
}

export default StorySreen;