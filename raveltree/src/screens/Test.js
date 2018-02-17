import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import Messages from './Messages'
import MessageThread from './MessageThread';
import Notifications from './Notifications';
import TermsAndPrivacy from './TermsAndPrivacy'

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
      case ('MessageThread'): {
        return (
          <MessageThread
            style={styles.content}
            user={'Clint Lane Clover'}
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
      case ('Notifications'): {
        return (
          <Notifications
            style={styles.content}
            notifications={[
              {type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37},
              {type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'},
              {type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'},
              {type: 'message', user: 'Clint Lane Clover'},
              {type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'},
            ]}
          />
        );
      }
      case ('TermsAndPrivacy'): {
        return (
          <TermsAndPrivacy
            style={styles.content}
            terms={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue, ipsum id congue rutrum, enim libero viverra leo, vel suscipit nibh nisl non risus. Donec dapibus malesuada lobortis. Vestibulum augue nunc, rutrum vitae lacus eget, aliquet tincidunt ipsum. Nulla facilisis lacinia urna, eu pulvinar lectus tempus nec. Aliquam fringilla commodo semper. Proin eu sem eget ipsum pharetra volutpat. Nam a viverra arcu. Etiam ante justo, auctor non pharetra at, gravida et metus. Donec feugiat commodo gravida. Vestibulum tristique felis et accumsan consectetur. Fusce laoreet feugiat ex eu vestibulum. Proin porta enim quam, quis scelerisque ipsum pharetra ac. Praesent auctor eget diam vel finibus. Sed id augue nec erat tempus efficitur.'}
            privacy={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue, ipsum id congue rutrum, enim libero viverra leo, vel suscipit nibh nisl non risus. Donec dapibus malesuada lobortis. Vestibulum augue nunc, rutrum vitae lacus eget, aliquet tincidunt ipsum. Nulla facilisis lacinia urna, eu pulvinar lectus tempus nec. Aliquam fringilla commodo semper. Proin eu sem eget ipsum pharetra volutpat. Nam a viverra arcu. Etiam ante justo, auctor non pharetra at, gravida et metus. Donec feugiat commodo gravida. Vestibulum tristique felis et accumsan consectetur. Fusce laoreet feugiat ex eu vestibulum. Proin porta enim quam, quis scelerisque ipsum pharetra ac. Praesent auctor eget diam vel finibus. Sed id augue nec erat tempus efficitur.'}
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
