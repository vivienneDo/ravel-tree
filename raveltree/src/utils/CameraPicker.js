import React, { Component } from 'react';
import { Platform } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKButton} from 'react-native-material-kit';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const CameraPickerButton = MKButton.coloredButton()
    .withText('Camera Picker')
    .build();

    uploadImage = (uri, mime = 'image/jpeg', name) =>{
        return new Promise((resolve, reject) => {
          let imgUri = uri; let uploadBlob = null;
          const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
          const { currentUser } = firebase.auth();
          const imageRef = firebase.storage().ref(`/${currentUser.uid}/profilePic`)
      
          fs.readFile(uploadUri, 'base64')
            .then(data => {
              return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then(blob => {
              uploadBlob = blob;
              return imageRef.put(blob, { contentType: mime, name: name });
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL();
            })
            .then(url => {
              resolve(url);
            })
            .catch(error => {
              reject(error)
          })
        })
    };

    /**
     * Prompts the user to provide an image from either their image library or their camera. 
     * 
     * Will return a promise that resolves with the url of the user's selection or an error if it failed to upload their selection.
     */
    export default SelectImage = () => {
        return new Promise((resolve, reject) => {
            // More info on all the options is below in the README...just some common use cases shown here
            var options = {
                title: 'Select Profile Picture',
                storageOptions: {
                skipBackup: true,
                path: 'images',
                maxWidth: 500,
                maxHeight: 500,
                }
            };
        
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
            
                console.log('Image Size:' + source.size);

                this.uploadImage(source.uri.toString(), 'image/jpeg', source.uri.toString())
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                })
            }
            });
        })
    }

