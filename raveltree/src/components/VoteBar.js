// Author:    Alex Aguirre
// Created:   01/20/18
// Modified:  02/30/18 by Frank Fusco (fr@nkfus.co)

// Standard "vote bar" component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';


class VoteBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.upvotes || 0,
      downvotes: this.props.downvotes || 0,
      pendingUpvote: false,
      pendingDownvote: false,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.passage_vote_is_success) {
      if (this.state.pendingUpvote) {
        var upvotes = this.state.upvotes + 1;
        this.setState ({
          upvotes: upvotes,
          pendingUpvote: false,
        });
      }
      if (this.state.pendingDownvote) {
        var downvotes = this.state.downvotes + 1;
        this.setState ({
          downvotes: downvotes,
          pendingDownvote: false,
        });
      }
    }
  }

  onPressUp = () => {
    this.setState ({ pendingUpvote: true });
    this.props.upVotePassage (this.props.ravelID, this.props.passageID);
  }

  onPressDown = () => {
    this.setState ({ pendingDownvote: true });
    this.props.downVotePassage (this.props.ravelID, this.props.passageID);
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

const mapStateToProps = (state) => {

  const {
    passage_vote_is_success,
  } = state.passage;

  return {
    passage_vote_is_success,
  };
}

export default connect (mapStateToProps)(VoteBar);
