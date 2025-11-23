import { AbbreviatedClassicConditions, CountingMethod, HoleCardType, PlayerTableInfo, SurrenderTypes, TableConfig } from '../classic-models/classic-strategies.models';
import { LocalStorageService } from '../../services/local-storage.service';
import { Shoe } from './shoe';
import { SpotManager } from './spot-manager';
import { SpotStatusEnum, TableSpotsInformation, TrueCountTypeEnum } from '../../models';
import { Player } from './player';
import { DealerHand } from './dealer-hand';
import { TableRecordService } from './record-store/table-record-service';

export class Table {
  totalRoundsDealt: number = 0;
  spotCount: number;
  spotManager: SpotManager;
  dealerHand: DealerHand;
  playedRounds: number = 0;
  players: Player[] = [];
  shared
  
  constructor(
    private recordService: TableRecordService,
    private localStorageService: LocalStorageService, 
    public config: TableConfig,
    public conditions: AbbreviatedClassicConditions,
    public playersInfo: PlayerTableInfo[],
    public shoe: Shoe,
    public iterations: number,
  ){
    this.shared = {
      addCountingMethod: (x: CountingMethod, y: number) => this.shoe.addCountingMethod(x, y),
      getPlayerBySpotId: (x) => this.getPlayerBySpotId(x),
      // getPlayerByHandle: (x: string) => this.getPlayerByHandle(x),
      discard: (x) => this.shoe.discard(x),
      deal: () => this.shoe.deal(),
      getTrueCount: (x: CountingMethod, y: TrueCountTypeEnum) => this.shoe.getTrueCount(x, y),
      getTrueCountByTenth: (x: CountingMethod) => this.shoe.getTrueCountByTenth(x),
      getRunningCount: (x: string) => this.shoe.getRunningCountsByMethodName(x),
      dealerHasBlackjack: () => this.dealerHasBlackjack(),
      getDealerUpCard: () => this.getDealerUpCard(),
      getDidDealerBust: () => this.getDidDealerBust(),
      getDealersCardLength: () => this.getDealersCardLength(),
      getDealerHandValue: () => this.getDealerHandValue(),
      getOccupiedActiveSpotCount: () => this.getOccupiedActiveSpotCount(),
      getSpotById: (x) => this.spotManager.getSpotById(x),
      isFreshShoe: () => this.shoe.getIsFreshShoe(),
      isSpotAvailable: (x) => this.spotManager.isSpotAvailable(x),
      dealerShowsAce: () => this.dealerHand.showsAce(),
      getTotalRoundsDealt: () => this.totalRoundsDealt,
      dealerPushesWith22: () => this.dealerHand.pushesWith22(),
      logTable: () => this.logSelf(),
      getPlayedRounds: () => this.getPlayedRounds(),
    };
    this.initializeTable();
    this.play();
  }

  initializeTable(): void  {
    this.spotCount = this.conditions.spotsPerTable;
    const spotInfo: TableSpotsInformation = { 
      spotsPertable: this.conditions.spotsPerTable,
      playerSpotMap: this.getPlayerSpotMap(this.playersInfo),
    };
    this.shared.getConditions = () => this.conditions;
    this.spotManager = new SpotManager(spotInfo, this.shared);
    this.playersInfo.forEach(p => this.players.push(new Player(p, this.localStorageService, this.shared)));
    this.dealerHand = new DealerHand(this.shared);
  }

  getPlayerSpotMap(players: PlayerTableInfo[]): { [k: string]: number } {
    let playerSpotMap: { [k: string]: number } = {};
    players.forEach(p => playerSpotMap[p.playerConfigTitle] = p.seatNumber);
    return playerSpotMap;
  }

  play(): void  {
    let hasSpots: boolean = this.spotManager.spots
      .filter(s => s.status === SpotStatusEnum.TAKEN).length > 0;
    const isNHC = this.conditions.holeCardPolicy !== HoleCardType.STANDARD;
    console.log(this.conditions);
    while(this.playedRounds < this.iterations && hasSpots) {
      this.initializeRound();
      this.initializeRecord();
      this.deal(isNHC);
      this.offerEarlySurrender();
      this.offerInsurance();
      if(!isNHC  ) {
        this.payInsurance();
        this.handleDealerBlackjack();
        this.payPlayersBlackjacks();
        this.playHands();
        this.playDealersHand();
        this.payHands();
      } else {
        this.playHands();
        this.dealEnhcHoleCard();
        this.payInsurance();
        this.handleDealerBlackjack();
        this.payPlayersBlackjacks();
        this.playDealersHand(isNHC);
        this.payHands();
      }
      this.finalizeRecord();
      this.finalizeRound();
      hasSpots = this.spotManager.spots.filter(s => s.status === SpotStatusEnum.TAKEN).length > 0;
    }
    this.players.forEach(p => 
      console.log(`${p.handle}, bankroll:${p.bankroll}, total-bet:${p.totalBet} roi: ${Math.round(((p.bankroll - p.originalBankroll) * 10000) / p.totalBet) / 100}%`));
    console.log(this);
  }

  initializeRound(): void  {
    this.players.forEach(p => p.initializeRound());
  }

  finalizeRound(): void  {
    this.spotManager.getTakenSpots().forEach(spot => spot.resetHands());
    this.dealerHand.clearCards();
    this.shoe.shuffleCheck();
    this.playedRounds += 1;
    this.removeBrokePlayers();
    this.players.forEach(p => p.finalizeRound());
  }

