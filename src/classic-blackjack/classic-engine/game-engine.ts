import { Table } from './table';
import { Shoe } from './shoe';
import { LocalStorageService } from '../../services/local-storage.service';
import { GameEngineData } from '../../services/game-engine-data';
import { TableRecordService } from './record-store/table-record-service';
import { RecordStore } from './record-store/record-store';
import { BehaviorSubject } from 'rxjs';

export class GameEngine {

  table: Table;
  localStorageService: LocalStorageService = new LocalStorageService();
  recordStoreService: TableRecordService = new TableRecordService()
  shoe: Shoe;
  recordStore: RecordStore;
  simulationComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private gameData: GameEngineData) {
    this.recordStore = new RecordStore(this.recordStoreService);
  }

  startSimulation() {
    this.shoe = new Shoe(this.gameData.shoeConditions, this.localStorageService);
    this.table = new Table(
      this.recordStoreService,
      this.localStorageService,
      this.gameData.tableConfig,
      this.gameData.conditionsConfig,
      this.gameData.playerInfo,
      this.shoe,
      this.gameData.iterations
    );
    this.simulationComplete$.next(true);
  }
}