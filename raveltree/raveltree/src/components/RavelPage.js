/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
//import { getUserName } from '../models/UserModel';
import * as actions from '../actions';
import { updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, startCreateRavel, userLogOff} from '../actions';
import { connect} from 'react-redux';
import _ from 'lodash';

const theme = getTheme();



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',  
  },
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
      top: 10,
      left: 80,
      fontSize: 24,
  },
  title2: {
      top: 35,
      left: 82,
      fontSize: 18,
  },
  image: {
      flex: 0,
      height: 100,
      width: 333,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  closeIcon: {
      position: 'absolute',
      top: 5,
      left: 295,
      color: 'rgba(233,166,154,0.8)',
      backgroundColor: 'rgba(255,255,255,0)',
  },  
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  textIcons: {
      color: '#26a69a',
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },

  editIcon: {
      color: '#26a6e4',
    },

  sections: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 10, 
      width: 100, 
  },

  deleteIcon: {
    color: '#e9a69a',

  },

  editDeleteArea: {

    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211,0.3)',
    marginBottom: 10,

  },
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

        
        this.props.createStartRavel({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
            ravel_concept, ravel_number_participants, ravel_participants, ravel_tags });

           
        
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
    ravel_tags, ravel_points} = state;

  
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



