import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image
} from 'react-native';

// 1-20-18
// User Image

const DEFAULT_SIZE = 100;

export default class UserImage extends Component<{}> {

  // keeps track of whether the user is active or not
  constructor(props) {
    super(props);
    this.state = { isActive: this.props.active };
  }

  componentWillReceiveProps (newProps) {
    this.setState ({isActive: newProps.active});
}

  render() {

    const {
      size,
      active,
      disabled,
    } = this.props;

    // Uses a test image for now – will update later to dynamic image stored
    // in Firebase.
    var image = require('./img/user.png');

    const layoutStyles = [styles.layout];
    const imageStyles = [styles.image];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    layoutStyles.push ([
      this.props.size ?
        {width: size, height: size, borderRadius: size/2} :
        {width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: DEFAULT_SIZE/2},
    ]);
    imageStyles.push ([
      this.props.size ?
        {width: size, height: size, borderRadius: size/2} :
        {width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: DEFAULT_SIZE/2},
    ]);

    return (
      <Touchable style={layoutStyles} disabled={disabled} >

        <Image
          style = {[imageStyles, this.state.isActive ? styles.active : styles.inactive]}
          source = {image}
        />

      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
  },
  active: {
    borderColor: '#2E8AF7',
    borderWidth: 2,
  },
  inactive: {
    borderColor: '#95989A',
    borderWidth: 1,
  },
});
