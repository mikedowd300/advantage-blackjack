import { DuTable } from './du-table';
import { DuShoe } from './du-shoe';
import { LocalStorageService } from '../../services/local-storage.service';
import { DuGameEngineData } from '../../services/du-game-engine-data';
import { TableRecordService } from './du-record-store/table-record-service';
import { RecordStore } from './du-record-store/record-store';
import { BehaviorSubject } from 'rxjs';

export class DuGameEngine {

  table: DuTable;
  localStorageService: LocalStorageService = new LocalStorageService();
  recordStoreService: TableRecordService = new TableRecordService()
  shoe: DuShoe;
  recordStore: RecordStore;
  simulationComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private gameData: DuGameEngineData) {
    this.recordStore = new RecordStore(this.recordStoreService);
  }

  startSimulation() {
    this.shoe = new DuShoe(this.gameData.shoeConditions, this.localStorageService);
    this.table = new DuTable(
      this.recordStoreService,
      this.localStorageService,
      this.gameData.tableConfig,
      this.gameData.conditionsConfig,
      this.gameData.playerInfo,
      this.shoe,
      this.gameData.iterations
    );
    this.simulationComplete$.next(true);
    this.gameData.playerResults$.next(this.table.getPlayerResults());
    if(this.table.invalidChartKey?.split('-')[0]) {
      this.gameData.invalidChartKey$.next({ 
        playersCards: this.table.invalidChartKey?.split('-')[1],
        dealersUpcard: this.table.invalidChartKey?.split('-')[0],
        roundsPlayed: this.table.playedRounds - 1 
      }); // Type this
    }
  }
}