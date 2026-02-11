import { 
  BetSpreadStrategy,
  CountingMethod, 
  InsurancePlan, 
  PlayerConfig,
  PlayerTableInfo, 
  PlayStrategy,
  RoundingMethodEnum,
  TippingPlan, 
  UnitResizeStrategy, 
  WongStrategy 
} from '../doubleup-models/doubleup-strategies.models';
import { 
  InsurancePackage,
  LocalStorageItemsEnum, 
  LocalStorageVariationKeys,
  SpotStatusEnum,
  TableSpot,
  TrueCountTypeEnum,
} from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';
import { doubleupPlayers } from "../default-doubleup-configs/player-config";
import { doubleupPlayCharts } from "../default-doubleup-configs/play-strategies";
import { doubleupBetSpreads } from '../default-doubleup-configs/bet-spread-strategies';
import { doubleupUnitResizingStrategies } from '../default-doubleup-configs/unit-resize-strategies';
import { doubleupWongs } from '../default-doubleup-configs/wonging-strategies';
import { doubleupTippingPlans } from '../default-doubleup-configs/tipping-plan';
import { doubleupCounts } from '../default-doubleup-configs/counting-methods';
import { doubleupInsurancePlans } from '../default-doubleup-configs/insurance-plan';
import { PlayerRecord } from './du-record-store/record-models';

export class DuPlayer {
  handle: string;
  resizeProgression: number[] = [];
  bettingUnit: number;
  bankroll: number;
  remainingBankroll: number; // keeps up with how much money all the bets for a round add up to so a player isn't able to split, double or tip with money that really isnt there.
  // This differs from the bankroll because the bankroll is updated as bets are paid, not made.
  originalBankroll: number;
  playingStrategy: PlayStrategy;
  betSpreadingStrategy: BetSpreadStrategy;
  unitResizingStrategy: UnitResizeStrategy;
  wongingStrategy: WongStrategy;
  tippingStrategy: TippingPlan;
  countingMethod: CountingMethod;
  insurancePlan: InsurancePlan;
  spotIds: number[] = [];
  wongSpotIds: number[] = [];
  currentRoundsTipSize: number = 0;
  tipAmountThisRound: number = 0;
  tippedAwayTotal: number = 0;
  totalBet: number = 0;
  totalWon: number = 0;
  totalInsuranceBet: number = 0;
  spotId: number;
  hadBlackjackLastHand: boolean = false;
  hadBlackjackThisHand: boolean = false;
  betSizeLastHand: number;
  betSize: number = null;
  trueCountType: TrueCountTypeEnum;
  hasUpdatedInsuranceHistory: boolean = false;
  record: PlayerRecord;
  insuranceInfo: InsurancePackage = {
    claimedNegativeEVInsurance: 0,
    claimedPositivetiveEVInsurance: 0,
    missedNegativeEVInsurance: 0,
    missedPositivetiveEVInsurance: 0,
    totalInsuranceBet: 0,
    insuranceAmountWonAV: 0,
  }

  constructor(
    playerInfo: PlayerTableInfo, 
    private localStorageService: LocalStorageService,
    public shared
  ){
    this.initializePlayer(playerInfo);
  }

  getInsuranceInfo(): InsurancePackage {
    return {
      claimedNegativeEVInsurance: Math.abs(Math.round(this.insuranceInfo.claimedNegativeEVInsurance * 100) / 100),
      claimedPositivetiveEVInsurance: Math.abs(Math.round(this.insuranceInfo.claimedPositivetiveEVInsurance * 100) / 100),
      missedNegativeEVInsurance: Math.abs(Math.round(this.insuranceInfo.missedNegativeEVInsurance * 100) / 100),
      missedPositivetiveEVInsurance: Math.abs(Math.round(this.insuranceInfo.missedPositivetiveEVInsurance * 100) / 100),
      totalInsuranceBet: this.insuranceInfo.totalInsuranceBet,
      insuranceAmountWonAV: this.insuranceInfo.insuranceAmountWonAV,
    }
  }

