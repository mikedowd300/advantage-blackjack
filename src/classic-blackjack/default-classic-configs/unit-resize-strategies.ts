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
    30000, 70000, 110000, 150000, 200000, 250000, 300000, 350000, 400000, null
  ],
  decreaseAtMultiple: [
    null, 50000, 90000, 130000, 170000, 220000, 270000, 320000, 370000 
  ],
  roundToNearest: ChipTypeEnum.RED,
  roundingMethod: RoundingMethodEnum.CEILING
};

export const neverResize: UnitResizeStrategy  = {
  title: 'Never Resize',
  unitProgression: [1],
  increaseAtMultiple: [],
  decreaseAtMultiple: [],
  roundToNearest: ChipTypeEnum.RED,
  roundingMethod: RoundingMethodEnum.CEILING
};

export const classicUnitResizingStrategyTitles: string[] = [
  'Resize Reduce Risk',
  'Never Resize',
];

export const classicUnitResizingStrategies: {  [k: string]: UnitResizeStrategy } = {
  'Resize Reduce Risk': resizeReduceRisk, 
  'Never Resize': neverResize,
};

export const classicDefaultUnitResizeStrategy = resizeReduceRisk;