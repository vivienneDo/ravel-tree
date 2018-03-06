// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/17/18
// Modified: 03/06/18
//
// "Terms and Privacy" screen for RavelTree.
//
// Pass in Terms of Service and Privacy Policy as props like so:
//
// <TermsAndPrivacy
//    terms={'Terms of service here.'}
//    privacy={'Privacy policy here.'}
// />

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect} from 'react-redux';

import LinkBack from '../components/LinkBack'
import RTLogoText from '../components/RTLogoText'
import TextSans from '../components/TextSans'

class TermsAndPrivacy extends Component {
  constructor (props) {
    super (props);
  }

  onPressBack () {
    this.props.setActiveScreen (this.props.previousScreen);
  }

  render (){
    const {
      terms,
      privacy,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack onPress={() => this.onPressBack ()}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.logo}>
            <RTLogoText size={60} />
          </View>
          <View style={styles.header}>
            <TextSans size={20}>Terms of Service</TextSans>
          </View>
          <View contentContainerStyle={styles.text}>
            <TextSans size={12}>{this.props.terms}</TextSans>
          </View>
          <View style={styles.header}>
            <TextSans size={20}>Privacy Policy</TextSans>
          </View>
          <View contentContainerStyle={styles.text}>
            <TextSans size={12}>{this.props.privacy}</TextSans>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 17,
  },
  scroll: {
    marginTop: 20,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
    showNavBar: state.showNavBar,
  };
}

export default connect (mapStateToProps)(TermsAndPrivacy);
