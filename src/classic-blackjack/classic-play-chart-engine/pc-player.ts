import {  
  PlayerConfig,
  PlayerTableInfo, 
  PlayStrategy,
  RoundingMethodEnum,
} from '../classic-models/classic-strategies.models';
import { 
  LocalStorageItemsEnum, 
  LocalStorageVariationKeys,
  TrueCountTypeEnum, 
} from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';
import { classicPlayers } from "../default-classic-configs/player-config";
import { classicPlayCharts } from "../default-classic-configs/play-strategies";

export class Player {
  handle: string;
  bettingUnit: number;
  playingStrategy: PlayStrategy;
  totalBet: number = 0;
  totalWon: number = 0;
  betSize: number = 100;
  trueCountType: TrueCountTypeEnum;
  countingMethod: any;

  constructor(
    public conditions: any,
    playerInfo: PlayerTableInfo, 
    private localStorageService: LocalStorageService,
    public shared
  ){
    this.initializePlayer(playerInfo);
  }

  getItemOfItems(title: string, lsKey: LocalStorageItemsEnum, hardCodedSource) {
    return hardCodedSource[title] 
      || this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.CLASSIC, lsKey, title)
      || {}
  }

  initializePlayer({ seatNumber, playerConfigTitle }: PlayerTableInfo): void {
    const skeleton: PlayerConfig =
      this.getItemOfItems(playerConfigTitle, LocalStorageItemsEnum.PLAYER_CONFIG, classicPlayers);
    this.handle = skeleton.title;
    this.bettingUnit = skeleton.initialBettingUnit;
    this.playingStrategy =
      { ...this.getItemOfItems(skeleton.playStrategyTitle, LocalStorageItemsEnum.PLAY, classicPlayCharts)};
    this.trueCountType = this.getTrueCountType();
    // this.shared.addCountingMethod(this.countingMethod, this.conditions.decksPerShoe);
  }

  getTrueCountType(): TrueCountTypeEnum {
    if(this.countingMethod.useHalfCount) {
      if(this.countingMethod.roundingMethod === RoundingMethodEnum.ROUND) {
        return TrueCountTypeEnum.HALF_ROUNDED;
      } else {
        return TrueCountTypeEnum.HALF_FLOOR;
      }
    } else {
      return this.countingMethod.roundingMethod === RoundingMethodEnum.ROUND
        ? TrueCountTypeEnum.FULL_ROUNDED
        : TrueCountTypeEnum.FULL_FLOOR;
    }
  }

  initializeRound(): void {
    this.setBetSize(); 
  }

  setBetSize(): void {
    this.betSize = 100;
    this.incTotalBet(this.betSize);
  }

  getTrueCount() {
    return this.shared.getTrueCount(this.countingMethod, this.trueCountType);
  }

  incTotalBet(betSize: number): void {
    this.totalBet += betSize;
  }

  payBankroll(amount: number): void {
    this.totalWon += amount;
  }

  getRunningCount(): number {
    return this.shared.getRunningCount(this.countingMethod.title);
  }
}