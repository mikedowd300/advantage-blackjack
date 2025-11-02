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
    return this.cards.filter(card => card.cardValue === 1).length > 0;
  }

  getSoftValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card.cardValue);
    return value;
  }

  getValue(): number {
    let value = 0;
    this.cards.forEach(card => value += card.cardValue);
    if(this.hasAce()) {
      value = (value + 10) > 21 ? value : (value + 10);
    }
    return value;
  }

  is21(): boolean {
    return this.getValue() === 21;
  }
  
  isBust(): boolean {
    return this.getValue() > 21;
  }

  playHand(): void {
    const S17 = this.shared.getConditions().S17;
    // if(this.getValue() === 17) {
    //   console.log(this.shared.getConditions().S17);
    //   console.log(S17 ? this.getValue() < 17 : (this.getValue() === 17 && this.getValue() !== this.getSoftValue()) || this.getValue() < 17)
    //   console.log('DEALERS HAND:', this.cards.map(c => c.name).join(' '), ':', this.getValue());
    // }
    
    let drawCondition: boolean = S17 
      ? this.getValue() < 17
      : (this.getValue() === 17 && this.getValue() !== this.getSoftValue()) || this.getValue() < 17
    while(drawCondition ) {
      this.cards.push(this.shared.deal());
      drawCondition = S17 
        ? (this.getValue() === 17 && this.getValue() !== this.getSoftValue()) || this.getValue() < 17
        : this.getValue() < 17;
    }
    // console.log('DEALERS HAND:', this.cards.map(c => c.name).join(' '), ':', this.getValue());
  }

  getDealerHandRecord(): DealerRecord {
    return {      
      cards: this.cards.map(({ image, name }) => ({ image, name })),
      value: this.getValue(),
      hasBlackjack: this.hasBlackjack(),
      didBust: this.isBust()
    };
  }
}