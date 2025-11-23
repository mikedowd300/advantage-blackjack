import { Card } from './card';
import { DealerRecord } from './record-store/record-models';

export class DealerHand {
  cards: Card[] = [];

  constructor(private shared) {}

  getHandCardCount(): number {
    return this.cards.length
  }

  clearCards(): void {
    this.shared.discard(this.cards);
    this.cards = [];
  }

  showsAce(): boolean {
    return this.cards[0].cardValue === 1;
  }

  hasBlackjack(): boolean {
    return this.cards.length === 2 && this.getValue() === 21;
  }

  hasAce(): boolean {
    return this.cards.filter(card => card?.cardValue === 1).length > 0;
  }

  getSoftValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card?.cardValue);
    return value;
  }

  getValue(): number {
    let value = this.getSoftValue();
    return this.hasAce() && (value + 10) <= 21 ? (value + 10) : value;
    // HEALTH CHECK
    // if(this.hasAce()) {
    //   value = (value + 10) > 21 ? value : (value + 10);
    // }
    // return value;
  }

  is21(): boolean {
    return this.getValue() === 21;
  }
  
  isBust(): boolean {
    return this.shared.getConditions().dealerPushesOn22
      ? this.getValue() > 22
      : this.getValue() > 21;
  }

  hasSoftness(): boolean {
    return this.getSoftValue() !== this.getValue();
  }

  pushesWith22(): boolean {
    return this.shared.getConditions().dealerPushesOn22 && this.getValue() === 22;
  }

  getDrawCondition(): boolean {
    // HEALTH CHECK
    // if(this.getSoftValue() === 7 && this.hasAce()) {
    //   console.log(this.cards.map(c => c.name));
    //   this.shared.getPlayedRounds();
    //   console.log(this.getValue(), this.getSoftValue(), this.shared.getConditions().S17, '--------------------------');
    // }
    return (
      this.shared.getConditions().S17 
      && this.hasSoftness()
      && this.getSoftValue() !== 7 
      && this.getValue() < 17 
    ) || (this.shared.getConditions().S17 && !this.hasSoftness() && this.getValue() < 17 )
    || (!this.shared.getConditions().S17 && (this.getValue() < 17 || this.getSoftValue() === 7));
  }

  playHand(): void {
    while(this.getDrawCondition()) {
      this.cards.push(this.shared.deal());
    }
  }

  getDealerHandRecord(): DealerRecord {
    // HEALTH CHECK
    // if(this.cards.includes(undefined)) {
    //   this.shared.logTable();
    // }
    return {      
      cards: this.cards.map(({ image, name, id }) => ({ image, name, id })),
      value: this.getValue(),
      hasBlackjack: this.hasBlackjack(),
      didBust: this.isBust()
    };
  }

  dealEnhcHoleCard(): void {
    this.cards.push(this.shared.deal());
  }
}