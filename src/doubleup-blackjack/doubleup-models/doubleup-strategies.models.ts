export enum DisplayWith {
  TEXT_INPUT = 'textInput',
  NUMBER_INPUT = 'numberInput',
  CHECKBOX = 'checkbox',
  RADIO_GROUP = 'radioGroup',
  CUSTOM = 'custom',
}

export enum DoubleDownOn {
  ANY_TWO_CARDS = 'anyTwoCards',
  TEN_and_ELEVEN = 'tenAndEleven',
  NINE_thru_ELEVEN = 'nineThruEleven',
  EIGHT_thru_ELEVEN = 'eightThruEleven',
}

export enum PayRatio {
  HALF = 'one-to-two',
  ONE_to_ONE = 'one-to-one',
  SIX_to_FIVE = 'six-to-five',
  SEVEN_to_FIVE = 'seven-to-five',
  THREE_to_TWO = 'three-to-two',
  TWO_to_ONE = 'two-to-one',
  THREE_to_ONE = 'three-to-one',
  FIVE_to_ONE = 'five-to-one',
  TEN_to_ONE = 'ten-to-one',
  HUNDRED_to_ONE = 'hundred_to_one',
  THOUSAND_to_ONE = 'thousand_to_one',
  N_A = 'N/A',
}

export enum HoleCardType {
  STANDARD = 'standard',
  OBO ="nhcLosesOriginalBetOnly",
  ENHC = "enhcLosesEntireBet"
}

export enum SurrenderTypes {
  NOT_ALLOWED = 'notAllowed',
  LATE = 'lateSurrender',
  EARLY = "earlySurrender",
  EARLY_NOT_AGAINST_A =  "earlySurrenderNotAgainstAce",
}

export enum ChipTypeEnum {
  WHITE = "white",
  RED = "red",
  GREEN = "green",
  BLACK = "black",
};

export enum RoundingMethodEnum {
  CEILING = "ceiling",
  FLOOR = "floor",
  ROUND = "round",
};

export interface RadioButton {
  whatsThis: string,
  labelText: string,
  value: any,
}

export type RadioButtonGroup = RadioButton[];

// export const chipTypeRadioGroup: RadioButtonGroup = [
//   {
//     whatsThis: '',
//     labelText: 'White Chip',
//     value: ChipTypeEnum.WHITE,
//   },
//   {
//     whatsThis: '',
//     labelText: 'Red Chip',
//     value: ChipTypeEnum.RED,
//   },
// ];

// export const roundingMethodRadioGroup: RadioButtonGroup = [
//   {
//     whatsThis: '',
//     labelText: 'Round Down',
//     value: RoundingMethodEnum.CEILING,
//   },
//   {
//     whatsThis: '',
//     labelText: 'Round Up',
//     value: RoundingMethodEnum.FLOOR,
//   },
//   {
//     whatsThis: '',
//     labelText: 'Round Off',
//     value: RoundingMethodEnum.ROUND,
//   },
// ];


export const doubleDownOnList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'Any 2 Cards',
    value: DoubleDownOn.ANY_TWO_CARDS,
  },
  {
    whatsThis: '',
    labelText: 'Hard 8 - 11',
    value: DoubleDownOn.NINE_thru_ELEVEN,
  },
  {
    whatsThis: '',
    labelText: 'Hard 9 - 11',
    value: DoubleDownOn.EIGHT_thru_ELEVEN,
  },
  {
    whatsThis: '',
    labelText: '10 and 11 Only',
    value: DoubleDownOn.TEN_and_ELEVEN,
  },
];

export const payRatioList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: '1:2',
    value: PayRatio.HALF,
  },
  {
    whatsThis: '',
    labelText: '1:1',
    value: PayRatio.ONE_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '6:5',
    value: PayRatio.SIX_to_FIVE,
  },
  {
    whatsThis: '',
    labelText: '7:5',
    value: PayRatio.SEVEN_to_FIVE,
  },
  {
    whatsThis: '',
    labelText: '3:2',
    value: PayRatio.THREE_to_TWO,
  },
  {
    whatsThis: '',
    labelText: '2:1',
    value: PayRatio.TWO_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '3:1',
    value: PayRatio.THREE_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '5:1',
    value: PayRatio.FIVE_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '10:1',
    value: PayRatio.TEN_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '100:1',
    value: PayRatio.HUNDRED_to_ONE,
  },
  {
    whatsThis: '',
    labelText: '1000:1',
    value: PayRatio.THOUSAND_to_ONE,
  },
  {
    whatsThis: '',
    labelText: 'None',
    value: PayRatio.N_A,
  },
];

