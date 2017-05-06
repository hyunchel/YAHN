import { StyleSheet } from 'react-native';

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

export default styles;