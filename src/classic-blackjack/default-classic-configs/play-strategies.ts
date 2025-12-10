import { PlayStrategy } from "../classic-models/classic-strategies.models";
import { basic_DAS } from './play-strategies/basic-DAS';
import { deviationFinder } from './play-strategies/deviation-finder';
import { instinct } from './play-strategies/basic-instinct';
import { illustrious_H17 } from './play-strategies/illustrious-h17';
import { extended_H17_DAS } from './play-strategies/extended-h17-DAS';
import { illustrious_S17 } from './play-strategies/illustrious-s17';
import { extended_S17_DAS } from './play-strategies/extended-s17-DAS';

export const classicPlayTitles: string[] = [
  "Basic DAS",
  "Deviations",
  "Basic Instinct",
  "Illustrious H17",
  "Extended H17 DAS",
  "Illustrious S17",
  "Extended S17 DAS",
];

export const classicPlayCharts: { [k: string]: PlayStrategy } = {
  "Basic DAS": basic_DAS,
  "Basic Instinct": instinct,
  "Illustrious H17": illustrious_H17,
  "Extended H17 DAS": extended_H17_DAS,
  "Illustrious S17": illustrious_S17,
  "Extended S17 DAS": extended_S17_DAS,
  "Deviations": deviationFinder,
};

export const classicDefaultPlayChart = basic_DAS;