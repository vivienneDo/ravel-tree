// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 02/27/18
//
// "Ravel" screen for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import LinkBack from '../components/LinkBack'
import Divider from '../components/Divider'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import UserImage from '../components/UserImage'
import IconLeaf from '../components/IconLeaf'
import PassageStub from '../components/PassageStub'
import Button from '../components/Button'
import ButtonPlus from '../components/ButtonPlus'


class Ravel extends Component {
  constructor (props) {
    super (props);
    this.state = {

    };
  }



  showUsers () {
    return (
      <View style={styles.users}>
        <View style={styles.user}>
          <UserImage size={40} />
        </View>
        {this.props.participants.map ((user) =>
          <View style={styles.user}>
            <UserImage size={30} />
          </View>
        )}
      </View>
    );
  }

  showAdminLinks (show) {
    if (!show) {return}
    return (
      <View style={styles.links2}>
        <TextLink size={14}>Edit Tags</TextLink>
        <TextLink size={14}>Invite Participants</TextLink>
      </View>
    )
  }

  showButton (show) {
    if (!show) {return}
    return (
      <View style={styles.button}>
        <Button title={'Accept Invitation'} />
      </View>
    )
  }

  showPlus (show) {
    if (!show) {return}
    return (
      <ButtonPlus size={26} />
    );
  }


  showTree () {
    return (
      <View style={styles.tree}>
        <View style={styles.passageStub}>
          <PassageStub
            name={'Pacing the Basement'}
            author={'Rebecca Bates'}
            passageID={'1-A'}
            score={121}
            //active
          />
          {this.showPlus (this.props.mode == 'owned' || mode == 'participant')}
        </View>
      </View>
    );
  }


  render (){
    const {
      title,
      author,
      participants,
      score,
      mode,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack />
        <View style={styles.head}>
          <Divider />
          <View style={styles.title}>
            <TextSerif size={30}>{title}</TextSerif>
          </View>
          <View style={styles.by}>
            <TextHeader size={12} color={'#6A6A6A'}>By</TextHeader>
          </View>
          {this.showUsers ()}
          <View style={styles.score}>
            <IconLeaf size={37} />
            <View style={styles.scoreText}>
              <TextSerif size={28}>{score}</TextSerif>
            </View>
          </View>
          <View style={styles.links1}>
            <TextLink size={14}>Concept</TextLink>
            <TextLink size={14}>Share...</TextLink>
          </View>
          <Divider />
          {this.showAdminLinks (mode == 'owned')}
          {this.showButton (mode == 'invitation')}
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {this.showTree ()}
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
  },
  divider : {
    width: '100%',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    paddingBottom: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 7,
  },
  by: {
    marginBottom: 9,
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 13,
  },
  user: {
    marginHorizontal: 6,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    paddingLeft: 2,
    paddingBottom: 15,
  },
  links1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  links2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button :{
    marginTop: 20,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passageStub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
  };
}

export default connect (mapStateToProps)(Ravel);
