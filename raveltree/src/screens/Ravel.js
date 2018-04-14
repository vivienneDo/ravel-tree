// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 04/14/18
//
// "Ravel" screen for RavelTree.
//
// TODO: Invitation mode.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  Alert,
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
import CommentPopup from '../components/CommentPopup'
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
      ravelID:      screenData.ravelID   || screenData.ravel_uid || (screenData.ravel || {}).ravel_uid || '',
      mode:         this.props.mode      || '',
      showModal:    screenData.showModal || '',
      modalData: {
        add: {
          passageIndex:    undefined,
          passageMetaData: undefined,
        },
        fork : {
          passageMetaData: undefined,
        },
        passage: {
          loadPassage:     screenData.loadPassage,
          passageMetaData: undefined,
        },
        comment: {
          show:            false,
          commentData:     undefined,
        },
      },
      title:        undefined,
      author:       undefined,
      participants: undefined,
      numberParticipants: undefined,
      score:        undefined,
      concept:      undefined,
    };

    // Make sure navigating back doesn't bring us back to the creation process.
    var previousScreens = this.props.previousScreens;
    if (previousScreens [previousScreens.length - 1] == 'AddTags') {
      this.props.resetPreviousScreens ();
    }
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

      // Determine the mode.
      var mode = '';
      var currentUserID = firebase.auth ().currentUser.uid;
      if (currentUserID == ravel.user_created) {
        mode = 'owned';
      }
      else if ((ravel.ravel_participants || {}) [currentUserID] === false) {
        mode = 'invited';
      }
      else if ((ravel.ravel_participants || {}) [currentUserID] === true) {
        mode = 'participant';
      }

      this.setState ({
        ravel: ravel,
        ravelID: ravel.ravel_uid,
        title: ravel.ravel_title,
        author: ravel.user_created,
        participants: ravel.ravel_participants,
        numberParticipants: ravel.ravel_number_participants,
        score: ravel.ravel_points,
        concept: ravel.ravel_concept,
        mode: mode,
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
              ravelMetaData={this.state.ravel}
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
              onSwitchToFork={(passage) => this.switchToFork (passage)}
              onNavigateToMerge={(screen, screenData) => this.navigateToMerge (screen, screenData)}
              onReportRavel={(ravelID) => this.reportRavel (ravelID)}
              onPressComment={(commentData) => this.onPressComment (commentData)}
              passageMetaData={this.state.modalData.passage.passageMetaData}
              ravelMetaData={this.state.ravel}
              mode={this.state.mode}
            />
          </View>
        );
      case 'fork':
        return (
          <View style={styles.modal}>
            <ForkPopup
              {...this.props}
              onPressClose={() => this.setState ({ showModal: '' })}
              ravelID={this.state.ravelID}
              passageMetaData={this.state.modalData.fork.passageMetaData}
              ravelMetaData={this.state.ravel}
              forkPassage={(forkData) => this.forkPassage (forkData)}
            />
          </View>
        );
      default:
        return;
    }
  }

  // ---------------------------------------------------------------------------
  // Public Links
  // ---------------------------------------------------------------------------
  onPressConcept () {
    this.setState ({ showModal: 'concept' });
  }

  onPressReport () {
    var ravelTitle = this.state.title;
    var title = 'Confirm Report';
    var message = 'Are you sure you want to report ' + ravelTitle + ' for violating RavelTree\'s Terms of Use? You can\'t undo this.';
    var buttons = [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Report', onPress: () => this.onPressConfirmReport ()},
    ]
    var options = { cancelable: false };
    Alert.alert (title, message, buttons, options);
  }

  onPressConfirmReport () {
    var ravelTitle = this.state.title;
    var ravelID = this.state.ravelID;
    var comment = '';
    console.log ('Reporting ' + ravelTitle + '...');
    this.props.reportRavel (ravelID, comment)
    .then (() => {
      var title = 'Thank You';
      var message = 'Thanks for reporting a violation of RavelTree\'s Terms of Use.';
      var buttons = [
        {text: 'OK'},
      ];
      var options = { cancelable: false };
      Alert.alert (title, message, buttons, options);
    })
    .catch ((error) => { console.error (error); });
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
    modalData.add.nodeCounts = (this.state.analyzedtree || {}).nodeCounts; // TODO: Still in use?
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
        // ravel_uid: this.props.screenData.ravel_uid,
        ravel_uid: this.state.ravelID,
        loadPassage: passage.passage_uid,
      }
      this.props.refresh ('Ravel', screenData);
    })
    .catch (error => { console.error (error); });
  }

  // ---------------------------------------------------------------------------
  // Fork
  // ---------------------------------------------------------------------------
  switchToFork (passageMetaData) {
    var modalData = this.state.modalData;
    modalData.fork.passageMetaData = passageMetaData;
    //modalData.fork.nodeCounts = (this.state.analyzedtree || {}).nodeCounts;
    this.setState ({
      modalData: modalData,
      showModal: 'fork',
    });
  }

  forkPassage (forkData) {
    this.props.forkPassage (forkData)
    .then (passage => {
      this.onFork (passage);
    })
    .catch (error => { console.log (error); });
  }

  onFork (passage) {
    this.props.getRavelMetaData (this.props.screenData.ravel_uid)
    .then (ravel => {
      var screenData = {
        ravel_uid: this.state.ravelID,
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
  // Comments
  // ---------------------------------------------------------------------------
  onPressComment (commentData) {
    var modalData = this.state.modalData;
    modalData.comment.show = true;
    modalData.comment.commentData = commentData;
    this.setState ({ modalData: modalData });
  }

  showCommentModal () {
    var commentState = (this.state.modalData || {}).comment;
    if (!(commentState || {}).show) { return; }

    var commentData = commentState.commentData;
    if (!commentData) { return; }

    return (
      <View style={[styles.modal, {zIndex: 100}]}>
        <CommentPopup
          {...this.props}
          onPressClose={() => this.onCloseCommentModal ()}
          ravelID={commentData.ravelID}
          ravelTitle={commentData.ravelTitle}
          passageID={commentData.passageID}
          passageIndex={commentData.passageIndex}
          passageTitle={commentData.passageTitle}
          author={commentData.author}
        />
      </View>
    );
  }

  onCloseCommentModal () {
    var modalData = this.state.modalData;
    modalData.comment.show = false;
    this.setState ({ modalData: modalData });
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  onPressBack () {
    this.props.navigateBack ();
  }

  onPressEditTags () {
    var screenData = {
      ravel: this.state.ravel,
    }
    this.props.setPreviousScreen ('Ravel');
    this.props.setActiveScreen ('EditTags', screenData);
  }

  onPressInviteParticipants () {
    var screenData = {
      ravel: this.state.ravel,
    }
    this.props.setPreviousScreen ('Ravel');
    this.props.setActiveScreen ('EditParticipants', screenData);
  }

  navigateToMerge (screen, screenData) {
    // TODO: What do we need to navigate back properly?
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
        <TextLink size={14} onPress={() => this.onPressEditTags ()}>Edit Tags</TextLink>
        <TextLink size={14} onPress={() => this.onPressInviteParticipants ()}>Invite Participants</TextLink>
      </View>
    )
  }

  showInvitationButton (show) {
    if (!show) {return}
    return (
      <View style={styles.buttonContainer}>
        <TextSans size={14}>You&#39;ve been invited to this ravel!</TextSans>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title={'Accept'}
              onPress={() => this.onPressAcceptInvitation ()}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={'Decline'}
              onPress={() => this.onPressDeclineInvitation ()}
            />
          </View>
        </View>
      </View>
    )
  }

  onPressAcceptInvitation () {
    this.props.acceptRavelInvite (this.state.ravelID)
    .then (() => {
      var screenData = { ravel_uid: this.state.ravelID };
      this.props.refresh ('Ravel', screenData);
    })
    .catch ((error) => { console.error (error); });
  }

  onPressDeclineInvitation () {
    this.props.declineRavelInvite (this.state.ravelID)
    .then (() => {
      var screenData = { ravel_uid: this.state.ravelID };
      this.props.refresh ('Ravel', screenData);
    })
    .catch ((error) => { console.error (error); });
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
      {this.showCommentModal ()}
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
            <TextLink size={14} onPress={() => this.onPressReport ()}>Report</TextLink>
          </View>
          <Divider />
          {this.showAdminLinks (this.state.mode == 'owned')}
          {this.showInvitationButton (this.state.mode == 'invited')}
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
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
