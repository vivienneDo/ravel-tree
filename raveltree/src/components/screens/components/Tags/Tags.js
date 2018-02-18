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

// Author: Alex Aguirre
// 1-20-18
// Tags

export default class Tags extends Component<{}> {

    // Keeps track of whether the tag is active (pressed) or not
    constructor(props) {
      super(props);
      this.state = {active: this.props.active};
     }

     componentWillReceiveProps (newProps)
     {
       this.setState ({active: newProps.active});
     }

    render() {

      const {
        name,
        size,
        accessibilityLabel,
        toggleFormState,
        active,
        disabled,
        testID,
      } = this.props;

      const layoutStyles = [styles.layout];
      const textStyles = [styles.text];
      const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

      if (this.props.size == 'small') {
        layoutStyles.push ({height: 20});
        textStyles.push ({fontSize: 10});
      }

      layoutStyles.push (this.state.active ? styles.active : styles.inactive);

      return (
        <Touchable
          style = {layoutStyles}
          onPress={() => {this.props.toggleFormState(this.props.name)}}>
            <Text style = {textStyles}>
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
    marginBottom: 3,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  active: {
   backgroundColor: '#2E8AF7',
  },
  inactive: {
    backgroundColor: '#B1B1B1',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});