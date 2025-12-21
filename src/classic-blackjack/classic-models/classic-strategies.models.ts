import { ClassicFeatureGroups, ClassicFeatureToggles } from './classic-feature-toggles-and-groups';

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

export enum DoubleForLessMinRule {
  TABLE_MIN = 'tableMinimum',
  ONE_DOLLAR = 'oneDollar',
}

export enum CharlieRule {
  ALWAYS_WINS = 'neverTies',
  PUSHES_TO_21 = 'pushesTo21',
  LOSES_OR_PUSHES_TO_21 = 'losesOrPushesTo21',
  NO_CHARLIE_AGAINST_DEALERS_5_CARDS = 'noCharlieAgainstDealersCharlie',
  LOSES_TO_BLACKJACK_ONLY = 'noCharlieAgainstDealersCharlie',
  PUSHES_TO_BLACKJACK_ONLY = 'noCharlieAgainstDealersCharlie',
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

export enum CharlieType {
  FIVE = 'five',
  SIX = 'six',
  SEVEN = 'seven',
  NONE = null,
}

export enum DxSplittingTensPolicy {
  NEVER = 'never',
  TRUE_PAIR = 'truePair',
  ANY = 'any',
}

export enum DxTiedBlackjackPolicy {
  PLAYER = 'player',
  DEALER = 'dealer',
  PUSH = 'push',
}

export interface RadioButton {
  whatsThis: string,
  labelText: string,
  value: any,
}

export type RadioButtonGroup = RadioButton[];

export const chipTypeRadioGroup: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'White Chip',
    value: ChipTypeEnum.WHITE,
  },
  {
    whatsThis: '',
    labelText: 'Red Chip',
    value: ChipTypeEnum.RED,
  },
];

export const roundingMethodRadioGroup: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'Round Down',
    value: RoundingMethodEnum.CEILING,
  },
  {
    whatsThis: '',
    labelText: 'Round Up',
    value: RoundingMethodEnum.FLOOR,
  },
  {
    whatsThis: '',
    labelText: 'Round Off',
    value: RoundingMethodEnum.ROUND,
  },
];

export const dxTiedBlackjackPolicyList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'Player Wins',
    value: DxTiedBlackjackPolicy.PLAYER,
  },
  {
    whatsThis: '',
    labelText: 'Dealer Wins',
    value: DxTiedBlackjackPolicy.DEALER,
  },
  {
    whatsThis: '',
    labelText: 'Push',
    value: DxTiedBlackjackPolicy.PUSH,
  },
]

export const dxSplittingTensPolicyList: RadioButtonGroup = [
  {
    whatsThis: 'There are no restrictions for splitting tens.',
    labelText: 'Any',
    value: DxSplittingTensPolicy.ANY,
  },
  {
    whatsThis: 'Only actual pairs my be split.',
    labelText: 'True Pair',
    value: DxSplittingTensPolicy.TRUE_PAIR,
  },
  {
    whatsThis: '',
    labelText: 'Not Allowed',
    value: DxSplittingTensPolicy.NEVER,
  },
]

export const charlieTypeList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: '5',
    value: CharlieType.FIVE,
  },
  {
    whatsThis: '',
    labelText: '6',
    value: CharlieType.SIX,
  },
  {
    whatsThis: '',
    labelText: '7',
    value: CharlieType.SEVEN,
  },
  {
    whatsThis: '',
    labelText: 'None',
    value: CharlieType.NONE,
  },
];

export const charlieRuleList: RadioButtonGroup = [
  {
    whatsThis: 'With this rule, a 5 card Charlie will win even against all dealers hands.',
    labelText: 'Always Wins',
    value: CharlieRule.ALWAYS_WINS,
  },
  {
    whatsThis: 'If the dealer draws to 21, the Charlie as played is a regular hand and will either push or lose.',
    labelText: '',
    value: CharlieRule.LOSES_OR_PUSHES_TO_21,
  },
  {
    whatsThis: 'If the dealer draws 5 or more cards, the Charlie is played as a regular hand and will winm push or lose depending on the hand total.',
    labelText: 'No Charlie Againt Charlie',
    value: CharlieRule.NO_CHARLIE_AGAINST_DEALERS_5_CARDS,
  },
  {
    whatsThis: 'If the dealer draws to 21, the Charlie will push.',
    labelText: 'Always Wins',
    value: CharlieRule.PUSHES_TO_21,
  },
  {
    whatsThis: 'This can only ever happen in a NHC game as the dealer would have ended the hand after peeking at the blackjack.',
    labelText: 'Loses to Blackjack',
    value: CharlieRule.LOSES_TO_BLACKJACK_ONLY,
  },
  {
    whatsThis: 'This can only ever happen in a NHC game as the dealer would have ended the hand after peeking at the blackjack.',
    labelText: 'Pushes to Blackjack',
    value: CharlieRule.PUSHES_TO_BLACKJACK_ONLY,
  },
];

