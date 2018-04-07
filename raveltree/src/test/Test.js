// Test Data
// ---------

// Test passage content.
export const TEST_PASSAGE = 'Now this is a story all about how my life got flipped, turned upside down. And I\'d like to take a minute, just sit right there, I\'ll tell you how I became the prince of a town called Bel-Air.\n\nIn West Philadelphia, born and raised, on the playground is where I spent most of my days. Chillin\' out, maxin\', relaxin\' all cool, and all shootin\' some b-ball outside of the school, when a couple of guys who were up to no good started makin\' trouble in my neighborhood. I got in one little fight, and my mom got scared, and said "You\'re movin\' with your auntie and uncle in Bel-Air!"\n\nI begged and pleaded with her day after day, but she packed my suitcase and sent me on my way. She gave me a kiss and then she gave me my ticket. I put my Walkman on and said "I might as well kick it." First class, yo, this is bad. Drinkin\' orange juice out of a champagne glass. Is this what the people of Bel-Air livin\' like? Hmmm, this might be all right.';


// Test data structure in the form of a tree.
export const DATA = [
  {passageIndex: '1-A', name: 'The Big Wave', score: 140, passage: TEST_PASSAGE, children: [
    {passageIndex: '2-A', name: 'Rip Current', score: 40, passage: TEST_PASSAGE, children: [
      {passageIndex: '3-A', name: 'Crashing Down', score: 20, passage: TEST_PASSAGE, children: [
        {passageIndex: '4-A', name: 'The Comeback', score: 170, passage: TEST_PASSAGE, children: [
          {passageIndex: '5-A', name: 'Riptide', score: 100, passage: TEST_PASSAGE, children: []},
        ]},
        {passageIndex: '4-B', name: 'A Shore Thing', score: 150, passage: TEST_PASSAGE, children: []},
      ]},
    ]},
    {passageIndex: '2-B', name: 'The Bite', score: -20, passage: TEST_PASSAGE, children: []},
    {passageIndex: '2-C', name: 'Blue Skies', score: 60, passage: TEST_PASSAGE, children: [
      {passageIndex : '3-B', name: 'Random Activities', score: 150, passage: TEST_PASSAGE, children :[
        {passageIndex : '4-C', name: 'The Longshoreman', score: 10, passage: TEST_PASSAGE, children: []},
        {passageIndex : '4-D', name: 'Without a Paddle', score: 20, passage: TEST_PASSAGE, children: []},
      ]},
    ]},
    {passageIndex: '2-D', name: 'Under the Sea', score: 20, passage: TEST_PASSAGE, children: []},
  ]},
  {passageIndex: '1-B', name: 'Didn\'t See It Coming', score: 30, passage: TEST_PASSAGE, children: [
    {passageIndex: '2-E', name: 'The Ultimate Adventure', score: 10, passage: TEST_PASSAGE, children: []},
  ]},
  {passageIndex: '1-C', name: 'The First Test', score: 100, passage: TEST_PASSAGE, children: []},
];


// Test ravel object.
export const TEST_RAVEL = {
  title: 'Cassius in Rome',
  author: 'Rebecca Bates',
  participants: ['Adam Jesper', 'Brad Hooper', 'Anne Jensen',],
  concept: 'Now this is a story all about how my life got flipped, turned upside down. And I\'d like to take a minute, just sit right there, I\'ll tell you how I became the prince of a town called Bel-Air. In West Philadelphia, born and raised, on the playground is where I spent most of my days. Chillin\' out, maxin\', relaxin\' all cool, and all shootin\' some b-ball outside of the school, when a couple of guys who were up to no good started makin\' trouble in my neighborhood. I got in one little fight, and my mom got scared, and said "You\'re movin\' with your auntie and uncle in Bel-Air!" I begged and pleaded with her day after day, but she packed my suitcase and sent me on my way. She gave me a kiss and then she gave me my ticket. I put my Walkman on and said "I might as well kick it." First class, yo, this is bad. Drinkin\' orange juice out of a champagne glass. Is this what the people of Bel-Air livin\' like? Hmmm, this might be all right.',
  score: 318,
  mode: 'owned',
  roots: DATA,
}


// Test passage metadata.
export const TEST_PASSAGE_METADATA = {
  ravel_title:   TEST_RAVEL.title,
  passage_index: TEST_RAVEL.roots [0].passageIndex,
  passage_title: TEST_RAVEL.roots [0].name,
  passage_body:  TEST_RAVEL.roots [0].passage,
}
