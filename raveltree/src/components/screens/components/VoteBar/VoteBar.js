import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
} from 'react-native';

// author: Alex Aguirre
// 1-20-18
// Vote Bar


export default class VoteBar extends Component<{}> {

    // create constructor for the counters
    constructor(props, props2) {
    super(props, props2)
    this.state = { count: 0 , countDown: 0}

    }

    // create the count for the # of upvotes
    onPress = () => {
    this.setState( {
        count: this.state.count + 1
    })
    }

    // create the count for the # of downvotes
    onPressDown = () => {
    this.setState( {
        countDown: this.state.countDown + 1
    })
    }

    render() {
        return (
            <View>
            
                <View style = {styles.barStyle}>
                {/* style for the upVote triangle */} 
                    <TouchableOpacity 
                    style = {styles.upVote}
                    onPress={this.onPress}>
                    </TouchableOpacity>

                    {/* display the total # of votes next to the upVote button
                        with proper spacing */} 
                    <Text style={styles.numStyle}>
                        {spacing}
                        {this.state.count - this.state.countDown}
                        {spacing}
                        {spacing}
                        {spacing}
                    </Text>

                    {/* style for the downVote triangle */} 
                    <TouchableOpacity 
                    style = {styles.downVote}
                    onPress={this.onPressDown}>
                    </TouchableOpacity>

                </View>

            </View>
        ); 
    }
}

// used for proper spacing in the vote bars
var spacing = " ";
var tabbing = "\t";

const styles = StyleSheet.create({
    upVote: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#939393'
    },
    numStyle: {
        color: '#939393',
        fontSize: 11,
        fontWeight: 'bold'
    },
    downVote: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#939393'
    },
    barStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    }
});

AppRegistry.registerComponent('VoteBar', () => VoteBar);