const payoutsForBlackjack: PayRatio[] = [
  PayRatio.ONE_to_ONE, 
  PayRatio.SIX_to_FIVE, 
  PayRatio.SEVEN_to_FIVE, 
  PayRatio.THREE_to_TWO, 
  PayRatio.TWO_to_ONE, 
  PayRatio.THREE_to_ONE
];

export const blackjackPayRatioList = payoutsForBlackjack
  .map(p => payRatioList.find(prl => prl.value === p));

export const surrenderTypesList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'No Surrender',
    value: SurrenderTypes.NOT_ALLOWED,
  },
  {
    whatsThis: 'You may surrender after the dealer checks for a blackjack',
    labelText: 'Late Surrender',
    value: SurrenderTypes.LATE,
  },
  {
    whatsThis: 'You may surrender before the dealer checks for a blackjack.',
    labelText: 'Early Surrender',
    value: SurrenderTypes.EARLY,
  },
  {
    whatsThis: 'You may surrender before the dealer checks for a blackjack against a ten, but not against an ace',
    labelText: 'Early Surrender Against a Ten',
    value: SurrenderTypes.EARLY_NOT_AGAINST_A,
  },
]

export const holeCardTypesList: RadioButtonGroup = [
  {
    whatsThis: 'A hole card is dealt. If the up card is a ten or an ace, the dealer will peak for a blackjack. If there is a blackjack, payouts are made and the hand is over.',
    labelText: 'Hole Card Included',
    value: HoleCardType.STANDARD,
  },
  {
    whatsThis: 'No hole card is dealt. In the event a blackjack, the player will lose the Original Bet Only and not the bets due to splitting and doubling.',
    labelText: 'OBO',
    value: HoleCardType.OBO,
  },
  {
    whatsThis: 'No hole card is dealt. In the event a blackjack, the player will lose all bets including bets due to splitting and doubling.',
    labelText: 'ENHC',
    value: HoleCardType.ENHC,
  },
];

export interface Condition {
  name: string,
  whatsThis: string,
  displayWith: DisplayWith,
  value?: any,
  key?: string,
  radioGroup?: RadioButtonGroup,
}

export interface DoubleupConditions {
  title: string,
  S17: Condition,
  RSA:  Condition,
  DAS: Condition,
  MHFS: Condition,
  MSE: Condition,
  reshuffleOnDealerChange: Condition,
  doubleupPushesToo: Condition,
  handsPerDealer: Condition,
  cardsBurned: Condition,
  cardsBurnedOnDealerChange: Condition,
  blackjackPayRatio: Condition,
  spotsPerTable: Condition,
  decksPerShoe: Condition,
  minBet: Condition,
  maxBet: Condition,
  shufflePoint: Condition,
  canDoubleOn:  Condition,
  surrender: Condition,
  holeCardPolicy: Condition,
}

export interface AbbreviatedDoubleupConditions {
  title: string,
  S17: boolean,
  RSA: boolean,
  DAS: boolean,
  MHFS: number,
  MSE: boolean,
  reshuffleOnDealerChange: boolean,
  doubleupPushesToo: boolean,
  handsPerDealer: number,
  cardsBurned: number,
  cardsBurnedOnDealerChange: number,
  blackjackPayRatio: PayRatio,
  spotsPerTable: number,
  decksPerShoe: number,
  minBet: number,
  maxBet: number,
  shufflePoint: number,
  canDoubleOn: DoubleDownOn,
  surrender: SurrenderTypes,
  holeCardPolicy: HoleCardType,
};

