import { BustPaySchedule } from '../models-constants-enums/models';

export const wizardOfOdds: BustPaySchedule = {
  title: "Wizard of Odds",
  schedule: {
    three: 0.5,
    four: 1,
    five: 1.5,
    six: 3,
    seven: 10,
    eight: 100,
  },
}; 

export const pushOn4: BustPaySchedule = {
  title: "Push on 4",
  schedule: {
    three: 1,
    four: 0,
    five: 2,
    six: 4,
    seven: 10,
    eight: 100,
  },
};

export const bustPayScheduleTitles: string[] = [
  "Wizard of Odds", 
  "Push on 4",
];

export const defaultBustPaySchedules: { [k: string]: BustPaySchedule } = {
  "Wizard of Odds": wizardOfOdds, 
  "Push on 4": pushOn4,
};