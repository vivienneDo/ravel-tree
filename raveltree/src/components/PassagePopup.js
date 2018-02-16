// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  02/13/18

// Standard passage popup component for RavelTree.
//
// TODO: Make ravel, title, and ID touchable and link to respective content.
// TODO: Add VoteBar

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const Dimensions = require('Dimensions');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const ScrollView = require('ScrollView');

import ModalContainer from './ModalContainer'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import ButtonReverse from './ButtonReverse'
import Button from './Button'
import ButtonPlus from './ButtonPlus'


export default class PassagePopup extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Whether the container is active (will color the border)
    isActive: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      isActive,
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='PassagePopup' isActive={this.props.isActive}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <TextSerif size={16}>{this.props.ravel}</TextSerif>
            <TextSans size={13} color={'#95989A'}>{this.props.passageID}</TextSans>
          </View>
          <View style={styles.row2}>
            <TextSans size={13} color={'#95989A'}>{this.props.title}</TextSans>
            <UserImage size={26}/>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            <TextSerif>
              {this.props.passage}
            </TextSerif>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <ButtonReverse title={'Merge...'} width={0.30 * width} />
          <ButtonPlus size={36} />
          <Button title={'Fork'} width={0.30 * width} />
        </View>
      </ModalContainer>
    )
  }
}

const styles = StyleSheet.create ({
  head: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scroll: {
    marginTop: 6,
    marginBottom: 20,
  },
  scrollContent: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 21,
    paddingRight: 21,
  },
});

AppRegistry.registerComponent('ModalContainer', () => ModalContainer);
