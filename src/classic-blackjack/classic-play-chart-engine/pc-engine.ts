import { PlayChartTable } from './pc-table';
import { Shoe } from '../classic-engine/shoe';
import { LocalStorageService } from '../../services/local-storage.service';
import { ShoeConditions } from '../../models';
import { DoubleDownOn, HoleCardType, SurrenderTypes } from '../classic-models/classic-strategies.models';

export class PlayChartEngine {

  table: PlayChartTable;
  localStorageService: LocalStorageService = new LocalStorageService();
  shoe: Shoe;
  shoeConditions: ShoeConditions;
  conditions;
  details: string;
  iterations: number;
  first2Cards: string;
  players: any[];
  splittableF2c: boolean;
  playStrategy: any;
  
  constructor() {}

  startSimulation(iterations: number, details: string, first2Cards: string) {
    this.details = details;
    this.iterations = iterations;
    this.first2Cards = first2Cards;
    this.dissectDetails();
    this.getPlayers();
    this.shoe = new Shoe(this.shoeConditions, this.localStorageService);
    this.table = new PlayChartTable(
      this.localStorageService,
      this.conditions,
      this.players,
      this.shoe,
      iterations,
      this.playStrategy,
    );
  }

  getPlayers() {
    this.players = ['hit', 'stay', 'double'];
    if(this.splittableF2c) {
      this.players.push('split');
    }
  }

  dissectDetails() {
    // Bonuses Rules and Weird Rules are NOT YET implemented
    const fields: string[] = this.details.split('-');
    const f2cRay = this.first2Cards.split('');
    this.conditions = {
      chartName: fields[1],
      x17: fields[2] + '17',
      rsa: fields[3] === 'true',
      mhfs: parseInt(fields[4]),
      das: fields[5] === 'true',
      decks: parseInt(fields[6]),
      doubleOn: fields[7] as DoubleDownOn,
      surrender: fields[8] as SurrenderTypes,
      holeCardRules: fields[9] as HoleCardType,
      countingMethod: fields[10],
    }
    this.shoeConditions = {
      decksPerShoe: parseInt(fields[6]),
      cardsBurned: 0,
      shufflePoint: (parseInt(fields[6]) * 52) - 30,
      countBurnCard: false,
      countBottomCard: false,
    };
    this.splittableF2c = f2cRay.length === 2 && f2cRay[0] === f2cRay[1] && this.first2Cards !== '11';
  }
}