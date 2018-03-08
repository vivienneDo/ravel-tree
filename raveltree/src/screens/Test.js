import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import Messages from './Messages'
import MessageThread from './MessageThread';
import Notifications from './Notifications';
import TermsAndPrivacy from './TermsAndPrivacy'
import YourRavels from './YourRavels';
import Profile from './Profile';
import StartARavel from './StartARavel'
import AddTags from './AddTags'
import InviteParticipants from './InviteParticipants'
import Splash from './Splash'
import Login from './Login'
import LoginEmail from './LoginEmail'
import Home from './Home'
import Explore from './Explore'
import Ravel from './Ravel'


class RavelTree {
  constructor (ravel) {
    this.title        = ravel.title;
    this.author       = ravel.author;
    this.participants = ravel.participants;
    this.score        = ravel.score;
    this.concept      = ravel.concept;
    this.tags         = ravel.tags;
    this.roots        = ravel.roots;
  }

  get title        () { return this.title;        }
  get author       () { return this.author;       }
  get participants () { return this.participants; }
  get score        () { return this.score;        }
  get concept      () { return this.concept;      }
  get tags         () { return this.tags;         }
  get roots        () { return this.roots;        }

  get optimalPath  () { return this.optimalPath (); }

  optimalPath () {
    const PASSAGE_UPVOTE_WEIGHT = 1;
    const PASSAGE_DOWNVOTE_WEIGHT = 2;

    return (
      // TODO: Build up an array or linked list of passages.
      undefined
    );
  }
}


class Passage {
  constructor (passage) {
    this.name      = passage.name;
    this.author    = passage.author;
    this.ID        = passage.ID;
    this.upvotes   = passage.upvotes;
    this.downvotes = passage.downvotes;
    this.comments  = passage.comments;
    this.text      = passage.text;
    this.parents   = passage.parents;
    this.children  = passage.children;
  }

  get name      () { return this.name;     }
  get author    () { return this.author;   }
  get ID        () { return this.ID;       }
  get upvotes   () { return this.upvotes   }
  get downvotes () { return this.downvotes }
  get comments  () { return this.comments  }
  get text      () { return this.text;     }
  get parents   () { return this.parents;  }
  get children  () { return this.children; }

  get score     () { return this.score (); }

  score () {
    return (this.upvotes - this.downvotes);
  }

}


var ravel = new RavelTree ({
  title: 'Cassius in Rome',
  author: 'Rebecca Bates',
  participants: ['Adam Jesper', 'Brad Hooper', 'Anne Jensen',],
  upvotes: 330,
  downvotes: 12,
  comments: [],
  concept: 'In a world lit only by fire, the associates of one Julius Caesar are the torch-bearers.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
  tags: ['Rome', 'Ancient Times', 'Intrigue'],
  roots: [
    passage1A,
  ],
});


var passage1A = new Passage ({
  name: 'Pacing the Basement',
  author: 'Rebecca Bates',
  ID: '1-A',
  upvotes: 151,
  downvotes: 30,
  comments: [],
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
  children: [passage2A, passage2B],
})

var passage2A = new Passage ({
  name: 'Musing',
  author: 'Rebecca Bates',
  ID: '2-A',
  upvotes: 20,
  downvotes: 2,
  comments: [],
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
  children: [],
})

var passage2B = new Passage ({
  name: 'Intrusion',
  author: 'Anne Jensen',
  ID: '2-B',
  upvotes: 7,
  downvotes: 1,
  comments: [],
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
  children: [],
})


export default class Test extends Component {
  constructor (props) {
    super (props);
  }

