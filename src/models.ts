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

export interface HeaderLink {
  url: string,
  title: string,
}