// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  02/13/18

// Standard "Fork passge" popup component for RavelTree.
//
// TODO: Make ravel and ID touchable and link to respective content.

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
import Button from './Button'
import InputText from './InputText'


export default class ForkPopup extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Whether the container is active (will color the border)
    isActive: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  getPreviousIDVersion (letter) {

    // TODO: Scrap in favor of calulating in the screen.

    if (letter === 'A') { return 'Z'; }

    return String.fromCharCode(letter.charCodeAt(0) - 1);
  }

  render () {
    const {
      isActive,
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <ModalContainer name='PassagePopup' isActive={this.props.isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.row1}>
                <TextSerif size={16}>{this.props.ravel}</TextSerif>
                <TextSans size={13} color={'#95989A'}>{this.props.passageID.number}-{this.props.passageID.version}</TextSans>
              </View>
              <View style={styles.row2}>
                <InputText width={'auto'} placeholder={'Type a passage name (e.g., "The Reckoning").'} />
                <UserImage size={26}/>
              </View>
            </View>
            <View style={styles.passage}>
              <InputText height={'100%'} multiline placeholder={'Type your passage (e.g., "It was a dark and stormy night...").'} />
            </View>
            <View style={styles.foot}>
              <View style={styles.footText}>
                <TextSans size={12} color={'#808080'}>When you press "Fork," you&#39;ll be creating an alternative to {this.props.passageID.number}-{this.getPreviousIDVersion(this.props.passageID.version)}.</TextSans>
              </View>
              <Button title={'Fork'} width={0.30 * width} />
            </View>
          </View>
        </ModalContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container : {
    //height: '100%',
    flex: 1,
  },
  head: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passage: {
    flex: 1,
    marginTop: 6,
    marginBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 21,
    paddingRight: 21,
  },
  footText: {
    flex: 0.7,
  }
});
