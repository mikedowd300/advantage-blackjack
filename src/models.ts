export const GameVariations: string[] = ['classic', 'doubleup']

export enum LocalStorageItemsEnum {
  SHOES = 'shoes',
  CONDITIONS = 'conditions',
  TIPPING = 'tipping',
  BET_SPREAD = 'betSpread',
  WONG = 'wong',
  UNIT_RESIZE = 'unitResize',
  PLAY = 'play',
  PLAYER_CONFIG = "playerConfig",
  TABLE_CONFIG = 'tableConfig',
  COUNT = 'count',
  DEVIATION_CHART = 'deviationChart',
  INSURANCE = 'insurance',
};

export enum TrueCountTypeEnum {
  HALF_FLOOR = 'halfFloor',
  HALF_ROUNDED = 'halfRounded',
  FULL_FLOOR = 'fullFloor',
  FULL_ROUNDED = 'fullRounded',
};

export interface ShoeConditions {
  decksPerShoe: number;
  cardsBurned: number;
  shufflePoint: number;
  countBurnCard: boolean;
  countBottomCard: boolean;
}

export enum LocalStorageKeys {
  VARIATION = 'variation',
};

export enum LocalStorageVariationKeys {
  CLASSIC = 'classic',
  DOUBLE_UP = 'doubleUp',
};

export interface CheckboxConfig {
  label: string,
  whatsThis: string,
  key: string,
  value: boolean,
};

export interface HeaderLink {
  url: string,
  title: string,
  responsiveTitle?: string,
  isSelected?: boolean
};

export interface Faq {
  question: string,
  answer: string,
};

export interface FooterLink {
  text: string,
  url: string,
};

export enum SuccessStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  NULL = 'null',
};

export interface FeedbackPayload {
  previousScreen: string,
  index?: string,
  email?: string,
  time: string,
  message: string,
};

export interface FeatureDetails {
  imgSrc: string,
  imgAltText: string,
  headerText: string,
  taglineText: string,
  textContent: string[],
  videoUrl?: string,
  buttontext?: string,
};

export interface TableSpotsInformation {
  spotsPertable: number;
  playerSpotMap: any;
};

export enum SpotStatusEnum {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  TAKEN = 'taken',
}

export interface TableSpot {
  status: SpotStatusEnum;
  controlledBy: string;
  id: number;
};

export const playerFirst2: string [] = [
  'AA', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AT', 'A9', 'A8', 'A7', 'A6', 'A5', 'A4', 'A3', 'A2', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5'
];

export enum HandOptionEnums {
  HIT = 'hit',
  STAY = 'stay',
  SPLIT = 'split',
  SURRENDER = 'surrender',
  DOUBLE = 'double',
}