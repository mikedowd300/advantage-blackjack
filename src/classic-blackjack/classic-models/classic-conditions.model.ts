import { ClassicFeatureToggles } from './classic-feature-toggles';

export enum DisplayWith {
  TEXT_INPUT = 'textInput',
  NUMBER_INPUT = 'numberInput',
  CHECKBOX = 'checkbox',
  CUSTOM = 'custom',
}

export enum DoubleDownOn {
  ANY_TWO_CARDS = 'anyTwoCards',
  TEN_and_ELEVEN = 'tenAndEleven',
  NINE_thru_ELEVEN = 'nineThruEleven',
  EIGHT_thru_ELEVEN = 'eightThruEleven',
}

export enum BlackjackPayRatio {
  ONE_to_ONE = 'one-to-one',
  SIX_to_FIVE = 'six-to-five',
  SEVEN_to_FIVE = 'seven-to-five',
  THREE_to_TWO = 'three-to-two',
  TWO_to_ONE = 'two-to-one',
  THREE_to_ONE = 'three-to-one',
}

export enum HoleCardType {
  STANDARD = 'standard',
  DEALT_NO_PEAK_OBO = 'standardNoPeakObo',
  DEALT_NO_PEAK_ALL_BETS_TAKEN = 'standardNoPeakAllBetsTaken',
  OBO ="nhcLosesOriginalBetOnlyToAnAce",
  ENHC = "enhcLosesEntireBetToAnAce"
}

export enum SurrenderTypes {
  NOT_ALLOWED = 'notAllowed',
  LATE = 'lateSurrender',
  EARLY = "earlySurrender",
  EARLY_NOT_AGAINST_A =  "earlySurrenderNotAgainstAce",
}

export interface SurrenderObject {
  whatsThis: string,
  labelText: string,
}

export interface HoleCardObject {
  whatsThis: string,
  labelText: string,
}

export const SurrenderList = {
  [SurrenderTypes.NOT_ALLOWED]: {
    whatsThis: '',
    labelText: 'No Surrendering',
  },
  [SurrenderTypes.LATE]: {
    whatsThis: 'You may surrender after the dealer checks for a blackjack',
    labelText: 'Late Surrender',
  },
  [SurrenderTypes.EARLY]: {
    whatsThis: 'You may surrender before the dealer checks for a blackjack.',
    labelText: 'Early Surrender',
  },
  [SurrenderTypes.EARLY_NOT_AGAINST_A]: {
    whatsThis: 'You may surrender before the dealer checks for a blackjack against a ten, but not against an ace',
    labelText: 'Early Surrender Against a Ten',
  },
}

export const HoleCardList = {
  [HoleCardType.STANDARD]: {
    whatsThis: 'A hole card is dealt, and in the case of a ten or an ace, the dealer will peak at it looking for a blackjack.',
    labelText: 'Hole Card Included',
  },
  [HoleCardType.DEALT_NO_PEAK_OBO]: {
    whatsThis: 'A hole card is dealt, but the dealer will peak at it looking for a blackjack. In the case of a dealers blackjack, the player will lose the original bet, but not the bets due to splitting and doubling down.',
    labelText: 'No peek. OBO rules.',
  },
  [HoleCardType.DEALT_NO_PEAK_ALL_BETS_TAKEN]: {
    whatsThis: 'A hole card is dealt, but the dealer will peak at it looking for a blackjack. In the case of a dealers blackjack, the player will lose all bets including bets due to splitting and doubling down.',
    labelText: 'No peek. ENHC rules.',
  },
  [HoleCardType.OBO]: {
    whatsThis: 'No hole card is dealt. In the event a blackjack, the player will lose the Original Bet Only and not the bets due to splitting and doubling.',
    labelText: 'OBO',
  },
  [HoleCardType.ENHC]: {
    whatsThis: 'No hole card is dealt. In the event a blackjack, the player will lose all bets including bets due to splitting and doubling.',
    labelText: 'ENHC',
  },
}