export const doubleForLessMinRuleList: RadioButtonGroup = [
  {
    whatsThis: '',
    labelText: 'One Dollar',
    value: DoubleForLessMinRule.ONE_DOLLAR,
  },
  {
    whatsThis: '',
    labelText: 'Table Minimum',
    value: DoubleForLessMinRule.TABLE_MIN,
  },
];

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
  featureToggle: ClassicFeatureToggles,
  featureGroup: ClassicFeatureGroups,
  whatsThis: string,
  displayWith: DisplayWith,
  value?: any,
  key?: string,
  radioGroup?: RadioButtonGroup,
}

export interface ClassicConditions {
  title: string,
  S17: Condition,
  RSA:  Condition,
  MHFS: Condition,
  DSA: Condition,
  DFL: Condition,
  DAS: Condition,
  DRSA: Condition,
  MSE: Condition,
  reshuffleOnDealerChange: Condition,
  cardsBurnedOnDealerChange: Condition,
  blackjackPayRatio: Condition,
  spotsPerTable: Condition,
  decksPerShoe: Condition,
  cardsBurned: Condition,
  minBet: Condition,
  maxBet: Condition,
  shufflePoint: Condition,
  countBurnCard: Condition,
  countBottomCard: Condition,
  handsPerDealer: Condition,
  canDoubleOn:  Condition,
  surrender: Condition,
  charlieType: Condition,
  charliePayout: Condition,
  charlieAfterSplit: Condition,
  bonusFor678: Condition,
  isBonusFor678Guaranteed: Condition,
  bonusFor678Payout: Condition,
  bonusFor678Suited: Condition,
  isBonusFor678SuitedGuaranteed: Condition,
  bonusFor678SuitedPayout: Condition,
  bonusFor678Spaded: Condition,
  isBonusFor678SpadedGuaranteed: Condition,
  bonusFor678SpadedPayout: Condition,
  bonusFor777: Condition,
  bonusFor777Payout: Condition,
  isBonusFor777Guaranteed: Condition,
  bonusFor777Suited: Condition,
  isBonusFor777SuitedGuaranteed: Condition,
  bonusFor777SuitedPayout: Condition,
  bonusFor777Spaded: Condition,
  isBonusFor777SpadedGuaranteed: Condition,
  bonusFor777SpadedPayout: Condition,
  bonusForSuitedBlackjack: Condition,
  isBonusForSuitedBlackjackGuaranteed: Condition,
  bonusForSuitedBlackjackPayout: Condition,
  bonusForSuitedBlackjackOfSpades: Condition,
  isBonusForSuitedBlackjackOfSpadesGuaranteed: Condition,
  bonusForSuitedBlackjackOfSpadesPayout: Condition,
  allowTripleDownOn3Cards: Condition,
  allowTripleDownOnAnyAmountOfCards: Condition,
  allowSurrenderAferDouble: Condition,
  allowSurrenderAtAnyTime: Condition,
  allowDoubleDownOn3CardsWith9Thru11: Condition,
  allowDoubleDownOnAny3Cards: Condition,
  allowDoubleDownOnAnyNumberOfCards: Condition,
  dealerPushesOn22: Condition,
  holeCardPolicy: Condition,
  doubleExposure: Condition,
  DXTIES: Condition,
  DXTIEDBJ: Condition,
  DXSPLIT10: Condition,
}

