// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/16/18
// Modified: 03/06/18
//
// Messages screen for RavelTree.
//
// Pass in a "messages" array prop like so:
//
// <Messages
//    messages={[
//      {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
//      {active: false, sender: 'Adam Jesper', message: 'I think...'},
//    ]}
// />
//
// TODO: Make entire stub touchable and link to message thread.
// TODO: Pass in array of threads instead?

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextHeader from '../components/TextHeader'
import MessageStub from '../components/MessageStub'
import MessageCard from '../components/MessageCard'

const TEST_MESSAGES = [
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
];

class Messages extends Component {
  constructor (props) {
    super (props);
  }

  getMessages () {
    return (
      <View>
        {TEST_MESSAGES.map ((message) =>
          <View style={styles.message}>
            <MessageStub
              active={message.active}
              user={message.sender}
              message={message.message}
            />
          </View>
        )}
      </View>
    )
  }

  render (){
    const {
      messages,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.header}>
          <TextHeader>Messages</TextHeader>
        </View>
        <ScrollView contentContainerStyle={styles.messages}>
          {this.getMessages ()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    paddingHorizontal: 17,
  },
  logo: {
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
  },
  messages: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  message: {
    width: '100%',
    paddingBottom: 20,
  },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(Messages);
