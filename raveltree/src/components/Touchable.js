import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
  
export default class Touchable extends React.Component {
    render() {
        {
            if (Platform.OS === 'android') {
                return (
                <TouchableNativeFeedback
                    activeOpacity={this.props.activeOpacity}
                    accessibilityComponentType={this.props.accessibilityComponentType}
                    accessibilityLabel={this.props.accessibilityLabel}
                    accessibilityTraits={this.props.accessibilityTraits}
                    testID={this.props.testID}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    name={this.props.name}>
                    <View style={this.props.style}>{this.props.children}</View>
                </TouchableNativeFeedback>
                )
            } else {
                return (
                <TouchableOpacity
                    activeOpacity={this.props.activeOpacity}
                    accessibilityComponentType={this.props.accessibilityComponentType}
                    accessibilityLabel={this.props.accessibilityLabel}
                    accessibilityTraits={this.props.accessibilityTraits}
                    testID={this.props.testID}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    name={this.props.name}
                    style={this.props.style}>
                    {this.props.children}
                </TouchableOpacity>
                )
            }
        }
    }
}