export interface AbbreviatedClassicConditions {
  title: string,
  S17: boolean,
  RSA: boolean,
  DAS: boolean,
  MHFS: number,
  DSA: boolean,
  DRSA: boolean,
  MSE: boolean,
  reshuffleOnDealerChange: boolean,
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
  DFL: boolean,
  countBurnCard: boolean,
  countBottomCard: boolean,
  charlieType: CharlieType,
  charliePayout: PayRatio,
  charlieAfterSplit: boolean,
  bonusFor678: any,
  bonusFor678Payout: PayRatio;
  isBonusFor678Guaranteed: boolean,
  bonusFor678Suited: any,
  bonusFor678SuitedPayout: PayRatio,
  isBonusFor678SuitedGuaranteed: boolean,
  bonusFor678Spaded: any,
  bonusFor678SpadedPayout: PayRatio,
  isBonusFor678SpadedGuaranteed: boolean,
  bonusFor777: any,
  bonusFor777Payout: PayRatio,
  isBonusFor777Guaranteed: boolean,
  bonusFor777Suited: any,
  bonusFor777SuitedPayout: PayRatio,
  isBonusFor777SuitedGuaranteed: boolean,
  bonusFor777Spaded: any,
  bonusFor777SpadedPayout: PayRatio,
  isBonusFor777SpadedGuaranteed: boolean,
  bonusForSuitedBlackjack: any,
  isBonusForSuitedBlackjackGuaranteed: boolean,
  bonusForSuitedBlackjackPayout: PayRatio,
  bonusForSuitedBlackjackOfSpades: any,
  isBonusForSuitedBlackjackOfSpadesGuaranteed: boolean,
  bonusForSuitedBlackjackOfSpadesPayout: PayRatio,
  allowTripleDownOn3Cards: boolean,
  allowTripleDownOnAnyAmountOfCards: boolean,
  allowSurrenderAferDouble: boolean,
  allowSurrenderAtAnyTime: boolean,
  allowDoubleDownOn3CardsWith9Thru11: boolean,
  allowDoubleDownOnAny3Cards: boolean,
  allowDoubleDownOnAnyNumberOfCards: boolean,
  dealerPushesOn22: boolean,
  holeCardPolicy: HoleCardType,
  doubleExposure: any,
  DXTIES: any,
  DXTIEDBJ: any,
  DXSPLIT10: any,
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

export type AnyStrategy = | AbbreviatedClassicConditions
  | BetSpreadStrategy
  | UnitResizeStrategy 
  | WongStrategy 
  | InsurancePlan
  | TippingPlan
  | PlayerConfig
  | PlayStrategy
  | TableConfig
  | CountingMethod

export const defaultFullClassicConditions: ClassicConditions = {
  title: 'Default Conditions',
  S17: {
    name: 'Dealer Stays on Soft 17',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Deselect the checkbox for a game where the Dealer stays on a hard 17',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  RSA: {
    name: 'Resplit Aces',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Check if the user is allowed to resplit aces',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  DAS: {
    name: 'Double After Split',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Check if the player is allowed to double down after splitting',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  MHFS: {
    name: 'Maximum hands from split',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Enter how many hands a player may split up to. In the case where a player may split 3 times, givig the player 4 hands, enter 4.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 4,
  },
  DSA: {
    name: 'Double On Split Aces',
    featureToggle: ClassicFeatureToggles.DOUBLE_SPLIT_ACES,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'Check the box if, after splitting aces and being dealt a second card, a player may double down. This is not the regular rule. Usually players receive a single card on each hande after splitting aces.',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  DRSA: {
    name: 'Draw On Split Aces',
    featureToggle: ClassicFeatureToggles.DRAW_ON_SPLIT_ACES,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'Check the box if, after splitting aces and being dealt a second card, a player may continue to hit. This is not the regular rule. Usually players receive a single card on each hande after splitting aces.',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  MSE: {
    name: 'Allow Midshoe Entry',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Check the box if a player may join a game after the first hand has been played, and if a player may add hands after the first hand has been played. This condition needs to be set to true if the player intends to implement a wonging strategy.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  reshuffleOnDealerChange: {
    name: 'Reshuffle the Shoe When a New Dealer Joins the Table',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Check this box if the incoming dealer shuffles the shoe regardless of the amount of the shoe remaining. This condition works the "Hands per Dealer" condition to account for "half shoeing". In a pitch game it is normal for a new dealer to shuffle when joining the table, even if only one or 2 hands have been dealt. This is bad for card counters and so if this box is checked, the "Hands per Dealer" becomes relevant.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  handsPerDealer: {
    name: 'Hands per Dealer',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Enter the amount of hands a dealer will deal before being swapped out with the next dealer. This condition works with the "Reshuffle the Shoe When a New Dealer Joins the Table" condition. If that box is not checked, then the number entered into this field is irrelevant, but if it is checked, then a certain amount of "half shoeing" (shuffling mid shoe, thus eliminating the ability for the count to go up) will occur when a new dealer joins a shoe in the beginning of a shoe. This is normal in single and double deck games.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 100,
  },
  cardsBurned: {
    name: 'Number of Cards Burned After the Shuffle',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Normally, a single card is burned after the cards are shuffled. Any cards burned should be treated like cards behind the cut card. Burning 4 cards in a double deck game with 50% deck penetration, has the effect of making penn more like 46%.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  cardsBurnedOnDealerChange: {
    name: 'Number of Cards Burned on a Dealer Change',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Often when a dealers are swapped out, the dealer will burn a single card, but in some casinos, the new dealer will burn more than one card. For counting purposes, burned cards are treated like cards behind the cut card. In a six deck game where the cuts off 1.5 decks (75% deck penitratind) where the dealer burns 4 cards on the shuffle then 4 more if a dealer change happens to occur during the shoe, now more than 1.6 decks have been cut off and the deck penetration is closer to 72%. The affect of this is minimal, but measureable and is decreased more when the "Hands per Dealer" condition is high.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  blackjackPayRatio: {
    name: 'Blackjack Pays...',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'The payout ratios shown include payouts for other bonuses and are not necessarily blackjack payouts.',
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: blackjackPayRatioList,
    value: PayRatio.THREE_to_TWO,
  },
  spotsPerTable: {
    name: 'Seats per Table',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  decksPerShoe: {
    name: 'Decks per Shoe',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'CAVEAT: Changing this condition without adjusting the "Deck penetration" condition as well, may result in more cards being cut off than are in the deck. If, during a simulation, this is the case, the simulation will adjust the "Deck Penetration" to half the size of the shoe.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 6,
  },
  minBet: {
    name: 'Table Minimum Bet',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  maxBet: {
    name: 'Table Maximum Bet',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1000,
  },
  shufflePoint: {
    name: 'Deck Penetration',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'Enter the number of cards dealt before the shuffle card comes out. CAVEAT #1: lowering the "Decks per Shoe" condition without adjusting this number as well may result in more cards being cut off than are in the shoe. If, during a simulation, this is the case, the simulation will adjust the "Deck Penetration" to half the size of the shoe. CAVEAT #2: it is up to the user to make sure that the deck penetration isn\'t so deep that dealer runs out of cards in the middle of a round. If, during a simulation, that is the case, then the simulation will treat the entire hand like a push. Even a blackjack will push against any dealer hand. While this will keep the simulation from freezing, it will skew results.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1000,
  },
  canDoubleOn: {
    name: 'The Player May Double on...',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: doubleDownOnList,
    value: DoubleDownOn.ANY_TWO_CARDS,
  },
  surrender: {
    name: 'Surrender Rules',
    featureToggle: ClassicFeatureToggles.ENHANCED_SURRENDER,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: surrenderTypesList,
    value: SurrenderTypes.NOT_ALLOWED,
  },
  DFL: {
    name: 'Double For Less',
    featureToggle: ClassicFeatureToggles.DOUBLE_FOR_LESS,
    featureGroup: ClassicFeatureGroups.CAMO_PLAYS,
    whatsThis: 'Doubling for less is a camoflage technique and is generally done when the dealr ha a 12 or a 13 and should hit against a dealers 2 or 3 (depending on the variation). TODO - CREATE A UI AND LOGIC TO IMPLEMENT THIS',
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: doubleForLessMinRuleList,
    value: DoubleForLessMinRule.ONE_DOLLAR,
  },
  countBurnCard: {
    name: 'Count the Burn Card',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    featureGroup: ClassicFeatureGroups.EV_HACKS,
    whatsThis: 'Some dealers will systematically show the burn card. When this happens, especially in pitch games, your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  countBottomCard: {
    name: 'Count the Bottom Card',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    featureGroup: ClassicFeatureGroups.EV_HACKS,
    whatsThis: 'Some dealers will systematically show the bottom card of a pitch deck. When this happens your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  charlieType: {
    name: 'Include A Charlie?',
    featureToggle: ClassicFeatureToggles.HAS_CHARLIE,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Is there a 5, 6 or 7 card Charlie offered? If yes, don\'t miss the "charliePayout" condition.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: charlieTypeList,
    value: CharlieType.NONE,
  },
  isBonusFor678Guaranteed: {
    name: "6-7-8 bonus pays against a dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a 6-7-8 bonus pays against a dealers 21, this should be checked.',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusFor678SuitedGuaranteed: {
    name: "Suited 6-7-8 bonus pays against a dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "If the suited 6-7-8 bonus pays against a dealer's 21, this should be checked.",
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusFor678SpadedGuaranteed: {
    name: "Spaded 6-7-8 bonus pays against a dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "If the spaded 6-7-8 bonus pays against a dealer's 21, this should be checked.",
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusFor777Guaranteed: {
    name: "777 bonus pays against dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a player is paid the 777 bonus even when the dealer has 21, this box should be checked',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusFor777SuitedGuaranteed: {
    name: "Suited 777 bonus pays against dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a player is paid the suited 777 bonus even when the dealer has 21, this box should be checked',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusFor777SpadedGuaranteed: {
    name: "Spaded 777 bonus pays against dealer's 21?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a player is paid the spadedd 777 bonus even when the dealer has 21, this box should be checked',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusForSuitedBlackjackGuaranteed: {
    name: "Suited blackjack bonus pays against dealer's blackjack?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a player is paid the suited blackjack bonus even when the dealer has a blackjack, this box should be checked',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  isBonusForSuitedBlackjackOfSpadesGuaranteed: {
    name: "Spaded blackjack bonus pays against dealer's blackjack?",
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK_OF_SPADES,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'If a player is paid the spaded blackjack bonus even when the dealer has a blackjack, this box should be checked',
    displayWith: DisplayWith.CHECKBOX, 
    value: true,
  },
  charliePayout: {
    name: 'A Charlie Pays Out...',
    featureToggle: ClassicFeatureToggles.HAS_CHARLIE,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'There is no need for seperate Charlie payouts as a table will never have more than 1.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  charlieAfterSplit: {
    name: 'Allow Charlie After Splitting',
    featureToggle: ClassicFeatureToggles.HAS_CHARLIE,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: '',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  bonusFor678: {
    name: '6-7-8 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor678Payout: {
    name: '6-7-8 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusFor678Suited: {
    name: 'Suited 6-7-8 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor678SuitedPayout: {
    name: 'Suited 6-7-8 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusFor678Spaded: {
    name: 'Spaded 6-7-8 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor678SpadedPayout: {
    name: 'Spaded 6-7-8 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusFor777: {
    name: '7-7-7 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor777Payout: {
    name: '7-7-7 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusFor777Suited: {
    name: 'Suited 7-7-7 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor777SuitedPayout: {
    name: 'Suited 7-7-7 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SUITED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusFor777Spaded: {
    name: 'Spaded 7-7-7 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor777SpadedPayout: {
    name: 'Spaded 7-7-7 Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SPADED,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusForSuitedBlackjack: {
    name: 'Suited Blackjack Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusForSuitedBlackjackPayout: {
    name: 'Suited Blackjack Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  bonusForSuitedBlackjackOfSpades: {
    name: 'Spaded Blackjack Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: 'Bonuses and promotions like this add EV.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusForSuitedBlackjackOfSpadesPayout: {
    name: 'Spaded Blackjack Bonus Payout',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    featureGroup: ClassicFeatureGroups.BONUSES,
    whatsThis: "Select 'None' if this bonus is not desired",
    displayWith: DisplayWith.RADIO_GROUP,
    radioGroup: payRatioList,
    value: PayRatio.N_A,
  },
  allowTripleDownOn3Cards: {
    name: 'Allow Triple Down on 3 Cards',
    featureToggle: ClassicFeatureToggles.ALLOW_TRIPLE_DOWN_ON_3_CARDS,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'Rules like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowTripleDownOnAnyAmountOfCards: {
    name: 'Allow Triple Down on Any Amount of Cards',
    featureToggle: ClassicFeatureToggles.ALLOW_TRIPLE_DOWN_ON_ANY_AMOUNT_OF_CARDS,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'Rules like this can add a lot EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowSurrenderAferDouble: {
    name: 'Allow Surrender After Doubling',
    featureToggle: ClassicFeatureToggles.ALLOW_SURRENDER_AFTER_DOUBLE,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'Rules like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowSurrenderAtAnyTime: {
    name: 'Allow Surrender At Any Time',
    featureToggle: ClassicFeatureToggles.ALLOW_SURRENDER_AT_ANY_TIME,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: '"At Any Time" does NOT include after a double, if that rule is desired in addition to this rule, check "Allow Surrender After Doubling" checkbox as well. This rule can add EV if played correctly. To maximize EV, create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOn3CardsWith9Thru11: {
    name: 'Doubling on 3 Card Totals of 9 - 11 is Allowed',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_3_CARDS_WITH_9_THRU_11,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule is from Panamanian blackjack. The Wizard of Odds provides a basic strategy chart for it. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOnAny3Cards: {
    name: 'Doubling on Any 3 Cards is Allowed',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_ANY_3_CARDS,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule is from a variation of Panamanian blackjack. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOnAnyNumberOfCards: {
    name: 'Double Down on Any Number of Cards',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_ANY_NUMBER_OF_CARDS,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule will add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  dealerPushesOn22: {
    name: 'Dealer Pushes on 22',
    featureToggle: ClassicFeatureToggles.DEALER_PUSHES_ON_22,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'By itself, a game with this rule should be avoided, but if combined with enough special rules, running the simulation and creating a deviation chart might give you something amazing.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  holeCardPolicy: {
    name: 'Hole Card Rules',
    featureToggle: ClassicFeatureToggles.NHC,
    featureGroup: ClassicFeatureGroups.STANDARD,
    whatsThis: 'In some games, the dealer does not take a hole card until all other players\' hands are played. The difference from having the hole card dealt before the players play their hands is that the dealer has no card to peek at under a ten or an ace. The players will play their cards, including splitting and doubling down, and the bets associated with those hands that would not have been made under the standard, hole card included, method. If the dealer ends up having blackjack, the player will lose the original bet only in the (OBO) variation, but will loses all bets with the European No Hole Card rules (ENHC). Very rarely, a casino will have a hybrid version where the dealer will deal a hole card, but not peek at it and apply either the OBO or ENHC rules for a blackjack.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: holeCardTypesList,
    value: HoleCardType.STANDARD,
  },
  doubleExposure: {
    name: "Double Exposure",
    featureToggle: ClassicFeatureToggles.DX,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'In a "double expossur" game, both the dealers cards are exposed. This would seem great for the player, but to make up for it a the house will win all ties, sometimes including blackjack, or may limit splitting. If you select this option, be sure to select the other rules that come with it.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  DXTIES: {
    name: "Double Exposure, Dealer Push Policy",
    featureToggle: ClassicFeatureToggles.DX,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule is part of "Double Exposure". By itself, it, renders a game unplayable.',
    displayWith: DisplayWith.CUSTOM, 
    value: false,
  },
  DXTIEDBJ: {
    name: "Double Exposure, Tied Blackjacks Policy",
    featureToggle: ClassicFeatureToggles.DX,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule primarily applies to "Double Exposure" blackjack.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: dxTiedBlackjackPolicyList,
    value: DxTiedBlackjackPolicy.PUSH
    
  },
  DXSPLIT10: {
    name: "Double Exposure, Splitting Tens Policy",
    featureToggle: ClassicFeatureToggles.DX,
    featureGroup: ClassicFeatureGroups.WEIRD_RULES,
    whatsThis: 'This rule primarily applies to "Double Exposure" blackjack where some casinos will only allow splitting of truly paired 10s.',
    displayWith: DisplayWith.RADIO_GROUP, 
    radioGroup: dxSplittingTensPolicyList,
    value: DxSplittingTensPolicy.ANY,
  },
}

export interface CustomizingLink {
  title: string,
  bodyText: string,
  url: string,
};

export const customizingLinks: CustomizingLink[] = [
  {
    title: 'Table',
    bodyText: 'Customize and save a table with the players and conditions you want.',
    url: 'table',
  },
  {
    title: 'Conditions',
    bodyText: 'Customize and save table conditions to mimic any casino.',
    url: 'conditions',
  },
  {
    title: 'Player',
    bodyText: 'Customize and save a new player to behave anyway you want.',
    url: 'player',
  },
  {
    title: 'Bet Spread',
    bodyText: 'Customize and save bet spreading strategies to be incorporated by a player.',
    url: 'bet-spread',
  },
  {
    title: 'Unit Resizing',
    bodyText: 'Customize and save unit resizing strategies to become part of a players behavior.',
    url: 'unit-resizing',
  },
  {
    title: 'Play Chart',
    bodyText: 'In addition to the built in play chart, customize and save new chart to define a players playing behavior.',
    url: 'play-chart',
  },
  {
    title: 'Wonging',
    bodyText: 'Customize and save different approaches to adding and removing hands depending on the count.',
    url: 'wonging',
  },
  {
    title: 'Tipping',
    bodyText: 'Understand the cost of tipping by customizing approaches to tipping.',
    url: 'tipping',
  },
  {
    title: 'Counting System',
    bodyText: 'Implement you own counting strategy. You can even make a deviation chart to go along with it in the Deviation section.',
    url: 'custom-counting-system',
  },
  {
    title: 'Insurance Plan',
    bodyText: 'When insurance is offered, have a plan for accepting it or not.',
    url: 'insurance-plan',
  },
];