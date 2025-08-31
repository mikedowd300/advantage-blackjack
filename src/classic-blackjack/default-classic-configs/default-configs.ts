import { LocalStorageItemsEnum } from '../../models';
import { classicBetSpreads } from './bet-spread-strategies';
import { classicConditions } from './conditions';
import { classicCounts } from './counting-methods';
import { classicInsurancePlans } from './insurance-plan';
import { classicPlayCharts } from './play-strategies';
import { classicPlayers } from './player-config';
import { classicTables } from './table-config';
import { classicTippingPlans } from './tipping-plan';
import { classicUnitResizingStrategies } from './unit-resize-strategies';
import { classicWongs } from './wonging-strategies';

export const strategyConfigStorageEnumMap: any = {
  [LocalStorageItemsEnum.BET_SPREAD]: classicBetSpreads,
  [LocalStorageItemsEnum.CONDITIONS]: classicConditions,
  [LocalStorageItemsEnum.COUNT]: classicCounts,
  [LocalStorageItemsEnum.PLAY]: classicPlayCharts,
  [LocalStorageItemsEnum.PLAYER_CONFIG]: classicPlayers,
  [LocalStorageItemsEnum.TABLE_CONFIG]: classicTables,
  [LocalStorageItemsEnum.TIPPING]: classicTippingPlans,
  [LocalStorageItemsEnum.UNIT_RESIZE]: classicUnitResizingStrategies,
  [LocalStorageItemsEnum.WONG]: classicWongs,
  [LocalStorageItemsEnum.INSURANCE]: classicInsurancePlans,
}