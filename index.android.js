import React, { Component } from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  }

  handleStartPress() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30)
  }

  handleLapPress() {
    this.setState({
      laps: this.state.laps.concat([this.state.timeElapsed])
    })

    this.setState({
      startTime: new Date()
    })
  }

  laps() {
    console.log('bla');
    return this.state.laps.map((time, index) => {
      return (
        <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap: {index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.thimerRapper]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonRapper]}>
            {/* {this.startbutton()} */}
            <TouchableHighlight
                underlayColor='gray'
                onPress={this.handleStartPress.bind(this)}
                style={[styles.button, this.state.running ? styles.stopButton : styles.startButton]}>
              <Text>
                {this.state.running ? 'Stop' : 'Start'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor='gray'
                style={styles.button}
                onPress={this.handleLapPress.bind(this)}>
              <Text>
                Lap
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.footer]}>
          {this.laps()}
        </View>
      </View>
    );
  }

  // TODO: find way to use outside render while passing the scope of 'this'  down
  // startbutton() {
  //   return (
  //     <TouchableHighlight
  //         underlayColor='gray'
  //         onPress={this.handlePress.bind(this)}>
  //       <Text>
  //         Start
  //       </Text>
  //     </TouchableHighlight>
  //   )
  // }

  // lapbutton() {
  //   return (
  //     <View>
  //       <Text>
  //         Lap
  //       </Text>
  //     </View>
  //   )
  // }

  // TODO: this is great tool for development to see all the flex cmponents
  // border(color) {
  //   return {
  //     borderColor: color,
  //     borderWidth: 4
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    // backgroundColor: 'blue',
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  thimerRapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }

});

AppRegistry.registerComponent('stopwatch', () => stopwatch);

