import { PlayStrategy } from "../doubleup-models/doubleup-strategies.models";
import { wizardsAdvice } from './play-strategies/wizards-advice';
import { deviationFinder } from './play-strategies/deviation-finder';

export const doubleupPlayTitles: string[] = [
  "The Wizards Advice",
  "Deviations",
];

export const doubleupPlayCharts: { [k: string]: PlayStrategy } = {
  "The Wizards Advice": wizardsAdvice,
  "Deviations": deviationFinder,
};

export const doubleupDefaultPlayChart = wizardsAdvice;