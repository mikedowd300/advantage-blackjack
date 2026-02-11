import { Injectable } from '@angular/core';
import { DuShoeConditions } from '../models';
import { BehaviorSubject } from 'rxjs';
import { TableRecord } from '../doubleup-blackjack/doubleup-engine/du-record-store/record-models';
import { 
  AbbreviatedDoubleupConditions,
  PlayerConfig,
  PlayerTableInfo,
  TableConfig
} from '../doubleup-blackjack/doubleup-models/doubleup-strategies.models';

@Injectable({
  providedIn: 'root'
})
export class DuGameEngineData {
  tableConfig: TableConfig;
  conditionsConfig: AbbreviatedDoubleupConditions;
  playerInfo: PlayerTableInfo[];
  shoeConditions: DuShoeConditions;
  iterations: number;
  records$: BehaviorSubject<TableRecord[]> = new BehaviorSubject<TableRecord[]>([]);
  replayHandAtIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  playerResults$: BehaviorSubject<any> = new BehaviorSubject<AnalyserNode>(null); // Type this
  invalidChartKey$: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Type this

  constructor() {}
  
  setTableConfig(config: TableConfig) {
    this.tableConfig = config;
  }

  setConditionsConfig(config: AbbreviatedDoubleupConditions) {
    this.conditionsConfig = config;
    this.shoeConditions = {
      decksPerShoe: config.decksPerShoe,
      cardsBurned: config.cardsBurned,
      shufflePoint: config.shufflePoint,
    };
  }

  setPlayerConfigs(configs: PlayerConfig[]) {
    this.playerInfo = configs.map(p => ({ seatNumber: p.seatNumber, playerConfigTitle: p.title }));
  }

  setIterations(iterations: number) {
    this.iterations = iterations;
  }
}