import { Card } from './card';
import { AbbreviatedClassicConditions, CharlieType, DoubleDownOn, SurrenderTypes } from '../classic-models/classic-strategies.models';
import { HandActionEnum, HandOutcomeEnum } from './record-store/record-models';
import { PayRatio } from '../classic-models/classic-strategies.models';
import { playerFirst2, HandOptionEnums  } from '../../models';
import { Player } from './player';
import { HandRecord } from './record-store/record-models';

export class Hand {
  cards: Card[] = [];
  hasBeenPaid: boolean = false;
  hasDoubled: boolean = false;
  hasTripled: boolean = false;
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
  beginningBetAmount: number;
  record: HandRecord;
  payOutPayRatioMap = {
    [PayRatio.HALF]: .5,
    [PayRatio.ONE_to_ONE]: 1,
    [PayRatio.SIX_to_FIVE]: 1.2,
    [PayRatio.SEVEN_to_FIVE]: 1.4,
    [PayRatio.THREE_to_TWO]: 1.5,
    [PayRatio.TWO_to_ONE]: 2,
    [PayRatio.THREE_to_ONE]: 3,
    [PayRatio.FIVE_to_ONE]: 5,
    [PayRatio.TEN_to_ONE]: 10,
    [PayRatio.HUNDRED_to_ONE]: 100,
    [PayRatio.THOUSAND_to_ONE]: 1000,
    [PayRatio.N_A]: 0,
  };
  charlieTypeMap = {
    [CharlieType.FIVE]: 5,
    [CharlieType.SIX]: 6,
    [CharlieType.SEVEN]: 7,
  };

