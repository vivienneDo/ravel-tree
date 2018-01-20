import firebase from 'firebase';

export const getUserName = () =>  {

  var user = firebase.auth().currentUser;
  var name;
  
  if (user != null) {
    name = user.displayName;
  }


}