import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
//import {acceptRavelInvite} from '../actions';
//import { getAllRavelUser, getRavelMetaData, searchUserByName, loadInitialUserCreatedRavel, updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, createStartRavel, userLogOff, getAllUserCreatedRavel} from '../actions';
import firebase from 'firebase';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
});

class GetAllUserRavels extends Component {

  constructor(props) {
    super(props);
  }

    componentWillMount() {
        // var first_name = 'Vivienne';
          var ravel_uid = '-L6d3jEkXx_HIYUf4Bwm';

        // var ravel_title = "title"
        // var ravel_category = "game"
        // var passage_length = "paragraph"
        // var visibility = true
        // var enable_voting = true
        // var enable_comment = true
        // var ravel_concept = "fiction"
         var currentuid = actions.getCurrentLoggedInUserUid();
        // var m_ravel_participants = [currentuid, 'EG4lyDlPz4QyM1Ezi89ICY5V4Ok1']
        // var ravel_tags = ["testing_tag2", "testing_tag1"]

        // this.props.createStartRavel( {ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
        // ravel_concept, m_ravel_participants, ravel_tags });
                              
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
        this.props.getRavelMetaData(ravel_uid);
        this.props.getAllRavelParticipantUserProfile(ravel_uid);
        //this.props.loadNonCreatedCurrentUserRavel();
        //this.props.updateRavelParticipant('-L6FRcKRs5GsfjHoP92W', ['participant', 'part0']);
        // var first_name = 'Vivienne'
        // var last_name = 'The Great'
        // var bio = 'hello'

        // this.props.getCurrentUserProfile();
        // this.props.updateCurrentUserProfile({first_name, last_name, bio});


    
     
    };

  render() {
    return (  
      
      <View style={styles.container}>
             
      </View> 
    );
  }
}

const mapStateToProps = state => {
  console.log('The state is:' + state.ravel.ravel_uid)
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
  

