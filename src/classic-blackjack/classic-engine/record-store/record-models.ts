import { TrueCountTypeEnum, SpotStatusEnum } from '../../../models'

export interface CardInfo {
  image: string;
  name: string;
  id: number;
}

export enum HandActionEnum {
  HIT = 'hit',
  STAY = 'stay',
  SPLIT = 'split',
  DOUBLE = 'double',
  INSURE = 'insure',
  SURRENDER = 'surrender',
}

export enum HandOutcomeEnum {
  WON_WITH_BETTER_HAND = "Won with better hand",
  WON_BY_DEALER_BUST = "Dealer busts",
  PUSHED = "Push",
  BUSTED = "Busted",
  BLACKJACK = "Blackjack",
  LOST_TO_BETTER_HAND = "Lost to better hand",
  LOST_TO_BLACKJACK = "Lost to Dealer's Blackjack",
  SURRENDERED = "Surrendered",
  SAVED_BY_INSURANCE = "Saved by Insurance",
  WON_WITH_BONUS = "Won with a binus rule",
  BLACKJACK_BONUS = "Blackjack Bonus",
}

export interface HandRecord {
  betAmount?: number;
  cards?: CardInfo[];
  value?: number;
  actions?: HandActionEnum[];
  outcome?: HandOutcomeEnum;
  winnings?: number;
  isFromSplit?: boolean;
  isFromWong?: boolean;
  tipSize?: number;
  id?: number; // Used by track fn in @for
}

export interface ShoeRecord {
  handId: string;
  runningCounts: {};
  decksRemaining: number;
}

export interface SpotRecord {
  status?: SpotStatusEnum,
  spotId: number,
  playerHandle: string,
  hands: HandRecord[];
  insuredAmount?: number;
  countWhenInsured?: ShoeRecord;
}

export interface PlayerRecord {
  bettingUnit: number;
  handle: string;
  spotIds?: number[];
  beginningBankroll: number;
  beginningTrueCount: number;
  beginningRunningCount: number;
  trueCountType: TrueCountTypeEnum;
  tippedAmount: number;
}

export interface DealerRecord {
  cards: CardInfo[];
  value: number;
  hasBlackjack: boolean,
  didBust: boolean,
}

export interface PlayerStreakDatum {
  beginningBankroll: number;
  roundId: string;
}

export interface PlayerStreakData {
  [k: string]: PlayerStreakDatum[];
}

export interface StreakDatum {
  roundId: string;
  length: number;
  beginningBankroll: number;
}

export interface TableRecord {
  players: PlayerRecord[];
  spots: SpotRecord[];
  dealer: DealerRecord;
  unseenCardsAtBeginningOfShoe: number;
}