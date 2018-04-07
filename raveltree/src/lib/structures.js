// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/19/18
// Modified: 03/19/18

// Ravel-related data structures for RavelTree.

// Constants
// -----------------------------------------------------------------------------
export const PASSAGE_UPVOTE_WEIGHT = 1;
export const PASSAGE_DOWNVOTE_WEIGHT = 2;
// -----------------------------------------------------------------------------


// Ravel structure
// -----------------------------------------------------------------------------
export class RavelTree {
  constructor (ravel) {
    this.title        = ravel.title;
    this.author       = ravel.author;
    this.participants = ravel.participants;
    this.score        = ravel.score;
    this.concept      = ravel.concept;
    this.tags         = ravel.tags;
    this.roots        = ravel.roots;
  }

  // get title        () { return this.title;        }
  // get author       () { return this.author;       }
  // get participants () { return this.participants; }
  // get score        () { return this.score;        }
  // get concept      () { return this.concept;      }
  // get tags         () { return this.tags;         }
  // get roots        () { return this.roots;        }
  //
  get optimalPath  () { return this.optimalPath (); }

  optimalPath () {
    return (
      // TODO: Build up an array or linked list of passages.
      undefined
    );
  }
}
// -----------------------------------------------------------------------------


// Passage Structure
// -----------------------------------------------------------------------------
export class Passage {
  constructor (passage) {
    this.ID           = passage.ID;
    this.name         = passage.name;
    this.author       = passage.author;
    this.passageIndex = passage.passageIndex;
    this.upvotes      = passage.upvotes;
    this.downvotes    = passage.downvotes;
    this.comments     = passage.comments;
    this.text         = passage.text;
    this.parents      = passage.parents;
    this.children     = passage.children;
  }

  // get ID           () { return this.ID;           }
  // get name         () { return this.name;         }
  // get author       () { return this.author;       }
  // get passageIndex () { return this.passageIndex; }
  // get upvotes      () { return this.upvotes;      }
  // get downvotes    () { return this.downvotes;    }
  // get comments     () { return this.comments;     }
  // get text         () { return this.text;         }
  // get parents      () { return this.parents;      }
  // get children     () { return this.children;     }

  get score     () { return this.score (); }

  score () {
    //return (this.upvotes - this.downvotes);
    return (
      (PASSAGE_UPVOTE_WEIGHT   * this.upvotes)   -
      (PASSAGE_DOWNVOTE_WEIGHT * this.downvotes)
    );
  }
}
// -----------------------------------------------------------------------------


// Test Ravel
// -----------------------------------------------------------------------------
// var passage2A = new Passage ({
//   name: 'Intrusion',
//   author: 'Anne Jensen',
//   passageIndex: '2-A',
//   upvotes: 7,
//   downvotes: 1,
//   comments: [],
//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
//   children: [],
// })

// var passage2B = new Passage ({
//   name: 'Intrusion',
//   author: 'Brad Hooper',
//   passageIndex: '2-B',
//   upvotes: 700,
//   downvotes: 51,
//   comments: [],
//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
//   children: [],
// })

// var passage1A = new Passage ({
//   name: 'Pacing the Basement',
//   author: 'Rebecca Bates',
//   passageIndex: '1-A',
//   upvotes: 151,
//   downvotes: 30,
//   comments: [],
//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
//   parents: [],
//   children: [passage2A, passage2B],
// })

// var passage1B = new Passage ({
//   name: 'Musing',
//   author: 'Rebecca Bates',
//   passageIndex: '1-B',
//   upvotes: 20,
//   downvotes: 2,
//   comments: [],
//   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
//   children: [passage2A, passage2B],
// })

// export var testRavel = new RavelTree ({
//   title: 'Cassius in Rome',
//   author: 'Rebecca Bates',
//   participants: ['Adam Jesper', 'Brad Hooper', 'Anne Jensen', 'Rando'],
//   score: 1000,
//   concept: 'In a world lit only by fire, the associates of one Julius Caesar are the torch-bearers.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales quis felis eget dapibus. In in eros erat. Suspendisse dapibus sapien non tortor gravida finibus. Nulla eleifend, sem a molestie congue, lectus risus ultricies nisl, nec sagittis enim urna eget erat. Nullam viverra aliquet sem.',
//   tags: ['Rome', 'Ancient Times', 'Intrigue'],
//   roots: [
//     'passage1A',
//     'passage1B',
//   ],
// });
