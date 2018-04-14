// Author:   Alex Aguirre
// Created:  02/07/18
// Modified: 04/14/18 by Frank Fusco (fr@nkfus.co)
//
// "Explore" screen for RavelTree.
//
// TODO: Trending algorithm.
// TODO: Regular expression-based Firebase queries?

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
import LinkBack from '../components/LinkBack'
import Loader from '../components/Loader'

const DEFAULT_ACTIVE = 'title';

const ROWS = 2;

const TAG_CLOUD_HEIGHT = (ROWS * Tag.HEIGHT_SMALL)        +
                         (ROWS * 2 * Tag.MARGIN_VERTICAL) +
                         (2 * TagCloud.PADDING_VERTICAL);

const TAG_PAD = 12;

// const DEFAULT_SUGGESTED_TAGS = [
//   'Unconventional',
//   'Mystery',
//   'Comedy',
//   'Postmodernism',
//   'Epic',
//   'YA',
//   'Encyclopedic',
//   'Experimental',
//   'Irony',
//   'Lorem',
//   'Ipsum',
//   'Dolor',
//   'Sit',
//   'Amet',
//   'Long',
//   'Time',
//   'Ago',
//   'In',
//   'A',
//   'Galaxy',
//   'Far',
//   'Away',
// ];

class Explore extends Component<{}> {

  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      active: DEFAULT_ACTIVE,
      tags: [],
      tagsShowing: [],
      nextTagIndex: 0,
      tagCloudWidth: 0,
      tagCloudHeight: TAG_CLOUD_HEIGHT,
      search: undefined,
      results: {},
    };
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  searchRavelByTitle (text) {
    this.setState ({ loading: true });
    this.props.searchRavelByTitle (text)
    .then (results => {
      this.setState ({
        results: results,
        loading: false,
      });
    })
  }

  searchRavelByTag (tagArray) {
    this.setState ({ loading: true });
    this.props.searchRavelByTag (tagArray)
    .then (results => {
      this.setState ({
        results: results,
        loading: false,
      });
    })
  }

  searchRavelByCategory (category) {
    this.setState ({ loading: true });
    this.props.searchRavelByCategory (category)
    .then (results => {
      this.setState ({
        results: results,
        loading: false,
      });
    })
  }

  searchRavelByTrending () {
    this.setState ({ loading: true });
    this.props.searchRavelByTrending ().
    then (results => {
      console.log (results);
      this.setState ({
        results: results,
        loading: false,
      });
    })
  }

  onChangeText (text) {
    this.setState ({search: text});

    switch (this.state.active) {
      case 'title':
        this.searchRavelByTitle (text);
        break;
      case 'tag':
        this.searchRavelByTag ([text]);
        break;
      case 'category':
        this.searchRavelByCategory (text);
        break;
      case 'trending':
        this.searchRavelByTrending ();
        break;
      default:
        console.log ('Something\'s wrong.');
    }
  }

  onSetFormState (newState) {
    switch (newState.active) {
      case 'category':
        newState.search = 'fiction';
        this.searchRavelByCategory ('fiction');
        break;
      case 'trending':
        newState.search = undefined;
        this.searchRavelByTrending ();
        break;
      case 'tag':
        this.setState ({ loading: true });
        this.props.getAllGlobalTags ()
        .then ((tags) => {
          var tags = this.shuffle (Object.keys (tags));
          this.setState ({
            tags: tags,
            loading: false,
          });
          this.getTag ();
        })
        .catch ((error) => {
          console.error (error);
          this.setState ({ loading: false });
        });
        break;
      default:
        newState.search = undefined;
    }

    newState.results = {};
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
            autoCapitalize={'none'}
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
    // Clear results and populate the search state with the category name.
    this.setState ({
      results: {},
      search: option,
    });

    // Execute the search.
    this.searchRavelByCategory (option);
  }

  showTagCloud (show) {
    if (!show) {return}
    return (
      <View style={styles.tagCloud} onLayout={this.onTagCloudLayout}>
        <TagCloud
          tags={this.state.tagsShowing.map (tag => tag.name)}
          active={this.state.tags}
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
    if (_.size (this.state.tags) < (nextTagIndex + 1)) { return; }
    tagsToShow.push ({name: this.state.tags [nextTagIndex], width: undefined, height: undefined});
    this.setState ({tagsShowing: tagsToShow, nextTagIndex: ++nextTagIndex});
  }

  onSelectTag (tagName) {
    // Populate the serch bar with the tag name.
    this.setState ({search: tagName});

    // Execute the search.
    this.searchRavelByTag ([tagName]);

    // Stop showing the tag in the tag cloud.
    var tagsShowing = this.state.tagsShowing;
    var index = tagsShowing.findIndex (x => x.name == tagName);
    tagsShowing.splice (index, 1);
    this.setState ({tagsShowing: tagsShowing});

    // Try to get another tag.
    this.getTag ();
  }

  shuffle (array) {
    var i = array.length, temp, iRand;

    // While there remain elements to shuffle...
    while (0 !== i) {
      // Pick a remaining element...
      iRand = Math.floor(Math.random() * i);
      i -= 1;

      // And swap it with the current element.
      temp = array[i];
      array[i] = array[iRand];
      array[iRand] = temp;
    }
    return array;
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

  showLoader () {
    return (
      <View style={styles.loader}>
        <Loader />
      </View>
    );
  }

  showRavels () {
    if (!this.state.results) { return; }
    var results = Object.values (this.state.results);

    return (
      <View style={{width: '100%'}}>
        {results.map ((ravel) =>
          <View key={ravel.ravel_uid} style={styles.ravelCard}>
            <RavelCard
              key={ravel.ravel_uid}
              title={ravel.ravel_title}
              ravelID={ravel.ravel_uid}
              author={ravel.user_created}
              authorImage={ravel.user_created_photoURL}
              users={_.size (ravel.m_ravel_participants) + 1}
              score={ravel.ravel_points}
              concept={ravel.ravel_concept}
              {...this.props}
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
      this.state.active == 'trending' || this.state.active == 'category' ? {paddingTop: 0} : undefined
    ]

    return (
      <View style={styles.layout}>

        {/* Back button */}
        <LinkBack onPress={() => this.onPressBack ()}/>

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

        {this.showDivider (this.state.active != 'trending' && this.state.active != 'category')}

        {/* User image, profile name, search for a concept, and new ravels */}
        {this.showInputSearch (this.state.active != 'trending' && this.state.active != 'category')}

        {this.showDivider (this.state.active != 'trending' && this.state.active != 'category')}

        <ScrollView style={styles.scroll} contentContainerStyle={scrollContentStyles}>

          {/* Related ravel cards will pop up here */}
          {this.state.loading ? this.showLoader () : this.showRavels ()}

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
  loader: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ravelCard: {
    marginBottom: 20,
    width: '100%',
  },
});

function mapStateToProps (state) {

  const {
    ravel_title_search,
    ravel_tag_search,
    ravel_category_search,
  } = state.search;

  return {
    ravel_title_search,
    ravel_tag_search,
    ravel_category_search,
  };
}

export default connect (mapStateToProps)(Explore);
