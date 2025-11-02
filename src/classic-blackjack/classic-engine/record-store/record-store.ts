import { BehaviorSubject, filter, Subject } from 'rxjs';
import { TableRecord } from './record-models';
import { TableRecordService } from './table-record-service';

export class RecordStore {
  records: TableRecord[] = [];
  records$: BehaviorSubject<TableRecord[]> = new BehaviorSubject<TableRecord[]>([]);

  // For now the records are stored here right from the simulation;
  // This will be used later to store and retrieve records from indexDB. The interface should be similar enough that this will work for now.
  // Before using indexDB, the models should be trimmed down as much as possible
  // Lets see what we need for the following before implementing indexDB
  // (A) replay
  // (B) each of the charts
  // (C) what if
  // (D) insurance analysis
  // (E) a more granular look at the true count

  constructor(private recordStoreService: TableRecordService) {
    this.recordStoreService.nextRecord$.pipe(filter(r => !!r)).subscribe(r => {
      this.records.push(r);
      this.records$.next(this.records);
    });
  }   
}