  showScreen (screen)
  {
    switch (screen) {
      case ('Messages'): {
        return (
          <Messages
            style={styles.content}
            messages={[
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca! There\'s some stuff I have to tell you, and I have to make it longer than two lines so I can examine the truncation.'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
            ]}
           />
        );
      }
      case ('MessageThread'): {
        return (
          <MessageThread
            style={styles.content}
            user={'Clint Lane Clover'}
            messages={[
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca! There\'s some stuff I have to tell you, and I have to make it longer than two lines so I can examine the truncation.'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
             {active: true, sender: 'Clint Lane Clover', message: 'Hey Rebecca!'},
             {active: false, sender: 'Adam Jesper', message: 'I think...'},
            ]}
           />
        );
      }
      case ('Notifications'): {
        return (
          <Notifications
            style={styles.content}
            notifications={[
              {type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37},
              {type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'},
              {type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'},
              {type: 'message', user: 'Clint Lane Clover'},
              {type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'},
            ]}
          />
        );
      }
      case ('TermsAndPrivacy'): {
        return (
          <TermsAndPrivacy
            style={styles.content}
            terms={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue, ipsum id congue rutrum, enim libero viverra leo, vel suscipit nibh nisl non risus. Donec dapibus malesuada lobortis. Vestibulum augue nunc, rutrum vitae lacus eget, aliquet tincidunt ipsum. Nulla facilisis lacinia urna, eu pulvinar lectus tempus nec. Aliquam fringilla commodo semper. Proin eu sem eget ipsum pharetra volutpat. Nam a viverra arcu. Etiam ante justo, auctor non pharetra at, gravida et metus. Donec feugiat commodo gravida. Vestibulum tristique felis et accumsan consectetur. Fusce laoreet feugiat ex eu vestibulum. Proin porta enim quam, quis scelerisque ipsum pharetra ac. Praesent auctor eget diam vel finibus. Sed id augue nec erat tempus efficitur.'}
            privacy={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue, ipsum id congue rutrum, enim libero viverra leo, vel suscipit nibh nisl non risus. Donec dapibus malesuada lobortis. Vestibulum augue nunc, rutrum vitae lacus eget, aliquet tincidunt ipsum. Nulla facilisis lacinia urna, eu pulvinar lectus tempus nec. Aliquam fringilla commodo semper. Proin eu sem eget ipsum pharetra volutpat. Nam a viverra arcu. Etiam ante justo, auctor non pharetra at, gravida et metus. Donec feugiat commodo gravida. Vestibulum tristique felis et accumsan consectetur. Fusce laoreet feugiat ex eu vestibulum. Proin porta enim quam, quis scelerisque ipsum pharetra ac. Praesent auctor eget diam vel finibus. Sed id augue nec erat tempus efficitur.'}
          />
        );
      }
      case ('YourRavels'): {
        return (
          <YourRavels
             ravels={[
               {ravel: 'Shakespeare on Ice', users: 61, score: 324},
               {ravel: 'Where\'s the Beef?', users: 4, score: 14},
               {ravel: 'The Sound of Violins', users: 2, score: 10},
               {ravel: 'Something Special', users: 19, score: 123},
               {ravel: 'Shallow Waters', users: 1, score: 34},
             ]}
          />
        );
      }
      case ('Profile'): {
        return (
          <Profile
             isOwned={false}
             user={'Rebecca Bates'}
             score={1064}
             bio={'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.'}
             statistics={{
               ravelsLed: 5,
               ravelsContributedTo: 29,
               passagesWritten: 213,
               upvotesReceived: 731,
             }}
          />
        );
      }
      case ('StartARavel'): {
        return (
          <StartARavel />
        );
      }
      case ('AddTags'): {
        return (
          <AddTags mode={'add'} />
        );
      }
      case ('InviteParticipants'): {
        return (
          <InviteParticipants
            mode={'add'}
            participants={[
              {name: 'Adam Jesper', score: 9821},
              {name: 'Brad Hooper', score: 3219},
              {name: 'Anne Jensen', score: undefined},
            ]}
          />
        );
      }
      case ('Splash'): {
        return (
          <Splash />
        );
      }
      case ('Login'): {
        return (
          <Login />
        );
      }
      case ('LoginEmail'): {
        return (
          <LoginEmail />
        );
      }
      case ('Home'): {
        return (
          <Home
            user={"Rebecca Bates"}
            passages={[
              {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
              {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
              {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
              {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
            ]}
          />
        );
      }
      case ('Explore'): {
        return (
          <Explore
            ravels={[
              {ravel: 'The Tycoon', author: 'Malcolm Masters', users: 6, score: 311, concept: 'A tale of travel, deceit, and unannounced visitors. W.K. Smithson, young heir to a burgeoning furniture import/export empire, must decide between prosperity and his heart when he encounters Millie J., a waitress at an Indonesian beach bar.'},
              {ravel: 'Lonely Conclusions', author: 'Anne Jensen', users: 2, score: 128, concept: 'A visitor to a yellow-cake uranium refinery finds that the international regulatory framework for nuclear development is sorely lacking in specificity.'},
              {ravel: 'The End of the Road', author: 'Anne Jensen', users: 9, score: 90, concept: 'When the Joneses receive an unexpected visitor, they decide to take matters into their own hands.'},
            ]}
          />
        );
      }
      case ('Ravel'): {
        return (
          <Ravel
            title={'Cassius in Rome'}
            author={'Rebecca Bates'}
            participants={['Adam Jesper', 'Brad Hooper', 'Anne Jensen',]}
            score={318}
            mode={'owned'}
            tree={undefined}
          />
        );
      }
    }
  }

  render (){
    const {
      screen,
    } = this.props;

    return (this.showScreen (this.props.screen));
  }
}

const styles = StyleSheet.create({
  content: {
    //width: '100%',
  }
});
