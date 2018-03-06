// Author: Alex Aguirre
// Created: 02/07/18
// Modified: 03/06/18 by Frank Fusco (fr@nkfus.co)
//
// "Explore" screen for RavelTree.
//
// Pass in an array of ravels as a prop like so:
//
// <Explore
//    ravels={[
//      {ravel: 'The Tycoon', author: 'Malcolm Masters', users: 6, score: 311, concept: 'A tale of travel, deceit, and unannounced visitors. W.K. Smithson, young heir to a burgeoning furniture import/export empire, must decide between prosperity and his heart when he encounters Millie J., a waitress at an Indonesian beach bar.'},
//      {ravel: 'Lonely Conclusions', author: 'Anne Jensen', users: 2, score: 128, concept: 'A visitor to a yellow-cake uranium refinery finds that the international regulatory framework for nuclear development is sorely lacking in specificity.'},
//      {ravel: 'The End of the Road', author: 'Anne Jensen', users: 9, score: 90, concept: 'When the Joneses receive an unexpected visitor, they decide to take matters into their own hands.'},
//    ]}
// />

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText';
import ButtonReverse from '../components/ButtonReverse';
import Button from '../components/Button';
import Divider from '../components/Divider';
import UserImage from '../components/UserImage';
import InputSearch from '../components/InputSearch';
import TextSerif from '../components/TextSerif';
import TextHeader from '../components/TextHeader';
import RavelCard from '../components/RavelCard';
import RadioSet from '../components/RadioSet';
import TagCloud from '../components/TagCloud';
import Tag from '../components/Tag';
import OptionSet from '../components/OptionSet';

const DEFAULT_ACTIVE = 'title';

const ROWS = 2;

const TAG_CLOUD_HEIGHT = (ROWS * Tag.HEIGHT_SMALL)        +
                         (ROWS * 2 * Tag.MARGIN_VERTICAL) +
                         (2 * TagCloud.PADDING_VERTICAL);

const TAG_PAD = 4;

const DEFAULT_SUGGESTED_TAGS = [
  'Unconventional',
  'Mystery',
  'Comedy',
  'Postmodernism',
  'Epic',
  'YA',
  'Encyclopedic',
  'Experimental',
  'Irony',
  'Lorem',
  'Ipsum',
  'Dolor',
  'Sit',
  'Amet',
  'Long',
  'Time',
  'Ago',
  'In',
  'A',
  'Galaxy',
  'Far',
  'Away',
];

TEST_RAVELS = [
  {ravel: 'The Tycoon', author: 'Malcolm Masters', users: 6, score: 311, concept: 'A tale of travel, deceit, and unannounced visitors. W.K. Smithson, young heir to a burgeoning furniture import/export empire, must decide between prosperity and his heart when he encounters Millie J., a waitress at an Indonesian beach bar.'},
  {ravel: 'Lonely Conclusions', author: 'Anne Jensen', users: 2, score: 128, concept: 'A visitor to a yellow-cake uranium refinery finds that the international regulatory framework for nuclear development is sorely lacking in specificity.'},
  {ravel: 'The End of the Road', author: 'Anne Jensen', users: 9, score: 90, concept: 'When the Joneses receive an unexpected visitor, they decide to take matters into their own hands.'},
];

class Explore extends Component<{}> {

  constructor (props) {
    super (props);
    this.state = {
      active: DEFAULT_ACTIVE,
      tagsShowing: [],
      nextTagIndex: 0,
      tagCloudWidth: 0,
      tagCloudHeight: TAG_CLOUD_HEIGHT,
      search: undefined,
    };
  }

  onChangeText (text) {
    this.setState ({search: text});

    // TODO: Search.
  }

  onSetFormState (newState) {
    this.setState (newState);
  }

  showDivider (show) {
    if (!show) {return}
    return (
      <Divider />
    );
  }

  showInputSearch (show) {
    if (!show) {return}
    return (
      <View style={styles.searchBox}>
        <View style={styles.input}>
          <InputSearch
            placeholder={this.getPlaceholder ()}
            text={this.state.search}
            onChangeText={(text) => this.onChangeText (text)}
          />
        </View>
      </View>
    );
  }

  showOptionSet (show) {
    if (!show) {return}
    return (
      <View style={styles.optionSet}>
        <OptionSet
          options={[
            {name: 'fiction', title: 'Fiction'},
            {name: 'nonfiction', title: 'Nonfiction'},
            {name: 'multimedia', title: 'Multimedia'},
            {name: 'other', title: 'Other'},
          ]}
          active={'fiction'}
          onChange={(option) => this.onSelectOption (option)}
        />
      </View>
    );
  }

  onSelectOption (option) {
    // TODO: Search / Refine search.
  }

