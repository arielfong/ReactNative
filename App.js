import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    } from 'react-native';

import Button from 'react-native-button';

var MOCKED_MOVIES_DATA = [
    {title: 'Title', year: '2017', posters: {thumbnail:
'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

//class RottenTomatoMovies extends Component {
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL) 
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }
        renderMovie(movie) {
             return (

            

          <View style={styles.container}>
           <Image 
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}
            />
          
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
            </View>


          
           


            

      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
      rightContainer: {
          flex: 1,
      //backgroundColor: '#006FA3',
  },
  leftContainer: {
      flex: 1,
  },
  thumbnail: {
      width: 53,
      height: 81
  },
  title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
  },
  year: {
      textAlign: 'center',
  },
  listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('arielProject', () => RottenTomatoMovies);