// WARNING!!!!! DO NOT MERGE THIS INTO DEV WHEN MERGING!!!!

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
//import {checkParticipantExistRavel, calculatePassageIndexField} from '../actions/backend';
//import {userLogOff, createUserWithEmail, checkCurrentUserIsAdmin} from '../actions';
//import { getAllRavelUser, getRavelMetaData, searchUserByName, loadInitialUserCreatedRavel, updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, createStartRavel, userLogOff, getAllUserCreatedRavel} from '../actions';
import firebase from 'firebase';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
});

class GetAllUserRavels extends Component {


    componentWillMount() {
        // var first_name = 'Vivienne';
       var ravel_uid = '-L9v8lkORLyQ2XQq-7iI';
       //this.props.getRavelMetaData(ravel_uid);
       this.props.getAllGlobalTagScript();
       //this.props.banReportedRavel(ravel_uid);
       //this.props.deleteRavel(ravel_uid);
       //this.props.getRavelMetaData(ravel_uid);
       //var passage_uid = '-L8Z4s5Hfy368wkHS08a';
       var level = 1;
      //  var user_uid = 'SLnPLeCb1HVRlOg1sRJcpChn3Q22';
        // var ravel_title = "Testing Out initial add passage level"
        // var ravel_category = "game"
        // var passage_length = "paragraph"
        // var visibility = true
        // var enable_voting = true
        // var enable_comment = true
        // var ravel_concept = "fiction"
        // //var currentuid = actions.getCurrentLoggedInUserUid();
        // var m_ravel_participants = ['EG4lyDlPz4QyM1Ezi89ICY5V4Ok1']
        // var ravel_tags = ["testing_tag2", "testing_tag1"]

        // this.props.createStartRavel( {ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
        // ravel_concept, m_ravel_participants, ravel_tags });
        //this.props.getPassageUidOnLevel(ravel_uid, level);
        //this.props.getRavelMetaData(ravel_uid);
        //this.props.testerPromiseHelper(ravel_uid,passage_uid,level);

        //this.props.loadInitialUserCreatedRavel(firebase.auth().currentUser);
        //this.props.getUserProfile(getCurrentLoggedInUserUid());
        //this.props.searchUserByName(first_name);

        // Ask Chris how to map the ravel_uid properly
        //var m_ravel_uid = '-L5akFEpeXj3Ls-1uQcH';
        //var ravel_uid_t = props.ravel_uid;
        //console.log('Ravel UID in Get All Users..' + this.props.ravel_uid);
        //this.props.getRavelMetaData(ravel_uid);
        //this.props.getAllRavelUser(m_ravel_uid);
        //this.props.searchRavelByTag(['testing_tag2', 'testing_tag1']);
        //this.props.getAllRavelParticipantUserProfile(ravel_uid);
        //this.props.searchRavelByTitle('title');
        //this.props.loadAllRavel();
        //this.props.updateProfilePicture('testing_updates_again');
        //this.props.updateRavelTag('-L6EF_prExXCVIf2NQ4w', ["push_tag4666", "push_tag67777"])
        //this.props.loadAllUserKey();
        //this.props.loadAllPublicRavel();
        // this.props.acceptRavelInvite(ravel_uid);
        //this.props.getRavelMetaData(ravel_uid);
        // this.props.getAllRavelParticipantUserProfile(ravel_uid);
        var passage_title = 'Testing out level bug'
        var passage_body = 'passage body'
        var parent_passage_uid = '-L9fVVbWHXVc2_wMvklf';
        //var child_passage_uid = '-L8if3EcdET2zsHbnmKk';
        //this.props.forkPassage({ravel_uid, parent_passage_uid, passage_title, passage_body});
        //this.props.mergeTwoPassage({ravel_uid, parent_passage_uid, child_passage_uid });
        //this.props.addInitialPassage({ravel_uid, passage_title, passage_body});
        //this.props.addPassage({ravel_uid, parent_passage_uid, passage_title, passage_body});

        //this.props.upVotePassage('-L6esHnah1z8XwnTXLfL');
        //this.props.downVotePassage('-L6esHnah1z8XwnTXLfL');

        //this.props.loadNonCreatedCurrentUserRavel();
        //this.props.updateRavelParticipant('-L6FRcKRs5GsfjHoP92W', ['participant', 'part0']);
        // var first_name = 'Vivienne'
        // var last_name = 'The Great'
        // var bio = 'hello'

        //this.props.getCurrentUserProfile();
        //this.props.updateCurrentUserProfile({first_name, last_name, bio});

        //userLogOff();
        //var uid = 'testing_admin_uid'
        //this.props.addAdminUser(uid);

        //actions.checkCurrentUserIsAdmin();

        //var terms_of_service = 'testing'
        //this.props.insertTermsOfService(terms_of_service);

        //this.props.updateTermsOfService(terms_of_service);

        //var email = "Dinosaur@gmail.com"
        //var password = "password123"

        // $uid === auth.uid

        //createUserWithEmail(element, password);

      //this.props.reportRavel(ravel_uid);
      //this.props.reportUser(user_uid);
      //this.props.getCompleteRavelReportList();
      //this.props.dismissReportedRavel(ravel_uid);
        //this.props.getCompleteUserReportList();
        //this.props.dismissReportedUser(user_uid);
        //this.props.getStats();
        //this.props.banReportedRavel(ravel_uid);
        //this.props.acceptTermsAndAgreement();
        //this.props.declineRavelInvite(ravel_uid);
        //this.props.getAllRavelParticipantUserProfile(ravel_uid);
        //this.props.getPendingRavelInvite();

        var passage_uid = '-L92CM2gsd9xX6anP-6N';
        // var comment_body = 'this is another comment'
        // var comment_key = '-L7pouZstEs1LhyGi3uN'
        //this.props.downVotePassage(ravel_uid, passage_uid);
        //this.props.getPassageMetaData(ravel_uid, passage_uid)
        //this.props.downVotePassage(passage_uid);
        //this.props.writePassageComment(ravel_uid, passage_uid, comment_body);
        //this.props.deletePassageComment(passage_uid, comment_key)
        //this.props.getCompleteRavelReportList();
        //this.props.checkParticipantExistRavel(ravel_uid);

        //this.props.upVotePassage(ravel_uid,passage_uid);
        //console.log('email' + firebase.auth().currentUser.email);
        var email = 'admin@gmail.com'
        var password = 'password123'
        //this.props.loadAllPublicRavel();
        //this.props.loadInitialCurrentUserCreatedRavel();
        //this.props.loadPassageExplore();
        //this.props.addAdminUser(email,password);

        //this.props.loadPassageExplore();
        //this.props.getStats();
        //this.props.fetchExplorePassage();
        //this.props.getRavelMetaData(ravel_uid);
        //this.props.searchRavelByTrending();
        //this.props.banReportedUser();
        //var user_uid = 'R0G85h19TTWgM6GEr4h9EC3T0fo1'
        //this.props.flagReportedUser(user_uid);
        //this.props.userLogOff();

        //firebase.auth().signOut()
        //this.props.signInWithEmail ('deleteme@ho.com', 'password123');

    };

  render() {
    return (

      <View style={styles.container}>

      </View>
    );
  }
}

const mapStateToProps = state => {
  //console.log('The state is:' + state)
  const { ravel_uid, ravel_meta_data,
    all_child_uid_val } = state.ravel;
  return { ravel_uid, ravel_meta_data,
    all_child_uid_val };

  //   const ravels = _.map(state.all_user_ravels, (val, uid) => {
  //     return {...val, uid};

  //   });


  //   return {
  //     ravels

  //  };

  //  const {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed,
  //   stat_passage_written, upvotes, ravel_points} = state.user;

  //   return {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed,
  //   stat_passage_written, upvotes, ravel_points };

  //   const { users_first_name_search } = state.users_search;
  //   return { users_first_name_search };


  };

  export default connect(mapStateToProps, actions)(GetAllUserRavels);
