// Author:    Alex Aguirre
// Created:   01/20/18
// Modified:  04/11/18 by Frank Fusco (fr@nkfus.co)

// Standard "vote bar" component for RavelTree.
//
// TODO: "Disabled"?

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';


class VoteBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //upvotes: this.props.upvotes || 0,
      //downvotes: this.props.downvotes || 0,
      votes: this.props.votes || 0,
      hasUpvoted: false,
      hasDownvoted: false,
      disabled: this.props.disabled || false,
    };
  }

  componentWillMount () {
    // Get whether and how the current user has already voted.
    this.props.checkUserVote (this.props.ravelID, this.props.passageID)
    .then (vote => {
      if (vote === true)  { this.setState ({ hasUpvoted:   true }); }
      if (vote === false) { this.setState ({ hasDownvoted: true }); }
    })
    .catch (error => { console.log (error) });
  }

  onPressUp () {
    this.props.upVotePassage (this.props.ravelID, this.props.passageID)
    .then (success => {
      this.props.checkUserVote (this.props.ravelID, this.props.passageID)
      .then (vote => {
        var votes = this.state.votes + 1;
        if (vote === true) {
          this.setState ({
            hasUpvoted: true,
            hasDownvoted: false,
            votes: votes,
          });
        }
        else {
          this.setState ({
            hasUpvoted:   false,
            hasDownvoted: false,
            votes: votes,
          });
        }
      })
      .catch (error => { console.log (error) });
    })
    .catch (error => { console.log (error); });
  }

  onPressDown () {
    this.props.downVotePassage (this.props.ravelID, this.props.passageID)
    .then (success => {
      this.props.checkUserVote (this.props.ravelID, this.props.passageID)
      .then (vote => {
        var votes = this.state.votes - 1;
        if (vote === false) {
          this.setState ({
            hasDownvoted: true,
            hasUpvoted: false,
            votes: votes,
          });
        }
        else {
          this.setState ({
            hasUpvoted:   false,
            hasDownvoted: false,
            votes: votes,
          });
        }
      })
      .catch (error => { console.log (error) });
    })
    .catch (error => { console.log (error); });
  }

  render() {
    const {
      ravelID,
      passageID,
      //upvotes,
      //downvotes,
      votes,
      testID,
    } = this.props;

    var upVoteStyles = [styles.upVote];
    var downVoteStyles = [styles.downVote];
    var numStyles = [styles.num];

    if (this.state.hasUpvoted) {
      upVoteStyles.push ({ borderBottomColor: '#2E8AF7' });
      downVoteStyles.push ({ borderBottomColor: '#939393' });
      numStyles.push ({ color: '#2E8AF7' });
    }
    else if (this.state.hasDownvoted) {
      downVoteStyles.push ({ borderTopColor: '#2E8AF7' });
      upVoteStyles.push ({ borderBottomColor: '#939393' });
      numStyles.push ({ color: '#2E8AF7' });
    }
    else {
      upVoteStyles.push ({ borderBottomColor: '#939393' });
      downVoteStyles.push ({ borderBottomColor: '#939393' });
      numStyles.push ({ color: '#939393' });
    }

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View>
        <View style = {styles.container}>
          {/* style for the upVote triangle */}
          <Touchable style={upVoteStyles} onPress={() => this.onPressUp ()}>
            <View>
            </View>
          </Touchable>
            <View>
              {/* display the total # of votes next to the upVote button
                  with proper spacing */}
              <Text style={numStyles}>
                  {this.state.votes}
              </Text>
            </View>
          {/* style for the downVote triangle */}
          <Touchable style={downVoteStyles} onPress={() => this.onPressDown ()}>
            <View>
            </View>
          </Touchable>
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
  num: {
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
