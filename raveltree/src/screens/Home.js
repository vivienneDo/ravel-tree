// Author:   Alex Aguirre
// Created:  02/07/18
// Modified: 04/16/18 by Frank Fusco (fr@nkfus.co)
//
// Home screen for RavelTree.
//
// TODO: "Newsfeed" algorithm

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import { connect } from 'react-redux'
import * as actions from '../actions';
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText';
import ButtonReverse from '../components/ButtonReverse';
import Button from '../components/Button';
import Divider from '../components/Divider';
import UserImage from '../components/UserImage';
import InputSearch from '../components/InputSearch';
import TextSerif from '../components/TextSerif';
import TextHeader from '../components/TextHeader';
import PassageCard from '../components/PassageCard';
import CommentPopup from '../components/CommentPopup';
import Loader from '../components/Loader';

const PASSAGE_LOAD_COUNT = 10;

class Home extends Component<{}> {
  constructor (props: any, context: any) {
    super (props, context);
    this.state = {
      loading: true,
      ravels: {},
      passages: [],
      commentModal: {
        show: false,
        ravelID: '',
        ravelTitle: '',
        passageID: '',
        passageIndex: '',
        passageTitle: '',
        author: '',
      },
    }
    this.props.setShowNavBar (true);
  }

  componentWillMount () {
    this.getPassages ();
  }

  onPressExplore () {
    this.props.navigateForward ('Explore', this.constructor.name);
  }

  onPressStartARavel () {
    this.props.navigateForward ('StartARavel', this.constructor.name);
  }

  onPressComment (commentData) {
    var commentModal = this.state.commentModal;
    commentModal.show = true;
    commentModal.ravelID = commentData.ravelID;
    commentModal.ravelTitle = commentData.ravelTitle;
    commentModal.passageID = commentData.passageID;
    commentModal.passageIndex = commentData.passageIndex;
    commentModal.passageTitle = commentData.passageTitle;
    commentModal.author = commentData.author;
    this.setState ({ commentModal: commentModal });
  }

  showCommentModal () {
    if (!this.state.commentModal.show) { return; }

    return (
      <View style={styles.modal}>
        <CommentPopup
          {...this.props}
          onPressClose={() => this.onCloseCommentModal ()}
          ravelID={this.state.commentModal.ravelID}
          ravelTitle={this.state.commentModal.ravelTitle}
          passageID={this.state.commentModal.passageID}
          passageIndex={this.state.commentModal.passageIndex}
          passageTitle={this.state.commentModal.passageTitle}
          author={this.state.commentModal.author}
        />
      </View>
    );
  }

  onCloseCommentModal () {
    var commentModal = this.state.commentModal;
    commentModal.show = false;
    this.setState ({ commentModal: commentModal });
  }

  getPassages () {
    this.props.fetchPassageExploreView ()
    .then (passages => {
      console.log (passages);
      console.log (_.size (passages));

      var passagesToShow = [];
      Object.values (passages).map (passage => {
        if (_.size (passage) > 0 && passage.passage_title) {
          passagesToShow.push (passage);
        }
      })

      this.setState ({
        loading: false,
        passages: passagesToShow,
      })
    })
    .catch (error => { console.error (error); })

    // this.props.loadAllPublicRavel ()
    // .then (ravels => {
    //
    //   console.log (ravels);
    //
    //   this.setState ({ ravels: ravels });
    //
    //   if (_.size (ravels) > 0) {
    //     var passageIds = [];
    //     Object.values (ravels).map (ravel => {
    //       if (_.size (ravel.roots || {}) > 0) {
    //         Object.keys (ravel.roots).map (passageID =>
    //           passageIds.push ({
    //             ravelID: ravel.ravel_uid,
    //             passageID: passageID,
    //           })
    //         );
    //       }
    //     });
    //
    //     // For now, just get n passages.
    //     passageIds.length = Math.min (passageIds.length, PASSAGE_LOAD_COUNT);
    //
    //     passageIds.map (passage =>
    //       this.props.getPassageMetaData (passage.passageID, passage.ravelID)
    //       .then (passage => {
    //         if (_.size (passage) > 0) {
    //           var passages = this.state.passages;
    //           passages.push (passage);
    //           this.setState ({ passages: passages });
    //         }
    //       })
    //       .then (this.setState ({ loading: false }))
    //       .catch (error => { console.error (error); })
    //     );
    //   }
    // })
    // .catch (error => { console.error (error); })
  }

