import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';

// 1-20-18
// Vote Bar

export default class Tag extends Component<{}> {

    // Keeps track of whether the tag is active (pressed) or not
    constructor(props) {
      super(props);
      this.state = {isOn: false};
     }

    render() {

      const {
        name,
        accessibilityLabel,
        disabled,
        testID,
      } = this.props;

      const layoutStyles = [styles.layout];
      const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

      // If the tag is pressed (active), change the style to active and
      // isOn to true
      return (
        <Touchable
          style = {[layoutStyles, this.state.isOn ? styles.active : styles.inactive]}
          onPress = {()=> this.setState({isOn: !this.state.isOn})}>
            <Text style = {styles.textStyle}>
                {this.props.children}
            </Text>
        </Touchable>
      );
    }
}

const styles = StyleSheet.create({
  layout: {
    height: 25,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
   inactive: {
    backgroundColor: '#B1B1B1',
   },
   textStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'flex-start',
   },
   active: {
    backgroundColor: '#2E8AF7',
   },
});
