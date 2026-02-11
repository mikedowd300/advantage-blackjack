import { LocalStorageService } from '../../services/local-storage.service';
import { DuPlayChartDataStorageService } from './du-pc-data-storage.service';
import { DuPlayChartDealerHand } from './du-pc-dealers-hand';
import { DuPlayChartSpot } from './du-pc-spot';
import { DuShoe } from '../doubleup-engine/du-shoe';
import {
  CountingMethod,
  HoleCardType,
  RoundingMethodEnum
} from '../doubleup-models/doubleup-strategies.models';
import {
  doubleupCountTitles,
  doubleupCounts,
} from "../../doubleup-blackjack/default-doubleup-configs/counting-methods";
import { LocalStorageItemsEnum } from '../../models-constants-enums/enumerations';
import { LocalStorageVariationKeys, TrueCountTypeEnum } from '../../models';

export class DuPlayChartTable {
  dealerHand: DuPlayChartDealerHand;
  roundsDealt: number = 0;
  spots: DuPlayChartSpot[] = [];
  playStrategy: any;
  actionMap = {
    'hit': 'H',
    'stay': 'S',
    'double': 'D',
    'split': 'P',
    'doubleUp': 'U',
  };
  upCard: string;
  trueCountType: TrueCountTypeEnum;
  countingMethod: CountingMethod;
  tcAtTimeOfAction

  loggit: boolean = false; // TESTING ONLY - REMOVE THIS
  
  constructor(
    private pcDataService: DuPlayChartDataStorageService,
    private localStorageService: LocalStorageService, 
    public conditions: any,
    public first2Cards: string,
    public splittableF2c: boolean,
    public shoe: DuShoe,
    public iterations: number,
    public shared,
  ){
    this.addCountingMethod();
    this.shared = {
      discard: (x) => this.shoe.discard(x),
      deal: () => this.shoe.deal(),
      getTrueCountByTenth: () => this.shoe.getTrueCountByTenth(this.countingMethod),
      getDealerUpCard: () => this.getDealerUpCard(),
      getDealerHandValue: () => this.dealerHand.getValue(),
      getDidDealerBust: () => this.dealerHand.isBust(),
      updateTCatTimeOfAction: (x, y) => this.updateTCatTimeOfAction(x, y),
      getTrueCount: () => this.shoe.getTrueCount(this.countingMethod, this.getTrueCountType()),
    };
    this.initializeTable();
    this.play();
  }

  getSpots() {
    let handles: string[] = ['hit', 'stay', 'double', 'doubleUp'];
    if(this.splittableF2c) {
      handles.push('split');
    }
    handles.forEach(h => this.spots.push(new DuPlayChartSpot(h, this.updatePlayStrategy(h), this.shared, this.conditions)));
  }

