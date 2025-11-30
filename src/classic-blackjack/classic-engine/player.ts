import { 
  BetSpreadStrategy,
  ChipTypeEnum,
  CountingMethod, 
  InsurancePlan, 
  PlayerConfig,
  PlayerTableInfo, 
  PlayStrategy,
  RoundingMethodEnum,
  TippingPlan, 
  UnitResizeStrategy, 
  WongStrategy 
} from '../classic-models/classic-strategies.models';
import { 
  LocalStorageItemsEnum, 
  LocalStorageVariationKeys,
  SpotStatusEnum,
  TableSpot,
  TrueCountTypeEnum, 
} from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';
import { classicPlayers } from "../default-classic-configs/player-config";
import { classicPlayCharts } from "../default-classic-configs/play-strategies";
import { classicBetSpreads } from '../default-classic-configs/bet-spread-strategies';
import { classicUnitResizingStrategies } from '../default-classic-configs/unit-resize-strategies';
import { classicWongs } from '../default-classic-configs/wonging-strategies';
import { classicTippingPlans } from '../default-classic-configs/tipping-plan';
import { classicCounts } from '../default-classic-configs/counting-methods';
import { classicInsurancePlans } from '../default-classic-configs/insurance-plan';
import { PlayerRecord } from './record-store/record-models';
// import { InsuranceHistory } from '../insurance-history/insurnce-history';

export class Player {
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
  totalInsurancePaid: number = 0;
  spotId: number;
  hadBlackjackLastHand: boolean = false;
  hadBlackjackThisHand: boolean = false;
  betSizeLastHand: number;
  betSize: number = null;
  trueCountType: TrueCountTypeEnum;
  // beginningTrueCount: number;
  // insuranceHistory: InsuranceHistory = new InsuranceHistory();
  hasUpdatedInsuranceHistory: boolean = false;
  record: PlayerRecord;

  constructor(
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
    this.spotId = seatNumber;
    this.handle = skeleton.title;
    this.bettingUnit = skeleton.initialBettingUnit;
    this.betSizeLastHand = this.bettingUnit;
    this.bankroll = skeleton.initialBankroll;
    this.originalBankroll = skeleton.initialBankroll;
    this.playingStrategy =
      { ...this.getItemOfItems(skeleton.playStrategyTitle, LocalStorageItemsEnum.PLAY, classicPlayCharts)};
    this.betSpreadingStrategy =
      { ...this.getItemOfItems(skeleton.betSpreadStrategyTitle, LocalStorageItemsEnum.BET_SPREAD, classicBetSpreads)};
    this.unitResizingStrategy =
      { ...this.getItemOfItems(skeleton.unitResizingStrategyTitle, LocalStorageItemsEnum.UNIT_RESIZE, classicUnitResizingStrategies)};
    this.wongingStrategy =
      { ...this.getItemOfItems(skeleton.wongingStrategyTitle, LocalStorageItemsEnum.WONG, classicWongs)};
    this.tippingStrategy =
      { ...this.getItemOfItems(skeleton.tippingStrategyTitle, LocalStorageItemsEnum.TIPPING, classicTippingPlans)};
    this.countingMethod =
      { ...this.getItemOfItems(skeleton.countStrategyTitle, LocalStorageItemsEnum.COUNT, classicCounts )};
    this.insurancePlan =
      { ...this.getItemOfItems(skeleton.insurancePlanTitle, LocalStorageItemsEnum.INSURANCE, classicInsurancePlans)};
    this.trueCountType = this.getTrueCountType();
    this.resizeProgression = this.initializeResizeProgression();
    this.addSpot(seatNumber);
    this.shared.addCountingMethod(this.countingMethod, this.shared.getConditions().decksPerShoe);
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
    const roundingMethod = this.unitResizingStrategy.roundingMethod;
    const roundToNearest = this.unitResizingStrategy.roundToNearest;
    const ROUND_UP = RoundingMethodEnum.CEILING;
    const ROUND_DOWN = RoundingMethodEnum.FLOOR;
    const WHITE_CHIP = ChipTypeEnum.WHITE;
    const RED_CHIP = ChipTypeEnum.RED;
    let betAmount = size;
    if(roundingMethod === ROUND_UP && roundToNearest === WHITE_CHIP && size % 1 === .5) {
      betAmount += .5;
    }
    if(roundingMethod === ROUND_DOWN && roundToNearest === WHITE_CHIP && size % 1 === .5) {
      betAmount -= .5;
    }
    if(roundingMethod === ROUND_UP && roundToNearest === RED_CHIP && size % 5 === 2.5) {
      betAmount += 2.5;
    }
    if(roundingMethod === ROUND_DOWN && roundToNearest === RED_CHIP && size % 5 === 2.5) {
      betAmount -= 2.5;
    }
    if(roundingMethod === ROUND_UP && roundToNearest === RED_CHIP && size % 5 === .5) {
      betAmount = Math.ceil(size / 5) * 5;
    }
    if(roundingMethod === ROUND_DOWN && roundToNearest === RED_CHIP && size % 5 === .5) {
      betAmount = Math.floor(size / 5) * 5;
    }
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
        // console.log('RESIZE UP, FROM', resizeProgression[currentIndex], 'TO:', this.bettingUnit, 'BANKROLL:', this.bankroll);
      } else if(decreaseAtProgression[currentIndex] && this.bankroll < decreaseAtProgression[currentIndex]) {
        this.bettingUnit = resizeProgression[currentIndex - 1];
        // console.log('RESIZE DOWN, FROM', resizeProgression[currentIndex], 'TO:', this.bettingUnit, 'BANKROLL:', this.bankroll, decreaseAtProgression[currentIndex]);
      }
    }
  }

  setBetSize(): void {
    // const roundBetToNearest = this.betSpreadingStrategy.roundBetToNearest;
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
    // if(roundBetToNearest === ChipTypeEnum.WHITE && betAmount % 1 !== 0) {
    //   betAmount = Math.round(betAmount);
    // } else if(roundBetToNearest === ChipTypeEnum.RED && betAmount % 5 !== 0) {
    //   let amountToRound = 5 - (betAmount % 5)
    //   betAmount += (amountToRound < 2.5 ? amountToRound : (-1)*(betAmount % 5));
    // } else if(betAmount % 1 !== 0) {
    //   betAmount += Math.round(betAmount);
    // }
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
      // TODO: after wonging, splits, double and tips are implemented: 
      //  - test the value for this.remainingBankroll 
      //  - test this.bankroll is updated correctly at the end of the round 
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

  incTotalInsurancePaid(amount: number): void {
    this.totalInsurancePaid += amount;
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
    // console.log(this.handle, this.record.beginningTrueCount);
    return this.record;
  }

  // updateInsuranceHistory() {
  //   if(!this.hasUpdatedInsuranceHistory) {
  //     const hasIt = this.shared.dealerHasBlackjack();
  //     let trueCount = this.getTrueCountByTenth().toString();
  //     if(!trueCount.includes('.')) {
  //       trueCount += '.0';
  //     }
  //     this.insuranceHistory.updateInsuranceRecordByCount(trueCount, hasIt);
  //     this.hasUpdatedInsuranceHistory = true;
  //   }
  // }

  // abandonSpotById(spotId: number): void {
  //   this.spotIds = this.spotIds.filter(id => id !== spotId);
  // }

  wongOut(): void {
    this.wongSpotIds.forEach(id => this.shared.getSpotById(id).removePlayer());
    this.spotIds = [this.spotId];
    this.wongSpotIds = [];
  }
}