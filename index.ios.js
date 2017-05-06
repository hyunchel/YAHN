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
  ListView,
  WebView,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { parse, distanceInWordsToNow } from 'date-fns';


function shortenTitle(title) {
  // FIXME: some random number picked here.
  if (title.length > 34) {
    return title.slice(0, 30) + ' ...';
  };
  return title;
};

function prettyTime(date) {
  return distanceInWordsToNow(date * 1000);
};

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

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Hacker News',
  } 
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };
    this.fetchHNTopStories();
    this._onPressTitle = this._onPressTitle.bind(this);
  }
  _onPressTitle(url) {
    const { navigate } = this.props.navigation;
    navigate('Story', { url: url });
  }
  _onPressComment() {
    console.log('comment touched!');
  }
  fetchHNTopStories() {
    return fetchTopStories()
      .then((stories) => {
        this.setState({dataSource: this.ds.cloneWithRows(stories)});
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
          renderRow={(rowData) => {
            return (
              <View style={styles.story}>
                <TouchableHighlight
                  style={styles.titleSection}
                  onPress={() => this._onPressTitle(rowData.url)}
                >
                  <View>
                    <Text style={styles.title}>{shortenTitle(rowData.title)}</Text>
                    <Text style={styles.subTitle}>{prettyTime(rowData.time)} | {rowData.score} points</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.commentSection}
                  onPress={this._onPressComment}
                >
                  <View>
                    <Text style={styles.comment}>{rowData.descendants}</Text>
                  </View>
                </TouchableHighlight>
              </View>
              );
              }
          }
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
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  story: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start', 
    backgroundColor: '#6C5B7B',
  },
  commentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#C06C84',
  },
  title: {
  },
  subTitle: {
    fontSize: 10,
  },
  comment: {

  },
});

const YAHN = StackNavigator({
  Home: { screen: HomeScreen },
  Story: { screen: StorySreen },
});

AppRegistry.registerComponent('YAHN', () => YAHN);
