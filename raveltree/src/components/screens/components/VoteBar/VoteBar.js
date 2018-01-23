import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

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
                    <TouchableOpacity 
                    style = {styles.upVote}
                    onPress={this.onPress}>
                    </TouchableOpacity>

                    <Text style={styles.numStyle}>
                        {spacing}
                        {this.state.count !== 0 ? this.state.count: null}
                        {spacing}
                    </Text>

                    <TouchableOpacity 
                    style = {styles.downVote}
                    onPress={this.onPressDown}>
                    </TouchableOpacity>

                    <Text style={styles.numStyle}>
                        {spacing}
                        {this.state.countDown !== 0 ? this.state.countDown: null}
                        {spacing}
                    </Text>
                </View>

                {/* 
                count # of upvotes 
                <Text 
                style = {styles.numStyle}>
                    {this.state.count - this.state.countDown}
                </Text>
                */}

            </View>
        ); 
    }
}

var spacing = " ";

const styles = StyleSheet.create({
    upVote: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#939393'
    },
    numStyle: {
        color: '#939393',
        fontSize: 15,
        fontWeight: 'bold'
    },
    downVote: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#939393'
    },
    barStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

AppRegistry.registerComponent('VoteBar', () => VoteBar);