  renderPassages () {
    var passages = this.state.passages;

    if (this.state.loading || _.size (passages) == 0) {
      return (
        <View style={styles.passages}>
          <Text>Loading newsfeed...</Text>
          <View style={styles.loader}><Loader /></View>
        </View>
      );
    }

    // NOTE: Just assume there will never be zero passages?
    // if (_.size (passages) == 0) {
    //   return (
    //     <View style={styles.passages}>
    //       <Text>No passages to display right now. You can search for ravels using Explore—or start your own ravel!</Text>
    //     </View>
    //   );
    // }

    return (
      <View style={styles.passages}>
        {passages.map ((passage) =>
          <View key={passage.ravel_uid + '_' + passage.passage_uid} style={styles.passageCard}>
            <PassageCard
              {...this.props}
              ravelID={passage.ravel_uid}
              passageID={passage.passage_uid}
              ravel={passage.ravel_title}
              passageIndex={passage.passage_index}
              title={passage.passage_title}
              author={passage.user_created}
              photoURL={passage.user_created_photoURL}
              passage={passage.passage_body}
              upvotes={passage.passage_upvote}
              downvotes={passage.passage_downvote}
              votes={passage.passage_combined_vote}
              enableComments={passage.enable_comment}
              testID={passage.testID}
              parentScreen={this.constructor.name}
              onPressComment={(commentData) => this.onPressComment (commentData)}
            />
          </View>
        )}
      </View>
    );
  }


  render() {
    const {
      passages,
      testID,
      currentUserProfile
    } = this.props;
    return (
      <View style={styles.layout}>
        <KeyboardAvoidingView style={styles.layout} behavior={'padding'}>
          {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>*/}

            <View style={styles.layout}>

              {this.showCommentModal ()}

              <View style = {styles.logo}>
                <RTLogoText/>
              </View>

              <View style = {styles.buttons}>
                <ButtonReverse
                  title={'Explore'}
                  onPress={() => this.onPressExplore ()}
                />
                <Button
                  title={'Start a Ravel'}
                  onPress={() => this.onPressStartARavel ()}
                />
              </View>

              <Divider />

              <View style={styles.searchBox}>
                <View style={styles.user}>
                  <View style={styles.userImage}>
                    <UserImage {...this.props} size={20} />
                  </View>
                  <TextSerif size={12}>
                    {currentUserProfile.first_name + ' ' + currentUserProfile.last_name}
                  </TextSerif>
                </View>
                <View style={styles.input}>
                  <InputSearch
                    placeholder={'Type a concept. "In a world..."'}
                    onChangeText={(text) => this.onChangeText (text)}
                  />
                </View>
              </View>

              <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style = {styles.textHeader}>
                  <TextHeader>New for You</TextHeader>
                </View>
                {this.renderPassages ()}
              </ScrollView>

            </View>

          {/*</TouchableWithoutFeedback>*/}
        </KeyboardAvoidingView>
        <View style={{height: 160}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
  },
  modal: {
    position: 'absolute',
    zIndex: 10,
    top: 25,
    width: '100%',
    height: '100%',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  searchBox: {
    display: 'none', // TODO: 'Would like to have' search function here...
    width: '100%',
    paddingTop: 12,
    paddingBottom: 6,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  userImage: {
    marginRight: 5,
  },
  input: {
    width: '100%',
  },
  scroll: {
    width: '100%',
    //height: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 13,
  },
  textHeader: {
    marginBottom: 14,
  },
  loader: {
    marginTop: 20,
  },
  passages: {
    justifyContent: 'center',
    width: '100%',
  },
  passageCard: {
    width: '100%',
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    showNavBar,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    all_ravel,
  } = state.master_ravel;

  const {
    passage_meta_data,
  } = state.passage

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    currentUserProfile,
    all_ravel,
    passage_meta_data,
  };
}

export default connect (mapStateToProps)(Home);
