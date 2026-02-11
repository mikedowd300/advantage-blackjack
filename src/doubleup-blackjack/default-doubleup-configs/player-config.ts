import { PlayerConfig } from  "../doubleup-models/doubleup-strategies.models";

export const ploppyJoe: PlayerConfig = {
  title: "Ploppy Joe",
  initialBettingUnit: 25,
  initialBankroll: 100000000,
  playStrategyTitle: 'The Wizards Advice',
  betSpreadStrategyTitle: 'No Spread',
  unitResizingStrategyTitle: 'Never Resize',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const ploppyToo: PlayerConfig = {
  title: "Ploppy Too",
  initialBettingUnit: 25,
  initialBankroll: 100000000,
  playStrategyTitle: 'The Wizards Advice',
  betSpreadStrategyTitle: 'No Spread',
  unitResizingStrategyTitle: 'Never Resize',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const hiLo1to6: PlayerConfig = {
  title: "HiLo 1-6 Spread",
  initialBettingUnit: 10,
  initialBankroll: 50000,
  playStrategyTitle: 'The Wizards Advice',
  betSpreadStrategyTitle: 'Basic 1 to 6',
  unitResizingStrategyTitle: 'Never Resize',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'Hi Lo',
  insurancePlanTitle: 'Never Insure',
};

export const hiLo1to6Resize: PlayerConfig = {
  title: "HiLo 1-6 Spread and Resize",
  initialBettingUnit: 10,
  initialBankroll: 50000,
  playStrategyTitle: 'The Wizards Advice',
  betSpreadStrategyTitle: 'Basic 1 to 6',
  unitResizingStrategyTitle: 'Resize Reduce Risk',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'Hi Lo',
  insurancePlanTitle: 'Never Insure',
};

export const doubleupPlayerTitles: string[] = [
  "Ploppy Joe",
  "Ploppy Too",
  "HiLo 1-6 Spread",
  "HiLo 1-6 Spread and Resize",
];

export const doubleupPlayers: { [k: string]: PlayerConfig } = {
  "Ploppy Joe": ploppyJoe,
  "Ploppy Too": ploppyToo,
  "HiLo 1-6 Spread": hiLo1to6,
  "HiLo 1-6 Spread and Resize": hiLo1to6Resize,
};

export const doubleupDefaultPlayer: PlayerConfig = ploppyJoe;