import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

// 1-20-18
// User Image


export default class UserImage extends Component<{}> {
  render() {
    return (
      <View>
          <View >
            { /* 
            this is a test image for now 
            will update later to dynamic image stored in Firebase
            */ }
            <Image style = {styles.imageStyle} source = {require('../../greenarrow.jpg')}/>
            <Image style = {styles.activeImage} source = {require('../../greenarrow.jpg')}/>

            {/* need to figure out how to tell if user is active or not */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    // inactive image (gray outline)
   imageStyle: {
     width: 100,
     height: 100,
     borderRadius: 50,
     position: 'relative',
     borderColor: '#95989A',
     borderWidth: 2
   },
   // active image (blue outline)
   activeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: '#2E8AF7',
    position: 'relative',
   }
});

AppRegistry.registerComponent('UserImage', () => UserImage);