import { PlayStrategy } from "../classic-models/classic-strategies.models";
import { wizardH17Strategy } from './play-strategies/wizard-h17';
import { deviationFinder } from './play-strategies/deviation-finder';
import { instinct } from './play-strategies/instinct';

export const classicPlayTitles: string[] = [
  "Wizard H17",
  "Deviations",
  "Basic Instinct",
];

export const classicPlayCharts: { [k: string]: PlayStrategy } = {
  "Wizard H17": wizardH17Strategy,
  "Basic Instinct": instinct,
  "Deviations": deviationFinder,
};

export const classicDefaultPlayChart = wizardH17Strategy;