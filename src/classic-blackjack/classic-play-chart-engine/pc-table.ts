import { LocalStorageService } from '../../services/local-storage.service';
import { PlayChartDealerHand } from './pc-dealers-hand';
import { PlayChartHand } from './pc-hand';
import { Shoe } from '../classic-engine/shoe';
import { HoleCardType } from '../classic-models/classic-strategies.models';

export class PlayChartTable {
  dealerHand: PlayChartDealerHand;
  roundsDealt: number = 0;
  // players: any[] = [];
  spots: { player: any, hands: any[] }[] = [];
  shared
  
  constructor(
    private localStorageService: LocalStorageService, 
    public conditions: any,
    public players: any,
    public shoe: Shoe,
    public iterations: number,
    public playStrategy: any
  ){
    this.shared = {
      // addCountingMethod: (x: CountingMethod, y: number) => this.shoe.addCountingMethod(x, y),
      // getPlayerBySpotId: (x) => this.getPlayerBySpotId(x),
      // // getPlayerByHandle: (x: string) => this.getPlayerByHandle(x),
      // discard: (x) => this.shoe.discard(x),
      // deal: () => this.shoe.deal(),
      // getTrueCount: (x: CountingMethod, y: TrueCountTypeEnum) => this.shoe.getTrueCount(x, y),
      // getTrueCountByTenth: (x: CountingMethod) => this.shoe.getTrueCountByTenth(x),
      // getRunningCount: (x: string) => this.shoe.getRunningCountsByMethodName(x),
      // dealerHasBlackjack: () => this.dealerHasBlackjack(),
      // getDealerUpCard: () => this.getDealerUpCard(),
      // getDidDealerBust: () => this.getDidDealerBust(),
      // getDealersCardLength: () => this.getDealersCardLength(),
      // getDealerHandValue: () => this.getDealerHandValue(),
      // getOccupiedActiveSpotCount: () => this.getOccupiedActiveSpotCount(),
      // getSpotById: (x) => this.spotManager.getSpotById(x),
      // isFreshShoe: () => this.shoe.getIsFreshShoe(),
      // isSpotAvailable: (x) => this.spotManager.isSpotAvailable(x),
      // dealerShowsAce: () => this.dealerHand.showsAce(),
      // getTotalRoundsDealt: () => this.totalRoundsDealt,
      // dealerPushesWith22: () => this.dealerHand.pushesWith22(),
      // logTable: () => this.logSelf(),
      // getPlayedRounds: () => this.getPlayedRounds(),
    };
    this.initializeTable();
    this.play();
  }

    // HAND
    // private spotId: number,
    // private shared, 
    // public betAmount: number,
    // private handId: number,
    // private isFromSplit: boolean = false,
    // (this.id, this.shared, betSize, this.hands.length, isFromSplit)

  initializeTable(): void  {
    // this.playersInfo.forEach(p => this.players.push(new Player(p, this.localStorageService, this.shared)));
    this.dealerHand = new PlayChartDealerHand(this.shared);
    this.shoe.addCountingMethod(this.conditions.countingMethod, this.conditions.decks)
    this.players.forEach(p => {
      this.updatePlayStrategy(p);
      this.spots.push({ player: p, hands: [new PlayChartHand(0, this.shared , 100, 1, false, this.playStrategy, this.conditions)] })
    })
  }

  updatePlayStrategy(player) {
    // in the play chart make the move stay, hit, split or double depending on the player
  }

  play(): void  {
    const isNHC = this.conditions.holeCardRules !== HoleCardType.STANDARD;
    while(this.roundsDealt < this.iterations) {
      this.initializeRound();
      this.deal(isNHC);
    //   this.offerEarlySurrender();
    //   this.offerInsurance();
    //   if(!isNHC  ) {
    //     this.payInsurance();
    //     this.handleDealerBlackjack();
    //     this.payPlayersBlackjacks();
    //     this.playHands();
    //     this.playDealersHand();
    //     this.payHands();
    //   } else {
    //     this.playHands();
    //     this.dealEnhcHoleCard();
    //     this.payInsurance();
    //     this.handleDealerBlackjack();
    //     this.payPlayersBlackjacks();
    //     this.playDealersHand(isNHC);
    //     this.payHands();
    //   }
    //   this.finalizeRecord();
    //   this.finalizeRound();
      this.roundsDealt += 1;
  }

    // this.getPlayerResults();
    // this.players.forEach(p => 
    //   console.log(`${p.handle}, bankroll:${p.bankroll}, total-bet:${p.totalBet} roi: ${Math.round(((p.bankroll - p.originalBankroll) * 10000) / p.totalBet) / 100}%`));
    // console.log(this);
  }

  initializeRound(): void  {
    // this.players.forEach(p => p.initializeRound());
  }
  
  getPlayerResults() {
    // let results = {};
    // this.players.forEach(p => results[p.handle] = {
    //   startingBankroll: p.originalBankroll,
    //   finalBankroll: p.bankroll,
    //   totalMoneyBet: p.totalBet,
    //   totalWon: p.bankroll - p.originalBankroll,
    //   roi: Math.round(((p.bankroll - p.originalBankroll) * 10000) / p.totalBet) / 100,
    //   tippedAway: p.tippedAwayTotal
    // });
    // return results;
  };

  finalizeRound(): void  {
    // this.spotManager.getTakenSpots().forEach(spot => spot.resetHands());
    // this.dealerHand.clearCards();
    // this.shoe.shuffleCheck();
    // this.playedRounds += 1;
    // this.removeBrokePlayers();
    // this.players.forEach(p => p.finalizeRound());
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
    // if(!this.dealerHand.hasBlackjack()) {
    //   this.spotManager.playHands()
    // }
  }

  payHands(): void  {
    // if(this.conditions.holeCardPolicy === HoleCardType.ENHC) {
    //   this.payPlayersBlackjacks();
    // }
    // if(!this.dealerHand.hasBlackjack() && this.spotManager.getTakenUnpaidSpots().length > 0) {
    //   this.spotManager.payHands();
    // }
  }

  getDealerUpCard(){
    // return this.dealerHand.cards[0].cardValue.toString();
  }

  getUnseenCards() {
    // return this.shoe.cards.length + this.conditions.cardsBurned;
  }

  playDealersHand(isNHC: boolean = false): void  {
    // if(!isNHC) {
    //   this.shoe.flipHoleCard(this.dealerHand.cards[1]);
    // }
    // if(!this.dealerHand.hasBlackjack() && this.spotManager.getTakenUnpaidSpots().length > 0) {
    //   this.dealerHand.playHand();
    // } 
  }

  dealEnhcHoleCard(): void {
    // if(this.spotManager.getTakenUnpaidSpots().length > 0) {
    //   this.dealerHand.dealEnhcHoleCard();
    // }
  }

  getDealerHandValue() {
    // return this.dealerHand.getValue();
  }

  getDidDealerBust()  {
    // return this.dealerHand.isBust();
  }

  getDealersCardLength() {
    // return this.dealerHand.cards.length;
  }
}