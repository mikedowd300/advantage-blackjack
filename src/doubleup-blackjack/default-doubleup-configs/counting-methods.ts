import { 
  CountingMethod, 
  CardNameEnum, 
  RoundingMethodEnum,
  CountingMethodValueMap,
  SuitAwareConfig,
  CountingMethodSuitAwareValueMap 
} from "../doubleup-models/doubleup-strategies.models";

const defaultSuitAwareConfig: SuitAwareConfig = { heart: 0, diamond: 0, club:  0, spade: 0 };

const defaultSuiteAwareValueMap: CountingMethodSuitAwareValueMap = {
  [CardNameEnum.C_A]: defaultSuitAwareConfig,
  [CardNameEnum.C_2]: defaultSuitAwareConfig,
  [CardNameEnum.C_3]: defaultSuitAwareConfig,
  [CardNameEnum.C_4]: defaultSuitAwareConfig,
  [CardNameEnum.C_5]: defaultSuitAwareConfig,
  [CardNameEnum.C_6]: defaultSuitAwareConfig,
  [CardNameEnum.C_7]: defaultSuitAwareConfig,
  [CardNameEnum.C_8]: defaultSuitAwareConfig,
  [CardNameEnum.C_9]: defaultSuitAwareConfig,
  [CardNameEnum.C_T]: defaultSuitAwareConfig,
  [CardNameEnum.C_J]: defaultSuitAwareConfig,
  [CardNameEnum.C_Q]: defaultSuitAwareConfig,
  [CardNameEnum.C_K]: defaultSuitAwareConfig,
};

const defaultValueMap: CountingMethodValueMap = {
  [CardNameEnum.C_A]: 0,
  [CardNameEnum.C_2]: 0,
  [CardNameEnum.C_3]: 0,
  [CardNameEnum.C_4]: 0,
  [CardNameEnum.C_5]: 0,
  [CardNameEnum.C_6]: 0,
  [CardNameEnum.C_7]: 0,
  [CardNameEnum.C_8]: 0,
  [CardNameEnum.C_9]: 0,
  [CardNameEnum.C_T]: 0,
  [CardNameEnum.C_J]: 0,
  [CardNameEnum.C_Q]: 0,
  [CardNameEnum.C_K]: 0,
};

export const hiLo: CountingMethod = {
  title: 'Hi Lo', 
  valuesMap: {
    [CardNameEnum.C_A]: -1,
    [CardNameEnum.C_2]: 1,
    [CardNameEnum.C_3]: 1,
    [CardNameEnum.C_4]: 1,
    [CardNameEnum.C_5]: 1,
    [CardNameEnum.C_6]: 1,
    [CardNameEnum.C_7]: 0,
    [CardNameEnum.C_8]: 0,
    [CardNameEnum.C_9]: 0,
    [CardNameEnum.C_T]: -1,
    [CardNameEnum.C_J]: -1,
    [CardNameEnum.C_Q]: -1,
    [CardNameEnum.C_K]: -1,
  },
  suitAwareValuesMap: defaultSuiteAwareValueMap,
  startCountAtZero: true,
  initialCountOffsetPerDeck: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: false,
  aceSideCount: false,
};

export const ace6: CountingMethod = {
  title: 'Ace 6', 
  valuesMap: {
    [CardNameEnum.C_A]: -1,
    [CardNameEnum.C_2]: 0,
    [CardNameEnum.C_3]: 0,
    [CardNameEnum.C_4]: 0,
    [CardNameEnum.C_5]: 0,
    [CardNameEnum.C_6]: 1,
    [CardNameEnum.C_7]: 0,
    [CardNameEnum.C_8]: 0,
    [CardNameEnum.C_9]: 0,
    [CardNameEnum.C_T]: 0,
    [CardNameEnum.C_J]: 0,
    [CardNameEnum.C_Q]: 0,
    [CardNameEnum.C_K]: 0,
  },
  suitAwareValuesMap: defaultSuiteAwareValueMap,
  startCountAtZero: true,
  initialCountOffsetPerDeck: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: false,
  aceSideCount: false,
};

export const heavy6: CountingMethod = {
  title: 'Heavy 6', 
  valuesMap: {
    [CardNameEnum.C_A]: -1,
    [CardNameEnum.C_2]: 1,
    [CardNameEnum.C_3]: 1,
    [CardNameEnum.C_4]: 1,
    [CardNameEnum.C_5]: 1,
    [CardNameEnum.C_6]: 2,
    [CardNameEnum.C_7]: 0,
    [CardNameEnum.C_8]: 0,
    [CardNameEnum.C_9]: -1,
    [CardNameEnum.C_T]: -1,
    [CardNameEnum.C_J]: -1,
    [CardNameEnum.C_Q]: -1,
    [CardNameEnum.C_K]: -1,
  },
  suitAwareValuesMap: defaultSuiteAwareValueMap,
  startCountAtZero: true,
  initialCountOffsetPerDeck: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: false,
  aceSideCount: false,
};

export const light6: CountingMethod = {
  title: 'Light 6', 
  valuesMap: {
    [CardNameEnum.C_A]: -1,
    [CardNameEnum.C_2]: 0,
    [CardNameEnum.C_3]: 1,
    [CardNameEnum.C_4]: 1,
    [CardNameEnum.C_5]: 1,
    [CardNameEnum.C_6]: 1,
    [CardNameEnum.C_7]: 0,
    [CardNameEnum.C_8]: 0,
    [CardNameEnum.C_9]: 0,
    [CardNameEnum.C_T]: -1,
    [CardNameEnum.C_J]: -1,
    [CardNameEnum.C_Q]: -1,
    [CardNameEnum.C_K]: -1,
  },
  suitAwareValuesMap: defaultSuiteAwareValueMap,
  startCountAtZero: true,
  initialCountOffsetPerDeck: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: false,
  aceSideCount: false,
};

export const noCount: CountingMethod = {
  title: 'No Count', 
  valuesMap: defaultValueMap,
  suitAwareValuesMap: defaultSuiteAwareValueMap,
  startCountAtZero: true,
  initialCountOffsetPerDeck: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: false,
  aceSideCount: false,
};

export const doubleupCountTitles: string[] = [
  'Hi Lo', 
  'Ace 6', 
  'Heavy 6',
  'Light 6', 
  'No Count', 
];

export const doubleupCounts: { [k: string]: CountingMethod } = {
  'Hi Lo': hiLo, 
  'Ace 6': ace6,
  'Heavy 6': heavy6, 
  'Light 6': light6, 
  'No Count': noCount,
};

export const doubleupDefaultCount: CountingMethod = hiLo;
