import { 
  CountingMethod, 
  CardNameEnum, 
  RoundingMethodEnum,
  CountingMethodValueMap,
  SuitAwareConfig,
  CountingMethodSuitAwareValueMap 
} from "../classic-models/classic-strategies.models";

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

export const ace5: CountingMethod = {
  title: 'Ace 5', 
  valuesMap: {
    [CardNameEnum.C_A]: -1,
    [CardNameEnum.C_2]: 0,
    [CardNameEnum.C_3]: 0,
    [CardNameEnum.C_4]: 0,
    [CardNameEnum.C_5]: 1,
    [CardNameEnum.C_6]: 0,
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

export const redSeven: CountingMethod = {
  title: 'Red Seven', 
  valuesMap: defaultValueMap,
  suitAwareValuesMap: {
    [CardNameEnum.C_A]: { heart: -1, diamond: -1, club:  -1, spade: -1 },
    [CardNameEnum.C_2]: { heart: 1, diamond: 1, club:  1, spade: 1 },
    [CardNameEnum.C_3]: { heart: 1, diamond: 1, club:  1, spade: 1 },
    [CardNameEnum.C_4]: { heart: 1, diamond: 1, club:  1, spade: 1 },
    [CardNameEnum.C_5]: { heart: 1, diamond: 1, club:  1, spade: 1 },
    [CardNameEnum.C_6]: { heart: 1, diamond: 1, club:  1, spade: 1 },
    [CardNameEnum.C_7]: { heart: 1, diamond: 1, club:  0, spade: 0 },
    [CardNameEnum.C_8]: { heart: 0, diamond: 0, club:  0, spade: 0 },
    [CardNameEnum.C_9]: { heart: 0, diamond: 0, club:  0, spade: 0 },
    [CardNameEnum.C_T]: { heart: -1, diamond: -1, club:  -1, spade: -1 },
    [CardNameEnum.C_J]: { heart: -1, diamond: -1, club:  -1, spade: -1 },
    [CardNameEnum.C_Q]: { heart: -1, diamond: -1, club:  -1, spade: -1 },
    [CardNameEnum.C_K]: { heart: -1, diamond: -1, club:  -1, spade: -1 },
  },
  startCountAtZero: true,
  initialCountOffsetPerDeck: -2,
  convertsToTC: false,
  isBalanced: false,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
  suitAware: true,
  aceSideCount: false,
};

export const classicCountTitles: string[] = [
  'Hi Lo', 
  'Ace 5', 
  'Red Seven', 
  'No Count', 
];

export const classicCounts: { [k: string]: CountingMethod } = {
  'Hi Lo': hiLo, 
  'Ace 5': ace5, 
  'Red Seven': redSeven,
  'No Count': noCount,
};

export const defaultClassicCount: CountingMethod = hiLo;
