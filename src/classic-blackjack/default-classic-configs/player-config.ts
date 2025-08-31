import { PlayerConfig } from  "../classic-models/classic-strategies.models";

export const ploppy1: PlayerConfig = {
  title: "Ploppy 1",
  initialBettingUnit: 25,
  initialBankroll: 100000000,
  playStrategyTitle: 'Wizard H17',
  betSpreadStrategyTitle: 'Basic 1 to 6',
  unitResizingStrategyTitle: 'Never Resize',
  tippngStrategyTitle: 'Cheap Tipper',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'Hi Lo',
  insurancePlanTitle: 'Never Insure',
};

export const ploppy2: PlayerConfig = {
  title: "Ploppy 2",
  initialBettingUnit: 25,
  initialBankroll: 100000000,
  playStrategyTitle: 'Wizard H17',
  betSpreadStrategyTitle: 'No Spread',
  unitResizingStrategyTitle: 'Never Resize',
  tippngStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const classicPlayerTitles: string[] = [
  "Ploppy 1",
  "Ploppy 2",
];

export const classicPlayers: { [k: string]: PlayerConfig } = {
  "Ploppy 1": ploppy1,
  "Ploppy 2": ploppy2,
};

export const classicDefaultPlayer: PlayerConfig = ploppy1;