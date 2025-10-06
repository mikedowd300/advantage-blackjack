import { PlayStrategy } from "../classic-models/classic-strategies.models";
import { basic_H17 } from './play-strategies/basic-h17';
import { deviationFinder } from './play-strategies/deviation-finder';
import { instinct } from './play-strategies/basic-instinct';
import { illustrious_H17 } from './play-strategies/illustrious-h17';

export const classicPlayTitles: string[] = [
  "Basic H17 DAS",
  "Deviations",
  "Basic Instinct",
  "Illustrious H17 DAS",
];

export const classicPlayCharts: { [k: string]: PlayStrategy } = {
  "Basic H17": basic_H17,
  "Basic Instinct": instinct,
  "Deviations": deviationFinder,
  "Illustrious H17": illustrious_H17,
}

export const classicDefaultPlayChart = basic_H17;