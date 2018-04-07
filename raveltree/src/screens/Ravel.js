// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 03/28/18
//
// "Ravel" screen for RavelTree.
//
// TODO: Invitation mode.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import firebase from 'firebase';
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
import Tree from '../components/Tree'
import ConceptPopup from '../components/ConceptPopup'
import AddPopup from '../components/AddPopup'
import ForkPopup from '../components/ForkPopup'
import PassagePopup from '../components/PassagePopup'
import Loader from '../components/Loader'

import * as Test from '../test/Test'

TREE_HORIZONTAL_PADDING = 20;

class Ravel extends Component {
  constructor (props) {
    super (props);
    var screenData = this.props.screenData;
    this.state = {
      loading: true,
      ravelID: screenData.ravel_uid || '',
      mode: this.props.mode || '',
      showModal: screenData.showModal || '',
      loadPassage: screenData.loadPassage || false,
      passageID: screenData.passage_uid || '',
      //passageMetaData: screenData.passageMetaData || {},
    };

    console.log (screenData);
  }

  componentWillMount () {
    this.props.getRavelMetaData (this.props.screenData.ravel_uid)
    .then (ravel => { this.handleRavelMetaData (ravel); })
    .catch (error => { console.error (error); });
  }

  handleRavelMetaData (ravel) {
    if ((ravel || {}).ravel_uid == this.props.screenData.ravel_uid) {
      var tree = {
        data: ravel.roots,
        nodeCounts: ravel.nodeCount,
        nodesProcessed: {},
        depth: ravel.level_count,
        breadth: Math.max (...Object.values (ravel.nodeCount)),
        height: 0,
        width: 0,
        analyzed: false,
      };

      this.setState ({
        tree: tree,
        ravelID: ravel.ravel_uid,
        title: ravel.ravel_title,
        author: ravel.user_created,
        participants: ravel.ravel_participants,
        score: ravel.ravel_points,
        concept: ravel.ravel_concept,
        mode: (firebase.auth ().currentUser.uid == ravel.user_created) ? 'owned' : '',
        loading: false,
      });

      // If we're supposed to be loading a passage.
      if (this.state.loadPassage) {
        // ...then we need to get the passage metadata as well.
        this.props.getPassageMetaData (this.state.passageID, this.state.ravelID)
        .then (passage => { this.handlePassageMetaData (passage); })
        .catch (error => { console.error (error); });
      }
    }
  }

  handlePassageMetaData (passage) {
    this.setState ({
      passageMetaData: passage,
      loadPassage: false,
      showModal: 'passage',
    });
  }

  showModal (modalToShow) {
    var Popup;
    switch (modalToShow) {
      case 'concept':
        Popup = ConceptPopup;
        break;
      case 'add':
        Popup = AddPopup;
        break;
      case 'fork':
        Popup = ForkPopup;
        break;
      case 'passage':
        Popup = PassagePopup;
        break;
      default:
        return;
    }

    return (
      <View style={styles.modal}>
        <Popup
          onPressClose={() => this.setState ({ showModal: '' })}
          onSwitchToPassage={(passageMetaData) => this.onSwitchToPassage (passageMetaData)}
          onSwitchToAdd={(passageMetaData) => this.onSwitchToAdd (passageMetaData)}
          onAdd={() => this.onAdd ()}
          onNavigate={(screen, screenData) => this.onNavigate (screen, screenData)}
          {...this.props}
          {...this.state}
        />
      </View>
    );
  }

  onSwitchToPassage (passageMetaData) {
    this.setState ({
      passageMetaData: passageMetaData,
      showModal: 'passage',
    });
  }

  onSwitchToAdd (passageMetaData) {
    this.setState ({
      passageMetaData: passageMetaData,
      //nodeCounts: this.state.tree.nodeCounts,
      showModal: 'add',
    });
  }

  onAdd (passageMetaData) {
    this.props.getRavelMetaData (this.props.screenData.ravel_uid)
    .then (ravel => {
      this.handleRavelMetaData (ravel);
      //this.onSwitchToPassage (passageMetaData);
    })
    .catch (error => { console.error (error); });
  }

  onNavigate (screen, screenData) {
    console.log ('Trying to navigate...');
    // TODO: What do we need to navigate back properly? var screenData = ...
    this.props.navigateForward ('Merge', screenData);
  }

  showLoader () {
    return <Loader />;
  }

  showUsers () {
    var participants;
    if (this.state.participants) {
      var ids = Object.keys (this.state.participants).filter (id =>
        this.state.participants [id] == true
      );

      participants = ids.map ((userID) =>
        <View key={userID} style={styles.user}>
          <UserImage {...this.props} userID={userID} size={30} />
        </View>
      );
    }

    return (
      <View style={styles.users}>
        <View style={styles.user}>
          <UserImage {...this.props} userID={this.state.author}
            size={40}
          />
        </View>
        {participants}
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
        <Button
          title={'Accept Invitation'}
          onPress={() => this.onPressAcceptInvitation ()}
        />
        <Button
          title={'Decline Invitation'}
          onPress={() => this.onPressDeclineInvitation ()}
        />
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
    if (this.state.loading) {
      this.showLoader ();
    }

    if (!this.state.tree || _.size (this.state.tree) == 0) { return; }

    return (
      <Tree
        tree={this.state.tree}
        mode={this.state.mode}
        onAnalyzeTree={(tree) => this.setState ({ tree: tree })}
        onPressPassage={(passageMetaData) => this.onSwitchToPassage (passageMetaData)}
        onPressAdd={(passageMetaData) => this.onSwitchToAdd (passageMetaData)}
        onPressInitialAddButton={() => this.onSwitchToAdd ()}
        horizontalPadding={TREE_HORIZONTAL_PADDING}
        ravelID={this.state.ravelID}
        {...this.props}
      />
    );
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  onPressAcceptInvitation () {
    // TODO
  }

  onPressDeclineInvitation () {
    // TODO
  }

  onPressConcept () {
    this.setState ({ showModal: 'concept' });
  }

  onPressShare () {
    // TODO
  }

  render (){
    const {
      mode,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
      {this.showModal (this.state.showModal)}
        <LinkBack onPress={() => this.onPressBack ()} />
        <View style={styles.head}>
          <Divider />
          <View style={styles.title}>
            <TextSerif size={30}>{this.state.title}</TextSerif>
          </View>
          <View style={styles.by}>
            <TextHeader size={12} color={'#6A6A6A'}>By</TextHeader>
          </View>
          {this.showUsers ()}
          <View style={styles.score}>
            <IconLeaf size={37} />
            <View style={styles.scoreText}>
              <TextSerif size={28}>{this.state.score}</TextSerif>
            </View>
          </View>
          <View style={styles.links1}>
            <TextLink size={14} onPress={() => this.onPressConcept ()}>Concept</TextLink>
            <TextLink size={14} onPress={() => this.onPressShare ()}>Share...</TextLink>
          </View>
          <Divider />
          {this.showAdminLinks (this.state.mode == 'owned')}
          {this.showButton (this.state.mode == 'invitation')}
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
  modal: {
    position: 'absolute',
    zIndex: 10,
    top: 25,
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
    minWidth: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
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
    screenData,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    ravel_meta_data,
  } = state.ravel;

  const {
    passage_meta_data,
  } = state.passage;

  return {
    activeScreen,
    previousScreens,
    screenData,
    currentUserProfile,
    ravel_meta_data,
    passage_meta_data,
  };
}

export default connect (mapStateToProps)(Ravel);
