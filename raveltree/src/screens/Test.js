import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import Messages from './Messages'

export default class Test extends Component {
  constructor (props) {
    super (props);
  }

  showScreen (screen)
  {
    switch (screen) {
      case ('Messages'): {
        return (
          <Messages
            style={styles.content}
            messages={[
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca! There\'s some stuff I have to tell you, and I have to make it longer than two lines so I can examine the truncation.'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
            ]}
           />
        );
      }
    }
  }

  render (){
    const {
      screen,
    } = this.props;

    return (this.showScreen (this.props.screen));
  }
}

const styles = StyleSheet.create({

});
