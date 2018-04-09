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
    console.log (screenData);
    console.log (screenData.ravel_uid);
    console.log ((screenData.ravel || {}).ravel_uid);
    this.state = {
      loading:      true,
      ravel:        undefined,
      ravelID:      screenData.ravel_uid || (screenData.ravel || {}).ravel_uid || '',
      mode:         this.props.mode      || '',
      showModal:    screenData.showModal || '',
      modalData: {
        add: {
          passageIndex:    undefined,
          passageMetaData: undefined,
        },
        passage: {
          loadPassage:     screenData.loadPassage,
          passageMetaData: undefined,
        },
      },
      title:        undefined,
      author:       undefined,
      participants: undefined,
      numberParticipants: undefined,
      score:        undefined,
      concept:      undefined,
    };
  }

  componentWillMount () {
    // Retrieve the ravel's metadata.
    // this.props.getRavelMetaData (this.props.screenData.ravel_uid)
    this.props.getRavelMetaData (this.state.ravelID)
    // Load the ravel locally.
    .then (ravel => { this.loadRavel (ravel); })
    .catch (error => { console.error (error); });
  }

  loadRavel (ravel) {
    return new Promise ((resolve, reject) => {
      this.setState ({
        ravel: ravel,
        ravelID: ravel.ravel_uid,
        title: ravel.ravel_title,
        author: ravel.user_created,
        participants: ravel.ravel_participants,
        numberParticipants: ravel.ravel_number_participants,
        score: ravel.ravel_points,
        concept: ravel.ravel_concept,
        mode: (firebase.auth ().currentUser.uid == ravel.user_created) ? 'owned' : '',
      });

      // If we're supposed to be loading a passage...
      if (this.state.modalData.passage.loadPassage) {
        // ...then we need to get the passage metadata as well.
        this.props.getPassageMetaData (this.state.modalData.passage.loadPassage, this.state.ravelID)
        .then (passage => { this.switchToPassage (passage); })
        .catch (error => { console.error (error); });
        resolve ();
      }

      // Otherwise, we're done here.
      else {
        // Reload the tree.
        this.props.setShouldReloadTree (true);
        this.setState ({ loading: false });
        resolve ();
      }
    });
  }

  showModal (modalToShow) {
    switch (modalToShow) {
      case 'concept':
        return (
          <View style={styles.modal}>
            <ConceptPopup
              {...this.props}
              onPressClose={() => this.setState ({ showModal: '' })}
              ravel={this.state.ravel}
            />
          </View>
        );
      case 'add':
        return (
          <View style={styles.modal}>
            <AddPopup
              {...this.props}
              onPressClose={() => this.setState ({ showModal: '' })}
              ravelID={this.state.ravelID}
              passageIndex={this.state.modalData.add.passageIndex}
              passageMetaData={this.state.modalData.add.passageMetaData}
              addInitialPassage={(addData) => this.addInitialPassage (addData)}
              addPassage={(addData) => this.addPassage (addData)}
            />
          </View>
        );
      case 'passage':
        return (
          <View style={styles.modal}>
            <PassagePopup
              {...this.props}
              onPressClose={() => this.setState ({ showModal: '' })}
              onSwitchToAdd={(passage) => this.switchToAdd (passage)}
              onNavigateToMerge={(screen, screenData) => this.navigateToMerge (screen, screenData)}
              onReportRavel={(ravelID) => this.reportRavel (ravelID)}
              passageMetaData={this.state.modalData.passage.passageMetaData}
              ravelMetaData={this.state.ravel}
            />
          </View>
        );
      // ----
      // TODO
      // ----
      // case 'fork':
      //   Popup = ForkPopup;
      //   break;
      default:
        return;
    }

    // return (
    //   <View style={styles.modal}>
    //     <Popup
    //       onPressClose={() => this.setState ({ showModal: '' })}
    //       onSwitchToPassage={(passageMetaData) => this.switchToPassage (passageMetaData)}
    //       onSwitchToAdd={(passageMetaData) => this.switchToAdd (passageMetaData)}
    //       onNavigate={(screen, screenData) => this.onNavigate (screen, screenData)}
    //       // TODO: Figure out what we need for this. Don't just pass it all indiscriminately. This is biting you in the ass.
    //       {...this.props}
    //       {...this.state}
    //     />
    //   </View>
    // );
  }

  // ---------------------------------------------------------------------------
  // Public Links
  // ---------------------------------------------------------------------------
  onPressConcept () {
    this.setState ({ showModal: 'concept' });
  }

  onPressShare () {
    // TODO
  }

  // ---------------------------------------------------------------------------
  // Add
  // ---------------------------------------------------------------------------
  switchToAdd (passageMetaData) {
    var modalData = this.state.modalData;
    modalData.add.passageMetaData = passageMetaData;
    modalData.add.nodeCounts = (this.state.analyzedtree || {}).nodeCounts;
    this.setState ({
      modalData: modalData,
      showModal: 'add',
    });
  }

  addInitialPassage (addData) {
    this.props.addInitialPassage (addData)
    .then (passage => {
      this.onAdd (passage);
    })
    .catch (error => { console.log (error); });
  }

  addPassage (addData) {
    this.props.addPassage (addData)
    .then (passage => {
      this.onAdd (passage);
    })
    .catch (error => { console.log (error); });
  }

  onAdd (passage) {
    this.props.getRavelMetaData (this.props.screenData.ravel_uid)
    .then (ravel => {
      var screenData = {
        ravel_uid: this.props.screenData.ravel_uid,
        loadPassage: passage.passage_uid,
      }
      this.props.refresh ('Ravel', screenData);
    })
    .catch (error => { console.error (error); });
  }

  // ---------------------------------------------------------------------------
  // Passage
  // ---------------------------------------------------------------------------
  switchToPassage (passageMetaData) {
    var modalData = this.state.modalData;
    modalData.passage.passageMetaData = passageMetaData;
    this.setState ({
      modalData: modalData,
      showModal: 'passage',
      loading: false,
    });
  }

  reportRavel (ravelID) {
    // TODO
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  onPressBack () {
    this.props.navigateBack ();
  }

  navigateToMerge (screen, screenData) {
    // TODO: What do we need to navigate back properly? var screenData = ...

    this.props.navigateForward ('Merge', this.constructor.name, screenData);
  }

  // ---------------------------------------------------------------------------
  // Elements to Show
  // ---------------------------------------------------------------------------
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

  showInvitationButton (show) {
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

  onPressAcceptInvitation () {
    // TODO
  }

  onPressDeclineInvitation () {
    // TODO
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

    if (!this.state.ravel || _.size (this.state.ravel) == 0) { return; }

    return (
      <Tree
        {...this.props}
        //tree={this.state.tree}
        ravel={this.state.ravel}
        mode={this.state.mode}
        ravelID={this.state.ravelID}
        onAnalyzeTree={(analyzedTree) => this.setState ({ analyzedTree: analyzedTree })}
        onPressPassage={(passageMetaData) => this.switchToPassage (passageMetaData)}
        onPressAdd={(passageMetaData) => this.switchToAdd (passageMetaData)}
        onPressInitialAddButton={(passageMetaData) => this.switchToAdd (passageMetaData)}
        horizontalPadding={TREE_HORIZONTAL_PADDING}
      />
    );
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
          {this.showInvitationButton (this.state.mode == 'invitation')}
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
    shouldReloadTree,
  } = state.tree;

  return {
    activeScreen,
    previousScreens,
    screenData,
    currentUserProfile,
    shouldReloadTree
  };
}

export default connect (mapStateToProps)(Ravel);