  getItemOfItems(title: string, lsKey: LocalStorageItemsEnum, hardCodedSource) {
    return hardCodedSource[title] 
      || this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.DOUBLE_UP, lsKey, title)
      || {}
  }

  initializePlayer({ seatNumber, playerConfigTitle }: PlayerTableInfo): void {
    const skeleton: PlayerConfig =
      this.getItemOfItems(playerConfigTitle, LocalStorageItemsEnum.PLAYER_CONFIG, doubleupPlayers);
    this.spotId = seatNumber;
    this.handle = skeleton.title;
    this.bettingUnit = skeleton.initialBettingUnit;
    this.betSizeLastHand = this.bettingUnit;
    this.bankroll = skeleton.initialBankroll;
    this.originalBankroll = skeleton.initialBankroll;
    this.playingStrategy =
      { ...this.getItemOfItems(skeleton.playStrategyTitle, LocalStorageItemsEnum.PLAY, doubleupPlayCharts)};
    this.betSpreadingStrategy =
      { ...this.getItemOfItems(skeleton.betSpreadStrategyTitle, LocalStorageItemsEnum.BET_SPREAD, doubleupBetSpreads)};
    this.unitResizingStrategy =
      { ...this.getItemOfItems(skeleton.unitResizingStrategyTitle, LocalStorageItemsEnum.UNIT_RESIZE, doubleupUnitResizingStrategies)};
    this.wongingStrategy =
      { ...this.getItemOfItems(skeleton.wongingStrategyTitle, LocalStorageItemsEnum.WONG, doubleupWongs)};
    this.tippingStrategy =
      { ...this.getItemOfItems(skeleton.tippingStrategyTitle, LocalStorageItemsEnum.TIPPING, doubleupTippingPlans)};
    this.countingMethod =
      { ...this.getItemOfItems(skeleton.countStrategyTitle, LocalStorageItemsEnum.COUNT, doubleupCounts )};
    this.insurancePlan =
      { ...this.getItemOfItems(skeleton.insurancePlanTitle, LocalStorageItemsEnum.INSURANCE, doubleupInsurancePlans)};
    this.trueCountType = this.getTrueCountType();
    this.resizeProgression = this.initializeResizeProgression();
    this.addSpot(seatNumber);
    this.shared.addCountingMethod(this.countingMethod, this.shared.getConditions().decksPerShoe);
  }

  recordInsuranceEV(percentageOfTens: number, insuranceAmount: number) {
    const atTCof = this.insurancePlan.atTCof;
    const tc = this.shared.getTrueCountByTenth(this.countingMethod);
    const ev = Math.round((((this.betSize * percentageOfTens * 3) / 200) - (this.betSize / 2)) * 100) / 100;
    this.insuranceInfo.totalInsuranceBet += insuranceAmount;
    if(tc >= atTCof && percentageOfTens < 33.3333) {
      this.insuranceInfo.claimedNegativeEVInsurance += ev;
    }
    if(tc < atTCof && percentageOfTens > 33.3333) {
      this.insuranceInfo.missedPositivetiveEVInsurance += ev;
    }
    if(tc >= atTCof && percentageOfTens >= 33.3333) {
      this.insuranceInfo.claimedPositivetiveEVInsurance += ev;
    }
    if(tc < atTCof && percentageOfTens <= 33.3333) {
      this.insuranceInfo.missedNegativeEVInsurance += ev;
    }
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

  initializeResizeProgression(): number[] {
    return this.unitResizingStrategy.unitProgression.map(p => this.resizeRound(p * this.bettingUnit))
  }

  resizeRound(size: number): number {
    let betAmount = this.roundToNearest5(size);
    ;
    return betAmount;
  }

  addSpot(id: number): void {
    this.spotIds.push(id);
    this.decreaseRemainingBankroll();
  }

  decreaseRemainingBankroll(amount: number = null): void {
    this.remainingBankroll = Math.max(0, this.remainingBankroll - (amount || this.betSize));
  }

  initializeRound(): void {
    this.hadBlackjackLastHand = this.hadBlackjackThisHand;
    this.hadBlackjackThisHand = false;
    this.hasUpdatedInsuranceHistory = false;
    this.remainingBankroll = this.bankroll;
    this.resizeUnit();
    this.setBetSize(); 
    this.wongIn();
    this.tip();
    this.record = {
      beginningTrueCount: this.getTrueCount(),
      beginningBankroll: this.bankroll,
      beginningRunningCount: this.getRunningCount(),
      trueCountType :this.getTrueCountType(),
      bettingUnit: this.bettingUnit,
      handle: this.handle,
      spotIds: this.spotIds,
      tippedAmount: 0,
      winnings: 0,
      totalBet: 0
    };
  }

  resizeUnit(): void {
    if(this.shared.isFreshShoe() && this.resizeProgression.length > 0) {
      const increaseAtProgression = [ ...this.unitResizingStrategy.increaseAtMultiple ];
      const decreaseAtProgression = [ ...this.unitResizingStrategy.decreaseAtMultiple ];
      const resizeProgression = [ ...this.resizeProgression ];
      const currentIndex = resizeProgression.indexOf(this.bettingUnit);
      if(this.bankroll > increaseAtProgression[currentIndex] && resizeProgression[currentIndex + 1]) {
        this.bettingUnit = resizeProgression[currentIndex + 1];
      } else if(decreaseAtProgression[currentIndex] && this.bankroll < decreaseAtProgression[currentIndex]) {
        this.bettingUnit = resizeProgression[currentIndex - 1];
      }
    }
  }

  setBetSize(): void {
    const indexes = Object.keys(this.betSpreadingStrategy.spreads).map(i => parseFloat(i));
    const minIndex: number = Math.min(...indexes);
    const maxIndex: number = Math.max(...indexes);
    const isOnlyPlayer = this.shared.getOccupiedActiveSpotCount() === 1;
    let key = parseFloat(this.getTrueCount());
    if(key < minIndex) {
      key = minIndex;
    }
    if(key > maxIndex) {
      key = maxIndex;
    }
    let betAmount = this.bettingUnit * this.betSpreadingStrategy.spreads[key];
    betAmount = Math.min(this.shared.getConditions().maxBet, betAmount);
    betAmount = Math.max(this.shared.getConditions().minBet, betAmount);
    this.betSize = betAmount;
    this.incTotalBet(this.betSize);
  }

  wongIn(): void {
    if(this.remainingBankroll > this.betSize && this.shared.getConditions().MSE) {
      const trueCount = this.getTrueCount();
      const wongedHands = this.wongingStrategy.wongedHands;
      for(let i = 0; i < wongedHands.length; i++) {
        const playerSpots = [ ...this.wongSpotIds, this.spotId ];
        const minSpotId = Math.min( ...playerSpots);
        const maxSpotId = Math.max( ...playerSpots);
        if(trueCount >= wongedHands[i].exitBelow) {
          if(wongedHands[i].isActive || trueCount >= wongedHands[i].enterAt) {
            let newSpotId = null;
            if(minSpotId > 1 && this.shared.isSpotAvailable(minSpotId - 1)) {
              newSpotId = minSpotId - 1;
            } else if(maxSpotId < this.shared.getConditions().spotsPerTable) {
              newSpotId = maxSpotId + 1;
            }
          if(newSpotId) {
            wongedHands[i].isActive = true;
            this.wongSpotIds.push(newSpotId);
            this.addSpot(newSpotId);
            const tableSpot: TableSpot = {
              status: SpotStatusEnum.TAKEN,
              controlledBy: this.handle,
              id: null,
            }
            this.shared.getSpotById(newSpotId).initializeSpot(tableSpot);
            this.incTotalBet(this.betSize);
            this.decreaseRemainingBankroll(this.betSize);
          }
          }
        } else {
          wongedHands[i].isActive = false;
        }
      }
    }
  }

  tip(): void {
    const { maxTip, afterBlackjack, dealerJoins, dealerLeaves, tipFirstHandOfShoe, everyXHands, tipWongHands, tippingBreakpoints } = this.tippingStrategy;
    if((this.hadBlackjackLastHand && afterBlackjack)
      || ((this.shared.getTotalRoundsDealt() % everyXHands) === 0 && everyXHands !== 0)
      || (this.shared.getTotalRoundsDealt() % this.shared.getConditions().handsPerDealer === 0 && dealerLeaves)
      || (this.shared.getTotalRoundsDealt() % this.shared.getConditions().handsPerDealer === 1 && dealerJoins)
      || (this.shared.isFreshShoe() && tipFirstHandOfShoe)
    ) {
      const tipBreakPoint = tippingBreakpoints.find(tp => {
        return this.betSize <= tp[1]
      });
      this.currentRoundsTipSize = Math.min(this.remainingBankroll, (tipBreakPoint && tipBreakPoint[0]) || maxTip);
      this.tipAmountThisRound += this.currentRoundsTipSize * 1; //(1 + wongedHandsToTip) ::: tipWongHands
      this.tippedAwayTotal += this.tipAmountThisRound;
      this.decreaseRemainingBankroll(this.tipAmountThisRound);
    }
  }

  getTrueCount() {
    return this.shared.getTrueCount(this.countingMethod, this.trueCountType);
  }

  incTotalBet(betSize: number): void {
    this.totalBet += betSize;
  }

  getTrueCountByTenth() {
    return this.shared.getTrueCountByTenth(this.countingMethod);
  }

  incTotalInsuranceBet(amount: number): void {
    this.totalInsuranceBet += amount;
    this.totalBet += amount;
    this.remainingBankroll -= amount;
  }

  increaseTipAmountThisRound(amount: number): void {
    this.tipAmountThisRound += amount;
    this.tippedAwayTotal += amount;
    this.remainingBankroll -= amount;
  }

  insureTip(fromWong: boolean): void {
    const { insureTip, tipWongHands } = this.tippingStrategy;
    if(this.currentRoundsTipSize > 0 && insureTip && (!fromWong || tipWongHands)) {
      const tipAmount = Math.min(this.remainingBankroll, this.currentRoundsTipSize / 2);
      this.increaseTipAmountThisRound(tipAmount);
    }
  }

  payBankroll(amount: number): void {
    this.bankroll = this.bankroll + amount;
    this.totalWon += amount;
  }

  payInsuranceBet(amount: number): void {
    this.bankroll = this.bankroll + amount;
    this.totalWon += amount;
    this.insuranceInfo.insuranceAmountWonAV += amount;
  }

  tipSplitHands(fromWong: boolean): void {
    const { tipSplitHandToo, tipWongHands } = this.tippingStrategy;
    if(tipSplitHandToo && (!fromWong || tipWongHands)) {
      const tipAmount = Math.min(this.remainingBankroll, this.currentRoundsTipSize);
      this.increaseTipAmountThisRound(tipAmount);
    }
  }

  doubleTip(fromWong: boolean, fromSplit: boolean): void {
    const { doubleDownTip, tipSplitHandToo, tipWongHands } = this.tippingStrategy;
    if(doubleDownTip && (!fromWong || tipWongHands) && (!fromSplit || tipSplitHandToo)) {
      const tipAmount = Math.min(this.remainingBankroll, this.currentRoundsTipSize);
      this.increaseTipAmountThisRound(tipAmount);
    }
  }

  getRunningCount(): number {
    return this.shared.getRunningCount(this.countingMethod.title);
  }

  finalizeRound(): void {
    this.payBankroll(-(this.tipAmountThisRound));
    this.wongOut();
  }

  getFinalRecord(): PlayerRecord {
    this.record.tippedAmount = this.tipAmountThisRound;
    this.record.winnings = this.bankroll - this.record.beginningBankroll;
    this.spotIds.forEach(id => this.shared.getSpotById(id).hands
      .forEach(h => this.record.totalBet += h.record.totalBetAmountThisHand))
    return this.record;
  }

  wongOut(): void {
    this.wongSpotIds.forEach(id => this.shared.getSpotById(id).removePlayer());
    this.spotIds = [this.spotId];
    this.wongSpotIds = [];
  }

  private roundToNearest5(value): number {
    const multOf5 = Math.floor(value / 5) * 5;
    const remainder = value % 5;
    return remainder >= 2.5 ? multOf5 + 5 : multOf5;
  }
}