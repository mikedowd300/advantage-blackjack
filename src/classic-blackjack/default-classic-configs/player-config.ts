import { PlayerConfig } from  "../classic-models/classic-strategies.models";

export const ploppyJoe: PlayerConfig = {
  title: "Ploppy Joe",
  initialBettingUnit: 25,
  initialBankroll: 100000000,
  playStrategyTitle: 'Basic H17',
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
  playStrategyTitle: 'Basic H17',
  betSpreadStrategyTitle: 'No Spread',
  unitResizingStrategyTitle: 'Never Resize',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const illustriousHiLoBasic1to6: PlayerConfig = {
  title: "Illustrious HiLo 1-6 Spread",
  initialBettingUnit: 25,
  initialBankroll: 10000,
  playStrategyTitle: 'Illustrious H17',
  betSpreadStrategyTitle: 'Basic 1 to 6',
  unitResizingStrategyTitle: 'Never Resize',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const lustriousHiLo1to6Resize: PlayerConfig = {
  title: "Lustrious HiLo 1-6 Spread/Resize",
  initialBettingUnit: 25,
  initialBankroll: 10000,
  playStrategyTitle: 'Illustrious H17',
  betSpreadStrategyTitle: 'Basic 1 to 6',
  unitResizingStrategyTitle: 'Resize Reduce Risk',
  tippingStrategyTitle: 'Never Tips',
  wongingStrategyTitle: 'Never Wong',
  countStrategyTitle: 'No Count',
  insurancePlanTitle: 'Never Insure',
};

export const classicPlayerTitles: string[] = [
  "Ploppy Joe",
  "Ploppy Too",
  "Illustrious HiLo 1-6 Spread",
  "Lustrious HiLo 1-6 Spread/Resize"
];

export const classicPlayers: { [k: string]: PlayerConfig } = {
  "Ploppy Joe": ploppyJoe,
  "Ploppy Too": ploppyToo,
  "Illustrious HiLo 1-6 Spread": illustriousHiLoBasic1to6,
  "Lustrious HiLo 1-6 Spread/Resize": lustriousHiLo1to6Resize,
};

export const classicDefaultPlayer: PlayerConfig = ploppyJoe;