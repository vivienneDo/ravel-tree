// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/17/18
// Modified: 03/06/18
//
// Profile screen for RavelTree.
//
// Pass in user data as props like so:
//
// <Profile
//    isOwned
//    user={'Rebecca Bates'}
//    score={1064}
//    bio={'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.'}
//    statistics={{
//      ravelsLed: 5,
//      ravelsContributedTo: 29,
//      passagesWritten: 213,
//      upvotesReceived: 731,
//    }}
// />
//
// Note: "isOwned" displays the active user's profile, including links to log
// out and edit content. If false, these elements will be omitted, and
// "message" and "follow" functions will be added.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import TextHeader from '../components/TextHeader'
import UserImage from '../components/UserImage'
import IconLeaf from '../components/IconLeaf'

const TEST_USER = 'Rebecca Bates';
const TEST_SCORE = 1064;
const TEST_BIO = 'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.';
const TEST_STATISTICS = {
  ravelsLed: 5,
  ravelsContributedTo: 29,
  passagesWritten: 213,
  upvotesReceived: 731,
}

class Profile extends Component {
  constructor (props) {
    super (props);
  }

  render (){
    const {
      isOwned,
      user,
      score,
      bio,
      statistics,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <UserImage size={100} />
            {isOwned ? (
              <TextLink size={12}>Change Image</TextLink>
            ) : (
              <View style={{display: 'none'}} />
            )}
          </View>
          <View style={styles.topRight}>
            <TextSerif size={22}>{TEST_USER}</TextSerif>
            <View style={styles.score}>
              <IconLeaf size={30} />
              <TextSerif size={24}>{TEST_SCORE}</TextSerif>
            </View>
            {isOwned ? (
              <TextLink size={12}>Log Out</TextLink>
            ) : (
              <View>
                <View style={styles.spaceBelow}>
                  <TextLink size={12}>Follow</TextLink>
                </View>
                <TextLink size={12}>Message</TextLink>
              </View>
            )}
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.bio}>
            <View style={styles.bioHeader}>
              <TextHeader>Bio&nbsp;&nbsp;</TextHeader>
              {isOwned ? (
                <TextLink size={12}>Edit</TextLink>
              ) : (
                <View style={{display: 'none'}} />
              )}
            </View>
            <TextSerif size={16}>{TEST_BIO}</TextSerif>
          </View>
          <View style={styles.statistics}>
            <View style={styles.statisticsHeader}>
              <TextHeader>Statistics</TextHeader>
            </View>
            <View style={styles.statisticsContent}>
              <View style={styles.statisticsLeft}>
                <View style={styles.leftItem}>
                  <TextSans>Ravels led:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Ravels contributed to:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Passages written:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Upvotes received:</TextSans>
                </View>
              </View>
              <View style={styles.statisticsRight}>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{TEST_STATISTICS.ravelsLed}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{TEST_STATISTICS.ravelsContributedTo}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{TEST_STATISTICS.passagesWritten}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{TEST_STATISTICS.upvotesReceived}</TextSans>
                </View>
              </View>
            </View>
          </View>
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
    paddingHorizontal: 30,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  topLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topRight: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bio: {
    marginBottom: 20,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  statistics: {

  },
  statisticsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  statisticsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  statisticsLeft: {
    flexDirection: 'column',
     alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  statisticsRight: {
    flexDirection: 'column',
     alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  leftItem: {
    marginVertical: 6,
  },
  rightItem: {
    marginVertical: 1.8,
  },
  spaceBelow: {
    marginBottom: 8,
  },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(Profile);