  initializeTable(): void  {
    this.trueCountType = this.getTrueCountType();
    this.playStrategy = this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.DOUBLE_UP, LocalStorageItemsEnum.PLAY, this.conditions.chartName);
    this.dealerHand = new DuPlayChartDealerHand(this.shared, this.conditions);
    this.getSpots();
  }

  addCountingMethod() {
    if(doubleupCountTitles.includes(this.conditions.countingMethod)) {
      this.countingMethod = doubleupCounts[this.conditions.countingMethod]
    } else {
      this.countingMethod = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.COUNT, LocalStorageVariationKeys.DOUBLE_UP)[this.conditions.countingMethod];
    }
    this.shoe.addCountingMethod(this.countingMethod, this.conditions.decks)
  }

  updatePlayStrategy(action: string) {
    const upCardsValues: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
    const chartKeys: string[] = upCardsValues.map(v => `${v}-${this.first2Cards}`);
    const playStrategy = { ...this.playStrategy, combos: { ...this.playStrategy.combos } };
    chartKeys.forEach(key => playStrategy.combos[key] = { 
      options: `${this.actionMap[action]} S`, 
      conditions: ""
    });
    return playStrategy;
  }

  play(): void  {
    this.pcDataService.handleSimStart(this.conditions.chartName, this.conditions.deviationDataTitle, this.first2Cards);
    const isNHC = this.conditions.holeCardRules !== HoleCardType.STANDARD;
    while(this.roundsDealt < this.iterations) {
      this.initializeRound();
      this.deal(isNHC);
      if(!isNHC  ) {
        this.playHands();
        this.playDealersHand();
        this.payHands();
      } else {
        // this.playHands();
        // this.dealEnhcHoleCard();
        // this.playDealersHand(isNHC);
        // this.payHands();
      }
      this.finalizeRound();
    }
    this.shoe.shuffleCheck(true);
    this.pcDataService.handleSimEnd(this.conditions.deviationDataTitle);
  }

  initializeRound(): void  {
    this.spots.forEach(s => s.initializeRound());
    this.tcAtTimeOfAction = {
      'hit': null,
      'stay': null,
      'double': null,
      'split': null,
      'doubleUp': null,
    };
  }

  updateTCatTimeOfAction(key: string, value: number) {
    this.tcAtTimeOfAction[key] = value.toString();
  }

  getTCatTimeOfAction(key: string) {
    return this.tcAtTimeOfAction[key]
  }

  finalizeRound(): void  {
    this.spots.forEach(s => s.resetHands());
    this.dealerHand.clearCards();
    this.shoe.shuffleCheck();
    this.roundsDealt += 1;
  }

  deal(isNHC: boolean = false): void  {
    this.shoe.incHandCount();
    this.spots.forEach(({ hands }) => hands
      .forEach(({ cards }) => cards.push(this.shoe.deal())));
    this.dealerHand.cards.push(this.shoe.deal());
    this.spots.forEach(({ hands }) => hands
      .forEach(({ cards }) => cards.push(this.shoe.deal())));
    if(!isNHC) {
      this.dealerHand.cards.push(this.shoe.dealHoleCard());
    }
  }

  playHands(): void  {
    this.spots.forEach(s => {
      if(this.dealerHand.hasBlackjack() || this.first2Cards !== s.hands[0].createF2cKey()) {
        s.hands[0].clearCards();
        s.hands = [];
      }
      // if(s.hands[0] && s.playerHandle === 'split') {
      //   this.loggit = true;
      //   let cards = '';
      //   s.hands[0]?.cards.forEach(c => cards += `${c.name} `)
      //   console.log(cards, 'DEALER:', this.getDealerUpCard(), 'TC:', this.shared.getTrueCount());
      // }
      s.playHands();
    })
    // if(this.loggit) {
    //   console.log('-----------------');
    //   this.loggit = false;
    // }
  }

  payHands(): void  {
    // if(this.conditions.holeCardPolicy === HoleCardType.ENHC) {
    //   this.payPlayersBlackjacks();
    // }
    this.spots.forEach(s => s.hands.forEach(h => h.payHand()));
    this.spots.forEach(s => {
      // if(this.tcAtTimeOfAction[s.playerHandle]) {
      if(this.isValidCount(this.tcAtTimeOfAction[s.playerHandle])) {
        this.pcDataService.updateDeviationData(this.first2Cards, this.getDealerUpcardForDeviationChartData(), this.tcAtTimeOfAction[s.playerHandle], s.playerHandle, s.totalWon);
      }
    })
  }

  isValidCount(tc: number) {
    if(!tc) {
      // console.log('NO TC');
      return false;
    }
    return tc <= this.conditions.maxMinCount && tc >= (-(this.conditions.maxMinCount));
  }

  getDealerUpCard(){
    return this.dealerHand.cards[0].cardValue.toString();
  }

  getDealerUpcardForDeviationChartData() {
    return this.dealerHand.cards[0].cardSuitlessName
      .replace('T', '10')
      .replace('K', '10')
      .replace('Q', '10')
      .replace('J', '10');
  }

  playDealersHand(isNHC: boolean = false): void  {
    if(!isNHC) {
      this.shoe.flipHoleCard(this.dealerHand.cards[1]);
    }
    if(this.spots.find(s => s.hasActiveHand())) {
      this.dealerHand.playHand();
    } 
  }

  dealEnhcHoleCard(): void {
    // if(this.spotManager.getTakenUnpaidSpots().length > 0) {
    //   this.dealerHand.dealEnhcHoleCard();
    // }
  }

  getDealersCardLength() {
    // return this.dealerHand.cards.length;
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
}