import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
import { updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, startCreateRavel, userLogOff} from '../actions';
import { connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';

const styles = StyleSheet.create({

});

class RavelPage extends Component {

    componentWillMount() {
        var par = ["user1", "user2", "user3"]; 
        var tags = ["tag1", "tag2"];
        ravel_title= 'ravel title'; 
        ravel_category= 'game mode'; 
        passage_length= 'passage';              
        visibility= 'true'; 
        enable_voting= 'true'; 
        enable_comment= 'true'; 
        ravel_concept= 'concept blah'; 
        ravel_number_participants= '3';
        ravel_participants = par;
        ravel_tags = tags;       
        // this.props.createStartRavel({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
        //     ravel_concept, ravel_number_participants, ravel_participants, ravel_tags });

        // this.props.getAllUserCreatedRavel(firebase.auth().currentUser);      
    };
   
  render() {
    return (  
        
      <View style={styles.container}>        
      </View>
           
    );
  }
}

const mapStateToProps = state => {
    const { user_created,
    ravel_title, 
    ravel_category, 
    passage_length,              
    visibility, 
    enable_voting, 
    enable_comment, 
    ravel_concept, 
    ravel_status,
    ravel_number_participants,
    ravel_created_date,
    ravel_participants,
    ravel_tags, ravel_points} = state.ravel;

  
    return { user_created,
        ravel_title, 
        ravel_category, 
        passage_length,              
        visibility, 
        enable_voting, 
        enable_comment, 
        ravel_concept, 
        ravel_status,
        ravel_number_participants,
        ravel_created_date,
        ravel_participants,
        ravel_tags, ravel_points };
};
  
export default connect(mapStateToProps, actions) (RavelPage);



