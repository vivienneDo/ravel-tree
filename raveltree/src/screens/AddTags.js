// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/20/18
// Modified: 04/14/18
//
// "Add Tags" screen for RavelTree.
//
// - onTagCloudLayout gets the rendered dimensions of the TagCloud view.
// - Tags are generated using getTags (), and onTagLayout () is automatically
//   called after each tag is rendered. This generates and stores the dimensions
//   for each tag, which are used to determine how many tags will fit.
//
// TODO: Validate text input.


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import LinkBack from '../components/LinkBack'
import LinkContinue from '../components/LinkContinue'
import LinkSave from '../components/LinkSave'
import Divider from '../components/Divider'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import TextLink from '../components/TextLink'
import InputSearch from '../components/InputSearch'
import Tag from '../components/Tag'
import TagCloud from '../components/TagCloud'
import Button from '../components/Button'

//import { TAGS } from '../lib/tags'

const ROWS = 2;

const TAG_CLOUD_HEIGHT = (ROWS * Tag.HEIGHT_SMALL)        +
                         (ROWS * 2 * Tag.MARGIN_VERTICAL) +
                         (2 * TagCloud.PADDING_VERTICAL);

const TAG_PAD = 12;

class AddTags extends Component {
  constructor (props) {
    super (props);

    this.state = {
      ravel: this.props.screenData.ravel,
      search: '',
      result: '',
      loadingTags: false,
      tags: [],
      tagsShowing: [],
      nextTagIndex: 0,
      tagsSelected: [],
      showTagCloud: false,
      tagCloudWidth: 0,
      tagCloudHeight: TAG_CLOUD_HEIGHT,
      ...this.props.screenData,
    };
  }

  componentDidMount () {
    this.setState ({ loadingTags: true });
    this.props.getAllGlobalTags ()
    .then ((tags) => {
      var tags = this.shuffle (Object.keys (tags));
      this.setState ({
        tags: tags,
        showTagCloud: true,
        loadingTags: false,
      });
      this.getTag ();
    })
    .catch ((error) => {
      console.error (error);
      this.setState ({ loadingTags: false });
    });
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
    totalWidth = (2 * TagCloud.MARGIN_HORIZONTAL * _.size (this.state.tagsShowing));
    totalHeight = (2 * Tag.MARGIN_VERTICAL) * _.size (this.state.tagsShowing);

    //if (totalWidth < this.state.tagCloudWidth && totalHeight < this.state.tagCloudHeight) {
    if (totalWidth < (this.state.tagCloudWidth - TAG_PAD) && (totalHeight < this.state.tagCloudHeight - TAG_PAD)) {
      this.getTag ();
    }
  }

  getTag () {
    // Render a tag, get dimensions, rinse, repeat.
    var tagsToShow = this.state.tagsShowing;
    var nextTagIndex = this.state.nextTagIndex;
    if (_.size (this.state.tags) < (nextTagIndex + 1))
      return;
    tagsToShow.push ({name: this.state.tags [nextTagIndex], width: undefined, height: undefined});
    this.setState ({tagsShowing: tagsToShow, nextTagIndex: ++nextTagIndex});
  }

  displaySelectedTag (tagName) {
    return (
      <View key={tagName} style={styles.selectedTag}>
        <Tag name={tagName} active mode={'displayOnly'}>{tagName}</Tag>
        <TextLink size={14} onPress={() => {this.onRemoveTag (tagName)}}>
          Remove
        </TextLink>
      </View>
    );
  }

  onSelectTag (tagName) {
    // When a tag is selected, mark it as selected...
    var tagsSelected = this.state.tagsSelected;
    tagsSelected.push (tagName);
    this.setState ({tagsSelected: tagsSelected});

    // ...and stop showing it.
    var tagsShowing = this.state.tagsShowing;
    var index = tagsShowing.findIndex (x => x.name == tagName);
    tagsShowing.splice (index, 1);
    this.setState ({tagsShowing: tagsShowing});

    // Try to get another tag.
    this.getTag ();
  }

  onRemoveTag (tagName) {
    // When a tag is removed, remove it from the array of selected tags.
    var tagsSelected = this.state.tagsSelected;
    tagsSelected.splice (tagsSelected.indexOf(tagName), 1);
    this.setState ({tagsSelected: tagsSelected});

    // Re-add the tag to the tagQueue.
    var tagQueue = this.state.tags;
    tagQueue.push (tagName);
    this.setState ({ tags: tagQueue });
  }

