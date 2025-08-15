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
    imgSrc: 'home-screen-images/variations.png',
    imgAltText: 'game variations',
    headerText: 'It\'s not just classic blackjack that\'s beatable',
    taglineText:  'If there was just some tool that could help me figure it out',
    textContent: [
      'Variations are often beatable but the leg work is often not done or incomplete.',
      'For any variation I have seen, The Wizard Of Odds provides a basic strategy chart and has calculated the house edge.',
      'Will counting put the edge in your favor, and by how much?',
      'Deviation charts will not exist for most of these games.',
      'If the unknown could become known for blackjack variations',
      'The casinos wouldn\'t know what him \'em.',
      'And that\'s the goal of this site.',
    ],
  },
  {
    imgSrc: 'home-screen-images/beyond-simulations.png',
    imgAltText: 'beyond simulations',
    headerText: 'Simming is nice, but is that all you have?',
    taglineText:  'Oh, there is always more to learn and understand.',
    textContent: [
      'How does one go about creating a deviations or basic strategy chart? Let me show you what I do.',
      'Insurance at TC 3? Sure, but what\'s the EV? Is there an opportunity for fine tuning here?',
      'Plug in a different bet spread or unit resizing strategy to your simm results. Play with the numbers to find a better strategy.',
      'So you made your own counting system, with your own deviation chart, now you want to prctice. I have a form for that, 2 of them actually.',
      'At what count, like exactly what count, is EV 0, and why does that matter?',
      'How detrimental is rounding the TC up or rounding with your deck estimation?',
      'Go deeper on these in the Beyond Simulations video.',
    ],
    videoUrl: 'beyondSimulations',
    buttontext: 'Beyond Simulations',
  }
];