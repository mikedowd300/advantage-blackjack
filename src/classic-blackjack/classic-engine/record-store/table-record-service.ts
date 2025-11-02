import { BehaviorSubject } from "rxjs";
import { 
  DealerRecord, 
  HandRecord,
  PlayerRecord, 
  SpotRecord,
  TableRecord, 
} from "./record-models";

export class TableRecordService {
  record: TableRecord;
  nextRecord$: BehaviorSubject<TableRecord> = new BehaviorSubject<TableRecord>(null);

  constructor(){}

  initializeNewRecord(cardCount: number) {
    this.record = {
      unseenCardsAtBeginningOfShoe: cardCount,
      players: [],
      spots: [],
      dealer: null,
    };
  }

  setDealerRecord(record: DealerRecord): void {
    this.record.dealer = { ...record };
  }

  addSpotsRecord(spot: SpotRecord): void {
    this.record.spots.push(spot);
  }

  addHandRecordToSpotRecordById(id: number, hand: HandRecord): void {
    let spot = this.record.spots.find(s => s?.spotId === id);
    spot.hands.push(hand);
  }

  addPlayersRecord(player: PlayerRecord): void {
    this.record.players.push(player);
  }

  getNextRecord() {
    this.nextRecord$.next(this.record);
  }
}