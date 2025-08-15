import { FeatureDetails } from "../../models";

export const featureSteps: FeatureDetails[] = [
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