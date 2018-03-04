// Author:    Alex Aguirre
// Created:   01/20/18
// Modified:  02/16/18 by Frank Fusco (fr@nkfus.co)

// Standard "vote bar" component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


export default class VoteBar extends Component<{}> {

  constructor(props) {
    super(props);
    var upvotes = this.props.upvotes ? this.props.upvotes : 0;
    var downvotes = this.props.downvotes ? this.props.downvotes : 0;
    this.state = {upvotes: upvotes , downvotes: downvotes};
  }

  // create the count for the # of upvotes
  onPressUp = () => {
    this.setState( {
      upvotes: this.state.upvotes + 1
    })
  }

  // create the count for the # of downvotes
  onPressDown = () => {
    this.setState( {
      downvotes: this.state.downvotes + 1
    })
  }

  render() {
    const {
      upvotes,
      downvotes,
      testID,
    } = this.props;

    return (
      <View>
        <View style = {styles.container}>
          {/* style for the upVote triangle */}
          <TouchableOpacity style ={styles.upVote} onPress={this.onPressUp} />

          {/* display the total # of votes next to the upVote button
              with proper spacing */}
          <Text style={styles.numStyle}>
              {this.state.upvotes - this.state.downvotes}
          </Text>

          {/* style for the downVote triangle */}
          <TouchableOpacity style ={styles.downVote} onPress={this.onPressDown} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 15,
      width: 55,
  },
  upVote: {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderBottomWidth: 15,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#939393',
      marginRight: 6,
  },
  numStyle: {
      color: '#939393',
      fontSize: 15,
      bottom: 1,
      fontWeight: 'bold',
      marginRight: 8,
  },
  downVote: {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 15,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#939393',
  },
});