  getOccupiedActiveSpotCount(): number {
    return this.spotManager.spots.filter(s => s.status === SpotStatusEnum.TAKEN).length;
  }

  deal(isNHC: boolean = false): void  {
    this.shoe.incHandCount();
    this.spotManager.getTakenSpots().forEach(spot => spot.addHand());
    this.spotManager.getTakenSpots()
      .forEach(({ hands }) => hands
      .forEach(({ cards }) => cards.push(this.shoe.deal())));
    this.dealerHand.cards.push(this.shoe.deal());
    this.spotManager.getTakenSpots()
      .forEach(({ hands }) => hands
      .forEach(({ cards }) => cards.push(this.shoe.deal())));
    if(!isNHC) {
      this.dealerHand.cards.push(this.shoe.dealHoleCard());
    }
    this.totalRoundsDealt++;
  }

  getPlayerBySpotId(spotId: number): Player {
    return this.players.find(({ spotIds }) => spotIds.includes(spotId))
  }

  getPlayerByHandle(handle: string): Player {
    return this.players.find(p => p.handle === handle)
  }

  removePlayerFromSpotsByHandle(handle): void  {
    const spotIds = this.getPlayerByHandle(handle).spotIds
    spotIds.forEach(id => this.spotManager.getSpotById(id).removePlayer());
  }

  removeBrokePlayers(): void  {
    let brokePlayerHandles: string[] = []
    this.players
      .filter(p => p.bankroll < this.conditions.minBet)
      .forEach(p => {
        brokePlayerHandles.push(p.handle);
        this.removePlayerFromSpotsByHandle(p.handle)
      });
    this.players = this.players.filter(p => !brokePlayerHandles.includes(p.handle));
  }

  offerEarlySurrender() {
    if(this.conditions.surrender == SurrenderTypes.EARLY 
      || (this.conditions.surrender == SurrenderTypes.EARLY_NOT_AGAINST_A && !this.dealerHand.showsAce())) {
        this.spotManager.offerEarlySurrender();
    }
  }

  offerInsurance(): void  {
    if(this.dealerHand.showsAce()) {
      this.spotManager.offerInsurance();
    }
  }

  payInsurance(): void  {
    if(this.dealerHand.showsAce()) {
      this.spotManager.payInsurance();
    }
  }

  dealerHasBlackjack(): boolean {
    return this.dealerHand.hasBlackjack();
  }

  handleDealerBlackjack(): void  {
    if(this.dealerHand.hasBlackjack()) { 
      this.spotManager.payDealersBlackjack(this.conditions.holeCardPolicy === HoleCardType.ENHC);
    }
  }

  payPlayersBlackjacks(): void {
    this.spotManager.payBlackjacks();
  };

  playHands(): void  {
    if(!this.dealerHand.hasBlackjack()) {
      this.spotManager.playHands()
    }
  }

  payHands(): void  {
    if(this.conditions.holeCardPolicy === HoleCardType.ENHC) {
      this.payPlayersBlackjacks();
    }
    if(!this.dealerHand.hasBlackjack() && this.spotManager.getTakenUnpaidSpots().length > 0) {
      this.spotManager.payHands();
    }
  }

  getDealerUpCard(): string {
    return this.dealerHand.cards[0].cardValue.toString();
  }

  getUnseenCards(): number {
    return this.shoe.cards.length + this.conditions.cardsBurned;
  }

  initializeRecord(): void {
    this.recordService.initializeNewRecord(this.getUnseenCards());
    this.spotManager.spots.forEach(s => {
      if(s.status === SpotStatusEnum.TAKEN) {
        s.setRecord({
          status: SpotStatusEnum.TAKEN,
          spotId: s.id,
          playerHandle: s.controlledBy,
          hands: [],
          insuredAmount: null,
          countWhenInsured: null,
        })
      } else {
         s.setRecord(null);
      };
    })
  }

  finalizeRecord(): void  {
    this.recordService.record.dealer = this.dealerHand.getDealerHandRecord();
    this.spotManager.spots.forEach(s => this.recordService.record.spots.push(s.getFinalRecord()))
    this.players.forEach(p => this.recordService.record.players.push(p.getFinalRecord()));
    this.recordService.getNextRecord();
  }

  playDealersHand(isNHC: boolean = false): void  {
    if(!isNHC) {
      this.shoe.flipHoleCard(this.dealerHand.cards[1]);
    }
    if(!this.dealerHand.hasBlackjack() && this.spotManager.getTakenUnpaidSpots().length > 0) {
      this.dealerHand.playHand();
    } 
  }

  dealEnhcHoleCard(): void {
    if(this.spotManager.getTakenUnpaidSpots().length > 0) {
      this.dealerHand.dealEnhcHoleCard();
    }
  }

  getDealerHandValue(): number {
    return this.dealerHand.getValue();
  }

  getDidDealerBust(): boolean  {
    return this.dealerHand.isBust();
  }

  getDealersCardLength(): number {
    return this.dealerHand.cards.length;
  }

  logSelf(): void {
    console.log(this);
  }

  getPlayedRounds(): void {
    console.log(this.playedRounds, this.dealerHasBlackjack());
  }
}