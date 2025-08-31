import { BetSpreadStrategy } from '../classic-models/classic-strategies.models';

export const basic1to6: BetSpreadStrategy = {
  title: "Basic 1 to 6",
  spreads: {
    "0": 1,
    "1": 2,
    "2": 3,
    "3": 4,
    "4": 5,
    "5": 6,
  },
  useHalfCount: false
}; 

export const basic1to6Wong: BetSpreadStrategy = {
  title: "Basic 1 to 6 Wong",
  spreads: {
    "-1": 0,
    "0": 1,
    "1": 2,
    "2": 3,
    "3": 4,
    "4": 5,
    "5": 6,
  },
  useHalfCount: false
}; 

export const quick1to8: BetSpreadStrategy = {
  title: "Quick 1 to 8",
  spreads: {
    "0": 1,
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
  },
  useHalfCount: false
};

export const halfCount: BetSpreadStrategy = {
  title: "Half Counts to 10",
  spreads: {
    "0": 1,
    "0.5": 2,
    "1": 3,
    "1.5": 4, 
    "2": 5,
    "2.5": 6,
    "3": 7,
    "3.5": 8,
    "4": 9,
    "4.5": 10,
  },
  useHalfCount: true
};

export const quick1to10: BetSpreadStrategy = {
  title: "Quick 1 to 10",
  spreads: {
    "0": 1,
    "1": 3,
    "2": 5,
    "3": 6,
    "4": 8,
    "5": 10,
  },
  useHalfCount: false
};

export const simpleQuick: BetSpreadStrategy = {
  title: "Simple Quick Spread",
  spreads: {
    "0": 1,
    "1": 5,
  },
  useHalfCount: false
};

export const noSpread: BetSpreadStrategy = {
  title: "No Spread",
  spreads: { "0": 1 },
  useHalfCount: false
};

export const classicBetSpreadTitles: string[] = [
  "Basic 1 to 6", 
  "Basic 1 to 6 Wong",
  "Quick 1 to 8",
  "Quick 1 to 10",
  "Simple Quick Spread",
  "Half Counts to 10",
  "No Spread",
];

export const classicBetSpreads: { [k: string]: BetSpreadStrategy } = {
  "Basic 1 to 6": basic1to6,
  "Basic 1 to 6 Wong": basic1to6Wong,
  "Quick 1 to 8": quick1to8,
  "Quick 1 to 10": quick1to10,
  "Simple Quick Spread": simpleQuick,
  "Half Counts to 10": halfCount,
  "No Spread": noSpread,
};

export const defaultClassicBetSpread: BetSpreadStrategy = basic1to6;