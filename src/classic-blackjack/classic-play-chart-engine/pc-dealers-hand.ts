import { Card } from '../classic-engine/card';

export class PlayChartDealerHand {
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

  dealEnhcHoleCard(): void {
    this.cards.push(this.shared.deal());
  }
}