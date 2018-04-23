// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/04/18
// Modified:  04/16/18

// Standard modal container component for RavelTree.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Touchable from '../components/Touchable';


export default class ModalContainer extends React.Component {
  constructor (props) {
    super (props);
  }

  componentWillReceiveProps (newProps) {

  }

  onPressClose () {
    console.log ('Trying to close modal...');
    this.props.onPressClose ();
  }

  render () {
    const {
      name,
      isActive,
      onPressClose,
      testID,
    } = this.props;

    const containerStyles = [styles.container];

    if (this.props.isActive) {
      containerStyles.push (styles.active);
    }
    else {
      containerStyles.push (styles.inactive);
    }

    return (
      <View style={containerStyles}>
        {this.props.children}
        <View style={styles.bottomButtons}>
          <Touchable
            accessibilityComponentType={'button'}
            accessibilityLabel={"Close window"}
            accessibilityTraits={'button'}
            name={name}
            testID={testID}
            style={styles.xButton}
            onPress={() => this.onPressClose ()}
          >
            <View style={{height: 36, width: 36,}}>
              <Text style={styles.x}>&#215;</Text>
            </View>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 0.95,
    borderRadius: 20,
    borderColor: '#7E7E7E',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    width: '90%',
    alignSelf: 'center',
    margin: 'auto',
    paddingTop: 10,
    paddingBottom: 34,
  },
  active: {
    borderColor: '#2E8AF7',
  },
  inactive: {
    borderColor: '#7E7E7E',
  },
  content: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  bottomButtons: {
    alignSelf: 'center',
    // position: 'absolute',
    marginBottom: -36,
    //width: '100%',
  },
  xButton: {
    alignSelf: 'center',
  },
  x: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    fontFamily: 'Roboto-Thin',
    fontWeight: '100',
    fontSize: 50,
    color: '#2E8AF7',
  },
});
