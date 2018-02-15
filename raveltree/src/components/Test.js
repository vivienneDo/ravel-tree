import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import Button from './Button';
import ButtonReverse from './ButtonReverse';
import ButtonSans from './ButtonSans'
import ButtonPlus from './ButtonPlus'
import RadioItem from './RadioItem'
import Toggle from './Toggle'
import ModalContainer from './ModalContainer'
import RTLogoText from './RTLogoText'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import TextLink from './TextLink'
import Divider from './Divider'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'
import TextHeader from './TextHeader'
import InputForm from './InputForm'
import InputSearch from './InputSearch'
import InputText from './InputText'
import Tag from './Tag'
import UserImage from './UserImage'
import VoteBar from './VoteBar'
import NavBar from './NavBar'
import RadioSet from './RadioSet'
import TagCloud from './TagCloud'
import OptionSet from './OptionSet'
import PassagePopup from './PassagePopup'
import ConceptPopup from './ConceptPopup'
import AddPopup from './AddPopup'
import ForkPopup from './ForkPopup'
import MessageStub from './MessageStub'
import MessageCard from './MessageCard'
import NotificationCard from './NotificationCard'

export default class Test extends Component {
  onPressTest () {

  }

  render (){
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        
        {/*}
        <NotificationCard
            notification={{type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37}}
            active
        />
        <NotificationCard
            notification={{type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'}}
            active
        />
        <NotificationCard
            notification={{type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'}}
            active
        />
        <NotificationCard
            notification={{type: 'message', user: 'Clint Lane Clover'}}
            active
        />
        <NotificationCard
            notification={{type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'}}
            active
        />
        <MessageCard
            message={
              'Hey, Rebecca! I just read your newest passage for Shakespeare on Ice, and I have to say, you really knocked it out of the park. I adore your dialogue, especially the bits involving Falstaff. Truly a character who deserved the new life you\’ve given him—and truly a deserving writer to do so!\n\nI wanted to let you know I\’ll be starting a new ravel soon that I think you\’d really enjoy messing around with. I\’ll send you an invite as soon as it\’s ready!\n\nClint'}
            user={'Clint Lane Clover'}
            active
        />
        <MessageStub
            message={
              'Hey, Rebecca! I just read your newest passage for Shakespeare on Ice, and I have to say, you really knocked it out of the park. I adore your dialogue, especially the bits involving Falstaff. Truly a character who deserved the new life you\’ve given him—and truly a deserving writer to do so!\n\nI wanted to let you know I\’ll be starting a new ravel soon that I think you\’d really enjoy messing around with. I\’ll send you an invite as soon as it\’s ready!\n\nClint'}
            user={'Clint Lane Clover'}
            active
        />
        <ForkPopup
          ravel={'Cassius in Rome'}
          passageID={{number: '1', version: 'B'}}
        />
        <AddPopup
          ravel={'Cassius in Rome'}
          passageID={{number: '1', version: 'A'}}
        />
        <ConceptPopup
          ravel={'Cassius in Rome'}
          participantCount={4}
          ravelScore={311}
          concept={'In a world lit only by fire, the associates of one Julias Caesar are the torch-bearers.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae vestibulum dolor, a rutrum ipsum. Donec nec venenatis nulla. Ut molestie vitae ligula quis condimentum. Integer tempus metus vitae elit bibendum blandit. Vestibulum placerat cursus turpis, eget congue massa vestibulum in. Etiam odio sapien, viverra sed gravida vitae, blandit a urna. Duis congue arcu id venenatis aliquam. Phasellus at mollis ex.\n\nPraesent in nulla eu magna gravida eleifend. Sed vestibulum dui vel erat pretium cursus. Aenean hendrerit augue ac quam imperdiet pretium. Nullam libero tellus, pulvinar in placerat gravida, maximus sed magna. Suspendisse neque felis, aliquam in volutpat ut, fringilla et nulla. Fusce et posuere lacus. Praesent vehicula at leo ultricies auctor. Mauris et enim mattis, consequat lectus vel, rhoncus ligula. Donec quis elit non sapien molestie tempus molestie nec sapien. In blandit interdum massa, vel ullamcorper eros facilisis ut.\n\nCurabitur vitae lectus sed arcu sagittis malesuada. Phasellus rhoncus, magna id suscipit consectetur, mi tellus accumsan felis, quis condimentum felis orci vel libero. Aenean ultrices magna ac lacus consequat, quis faucibus felis hendrerit. Nam rhoncus tincidunt risus ac aliquam.'}
        />
        <PassagePopup
          ravel={'Cassius in Rome'}
          title={'Pacing the Basement'}
          passageID={'1-A'}
          passage={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae vestibulum dolor, a rutrum ipsum. Donec nec venenatis nulla. Ut molestie vitae ligula quis condimentum. Integer tempus metus vitae elit bibendum blandit. Vestibulum placerat cursus turpis, eget congue massa vestibulum in. Etiam odio sapien, viverra sed gravida vitae, blandit a urna. Duis congue arcu id venenatis aliquam. Phasellus at mollis ex.\n\nPraesent in nulla eu magna gravida eleifend. Sed vestibulum dui vel erat pretium cursus. Aenean hendrerit augue ac quam imperdiet pretium. Nullam libero tellus, pulvinar in placerat gravida, maximus sed magna. Suspendisse neque felis, aliquam in volutpat ut, fringilla et nulla. Fusce et posuere lacus. Praesent vehicula at leo ultricies auctor. Mauris et enim mattis, consequat lectus vel, rhoncus ligula. Donec quis elit non sapien molestie tempus molestie nec sapien. In blandit interdum massa, vel ullamcorper eros facilisis ut.\n\nCurabitur vitae lectus sed arcu sagittis malesuada. Phasellus rhoncus, magna id suscipit consectetur, mi tellus accumsan felis, quis condimentum felis orci vel libero. Aenean ultrices magna ac lacus consequat, quis faucibus felis hendrerit. Nam rhoncus tincidunt risus ac aliquam.'}
        />
      <OptionSet options={[
                  {name: 'fiction', title: 'Fiction'},
                  {name: 'nonfiction', title: 'Nonfiction'},
                  {name: 'multimedia', title: 'Multimedia'},
                  {name: 'other', title: 'Other'},
                ]}
                active={'fiction'}
        />
        <TagCloud tags={[
                     'Unconventional',
                     'Mystery',
                     'Comedy',
                     'Postmodernism',
                     'Epic',
                     'YA',
                     'Encyclopedic',
                     'Experimental',
                     'Irony',
                  ]}
                  active={['Unconventional',]}
        />
        <RadioSet options={[
                    {name: 'concept', title: 'By Concept'},
                    {name: 'tag', title: 'By Tag'},
                    {name: 'category', title: 'By Category'},
                    {name: 'trending', title: 'By Trending'},
                  ]}
                  active={'concept'}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <RTLogoText size={60}>raveltree</RTLogoText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <TextSerif size={20} color={'#b00000'}>TextSerif</TextSerif>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <TextSans size={12} color={'#282828'}>TextSans</TextSans>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <TextLink>TextLink</TextLink>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <Divider />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <IconUser />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <IconLeaf size={72} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <TextHeader>Your Ravels</TextHeader>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <InputForm placeholder={"Email"} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
          <InputText placeholder={'Type a passage name (e.g., "The Reckoning").'}  />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
          <Tag>Postmodernism</Tag>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
          <UserImage size={30} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', paddingBottom: 20}}>
          <VoteBar />
        </View>
        <ButtonReverse title="Explore" onPress={this.onPressTest ()} />
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <Button title="Start a Ravel" onPress={this.onPressTest ()} />
          <ButtonReverse title="Explore" onPress={this.onPressTest ()} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <ButtonSans title="Register" onPress={this.onPressTest ()} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <ButtonPlus onPress={this.onPressTest ()} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <RadioItem title="By concept" />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <Toggle title="By concept" />
        </View>
        */}
      </View>
    );
  }
}
