import { Card } from './card';
import { AbbreviatedClassicConditions, DoubleDownOn, SurrenderTypes } from '../classic-models/classic-strategies.models';
import { HandActionEnum, HandOutcomeEnum } from './record-store/record-models';
import { PayRatio } from '../classic-models/classic-strategies.models';
import { playerFirst2, HandOptionEnums  } from '../../models';
import { Player } from './player';
import { HandRecord } from './record-store/record-models';

export class Hand {
  cards: Card[] = [];
  hasBeenPaid: boolean = false;
  hasDoubled: boolean = false;
  payRatioMap = {
    [PayRatio.THREE_to_ONE]: 3,
    [PayRatio.THREE_to_TWO]: 1.5,
    [PayRatio.SIX_to_FIVE]: 1.2,
    [PayRatio.TWO_to_ONE]: 2,
    [PayRatio.ONE_to_ONE]: 1,
  };
  options: string[] = [];
  earlySurrenderCheck: boolean = false;
  decisionMap;
  actionMap = {
    'S': 'stay',
    'P': 'split',
    'R': 'surrender',
    'H': 'hit',
    'D': 'double'
  };
  cardMap = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'T' };
  dealerCardMap = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' };
  playStrategy;
  conditions: AbbreviatedClassicConditions;
  player: Player;
  insuranceAmount: number = 0;
  record: HandRecord;

  constructor(
    private spotId: number,
    private shared, 
    public betAmount: number,
    private handId: number,
    private isFromSplit: boolean = false,
  ) {
    this.conditions = this.shared.getConditions();
    this.playStrategy = this.shared.getPlayerBySpotId(this.spotId).playingStrategy.combos;
    this.decisionMap = {
      'stay': () => this.stand(),
      'split': () => this.split(),
      'surrender': () => this.surrender(),
      'hit': () => this.hit(),
      'double': () => this.doubleDown(),
    };
    this.player = this.shared.getPlayerBySpotId(this.spotId);
    this.record = {
      actions: [],
      outcome: null, 
      winnings: 0,
      isFromSplit: this.isFromSplit,
      tipSize: 0,
      // isFromWong: false, Not sure what this means. Is it for tipping?
      betAmount: this.betAmount,
      cards: [],
      value: null,
    };
  }

  placeInsuranceBet(amount: number = (this.betAmount / 2)): void  {
    if(this.player.insurancePlan.alwaysInsure) {
      this.insuranceAmount = amount;
    } else if(this.player.insurancePlan.neverInsure) {
      this.insuranceAmount = 0;
      return;
    } else if(this.player.insurancePlan.atTCof) {
      const tc = this.player.getTrueCountByTenth();
      this.insuranceAmount = tc >= this.player.insurancePlan.atTCof ? amount : 0;
    }
    this.insuranceAmount = Math.min(this.player.remainingBankroll, this.insuranceAmount);
    if(this.insuranceAmount > 0) {
      this.record.actions.push(HandActionEnum.INSURE);
      this.player.incTotalInsuranceBet(this.insuranceAmount);
    }
    this.player.insureTip(this.isFromWong());
  }

  payInsurance(): void  {
    const amount: number = this.shared.dealerHasBlackjack() 
      ? this.insuranceAmount * 2 
      : (-(this.insuranceAmount));
    this.player.payBankroll(amount);
    this.record.winnings += amount;
    this.player.incTotalInsurancePaid(amount);
  }

  playHand(): void  {
    if(this.isFromSplit && this.cards.length === 1) {
      this.cards.push(this.shared.deal());
    }
    if(!this.isBust()) { 
      this.getOptions();
      this.makeDecision();
    } 
  }

  isFromWong(): boolean {
    return this.player.wongSpotIds.includes(this.spotId);
  }

  makeDecision(isForEarlySurrender: boolean = false): void  {
    const chartKey = this.createChartKey();
    
    let options: string[] = this.playStrategy[chartKey].options
      .split(' ')
      .map(op => this.actionMap[op.trim()]);
    let conditions: string[] = this.playStrategy[chartKey].conditions
      .split(' ')
      .filter(c => c != '')
      .map(c => c.trim());
    while(conditions.length < options.length) {
      conditions.push('?');
    }
    const tempOptions = [ ...options ];
    let actionConditions: any[] = options
      .map((op, i) => ({ [op]: (conditions[i] ? this.evaluateCondition(conditions[i]) : true) }))
      .filter((x, i) => this.options.includes(options[i]));

    let i = 0;
    let action: string = Object.keys(actionConditions[0])[0];
    while(!actionConditions[i][Object.keys(actionConditions[i])[0]]) {
      i++;
      action = Object.keys(actionConditions[i])[0];
    }
    // if(isForEarlySurrender && action === 'surrender') {
    //   // TODO: Remove this if statement after testing
    //   console.log(this.player.handle, 'EARLY SURRENDER');
    //   console.log(`Dealer has an ace`, this.shared.dealerShowsAce());
    //   this.cards.forEach(c => console.log(c.name))
    // }
    if(!isForEarlySurrender || action === 'surrender') {
      if(!action) {
        console.log(`There seems to be a problem with your playchart for the chart key: ${chartKey}.`);
        console.log('No play action was found.');
        console.log('There is a TODO to handle this in the UI');
        // TODO: Make a UI for a chartkey error
      }
      this.record.actions.push(action as HandActionEnum);
      this.decisionMap[action]();
    } 
  }

  evaluateCondition(condition: string): boolean {
    const valCard1 = this.cards[0].cardValue;
    const valCard2 = this.cards[1].cardValue;
    const countThreshold = parseInt(condition);
    const trueCountType = this.shared.getPlayerBySpotId(this.spotId).trueCountType;
    const countingMethod = this.shared.getPlayerBySpotId(this.spotId).countingMethod;
    const trueCount = this.shared.getTrueCount(countingMethod, trueCountType);
    if(parseInt(condition) < 0) {
      return(trueCount <= countThreshold)
    }
    if(parseInt(condition) > 0) {
      return(trueCount >= countThreshold)
    }
    return true
  }

  createChartKey(): string {
    if(this.cards.length === 2) {
      let first: number;
      let second: number;
      if(this.cards[0].cardValue === 1) {
        first = this.cards[0].cardValue;
        second = this.cards[1].cardValue
      } else if(this.cards[1].cardValue === 1) {
        first = this.cards[1].cardValue;
        second = this.cards[0].cardValue
      } else {
        first = this.cards[0].cardValue > this.cards[1].cardValue ? this.cards[0].cardValue : this.cards[1].cardValue;
        second = this.cards[0].cardValue < this.cards[1].cardValue ? this.cards[0].cardValue : this.cards[1].cardValue
      }
      const first2Cards = `${ this.cardMap[first] }${ this.cardMap[second] }`;
      return playerFirst2.includes(first2Cards)
        ? `${ this.dealerCardMap[this.shared.getDealerUpCard()] }-${ first2Cards }`
        : `${ this.dealerCardMap[this.shared.getDealerUpCard()] }-${ this.cards[0].cardValue + this.cards[1].cardValue }`;
    } 
    return this.getValue() === this.getSoftValue()
      ? `${ this.dealerCardMap[this.shared.getDealerUpCard()] }-${ this.getValue() }`
      : `${ this.dealerCardMap[this.shared.getDealerUpCard()] }-A${ this.getSoftValue() - 1 }`;
  }

  stand(): void  {}

  hit(): void  {
    this.cards.push(this.shared.deal());
    if(this.isBust()) {
      this.record.outcome = HandOutcomeEnum.BUSTED;
      this.payBust();
    } else if(!this.is21()) {
      this.playHand();
    }
  }

  doubleDown() {
    this.hasDoubled = true;
    const doubleAmount = this.player.remainingBankroll >= this.player.betSize 
      ? this.player.betSize 
      : this.player.remainingBankroll;
    this.betAmount += doubleAmount;
    this.player.decreaseRemainingBankroll(doubleAmount);
    this.cards.push(this.shared.deal());
    if(this.isBust()) {
      this.record.outcome = HandOutcomeEnum.BUSTED;
      this.payBust();
    }
  }

  split(): void {
    this.player.incTotalBet(this.player.betSize);
    this.shared.addHand(true, this.betAmount);
    this.shared.seedSplitHand(this.cards.pop());
    this.cards.push(this.shared.deal());
    this.isFromSplit = true;
    this.record.isFromSplit = true;
    this.player.decreaseRemainingBankroll();
    // this.player.tipSplitHands(this.isFromWong());
    this.playHand();
  }

  surrender(): void {
    this.record.outcome = HandOutcomeEnum.SURRENDERED;
    this.paySurrender();
    this.stand();
  }

  surrenderEarly(): void {
    this.earlySurrenderCheck = true;
    this.getOptions();
    this.makeDecision(true);
  }

  clearCards(): void {
    this.shared.discard(this.cards);
  }

  hasBlackjack(): boolean {
    return this.cards.length === 2 && this.getValue() === 21 && !this.isFromSplit;
  }

  hasAce(): boolean {
    return this.cards.filter(card => card.cardValue === 1).length > 0;
  }

  getValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card.cardValue);
    if(this.hasAce()) {
      value = (value + 10) > 21 ? value : (value + 10);
    }
    return value;
  }

  getSoftValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card.cardValue);
    return value;
  }

  is21(): boolean {
    return this.getValue() === 21;
  }
  
  isBust(): boolean {
    return this.getValue() > 21;
  }
  
  isBlackJack(): boolean {
    return this.cards.length === 2 && this.is21() && !this.isFromSplit;
  }

  isFromSplitAces(): boolean {
    return this.isFromSplit && this.cards[0].cardValue === 1
  }

  paySurrender(): void {
    this.player.payBankroll(this.betAmount / (-2))
    this.record.winnings -= (this.betAmount / (2));
    this.hasBeenPaid = true;
  }

  payDealersBlackjack(): void {
    if(!this.hasBeenPaid && !this.hasBlackjack()) {
      this.record.outcome = this.insuranceAmount > 0 
        ? HandOutcomeEnum.SAVED_BY_INSURANCE
        : HandOutcomeEnum.LOST_TO_BLACKJACK;
      this.player.payBankroll(-(this.betAmount))
      this.record.winnings -= this.betAmount;
      this.hasBeenPaid = true;
    } else if(!this.hasBeenPaid && this.hasBlackjack()) {
      this.record.outcome = HandOutcomeEnum.PUSHED;
      this.hasBeenPaid = true;
    }
  }

  payBlackjack(): void {
    if(!this.hasBeenPaid && this.hasBlackjack() && !this.shared.dealerHasBlackjack()) {
      const amount = this.betAmount * this.payRatioMap[this.conditions.blackjackPayRatio];
      this.record.outcome = HandOutcomeEnum.BLACKJACK;
      this.player.hadBlackjackThisHand = true;
      this.player.payBankroll(amount);
      this.record.winnings += amount;
      this.hasBeenPaid = true;
    }
  }

  payBust(): void {
    this.player.payBankroll((-1) * this.betAmount);
    this.record.winnings -= this.betAmount;
    this.record.outcome = HandOutcomeEnum.BUSTED;
    this.hasBeenPaid = true;
  }

  getOptions(): void {
    this.options = [HandOptionEnums.STAY];
    if(this.isSurrenderable()) {
      this.options.push(HandOptionEnums.SURRENDER);
    }
    if(this.isHittable()) {
      this.options.push(HandOptionEnums.HIT);
    }
    if(this.isDoubleable()) {
      this.options.push(HandOptionEnums.DOUBLE);
    }
    if(this.isSplittable()) {
      this.options.push(HandOptionEnums.SPLIT);
    }
  }

  isHittable(): boolean {
    if(!this.isBust()) {
      if(this.isFromSplitAces()) { 
        return this.conditions.DSA;
      }
      return this.getValue() < 21;
    } 
    return false
  }

  isSurrenderable(): boolean {
    if(this.earlySurrenderCheck) {
      this.earlySurrenderCheck = false;
      return !this.isBlackJack();
    } else {    
      if(this.conditions.surrender !== SurrenderTypes.LATE 
        || this.cards.length !== 2
        || this.isBust() 
        || this.isBlackJack()) {
      return false
      }
      return true;
    }
  }

  isInRange(min: number, max: number): boolean {
    return this.getValue() >= min && this.getValue() <= max;
  }

  isDoubleable() {
    if(this.cards.length !== 2
      || this.isBlackJack()
      || (this.isFromSplitAces() && !this.conditions.DSA)
      || (this.isFromSplit && !this.conditions.DAS)
      || this.player.remainingBankroll === 0
      || (this.player.remainingBankroll < this.player.betSize && !this.conditions.DFL)) {
        // TODO: should it be < 2 * this.player.betSize
      return false;
    }
    if(this.conditions.canDoubleOn === DoubleDownOn.ANY_TWO_CARDS) {
      return true;
    }
    if(this.conditions.canDoubleOn === DoubleDownOn.TEN_and_ELEVEN) {
      return this.isInRange(10, 11);
    }
    if(this.conditions.canDoubleOn === DoubleDownOn.NINE_thru_ELEVEN) {
      return this.isInRange(9, 11);
    }
    if(this.conditions.canDoubleOn === DoubleDownOn.EIGHT_thru_ELEVEN) {
      return this.isInRange(8, 11);
    }
    return true;
  }

  isSplittable(): boolean {
    // TODO: verify the handId is accurate and accounts for splits
    if(this.handId < this.conditions.MHFS 
      && this.player.remainingBankroll >= this.betAmount
      // TODO: check remainingBankroll size to cover previous splits and doubles on previous splits
      && this.cards[0].cardValue === this.cards[1].cardValue) {
      return this.isFromSplitAces() ? this.shared.getConditions().RSA : true;
    }
    return false;
  }

  payHand(): void {
    if(!this.hasBeenPaid) {
      const dealerHandValue = this.shared.getDealerHandValue();
      const dealerBusted = this.shared.getDidDealerBust();
      if(dealerBusted) {
        this.record.outcome = HandOutcomeEnum.WON_BY_DEALER_BUST;
        this.record.winnings += this.betAmount;
        this.player.payBankroll(this.betAmount);
      } else if(this.getValue() > dealerHandValue) {
        this.record.outcome = HandOutcomeEnum.WON_WITH_BETTER_HAND;
        this.record.winnings += this.betAmount;
        this.player.payBankroll(this.betAmount);
      } else if(this.getValue() < dealerHandValue) {
        this.record.outcome = HandOutcomeEnum.LOST_TO_BETTER_HAND;
        this.record.winnings -= this.betAmount;
        this.player.payBankroll(-(this.betAmount));
      } else if(this.getValue() === dealerHandValue) {
        this.record.outcome = HandOutcomeEnum.PUSHED
      }
      this.hasBeenPaid = true;
    }
  }

  getHandRecord(): HandRecord {
    this.record.cards = this.cards.map(c => ({ image: c.image, name: c.name }));
    this.record.value = this.getValue();
    return this.record
  }
}