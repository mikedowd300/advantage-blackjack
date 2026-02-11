import { 
  AbbreviatedDoubleupConditions,
  SurrenderTypes, 
  DoubleDownOn,
  PayRatio,
  HoleCardType
} from "../doubleup-models/doubleup-strategies.models";

export const defaultConditions: AbbreviatedDoubleupConditions = {
  title: "Default Conditions",
  S17: false,
  RSA:  true,
  DAS: true,
  MHFS: 4,
  MSE: true,
  reshuffleOnDealerChange: false,
  doubleupPushesToo: false,
  handsPerDealer: 50,
  cardsBurned: 1,
  cardsBurnedOnDealerChange: 1,
  blackjackPayRatio: PayRatio.THREE_to_TWO,
  spotsPerTable: 7,
  decksPerShoe: 6,
  minBet: 10,
  maxBet: 1000,
  shufflePoint: 260,
  canDoubleOn:  DoubleDownOn.ANY_TWO_CARDS,
  surrender: SurrenderTypes.NOT_ALLOWED,
  holeCardPolicy: HoleCardType.STANDARD,
};

export const normalConditions: AbbreviatedDoubleupConditions = {
  title: "Normal Conditions",
  S17: true,
  RSA:  true,
  DAS: true,
  MHFS: 4,
  MSE: true,
  reshuffleOnDealerChange: true,
  doubleupPushesToo: false,
  handsPerDealer: 100,
  cardsBurned: 1,
  cardsBurnedOnDealerChange: 1,
  blackjackPayRatio: PayRatio.THREE_to_TWO,
  spotsPerTable: 3,
  decksPerShoe: 4,
  minBet: 5,
  maxBet: 100,
  shufflePoint: 160,
  canDoubleOn:  DoubleDownOn.ANY_TWO_CARDS,
  surrender: SurrenderTypes.NOT_ALLOWED,
  holeCardPolicy: HoleCardType.STANDARD, 
}

export const deviationConditions: AbbreviatedDoubleupConditions = {
  title: "Deviation Conditions",
  S17: false,
  RSA:  true,
  DAS: true,
  MHFS: 4,
  MSE: true,
  reshuffleOnDealerChange: false,
  doubleupPushesToo: false,
  handsPerDealer: 500,
  cardsBurned: 1,
  cardsBurnedOnDealerChange: 1,
  blackjackPayRatio: PayRatio.THREE_to_TWO,
  spotsPerTable: 7,
  decksPerShoe: 6,
  minBet: 5,
  maxBet: 1000,
  shufflePoint: 83,
  canDoubleOn:  DoubleDownOn.ANY_TWO_CARDS,
  surrender: SurrenderTypes.NOT_ALLOWED,
  holeCardPolicy: HoleCardType.STANDARD,
}

export const doubleupConditionTitles: string[] = [
  "Default Conditions",
  "Normal Conditions",
  "Deviation Conditions",
];

export const doubleupConditions: { [k: string]: AbbreviatedDoubleupConditions } = {
  "Default Conditions": defaultConditions,
  "Normal Conditions": normalConditions,
  "Deviation Conditions": deviationConditions,
};

export const doubleupDefaultConditions: AbbreviatedDoubleupConditions = defaultConditions;