import { PlayerConfig } from "../models-constants-enums/models";

export const ploppy1: PlayerConfig = {
  title: "Ploppy 1",
  description: "Just taking up space",
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
  description: "Just eating cards",
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

export const playerTitles: string[] = [
  "Ploppy 1",
  "Ploppy 2",
];

export const defaultPlayers: { [k: string]: PlayerConfig } = {
  "Ploppy 1": ploppy1,
  "Ploppy 2": ploppy2,
};