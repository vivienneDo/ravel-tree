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
import YourRavels from './YourRavels';
import Profile from './Profile';

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
      case ('YourRavels'): {
        return (
          <YourRavels
             ravels={[
               {ravel: 'Shakespeare on Ice', users: 61, score: 324},
               {ravel: 'Where\'s the Beef?', users: 4, score: 14},
               {ravel: 'The Sound of Violins', users: 2, score: 10},
               {ravel: 'Something Special', users: 19, score: 123},
               {ravel: 'Shallow Waters', users: 1, score: 34},
             ]}
          />
        );
      }
      case ('Profile'): {
        return (
          <Profile
             isOwned={false}
             user={'Rebecca Bates'}
             score={1064}
             bio={'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.'}
             statistics={{
               ravelsLed: 5,
               ravelsContributedTo: 29,
               passagesWritten: 213,
               upvotesReceived: 731,
             }}
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
  content: {
    //width: '100%',
  }
});
