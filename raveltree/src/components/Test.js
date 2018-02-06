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
import RTLogoTextLarge from './RTLogoTextLarge'
import RTLogoTextMedium from './RTLogoTextMedium'

export default class Test extends Component {
  onPressTest () {

  }

  render (){
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <RTLogoTextLarge />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
          <RTLogoTextMedium />
        </View>
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
      </View>
    );
  }
}
