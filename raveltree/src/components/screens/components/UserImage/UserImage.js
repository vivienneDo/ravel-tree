import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet,  
  View,
  TouchableOpacity,
  Image
} from 'react-native';

// author: Alex Aguirre
// 1-20-18
// User Image


export default class UserImage extends Component<{}> {

  // keeps track of whether the user is active or not
  constructor(props) {
    super(props);
    this.state = { userStatus: false };
  }

  render() {
    return (
      <View>
          <View>
            { /* 
            this is a test image for now 
            will update later to dynamic image stored in Firebase
            */ }
            {/*
            used as a test for determining if user is active or not
            will be changed later
            */}
            <TouchableOpacity
            activeOpacity = {1}
            onPress = {()=> this.setState({userStatus: !this.state.userStatus})}
            >
              
              <Image 
              style = {this.state.userStatus ? styles.activeImage : styles.imageStyle} 
              source = {require('../../greenarrow.jpg')}
              />

            </TouchableOpacity>
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    // inactive image (gray outline)
   imageStyle: {
     width: 30,
     height: 30,
     borderRadius: 15,
     position: 'relative',
     borderColor: '#95989A',
     borderWidth: 2
   },
   // active image (blue outline)
   activeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2E8AF7',
    position: 'relative',
   }
});

AppRegistry.registerComponent('UserImage', () => UserImage);