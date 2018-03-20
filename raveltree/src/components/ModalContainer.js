// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/04/18
// Modified:  03/19/18

// Standard modal container component for RavelTree.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';


export default class ModalContainer extends React.Component {
  constructor (props) {
    super (props);
  }

  componentWillReceiveProps (newProps) {

  }

  render () {
    const {
      name,
      isActive,
      onPressClose,
      testID,
    } = this.props;

    const containerStyles = [styles.container];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

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
            onPress={() => this.props.onPressClose ()}
          >
            <Text style={styles.x}>&#215;</Text>
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  xButton: {
    alignSelf: 'center',
  },
  x: {
    fontFamily: 'Roboto-Thin',
    fontWeight: '100',
    fontSize: 36,
    color: '#2E8AF7',
  },
});
