// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/17/18
// Modified: 03/23/18
//
// "Terms and Privacy" screen for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';

import LinkBack from '../components/LinkBack'
import RTLogoText from '../components/RTLogoText'
import TextSans from '../components/TextSans'
import * as actions from '../actions'

class TermsAndPrivacy extends Component {
  constructor (props) {
    super (props);
    this.state = {
      terms: '',
      privacy: '',
    }
    this.props.readTermsOfService ();
    this.props.readPrivacyPolicy ();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.terms_of_service) {
      this.setState ({ terms: newProps.terms_of_service });
    }
    if (newProps.privacy_policy) {
      this.setState ({ privacy: newProps.privacy_policy });
    }
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  showTerms () {
    return (
      <TextSans size={12}>{this.state.terms}</TextSans>
    );
  }

  showPrivacy () {
    return (
      <TextSans size={12}>{this.state.privacy}</TextSans>
    );
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
          <View style={styles.text}>
            {this.showTerms ()}
          </View>
          <View style={styles.header}>
            <TextSans size={20}>Privacy Policy</TextSans>
          </View>
          <View style={styles.text}>
            {this.showPrivacy ()}
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
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreen,
    showNavBar,
  } = state.navigation;

  const {
    terms_of_service,
    privacy_policy,
  } = state.term_of_service;

  return {
    activeScreen,
    previousScreen,
    showNavBar,
    terms_of_service,
    privacy_policy,
  };
}

export default connect (mapStateToProps)(TermsAndPrivacy);
