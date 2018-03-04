// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/16/18
// Modified: 02/16/18
//
// Message thread screen for RavelTree.
//
// Pass in a "messages" array prop like so:
//
// <MessageThread
//    messages={[
//      {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
//      {active: false, sender: 'Adam Jesper', message: 'I think...'},
//    ]}
// />

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import LinkBack from '../components/LinkBack'
import RTLogoText from '../components/RTLogoText'
import TextHeader from '../components/TextHeader'
import MessageStub from '../components/MessageStub'
import MessageCard from '../components/MessageCard'
import TextSans from '../components/TextSans'

export default class MessageThread extends Component {
  constructor (props) {
    super (props);
  }

  getMessages () {
    return (
      <View>
        {this.props.messages.map ((message, index) =>
          <View style={styles.message}>
            <MessageCard
              active={message.active}
              user={message.sender}
              message={message.message}
              showReply={index == 0}
            />
          </View>
        )}
      </View>
    )
  }

  render (){
    const {
      user,
      messages,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack />
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.header}>
          <TextHeader>Messages</TextHeader>
          <TextSans size={14} color={'#5E5E5E'}>{this.props.user}</TextSans>
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
    alignItems: 'flex-start',
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