export enum CardNameEnum {
  C_A = 'A',
  C_2 = '2',
  C_3 = '3',
  C_4 = '4',
  C_5 = '5',
  C_6 = '6',
  C_7 = '7',
  C_8 = '8',
  C_9 = '9',
  C_T = 'T',
  C_J = 'J',
  C_Q = 'Q',
  C_K = 'K',
};

export interface PlayerTableInfo {
  seatNumber: number;
  playerConfigTitle: string;
};

export interface PlayActionOptions {
  options: string;
  conditions: string;
};

export interface Wong {
  enterAt: number,
  exitBelow: number;
  isActive: boolean;
}

export interface WongStrategy {
  title: string;
  wongedHands: Wong[];
}

export interface InsurancePlan {
  title: string;
  alwaysInsure: boolean;
  neverInsure: boolean;
  atTCof: number;
}

export interface BetSpreadStrategy {
  title: string;
  spreads: { [k: string]: number };
  useHalfCount: boolean;
}

export interface UnitResizeStrategy {
  title: string;
  unitProgression: number[];
  increaseAtMultiple: number[];
  decreaseAtMultiple: number[];
  roundToNearest: ChipTypeEnum;
  roundingMethod: RoundingMethodEnum;
}

export interface PlayerConfig {
  title: string;
  initialBettingUnit: number;
  initialBankroll: number;
  playStrategyTitle: string;
  betSpreadStrategyTitle: string;
  unitResizingStrategyTitle: string;
  tippingStrategyTitle: string;
  wongingStrategyTitle: string;
  countStrategyTitle: string;
  insurancePlanTitle: string;
  seatNumber?: number;
}

export interface TippingPlan {
  title: string;
  tippingBreakpoints: number[][];
  maxTip: number;
  afterBlackjack: boolean;
  dealerJoins: boolean;
  dealerLeaves: boolean;
  tipFirstHandOfShoe: boolean;
  everyXHands: number;
  tipWongHands: boolean;
  tipSplitHandToo: boolean;
  doubleDownTip: boolean;
  insureTip: boolean;
};

export interface PlayStrategy {
  title: string;
  combos: { [k: string]: PlayActionOptions };
}

export interface CountingMethodValueMap {
  [CardNameEnum.C_A]: number;
  [CardNameEnum.C_2]: number;
  [CardNameEnum.C_3]: number;
  [CardNameEnum.C_4]: number;
  [CardNameEnum.C_5]: number;
  [CardNameEnum.C_6]: number;
  [CardNameEnum.C_7]: number;
  [CardNameEnum.C_8]: number;
  [CardNameEnum.C_9]: number;
  [CardNameEnum.C_T]: number;
  [CardNameEnum.C_J]: number;
  [CardNameEnum.C_Q]: number;
  [CardNameEnum.C_K]: number;
};

export interface SuitAwareConfig {
  heart: number;
  diamond: number;
  club: number;
  spade: number;
}

export interface CountingMethodSuitAwareValueMap {
  [CardNameEnum.C_A]: SuitAwareConfig;
  [CardNameEnum.C_2]: SuitAwareConfig;
  [CardNameEnum.C_3]: SuitAwareConfig;
  [CardNameEnum.C_4]: SuitAwareConfig;
  [CardNameEnum.C_5]: SuitAwareConfig;
  [CardNameEnum.C_6]: SuitAwareConfig;
  [CardNameEnum.C_7]: SuitAwareConfig;
  [CardNameEnum.C_8]: SuitAwareConfig;
  [CardNameEnum.C_9]: SuitAwareConfig;
  [CardNameEnum.C_T]: SuitAwareConfig;
  [CardNameEnum.C_J]: SuitAwareConfig;
  [CardNameEnum.C_Q]: SuitAwareConfig;
  [CardNameEnum.C_K]: SuitAwareConfig;
};

export interface CountingMethod {
  title: string,
  valuesMap: CountingMethodValueMap;
  suitAwareValuesMap: CountingMethodSuitAwareValueMap;
  startCountAtZero: boolean;
  initialCountOffsetPerDeck: number;
  isBalanced: boolean;
  convertsToTC: boolean;
  roundingMethod: RoundingMethodEnum;
  useHalfCount: boolean;
  suitAware: boolean;
  aceSideCount: boolean;
};