  constructor(
    private spotId: number,
    private shared, 
    public betAmount: number,
    private handId: number,
    private isFromSplit: boolean = false,
  ) {
    this.beginningBetAmount = this.betAmount; // This is for ENHC OBO payouts
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

    // console.log(actionConditions);
    // console.log(options);
    // console.log(conditions);
    // console.log(chartKey);

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
      this.payBust();
    } else if(this.checkForBonus(true)) {
      this.payBonus();
    } else if(!this.is21()) {
      this.playHand();
    }
  }

  doubleDown() {
    if(this.cards.length > 2 && this.hasDoubled) {
      this.hasTripled = true;
    }
    // if(this.cards.length > 2) {
    //   if(this.cards.length > 3) {
    //     console.log('...');
    //   }
    //   this.shared.getPlayedRounds();
    // }
    this.hasDoubled = true;
    const doubleAmount = this.player.remainingBankroll >= this.player.betSize 
      ? this.player.betSize 
      : this.player.remainingBankroll;
    this.betAmount += doubleAmount;
    this.player.decreaseRemainingBankroll(doubleAmount);
    this.cards.push(this.shared.deal());
    if(this.isBust()) {
      this.payBust();
    } else if(this.isDoubleable() || this.isSurrenderable()) {
      this.playHand();
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
    // if(this.cards.length >= 3) {
    //   const values = this.cards.map(c => c.name);
    //   console.log('SURRENDERED WITH:', values);
      // this.shared.getPlayedRounds();
    // }
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
    return this.cards.filter(card => card?.cardValue === 1).length > 0;
  }

  getValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card?.cardValue);
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

  payDealersBlackjack(isENHC: boolean = false): void {
    if(!this.hasBeenPaid && !this.hasBlackjack()) {
      this.record.outcome = this.insuranceAmount > 0 
        ? HandOutcomeEnum.SAVED_BY_INSURANCE
        : HandOutcomeEnum.LOST_TO_BLACKJACK;
      const betAmount: number = isENHC ? -(this.betAmount) : -(this.beginningBetAmount)
      this.player.payBankroll(betAmount)
      this.record.winnings += betAmount; // Will always be negative
      this.hasBeenPaid = true;
    } else if(!this.hasBeenPaid && this.hasBlackjack()) {
      const suites = this.cards.map(c => c.suit);
      if(suites[0] !== suites[1]) {
        this.record.outcome = HandOutcomeEnum.PUSHED;
        this.hasBeenPaid = true;
      }
    }
  }

  payBlackjack(): void {
    this.handleBonusBlackJack();
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

  handleBonusBlackJack(): void {
    const { 
      bonusForSuitedBlackjackOfSpadesPayout, 
      bonusForSuitedBlackjackPayout, 
      isBonusForSuitedBlackjackGuaranteed, 
      isBonusForSuitedBlackjackOfSpadesGuaranteed,
    } = this.conditions;
    const suites = this.cards.map(c => c.suit);
    if(this.hasBlackjack() && suites[0] === suites[1]) {
      if(suites[0] === 'S' && bonusForSuitedBlackjackOfSpadesPayout !== PayRatio.N_A) {
        if(isBonusForSuitedBlackjackOfSpadesGuaranteed || !this.shared.dealerHasBlackjack()) {
          const amount = this.betAmount * this.payOutPayRatioMap[bonusForSuitedBlackjackOfSpadesPayout];
          this.payBonusBlackJack(amount)
        } else {
          this.record.outcome = HandOutcomeEnum.PUSHED;
          this.hasBeenPaid = true;
        }
      } else if(bonusForSuitedBlackjackPayout !== PayRatio.N_A) {
        if(isBonusForSuitedBlackjackGuaranteed || !this.shared.dealerHasBlackjack()) {
          const amount = this.betAmount * this.payOutPayRatioMap[bonusForSuitedBlackjackPayout];
          this.payBonusBlackJack(amount)
        } else {
          this.record.outcome = HandOutcomeEnum.PUSHED;
          this.hasBeenPaid = true;
        }
      }  
    }
  }
  
  payBonusBlackJack(amount: number): void {
    this.player.hadBlackjackThisHand = true;
    this.player.payBankroll(amount);
    this.record.winnings += amount;
    this.record.outcome = HandOutcomeEnum.BLACKJACK_BONUS;
    this.hasBeenPaid = true;

    // this.shared.getPlayedRounds();
    // console.log(this.cards.map(c => c.name));
  }
  
  checkForBonus(beforeDealerPlays: boolean = false): boolean {
  // beforeDealerPlays means this checkForBonus happens before the dealer plays his hand
    const { charlieType, charlieAfterSplit, charliePayout } = this.conditions;
    if(charliePayout !== PayRatio.N_A && this.cards.length >= 5) {
      if( charlieType === CharlieType.FIVE && this.cards.length === 5) {
        console.log('CHARLIE');
        return charlieAfterSplit ? this.isFromSplit : true
      }
      if( charlieType === CharlieType.SIX && this.cards.length === 6) {
        console.log('CHARLIE');
        return charlieAfterSplit ? this.isFromSplit : true
      }
      if( charlieType === CharlieType.SEVEN && this.cards.length === 7) {
        console.log('CHARLIE');
        return charlieAfterSplit ? this.isFromSplit : true
      }
    }
    if(this.cards.length === 3 && this.getValue() === 21) {
      const values = this.cards.map(c => c.cardValue).sort();
      if(this.handIs3SuitedCards()) {
      const { bonusFor678SuitedPayout, bonusFor777SuitedPayout, isBonusFor678SuitedGuaranteed, isBonusFor777SuitedGuaranteed } = this.conditions;
        if(values[0] === 6 && values[2] === 8 && bonusFor678SuitedPayout !== PayRatio.N_A ) {
          return !beforeDealerPlays || isBonusFor678SuitedGuaranteed;
        } else if(values[0] === 7 && bonusFor777SuitedPayout !== PayRatio.N_A) {
          return !beforeDealerPlays || isBonusFor777SuitedGuaranteed;
        };
      } else {
        const { bonusFor678Payout, bonusFor777Payout, isBonusFor678Guaranteed, isBonusFor777Guaranteed } = this.conditions;
        if(values[0] === 6 && values[2] === 8 && bonusFor678Payout !== PayRatio.N_A ) {
          return !beforeDealerPlays || isBonusFor678Guaranteed;
        } else if(values[0] === 7 && bonusFor777Payout !== PayRatio.N_A ) {
          return !beforeDealerPlays || isBonusFor777Guaranteed;
        };
      };
    }
    return false;
  }
  
  payBonus(): void {
    // Paying the bonus does not have to check if the bonus needs to be paid.
    // That happenned already in checkForBonus()
    let amount = this.betAmount
    const { charlieType, charliePayout, bonusFor678Payout, bonusFor678SuitedPayout, bonusFor777Payout, bonusFor777SuitedPayout } = this.conditions;
    const values = this.cards.map(c => c.cardValue).sort();
    if(charlieType === CharlieType.FIVE && this.cards.length === 5) {
      amount = amount * this.payOutPayRatioMap[charliePayout];
    } else if(charlieType === CharlieType.SIX && this.cards.length === 6) {
      amount = amount * this.payOutPayRatioMap[charliePayout];
    } else if(charlieType === CharlieType.SEVEN && this.cards.length === 7) {
      amount = amount * this.payOutPayRatioMap[charliePayout];
    } else if(this.handIs3SuitedCards() && this.getValue() === 21) {
      if(values[0] === 6 && values[2] === 8) {
        amount = amount * this.payOutPayRatioMap[bonusFor678SuitedPayout];
      } else if(values[0] === 7) {
        amount = amount * this.payOutPayRatioMap[bonusFor777SuitedPayout];
      };
    } else if(this.cards.length === 3 && this.getValue() === 21) {
      if(values[0] === 6 && values[2] === 8) {
        amount = amount * this.payOutPayRatioMap[bonusFor678Payout];
      } else if(values[0] === 7) {
        amount = amount * this.payOutPayRatioMap[bonusFor777Payout];
      };
    };
    this.player.payBankroll(amount);
    this.record.winnings += amount;
    this.record.outcome = HandOutcomeEnum.WON_WITH_BONUS;
    this.hasBeenPaid = true;
  }

  isHittable(): boolean {
    if(!this.isBust()) {
      if(this.isFromSplitAces()) {
        return this.conditions.DRSA;
      }
      const { charliePayout, charlieType } = this.conditions
      if(charliePayout !== PayRatio.N_A && charlieType !== CharlieType.NONE && this.getValue() < 21) {
        return this.cards.length < this.charlieTypeMap[charlieType];
      }
      return this.getValue() < 21 && !this.hasDoubled;
    }
    return false;
  }

  isSurrenderable(): boolean {
    if(this.earlySurrenderCheck && this.cards.length === 2) {
      this.earlySurrenderCheck = false;
      return !this.isBlackJack();
    }
    if(this.conditions.allowSurrenderAtAnyTime 
      && !this.is21() 
      && !this.isBust()) {
      return !this.hasDoubled;
    }
    if(this.conditions.allowSurrenderAferDouble 
      && this.hasDoubled 
      && !this.hasTripled 
      && !this.is21() 
      && !this.isBust()) {
      return true;
    }  
    if(this.conditions.surrender !== SurrenderTypes.LATE 
      || this.cards.length !== 2
      || this.isBust() 
      || this.isBlackJack()) {
      return false
    }
    return true;
  }

  isInRange(min: number, max: number): boolean {
    return this.getValue() >= min && this.getValue() <= max;
  }

  isDoubleable() {
    const { allowTripleDownOn3Cards, 
      allowTripleDownOnAnyAmountOfCards, 
      allowDoubleDownOnAnyNumberOfCards,
      allowDoubleDownOn3CardsWith9Thru11,
      allowDoubleDownOnAny3Cards, 
      canDoubleOn } = this.conditions;
    if(allowDoubleDownOnAnyNumberOfCards && this.cards.length > 2 && !this.is21() && !this.hasDoubled) {
      return true;
    }
    if(allowDoubleDownOnAny3Cards && this.cards.length === 3 && !this.is21() && !this.hasDoubled) {
      return true;
    }
    if(allowDoubleDownOn3CardsWith9Thru11 && this.cards.length === 3 && this.isInRange(9, 11) && !this.hasDoubled) {
      return true;
    }
    if(allowTripleDownOnAnyAmountOfCards && this.cards.length > 3 && !this.is21() && this.hasDoubled && !this.hasTripled) {
      return true;
    }
    if(this.cards.length === 3 && allowTripleDownOn3Cards && !this.is21() && this.hasDoubled) {
      return true;
    }
    if(this.cards.length !== 2
      || this.isBlackJack()
      || (this.isFromSplitAces() && !this.conditions.DSA)
      || (this.isFromSplit && !this.conditions.DAS)
      || this.player.remainingBankroll === 0
      || (this.player.remainingBankroll < this.player.betSize && !this.conditions.DFL)) {
      return false;
    }
    if(canDoubleOn === DoubleDownOn.ANY_TWO_CARDS) {
      return true;
    }
    if(canDoubleOn === DoubleDownOn.TEN_and_ELEVEN) {
      return this.isInRange(10, 11);
    }
    if(canDoubleOn === DoubleDownOn.NINE_thru_ELEVEN) {
      return this.isInRange(9, 11);
    }
    if(canDoubleOn === DoubleDownOn.EIGHT_thru_ELEVEN) {
      return this.isInRange(8, 11);
    }
    return true;
  }

  isSplittable(): boolean {
    // TODO: verify the handId is accurate and accounts for splits
    if(this.shared.getHandsLength() < this.conditions.MHFS 
      && this.player.remainingBankroll >= this.betAmount
      && this.cards[0]?.cardValue === this.cards[1]?.cardValue) {
      // if((this.isFromSplitAces() ? this.shared.getConditions().RSA : true) && (this.handId > 2)) {
      //   console.log(this.handId, this.conditions.MHFS );
      // }
      return this.isFromSplitAces() ? this.shared.getConditions().RSA : true;
    }
    return false;
  }

  handIs3SuitedCards(): boolean {
    if(this.cards.length !== 3) {
      return false;
    }
    const suites = this.cards.map(c => c.suit)
    if(suites.length === 2) {
      return suites[0] === suites[1]
    }
    return suites[0] === suites[1] && suites[0] === suites[2]
  }

  payHand(): void {
    if(!this.hasBeenPaid) {
      const dealerHandValue = this.shared.getDealerHandValue();
      const dealerBusted = this.shared.getDidDealerBust();
      if(this.shared.dealerPushesWith22()) {
        this.shared.getPlayedRounds();
        this.record.outcome = HandOutcomeEnum.PUSHED
      } else if(dealerBusted) {
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
    this.record.cards = this.cards.map(c => ({ image: c.image, name: c.name, id: c.id }));
    this.record.value = this.getValue();
    return this.record
  }
}