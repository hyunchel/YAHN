/**
 * YAHN with React Native
 * https://github.com/hyunchel/YAHN
 * Hyunchel Kim
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';


function fetchTopStories() {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((resp) => resp.json())
    .then((respJson) => {
      return Promise.all(respJson.slice(0, 10).map((ele) => {
        return fetch('https://hacker-news.firebaseio.com/v0/item/' + ele + '.json').then((resp) => resp.json());
      }));
    })
    .catch((error) => {
      console.error(error);
    });
};

export default class YAHN extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };
    this.fetchHNTopStoryTitles();
  }
  fetchHNTopStoryTitles() {
    return fetchTopStories()
      .then((stories) => {
        return stories.map((ele) => {
          return ele.title;
        })
      })
      .then((titles) => {
        this.setState({dataSource: this.ds.cloneWithRows(titles)});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Hacker News!
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        >
        </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('YAHN', () => YAHN);
