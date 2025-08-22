import { PlayStrategy } from "../models-constants-enums/models";
import { wizardH17Strategy } from './play-strategies/wizard-h17';
import { deviationFinder } from './play-strategies/deviation-finder';
import { instinct } from './play-strategies/instinct';
import { illustriousPushOn4 } from './play-strategies/illustrious-push-on-4';

export const playTitles: string[] = [
  "Wizard H17",
  "Deviations", // Maybe this should be left out as it only applies to R&D for play strategy
  "Basic Instinct",
  "Illustrious Push on 4"
];

export const defaultPlay: { [k: string]: PlayStrategy } = {
  "Wizard H17": wizardH17Strategy,
  "Basic Instinct": instinct,
  "Deviations": deviationFinder, // Maybe this should be left out as it only applies to R&D for play strategy
  "Illustrious Push on 4": illustriousPushOn4,
};