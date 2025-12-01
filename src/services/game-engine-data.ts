import { Injectable } from '@angular/core';
import { AbbreviatedClassicConditions, PlayerConfig, PlayerTableInfo, TableConfig } from '../classic-blackjack/classic-models/classic-strategies.models';
import { ShoeConditions } from '../models';
import { BehaviorSubject } from 'rxjs';
import { TableRecord } from '../classic-blackjack/classic-engine/record-store/record-models';

@Injectable({
  providedIn: 'root'
})
export class GameEngineData {
  tableConfig: TableConfig;
  conditionsConfig: AbbreviatedClassicConditions;
  playerInfo: PlayerTableInfo[];
  shoeConditions: ShoeConditions;
  iterations: number;
  records$: BehaviorSubject<TableRecord[]> = new BehaviorSubject<TableRecord[]>([]);
  replayHandAtIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  playerResults$: BehaviorSubject<any> = new BehaviorSubject<AnalyserNode>(null); // Type this

  constructor() {}
  
  setTableConfig(config: TableConfig) {
    this.tableConfig = config;
  }

  setConditionsConfig(config: AbbreviatedClassicConditions) {
    this.conditionsConfig = config;
    this.shoeConditions = {
      decksPerShoe: config.decksPerShoe,
      cardsBurned: config.cardsBurned,
      shufflePoint: config.shufflePoint,
      countBurnCard: config.countBurnCard,
      countBottomCard: config.countBottomCard,
    };
  }

  setPlayerConfigs(configs: PlayerConfig[]) {
    this.playerInfo = configs.map(p => ({ seatNumber: p.seatNumber, playerConfigTitle: p.title }));
  }

  setIterations(iterations: number) {
    this.iterations = iterations;
  }
}