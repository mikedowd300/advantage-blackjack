import { CountingMethod, CardNameEnum, RoundingMethodEnum } from "../classic-models/classic-strategies.models";

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
  startingCount: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
};

export const Ace5: CountingMethod = {
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
  startingCount: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
};

export const noCount: CountingMethod = {
  title: 'No Count', 
  valuesMap: {
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
  },
  startingCount: 0,
  convertsToTC: true,
  isBalanced: true,
  roundingMethod: RoundingMethodEnum.FLOOR,
  useHalfCount: false,
};

export const classicCountTitles: string[] = [
  'Hi Lo', 
  'Ace 5', 
  'No Count', 
];

export const classicCounts: { [k: string]: CountingMethod } = {
  'Hi Lo': hiLo, 
  'Ace 5': Ace5, 
  'No Count': noCount,
};

export const defaultClassicCount: CountingMethod = noCount;