  showTagCloud (show) {
    if (!show) {return}
    return (
      <View style={styles.tagCloud} onLayout={this.onTagCloudLayout}>
        <TagCloud
          tags={this.state.tagsShowing.map (tag => tag.name)}
          active={DEFAULT_SUGGESTED_TAGS}
          mode={'add'}
          onSelectTag={(tag) => this.onSelectTag (tag)}
          onTagLayout={(width, height, name) => this.onTagLayout (width, height, name)}
        />
      </View>
    );
  }

  onTagCloudLayout = (e) => {
    if (this.state.tagCloudWidth != 0) {
      return;
    }

    this.setState ({
      tagCloudWidth: e.nativeEvent.layout.width,
      tagCloudHeight: e.nativeEvent.layout.height,
    });

    this.getTag ();
  }

  onTagLayout (width, height, name) {
    var tagsShowing = this.state.tagsShowing;
    var index = tagsShowing.findIndex (x => x.name == name);
    tagsShowing[index].width = width;
    tagsShowing[index].height = height;

    // Check whether we should get more tags.
    totalTagWidth = tagsShowing.reduce ((prev, elem) => prev + elem.width, 0);
    totalTagHeight = tagsShowing.reduce ((prev, elem) => prev + elem.height, 0);
    totalWidth = (2 * TagCloud.MARGIN_HORIZONTAL * this.state.tagsShowing.length);
    totalHeight = (2 * Tag.MARGIN_VERTICAL) * this.state.tagsShowing.length;

    if (totalWidth < (this.state.tagCloudWidth - TAG_PAD) && (totalHeight < this.state.tagCloudHeight - TAG_PAD)) {
      this.getTag ();
    }
  }

  getTag () {
    // Render a tag, get dimensions, rinse, repeat.
    var tagsToShow = this.state.tagsShowing;
    var nextTagIndex = this.state.nextTagIndex;
    if (DEFAULT_SUGGESTED_TAGS.length < (nextTagIndex + 1))
      return;
    tagsToShow.push ({name: DEFAULT_SUGGESTED_TAGS [nextTagIndex], width: undefined, height: undefined});
    this.setState ({tagsShowing: tagsToShow, nextTagIndex: ++nextTagIndex});
  }

  onSelectTag (tagName) {
    // Populate the serch bar with the tag name.
    this.setState ({search: tagName});

    // Stop showing the tag in the tag cloud.
    var tagsShowing = this.state.tagsShowing;
    var index = tagsShowing.findIndex (x => x.name == tagName);
    tagsShowing.splice (index, 1);
    this.setState ({tagsShowing: tagsShowing});
  }

  getPlaceholder () {
    switch (this.state.active) {
      case ('title'):
        return ('Type a title.');
      case ('tag'):
        return ('Type a tag.');
      case ('category'):
        return ('Type a search term.')
      default:
        return (undefined);
    }
  }

  getRavels () {
    return (
      <View style={{width: '100%'}}>
        {TEST_RAVELS.map ((ravel) =>
          <View style={styles.ravelCard}>
            <RavelCard
              ravel={ravel.ravel}
              author={ravel.author}
              users={ravel.users}
              score={ravel.score}
              concept={ravel.concept}
            />
          </View>
        )}
      </View>
    );
  }

  render() {
    const {
      user,
      ravels,
      testID,
    } = this.props;

    var scrollContentStyles = [
      styles.scrollContent,
      this.state.active == 'trending' ? {paddingTop: 0} : undefined
    ]

    return (
      <View style={styles.layout}>
        {/* RavelTree logo at the top in the center */}
        <View style = {styles.logo}>
          <RTLogoText/>
        </View>

        <View style = {styles.head}>
          <TextHeader>Explore</TextHeader>
        </View>

        {/* RadioSet */}
        <View style={styles.radioSet}>
          <RadioSet
            options={[
              {name: 'title', title: 'By Title'},
              {name: 'tag', title: 'By Tag'},
              {name: 'category', title: 'By Category'},
              {name: 'trending', title: 'By Trending'},
            ]}
            active={'title'}
            onSetFormState={(newState) => this.onSetFormState (newState)}
          />
        </View>

        {/* By Tag: TagCloud */}
        {this.showTagCloud (this.state.active == 'tag')}

        {/* By Category: OptionSet */}
        {this.showOptionSet (this.state.active == 'category')}

        {this.showDivider (this.state.active != 'trending')}

        {/* User image, profile name, search for a concept, and new ravels */}
        {this.showInputSearch (this.state.active != 'trending')}

        {this.showDivider (this.state.active != 'trending')}

        <ScrollView style={styles.scroll} contentContainerStyle={scrollContentStyles}>

          {/* Related ravel cards will pop up here */}
          {this.getRavels ()}

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  head: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 17,
  },
  radioSet: {
    marginBottom: 17,
  },
  tagCloud: {
    marginBottom: 20,
    height: TAG_CLOUD_HEIGHT,
  },
  optionSet: {
    marginBottom: 20,
  },
  searchBox: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  scroll: {
    width: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 17,
  },
  ravelCard: {
    marginBottom: 20,
    width: '100%',
  },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(Explore);
