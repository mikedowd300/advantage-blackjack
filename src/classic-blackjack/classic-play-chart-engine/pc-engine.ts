import { PlayChartTable } from './pc-table';
import { Shoe } from '../classic-engine/shoe';
import { LocalStorageService } from '../../services/local-storage.service';
import { PlayChartDataStorageService } from './pc-data-storage.service';
import { ShoeConditions } from '../../models';
import { DoubleDownOn, HoleCardType, SurrenderTypes } from '../classic-models/classic-strategies.models';

export class PlayChartEngine {

  table: PlayChartTable;
  localStorageService: LocalStorageService = new LocalStorageService();
  pcDataService: PlayChartDataStorageService = new PlayChartDataStorageService(this.localStorageService);
  shoe: Shoe;
  shoeConditions: ShoeConditions;
  conditions;
  details: string;
  iterations: number;
  first2Cards: string;
  players: any[];
  splittableF2c: boolean;
  playStrategy: any;
  shared = {};
  
  constructor() {}

  startSimulation(iterations: number, details: string, first2Cards: string) {
    this.details = details;
    this.iterations = iterations;
    this.first2Cards = first2Cards;
    this.dissectDetails();
    this.shoe = new Shoe(this.shoeConditions, this.localStorageService);
    this.table = new PlayChartTable(
      this.pcDataService,
      this.localStorageService,
      this.conditions,
      first2Cards,
      this.splittableF2c,
      this.shoe,
      iterations,
      this.shared,
    );
  }

  dissectDetails() {
    // Bonuses Rules and Weird Rules are NOT YET implemented
    const fields: string[] = this.details.split('-');
    const f2cRay = this.first2Cards.split('');
    this.conditions = {
      deviationDataTitle: this.details,
      chartName: fields[1],
      x17: fields[2] + '17',
      rsa: fields[3] === 'true',
      mhfs: parseInt(fields[4]),
      das: fields[5] === 'true',
      decks: parseInt(fields[6]),
      doubleOn: fields[7] as DoubleDownOn,
      holeCardRules: fields[8] as HoleCardType,
      countingMethod: fields[9],
      maxMinCount: parseInt(fields[10]),
    }
    const decksPerShoe = parseInt(fields[6]);
    const cardsPerShoe = decksPerShoe * 52;
    this.shoeConditions = {
      decksPerShoe,
      cardsBurned: 0,
      shufflePoint: decksPerShoe > 3 ? cardsPerShoe - 48 : cardsPerShoe - 30,
      countBurnCard: false,
      countBottomCard: false,
    };
    this.splittableF2c = f2cRay.length === 2 && f2cRay[0] === f2cRay[1] && this.first2Cards !== '11';
  }
}