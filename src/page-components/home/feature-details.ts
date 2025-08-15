import { FeatureDetails } from "../../models";

export const featureDetails: FeatureDetails[] = [
  {
    imgSrc: 'home-screen-images/introdemo.png',
    imgAltText: 'intro',
    headerText: 'Do you need proof card counting works?',
    taglineText:  'I did, so I built this to convince myself.',
    textContent: [
      'Here\'s results for a 100,000 round simulation of double deck with a player using hi-lo with deviations against a flat bettor with basic strategy.',
      'Each player uses their own systems, from counting to spreading their bets and more',
      'The hi-lo player won $1,800,000 with a 1.52% ROI and an AV of $132 / hour based on playing 100 rounds per hour. While the basic strategy, flat bettor lost over $50,000.',
      'How deep is this rabbit hole? Watch the demo video and find out.'
    ],
    videoUrl: 'introDemoUrl',
    buttontext: 'Watch Demo',
  },
  {
    imgSrc: 'home-screen-images/yourownsimulation.png',
    imgAltText: 'build your own player',
    headerText: 'How do I build my own player?',
    taglineText:  'Mix and match behaviors to build a unique player',
    textContent: [
      'Once you build a player or any other configuration once, you don\'t have to ever build it again.',
      'Start with the player\'s name and bankroll.',
      'Add a bet spread and a plan for resizing the betting unit.',
      'Use the counting system of your choice and a deviation chart to go with it.',
      'Make a plan to wong in and out with the count.',
      'Experiment with when to take insurance.',
      'Might as well make tipping a part of the simulation.',
      'For any configurations, chose a built-in one or create and save your own.',
    ],
    videoUrl: 'buildAPlayerUrl',
    buttontext: 'Watch and Learn',
  }
];