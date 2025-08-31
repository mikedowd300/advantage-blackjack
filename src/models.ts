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
}

export enum LocalStorageKeys {
  VARIATION = 'variation',
}

export enum LocalStorageVariationKeys {
  CLASSIC = 'classic',
  DOUBLE_UP = 'doubleUp',
}

export interface HeaderLink {
  url: string,
  title: string,
  responsiveTitle?: string,
  isSelected?: boolean
}

export interface Faq {
  question: string,
  answer: string,
}

export interface FooterLink {
  text: string,
  url: string,
}

export enum SuccessStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  NULL = 'null',
}

export interface FeedbackPayload {
  previousScreen: string,
  index?: string,
  email?: string,
  time: string,
  message: string,
}

export interface FeatureDetails {
  imgSrc: string,
  imgAltText: string,
  headerText: string,
  taglineText: string,
  textContent: string[],
  videoUrl?: string,
  buttontext?: string,
}