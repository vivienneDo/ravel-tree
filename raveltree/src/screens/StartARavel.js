// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/19/18
// Modified: 02/19/18
//
// "Start a Ravel" screen for RavelTree.
//
// TODO: Validate text input (including checking against existing ravel names).

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import LinkBack from '../components/LinkBack'
import LinkContinue from '../components/LinkContinue'
import Divider from '../components/Divider'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import InputSearch from '../components/InputSearch'
import OptionSet from '../components/OptionSet'
import Toggle from '../components/Toggle'
import InputText from '../components/InputText'
import Button from '../components/Button'

export default class StartARavel extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ravelName: '',
      concept:   '',
    };
  }

  onChangeConcept (newText) {
    this.setState ({concept: newText});
  }

  onChangeRavelName (newText) {
    this.setState ({ravelName: newText});
  }

  render (){
    const {
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack />
        <LinkContinue
          disabled={
            (this.state.ravelName == '') || (this.state.concept == '')
          }
        />
        <View style={styles.head}>
          <Divider style={styles.divider}/>
          <View style={styles.headText}>
            <TextHeader>Start a Ravel</TextHeader>
          </View>
          <Divider style={styles.divider}/>
          <View style={styles.headInput}>
            <InputSearch
              placeholder={'Ravel name'}
              onChangeText={newText => this.onChangeRavelName (newText)}
            />
          </View>
          <Divider style={styles.divider}/>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.optionRow}>
            <TextSans color={'#7F7F7F'}>Category</TextSans>
            <OptionSet
              options={[
                {name: 'fiction', title: 'Fiction'},
                {name: 'nonfiction', title: 'Nonfiction'},
                {name: 'multimedia', title: 'Multimedia'},
                {name: 'other', title: 'Other'},
              ]}
              active={'fiction'}
            />
          </View>
          <View style={styles.optionRow}>
            <TextSans color={'#7F7F7F'}>Passage Length</TextSans>
            <OptionSet
              options={[
                {name: 'paragraph', title: 'Paragraph'},
                {name: 'page', title: 'Page'},
                {name: 'chapter', title: 'Chapter'},
              ]}
              active={'paragraph'}
            />
          </View>
          <View style={styles.optionRow}>
            <TextSans color={'#7F7F7F'}>Visibility</TextSans>
            <OptionSet
              options={[
                {name: 'public', title: 'Public'},
                {name: 'private', title: 'Private'},
              ]}
              active={'public'}
            />
          </View>
          <View style={styles.toggles}>
            <View style={styles.toggleLabels}>
              <View style={styles.toggleLabel}>
                <TextSans color={'#7F7F7F'}>Enable embedded multimedia</TextSans>
              </View>
              <View style={styles.toggleLabel}>
                <TextSans color={'#7F7F7F'}>Enable passage comments</TextSans>
              </View>
              <View style={styles.toggleLabel}>
                <TextSans color={'#7F7F7F'}>Restrict voting to participants</TextSans>
              </View>
            </View>
            <View style={styles.toggleSwitches}>
              <View style={styles.toggleSwitch}>
                <Toggle name="enableEmbeddedMultimedia" />
              </View>
              <View style={styles.toggleSwitch}>
                <Toggle name="enablePassageComments" />
              </View>
              <View style={styles.toggleSwitch}>
                <Toggle name="restrictVotingToParticipants" />
              </View>
            </View>
          </View>
          <View style={styles.concept}>
            <View style={styles.conceptLabel}>
              <TextSans color={'#7F7F7F'}>Concept</TextSans>
            </View>
            <InputText
              multiline
              height={150}
              placeholder={'Type a concept here (e.g., "This ravel will be about...").'}
              onChangeText={newText => this.onChangeConcept (newText)}
            />
          </View>
          {/*<Button title={'Continue'} />*/}
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
    //paddingHorizontal: 17,
  },
  divider : {
    width: '100%',
    //marginTop: 100,
  },
  head: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  headText: {
    paddingHorizontal: 17,
    paddingVertical: 14,
  },
  headInput: {
    width: '100%',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionRow: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  toggles: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 17,
    marginTop: 10,
  },
  toggleLabels: {
    justifyContent: 'center',
    marginRight: 20,
  },
  toggleLabel: {
    height: 22,
    marginVertical: 5,
    justifyContent: 'center',
  },
  toggleSwitches: {
    justifyContent: 'center',
  },
  toggleSwitch: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
  concept: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    paddingHorizontal: 17,
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  conceptLabel: {
    marginBottom: 10,
  },
});
