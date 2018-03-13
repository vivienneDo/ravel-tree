// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  02/13/18

// Standard concept popup component for RavelTree.
//
// TODO: Make ravel name touchable and link to respective content.

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
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

export default class ConceptPopup extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {
    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='PassagePopup' isActive>
        <View style={styles.head}>
          <View style={styles.left}>
            <View style={styles.userImage}>
              <UserImage {...this.props} size={26}  />
            </View>
            <TextSerif size={16}>{this.props.ravel}</TextSerif>
          </View>
          <View style={styles.right}>
            <View style={styles.users}>
              <IconUser size={20} />
              <TextSerif style={styles.headText} size={20}>{this.props.participantCount}</TextSerif>
            </View>
            <View style={styles.score}>
              <IconLeaf size={20} />
              <TextSerif style={styles.headText} size={20}>{this.props.ravelScore}</TextSerif>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            <TextSans style={styles.concept} size={16}>
              {this.props.concept}
            </TextSans>
          </View>
        </ScrollView>
      </ModalContainer>
    )
  }
}

const styles = StyleSheet.create ({
  head: {
    paddingLeft: 17,
    paddingRight: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: {

  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll: {
    marginTop: 20,
    marginBottom: 14,
  },
  scrollContent: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  userImage: {
    marginRight: 10,
  },
  concept: {

  },
});