export interface TableConfig {
  title: string;
  players: PlayerTableInfo[];
  conditionsTitle: string;
};

export type AnyStrategy = | AbbreviatedDoubleupConditions
  | BetSpreadStrategy
  | UnitResizeStrategy 
  | WongStrategy 
  | InsurancePlan
  | TippingPlan
  | PlayerConfig
  | PlayStrategy
  | TableConfig
  | CountingMethod

export const defaultFullDoubleupConditions: DoubleupConditions = {
  title: 'Default Conditions',
  S17: {
    name: 'Dealer Stays on Soft 17',
    whatsThis: 'Deselect the checkbox for a game where the Dealer stays on a hard 17',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  RSA: {
    name: 'Resplit Aces',
    whatsThis: 'Check if the user is allowed to resplit aces',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  DAS: {
    name: 'Double After Split',
    whatsThis: 'Check if the player is allowed to double down after splitting',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  MHFS: {
    name: 'Maximum hands from split',
    whatsThis: 'Enter how many hands a player may split up to. In the case where a player may split 3 times, givig the player 4 hands, enter 4.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 4,
  },
  MSE: {
    name: 'Allow Midshoe Entry',
    whatsThis: 'Check the box if a player may join a game after the first hand has been played, and if a player may add hands after the first hand has been played. This condition needs to be set to true if the player intends to implement a wonging strategy.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  reshuffleOnDealerChange: {
    name: 'Reshuffle the Shoe When a New Dealer Joins the Table',
    whatsThis: 'Check this box if the incoming dealer shuffles the shoe regardless of the amount of the shoe remaining. This condition works the "Hands per Dealer" condition to account for "half shoeing". In a pitch game it is normal for a new dealer to shuffle when joining the table, even if only one or 2 hands have been dealt. This is bad for card counters and so if this box is checked, the "Hands per Dealer" becomes relevant.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  doubleupPushesToo: {
    name: 'Double Up Bets Pushes on a Push',
    whatsThis: 'Allegedly, some casinos, or maybe jest a new dealer, will push the Double Up bet along with the regular bet. If you find yourself in this situation, you have a significant edge off the top. Play it cool and get hands in.',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  handsPerDealer: {
    name: 'Hands per Dealer',
    whatsThis: 'Enter the amount of hands a dealer will deal before being swapped out with the next dealer. This condition works with the "Reshuffle the Shoe When a New Dealer Joins the Table" condition. If that box is not checked, then the number entered into this field is irrelevant, but if it is checked, then a certain amount of "half shoeing" (shuffling mid shoe, thus eliminating the ability for the count to go up) will occur when a new dealer joins a shoe in the beginning of a shoe. This is normal in single and double deck games.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 100,
  },
  cardsBurned: {
    name: 'Number of Cards Burned After the Shuffle',
    whatsThis: 'Normally, a single card is burned after the cards are shuffled. Any cards burned should be treated like cards behind the cut card. Burning 4 cards in a double deck game with 50% deck penetration, has the effect of making penn more like 46%.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  cardsBurnedOnDealerChange: {
    name: 'Number of Cards Burned on a Dealer Change',
    whatsThis: 'Often when a dealers are swapped out, the dealer will burn a single card, but in some casinos, the new dealer will burn more than one card. For counting purposes, burned cards are treated like cards behind the cut card. In a six deck game where the cuts off 1.5 decks (75% deck penitratind) where the dealer burns 4 cards on the shuffle then 4 more if a dealer change happens to occur during the shoe, now more than 1.6 decks have been cut off and the deck penetration is closer to 72%. The affect of this is minimal, but measureable, and is decreased more when the "Hands per Dealer" condition is high.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  blackjackPayRatio: {
    name: 'Blackjack Pays...',
    whatsThis: 'The payout ratios shown include payouts for other bonuses and are not necessarily blackjack payouts.',
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: blackjackPayRatioList,
    value: PayRatio.THREE_to_TWO,
  },
  spotsPerTable: {
    name: 'Seats per Table',
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  decksPerShoe: {
    name: 'Decks per Shoe',
    whatsThis: 'CAVEAT: Changing this condition without adjusting the "Deck penetration" condition as well, may result in more cards being cut off than are in the deck. If, during a simulation, this is the case, the simulation will adjust the "Deck Penetration" to half the size of the shoe.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 6,
  },
  minBet: {
    name: 'Table Minimum Bet',
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  maxBet: {
    name: 'Table Maximum Bet',
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1000,
  },
  shufflePoint: {
    name: 'Deck Penetration',
    whatsThis: 'Enter the number of cards dealt before the shuffle card comes out. CAVEAT #1: lowering the "Decks per Shoe" condition without adjusting this number as well may result in more cards being cut off than are in the shoe. If, during a simulation, this is the case, the simulation will adjust the "Deck Penetration" to half the size of the shoe. CAVEAT #2: it is up to the user to make sure that the deck penetration isn\'t so deep that dealer runs out of cards in the middle of a round. If, during a simulation, that is the case, then the simulation will treat the entire hand like a push. Even a blackjack will push against any dealer hand. While this will keep the simulation from freezing, it will skew results.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1000,
  },
  canDoubleOn: {
    name: 'The Player May Double on...',
    whatsThis: null,
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: doubleDownOnList,
    value: DoubleDownOn.ANY_TWO_CARDS,
  },
  surrender: {
    name: 'Surrender Rules',
    whatsThis: null,
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: surrenderTypesList,
    value: SurrenderTypes.NOT_ALLOWED,
  },
  holeCardPolicy: {
    name: 'Hole Card Rules',
    whatsThis: 'In some games, the dealer does not take a hole card until all other players\' hands are played. The difference from having the hole card dealt before the players play their hands is that the dealer has no card to peek at under a ten or an ace. The players will play their cards, including splitting and doubling down, and the bets associated with those hands that would not have been made under the standard, hole card included, method. If the dealer ends up having blackjack, the player will lose the original bet only in the (OBO) variation, but will loses all bets with the European No Hole Card rules (ENHC). Very rarely, a casino will have a hybrid version where the dealer will deal a hole card, but not peek at it and apply either the OBO or ENHC rules for a blackjack.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: holeCardTypesList,
    value: HoleCardType.STANDARD,
  },
};

// export interface CustomizingLink {
//   title: string,
//   bodyText: string,
//   url: string,
// };

// export const customizingLinks: CustomizingLink[] = [
//   {
//     title: 'Table',
//     bodyText: 'Customize and save a table with the players and conditions you want.',
//     url: 'table',
//   },
//   {
//     title: 'Conditions',
//     bodyText: 'Customize and save table conditions to mimic any casino.',
//     url: 'conditions',
//   },
//   {
//     title: 'Player',
//     bodyText: 'Customize and save a new player to behave anyway you want.',
//     url: 'player',
//   },
//   {
//     title: 'Bet Spread',
//     bodyText: 'Customize and save bet spreading strategies to be incorporated by a player.',
//     url: 'bet-spread',
//   },
//   {
//     title: 'Unit Resizing',
//     bodyText: 'Customize and save unit resizing strategies to become part of a players behavior.',
//     url: 'unit-resizing',
//   },
//   {
//     title: 'Play Chart',
//     bodyText: 'In addition to the built in play chart, customize and save new chart to define a players playing behavior.',
//     url: 'play-chart',
//   },
//   {
//     title: 'Wonging',
//     bodyText: 'Customize and save different approaches to adding and removing hands depending on the count.',
//     url: 'wonging',
//   },
//   {
//     title: 'Tipping',
//     bodyText: 'Understand the cost of tipping by customizing approaches to tipping.',
//     url: 'tipping',
//   },
//   {
//     title: 'Counting System',
//     bodyText: 'Implement you own counting strategy. You can even make a deviation chart to go along with it in the Deviation section.',
//     url: 'custom-counting-system',
//   },
//   {
//     title: 'Insurance Plan',
//     bodyText: 'When insurance is offered, have a plan for accepting it or not.',
//     url: 'insurance-plan',
//   },
// ];