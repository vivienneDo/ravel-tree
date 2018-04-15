// These are front-end imports for testing
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity, Linking } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';

// TODO: Always import these to use the functions and reducers
import * as actions from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';


const styles = StyleSheet.create({
});

class ComponentTemplate extends Component {

  constructor(props) {
    super(props);
  }

    componentWillMount() {

        // You can use functions that return states as this.props
        this.props.getCurrentUserProfile();

        // Test an update
        var first_name = 'Update Vivienne'
        var last_name = 'The Tester'
        var bio = 'Bio Updated'

        // Test an update
        this.props.updateCurrentUserProfile({first_name, last_name, bio});

    };

  render() {
    return (
      // Test to see if the first_name prop updated
      <View style={styles.container}>
           <Text>  ${this.props.currentUserProfile.first_name}</Text>
      </View>
    );
  }
}

// // TODO: set up mapStateToProps
const mapStateToProps = state => {

    console.log('State' + state.current_user.currentUserProfile.first_name)

    const { currentUserProfile } = state.current_user; // Refer back to indexPrototype header example

      return { currentUserProfile };

  };

export default connect(mapStateToProps, actions)(ComponentTemplate);
