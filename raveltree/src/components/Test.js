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

export default class Test extends Component {
  onPressTest () {

  }

  render (){
    return (
      <View style={{flexDirection: 'column'}}>
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
        {/*
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