  // debugTagDimensions () {
  //   return (
  //     this.state.tagsShowing.map ((tag) =>
  //       <Text>{tag.name}: ({tag.width}, {tag.height})</Text>
  //     )
  //   );
  // }

  onChangeSearch (query) {
    this.setState ({ search: query });
    if (query != '') {
      this.setState ({ showTagCloud: false });
    }
    else {
      this.setState ({ showTagCloud: true });
    }

    // Search the tag queue.
    var tags = this.state.tags;
    var result = tags.includes (query) ? query : '';
    console.log (result);
    this.setState ({ result: result });
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  onPressContinue () {
    var screenData = Object.assign ({}, this.state, {mode: 'add'});
    this.props.navigateForward ('InviteParticipants', 'AddTags', screenData);
  }

  showTagCloud () {
    if (!this.state.showTagCloud) {
      return this.showSearchResult ();
    }

    return (
      <View style={styles.tagCloud} onLayout={this.onTagCloudLayout}>
        <TagCloud
          tags={this.state.tagsShowing.map (tag => tag.name)}
          mode='add'
          onTagLayout={(width, height, name) => this.onTagLayout (width, height, name)}
          onSelectTag={tag => this.onSelectTag (tag)}
        />
      </View>
    );
  }

  onSelectSearchResult () {
    var tagName = this.state.result;
    // When the search result is selected, mark it as selected.
    var tagsSelected = this.state.tagsSelected;
    tagsSelected.push (tagName);
    this.setState ({tagsSelected: tagsSelected});

    // Remove it from either the showing tags or the tag queue.
    var tagsShowing = this.state.tagsShowing;
    var index = tagsShowing.findIndex (x => x.name == tagName);
    // If
    if (index != -1) {
      tagsShowing.splice (index, 1);
      this.setState ({tagsShowing: tagsShowing});
    }
    else {
      var tags = this.state.tags;
      var index = tags.findIndex (x => x.name == tagName);
      tags.splice (index, 1);
      this.setState ({tags: tags});
    }

    // Stop showing the search results and resume showing the tag cloud.
    this.setState ({
      showTagCloud: true,
      search: '',
      result: '',
    })
  }

  showSearchResult () {
    console.log ('Showing search result...');
    console.log (this.state.result);

    if (!this.state.result.length) { return; }

    return (
      <View style={styles.searchResult}>
        <Tag name={this.state.result}
          toggleFormState={newState => this.onSelectSearchResult ()}
          size={'small'}
        >
          {this.state.result}
        </Tag>
      </View>
    );
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

  render (){
    const {
      onTagLayout,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack onPress={() => this.onPressBack ()} />
        <LinkContinue
          onPress={() => this.onPressContinue ()}
          disabled={_.size (this.state.tagsSelected) == 0}
        />
        <View style={styles.head}>
          <Divider style={styles.divider}/>
          <View style={styles.headText}>
            <TextHeader>{'Add Tags'}</TextHeader>
            <View style={styles.headBlurb}>
              <TextSans size={14} color={'#B1B1B1'}>
                Add tags to your ravel to help other ravelers find it.
              </TextSans>
            </View>
          </View>
          <Divider style={styles.divider}/>
          <View style={styles.headInput}>
            <InputSearch
              placeholder={'Search tags...'}
              text={this.state.search /*== '' ? undefined : this.state.search*/}
              onChangeText={newText => this.onChangeSearch (newText)}
            />
          </View>
          <Divider style={styles.divider}/>
        </View>
        {this.showTagCloud ()}
        <Divider />
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.selectedTags}>
            {this.state.tagsSelected.map (tagName => this.displaySelectedTag (tagName))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  divider : {
    width: '100%',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  headText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 14,
  },
  headBlurb: {
    marginTop: 15,
  },
  headInput: {
    width: '100%',
  },
  tagCloud :{
    marginVertical: 11,
    height: TAG_CLOUD_HEIGHT,
  },
  searchResult :{
    marginVertical: 11,
    //height: TAG_CLOUD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectedTags: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    width: '100%',
  },
  selectedTag: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    screenData,
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
    screenData,
  };
}

export default connect (mapStateToProps)(AddTags);
