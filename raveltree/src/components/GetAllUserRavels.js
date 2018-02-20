import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
import { searchUserByName, loadInitialUserCreatedRavel, updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, startCreateRavel, userLogOff, getAllUserCreatedRavel} from '../actions';
import { connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';

const styles = StyleSheet.create({
});

class GetAllUserRavels extends Component {

    componentWillMount() {
        var first_name = 'Vivienne';
        this.props.loadInitialUserCreatedRavel(firebase.auth().currentUser);
        this.props.getUserProfile(getCurrentLoggedInUserUid());
        this.props.searchUserByName(first_name);
    
     
    };

  render() {
    return (  
      <View style={styles.container}>        
      </View> 
    );
  }
}

const mapStateToProps = state => {

    const ravels = _.map(state.all_user_ravels, (val, uid) => {
      return {...val, uid}; 
  
    });
    
  
    return { 
      ravels

   };

   const {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed, 
    stat_passage_written, upvotes, ravel_points} = state.user;

    return {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed, 
    stat_passage_written, upvotes, ravel_points };

    const { users_first_name_search } = state.users_search;
    return { users_first_name_search };


  };
  
  export default connect(mapStateToProps, actions)(GetAllUserRavels);
  