export interface Condition {
  name: string,
  featureToggle: ClassicFeatureToggles,
  whatsThis: string,
  displayWith: DisplayWith,
  value?: any,
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
  has5CardCharlie: Condition,
  has6CardCharlie: Condition,
  bonusFor678: Condition,
  bonusFor678Suited: Condition,
  bonusFor777: Condition,
  bonusFor777Suited: Condition,
  bonusForSuitedBlackjack: Condition,
  bonusForSuitedBlackjackOfSpades: Condition,
  allowTripleDownOn3Cards: Condition,
  allowTripleDownOnAnyAmountOfCards: Condition,
  allowSurrenderAferDouble: Condition,
  allowSurrenderAtAnyTime: Condition,
  allowDoubleDownOn3CardsWith9Thru11: Condition,
  allowDoubleDownOnAny3Cards: Condition,
  allowDoubleDownOnAnyNumberOfCards: Condition,
  dealerPushesOn22: Condition,
  holeCardPolicy: Condition,
}

export const classicConditions: ClassicConditions = {
  title: 'Default Conditions',
  S17: {
    name: 'Dealer Stays on Soft 17',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Deselect the checkbox for a game where the Dealer stays on a hard 17',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  RSA: {
    name: 'Resplit Aces',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Check if the user is allowed to resplit aces',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  DAS: {
    name: 'Double After Split',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Check if the player is allowed to double down after splitting',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  MHFS: {
    name: 'Maximum hands from split',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Enter how many hands a player may split up to. In the case where a player may split 3 times, givig the player 4 hands, enter 4.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 4,
  },
  DSA: {
    name: 'Double Split Aces',
    featureToggle: ClassicFeatureToggles.DOUBLE_SPLIT_ACES,
    whatsThis: 'Check the box if, after splitting aces and being dealt a second card, a player may double down. This is not the regular rule. Usually players receive a single card on each hande after splitting aces.',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  DRSA: {
    name: 'Draw On Split Aces',
    featureToggle: ClassicFeatureToggles.DRAW_ON_SPLIT_ACES,
    whatsThis: 'Check the box if, after splitting aces and being dealt a second card, a player may continue to hit. This is not the regular rule. Usually players receive a single card on each hande after splitting aces.',
    displayWith: DisplayWith.CHECKBOX,
    value: false,
  },
  MSE: {
    name: 'Allow Midshoe Entry',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Check the box if a player may join a game after the first hand has been played, and if a player may add hands after the first hand has been played. This condition needs to be set to true if the player intends to implement a wonging strategy.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  reshuffleOnDealerChange: {
    name: 'Reshuffle the Shoe When a New Dealer Joins the Table',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Check this box if the incoming dealer shuffles the shoe regardless of the amount of the shoe remaining. This condition works the "Hands per Dealer" condition to account for "half shoeing". In a pitch game it is normal for a new dealer to shuffle when joining the table, even if only one or 2 hands have been dealt. This is bad for card counters and so if this box is checked, the "Hands per Dealer" becomes relevant.',
    displayWith: DisplayWith.CHECKBOX,
    value: true,
  },
  handsPerDealer: {
    name: 'Hands per Dealer',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Enter the amount of hands a dealer will deal before being swapped out with the next dealer. This condition works with the "Reshuffle the Shoe When a New Dealer Joins the Table" condition. If that box is not checked, then the number entered into this field is irrelevant, but if it is checked, then a certain amount of "half shoeing" (shuffling mid shoe, thus eliminating the ability for the count to go up) will occur when a new dealer joins a shoe in the beginning of a shoe. This is normal in single and double deck games.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 100,
  },
  cardsBurned: {
    name: 'Number of Cards Burned After the Shuffle',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Normally, a single card is burned after the cards are shuffled. Any cards burned should be treated like cards behind the cut card. Burning 4 cards in a double deck game with 50% deck penitration, has the effect of making penn more like 46%.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  cardsBurnedOnDealerChange: {
    name: 'Number of Cards Burned on a Dealer Change',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Often when a dealers are swapped out, the dealer will burn a single card, but in some casinos, the new dealer will burn more than one card. For counting purposes, burned cards are treated like cards behind the cut card. In a six deck game where the cuts off 1.5 decks (75% deck penitratind) where the dealer burns 4 cards on the shuffle then 4 more if a dealer change happens to occur during the shoe, now more than 1.6 decks have been cut off and the deck penitration is closer to 72%. The affect of this is minimal, but measureable and is decreased more when the "Hands per Dealer" condition is high.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1,
  },
  blackjackPayRatio: {
    name: 'Number of Cards Burned on a Dealer Change',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Often when a dealers are swapped out, the dealer will burn a single card, but in some casinos, the new dealer will burn more than one card. For counting purposes, burned cards are treated like cards behind the cut card. In a six deck game where the cuts off 1.5 decks (75% deck penitratind) where the dealer burns 4 cards on the shuffle then 4 more if a dealer change happens to occur during the shoe, now more than 1.6 decks have been cut off and the deck penitration is closer to 72%. The affect of this is minimal, but measureable and is decreased more when the "Hands per Dealer" condition is high.',
    displayWith: DisplayWith.CUSTOM, // select from a radiobutton group
    value: BlackjackPayRatio.THREE_to_TWO,
  },
  spotsPerTable: {
    name: 'Seats per Table',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  decksPerShoe: {
    name: 'Decks per Shoe',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'CAVEAT: Changing this condition without adjusting the "Deck Penitration" condition as well, may result in more cards being cut off than are in the deck. If, during a simulation, this is the case, the simulation will adjust the "Deck Penitration" to half the size of the shoe.',
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 6,
  },
  minBet: {
    name: 'Table Minimum Bet',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 5,
  },
  maxBet: {
    name: 'Table Maximum Bet',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.NUMBER_INPUT,
    value: 1000,
  },
  shufflePoint: {
    name: 'Deck Penitration',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: 'Enter the number of cards dealt before the shuffle card comes out. CAVEAT #1: lowering the "Decks per Shoe" condition without adjusting this number as well may result in more cards being cut off than are in the shoe. If, during a simulation, this is the case, the simulation will adjust the "Deck Penitration" to half the size of the shoe. CAVEAT #2: it is up to the user to make sure that the deck penitration isn\'t so deep that dealer runs out of cards in the middle of a round. If, during a simulation, that is the case, then the simulation will treat the entire hand like a push. Even a blackjack will push against any dealer hand. While this will keep the simulation from freezing, it will skew results.',
    displayWith: DisplayWith.CUSTOM,
    value: 1000,
  },
  canDoubleOn: {
    name: 'The Player May Double on...',
    featureToggle: ClassicFeatureToggles.IS_STANDARD,
    whatsThis: null,
    displayWith: DisplayWith.CUSTOM,
    value: DoubleDownOn.ANY_TWO_CARDS,
  },
  surrender: {
    name: 'The Player May Double on...',
    featureToggle: ClassicFeatureToggles.ENHANCED_SURRENDER,
    whatsThis: null,
    displayWith: DisplayWith.CUSTOM, // radio button group with SurrenderList
    value: SurrenderTypes.NOT_ALLOWED,
  },
  DFL: {
    name: 'Double For Less',
    featureToggle: ClassicFeatureToggles.DOUBLE_FOR_LESS,
    whatsThis: 'Doubling for less is a camoflage technique and is generally done when the dealr ha a 12 or a 13 and should hit against a dealers 2 or 3 (depending on the variation). TODO - CREATE A UI AND LOGIC TO IMPLEMENT THIS',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null
  },
  countBurnCard: {
    name: 'Count the Burn Card',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    whatsThis: 'Some dealers will systematically show the burn card. When this happens, especially in pitch games, your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  countBottomCard: {
    name: 'Count the Bottom Card',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    whatsThis: 'Some dealers will systematically show the bottom card of a pitch deck. When this happens your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  has5CardCharlie: {
    name: '5 Card Charlie',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    whatsThis: 'Some dealers will systematically show the bottom card of a pitch deck. When this happens your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  has6CardCharlie: {
    name: '5 Card Charlie',
    featureToggle: ClassicFeatureToggles.SEEN_CARD_ADVANTAGE,
    whatsThis: 'Some dealers will systematically show the bottom card of a pitch deck. When this happens your edge increases, maybe even enough to justify a bigger get the first hand of the shoe.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor678: {
    name: '6-7-8 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor678Suited: {
    name: 'Suited 6-7-8 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_678_SUITED,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor777: {
    name: '7-7-7 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusFor777Suited: {
    name: 'Suited 7-7-7 Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_777_SUITED,
    whatsThis: 'Bonuses and promotions like this add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusForSuitedBlackjack: {
    name: 'Suited Blackjack Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    whatsThis: 'Bonuses and promotions like this add EV.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  bonusForSuitedBlackjackOfSpades: {
    name: 'Spaded Blackjack Bonus',
    featureToggle: ClassicFeatureToggles.BONUS_FOR_SUITED_BLACKJACK,
    whatsThis: 'Bonuses and promotions like this add EV.',
    displayWith: DisplayWith.CUSTOM, // radio button group
    value: null,
  },
  allowTripleDownOn3Cards: {
    name: 'Allow Triple Down on 3 Cards',
    featureToggle: ClassicFeatureToggles.ALLOW_TRIPLE_DOWN_ON_3_CARDS,
    whatsThis: 'Rules like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowTripleDownOnAnyAmountOfCards: {
    name: 'Allow Triple Down on Any Amount of Cards',
    featureToggle: ClassicFeatureToggles.ALLOW_TRIPLE_DOWN_ON_ANY_AMOUNT_OF_CARDS,
    whatsThis: 'Rules like this can add a lot EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowSurrenderAferDouble: {
    name: 'Allow Surrender After Doubling',
    featureToggle: ClassicFeatureToggles.ALLOW_SURRENDER_AFTER_DOUBLE,
    whatsThis: 'Rules like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowSurrenderAtAnyTime: {
    name: 'Allow Surrender At Any Time',
    featureToggle: ClassicFeatureToggles.ALLOW_SURRENDER_AT_ANY_TIME,
    whatsThis: 'Rules like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOn3CardsWith9Thru11: {
    name: 'Doubling on 3 Card Totals of 9, 10, 11 is Allowed',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_3_CARDS_WITH_9_THRU_11,
    whatsThis: 'This rule is from Panamanian blackjack. The Wizard of Odds provides a basic strategy chart for it. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOnAny3Cards: {
    name: 'Doubling on Cards is Allowed',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_ANY_3_CARDS,
    whatsThis: 'This rule is from a variation of Panamanian blackjack. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  allowDoubleDownOnAnyNumberOfCards: {
    name: 'Allow Surrender At Any Time',
    featureToggle: ClassicFeatureToggles.ALLOW_DOUBLE_DOWN_ON_ANY_NUMBER_OF_CARDS,
    whatsThis: 'Promotions like this can add EV. To maximize EV create a new deviation chart.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  dealerPushesOn22: {
    name: 'Dealer Pushes on 22',
    featureToggle: ClassicFeatureToggles.DEALER_PUSHES_ON_22,
    whatsThis: 'By itself, this rule should be avoided, but if combined with enough special rules, it may be worth running the simulation.',
    displayWith: DisplayWith.CHECKBOX, 
    value: false,
  },
  holeCardPolicy: {
    name: 'Hole Card Rules',
    featureToggle: ClassicFeatureToggles.NHC,
    whatsThis: 'In some games, the dealer does not take a hole card until all other players\' hands are played. The difference from having the hole card dealt before the players play their hands is that the dealer has no card to peek at under a ten or an ace. The players will play their cards, including splitting and doubling down, and the bets associated with those hands that would not have been made under the standard, hole card included, method. If the dealer ends up having blackjack, the player will lose the original bet only in the (OBO) variation, but will loses all bets with the European No Hole Card rules (ENHC). Very rarely, a casino will have a hybrid version where the dealer will deal a hole card, but not peek at it and apply either the OBO or ENHC rules for a blackjack.',
    displayWith: DisplayWith.CUSTOM, 
    value: HoleCardType.STANDARD,
  },
}