import { 
  ChipTypeEnum,
  RoundingMethodEnum,
  UnitResizeStrategy
} from "../classic-models/classic-strategies.models";

export const resizeReduceRisk: UnitResizeStrategy = {
  title: 'Resize Reduce Risk',
  unitProgression: [
    1, 2, 3, 4, 5, 6, 7, 8, 10
  ],
  increaseAtMultiple: [
    30000, 70000, 110000, 150000, 200000, 250000, 300000, 350000, null
  ],
  decreaseAtMultiple: [
    null, 50000, 90000, 130000, 170000, 220000, 270000, 320000, 370000 
  ],
  roundToNearest: ChipTypeEnum.RED,
  roundingMethod: RoundingMethodEnum.CEILING
};

export const hiRiskToLoRisk: UnitResizeStrategy = {
  title: 'High Risk to Low Risk',
  unitProgression: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
  increaseAtMultiple: [
    400, 900, 1600, 2500, 3600, 4900, 6400, 8100, 10000, null
  ],
  decreaseAtMultiple: [
    null, 200, 500, 1100, 1900, 2900, 4100, 6300, 7100, 9000
  ],
  roundToNearest: ChipTypeEnum.RED,
  roundingMethod: RoundingMethodEnum.CEILING
};

export const neverResize: UnitResizeStrategy  = {
  title: 'Never Resize',
  unitProgression: [1],
  increaseAtMultiple: [null],
  decreaseAtMultiple: [null],
  roundToNearest: ChipTypeEnum.RED,
  roundingMethod: RoundingMethodEnum.CEILING
};

export const classicUnitResizingStrategyTitles: string[] = [
  'Resize Reduce Risk',
  'High Risk to Low Risk',
  'Never Resize',
];

export const classicUnitResizingStrategies: {  [k: string]: UnitResizeStrategy } = {
  'Resize Reduce Risk': resizeReduceRisk, 
  'High Risk to Low Risk': hiRiskToLoRisk,
  'Never Resize': neverResize,
};

export const classicDefaultUnitResizeStrategy = resizeReduceRisk;