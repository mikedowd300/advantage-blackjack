import { PlayChartHand } from './pc-hand';
import { Card } from '../classic-engine/card';

export class PlayChartSpot {
  hands: PlayChartHand[] = [];
  totalWon: number = 0;

  constructor(public playerHandle: string, public playStrategy, public shared, public conditions) {
    this.shared = { 
      ...shared,
      getPlayStrategyOptions: (x: string) => this.getPlayStrategyOptions(x),
      getPlayStrategyConditions: (x: string) => this.getPlayStrategyConditions(x),
      addHand: (x) => this.addHand(x), 
      seedSplitHand: (x) => this.seedSplitHand(x),
      getHandsLength: () => this.getHandsLength(),
      payPlayer: (x: number) => this.payPlayer(x),
      getHandle: () => this.playerHandle,
    };
  }

  getPlayStrategyOptions(key: string) :string {
    return this.playStrategy.combos[key].options
  }

  getPlayStrategyConditions(key: string) :string {
    return this.playStrategy.combos[key].conditions
  }

  getHandsLength(): number {
    return this.hands.length;
  }

  addHand(isFromSplit: boolean = false): void {
    this.hands.push(new PlayChartHand(this.shared, 100, isFromSplit, this.conditions));
  }

  seedSplitHand(card: Card): void {
    const index = this.hands.length - 1;
    this.hands[index].cards.push(card);
  }

  initializeRound() {
    this.totalWon = 0;
    this.hands.push(new PlayChartHand(this.shared, 100, false, this.conditions));
  }

  payPlayer(amount: number) {
    this.totalWon += amount;
  }

  playHands() {
    this.hands[0]?.playHand();

    // if(this.hands[0] && this.playerHandle === 'split') {
    //   console.log('0:', this.hands[0].cards.map(c => c.name))
    // }

    this.hands[1]?.playHand();

    // if(this.hands[1] && this.playerHandle === 'split') {
    //   console.log('1:', this.hands[1].cards.map(c => c.name))
    // }
    this.hands[2]?.playHand();

    // if(this.hands[2] && this.playerHandle === 'split') {
    //   console.log('2:', this.hands[2].cards.map(c => c.name))
    // }
    this.hands[3]?.playHand();

    // if(this.hands[3] && this.playerHandle === 'split') {
    //   console.log('3:', this.hands[3].cards.map(c => c.name))
    // }
    this.hands[4]?.playHand();

    // if(this.hands[4] && this.playerHandle === 'split') {
    //   console.log('4:', this.hands[4].cards.map(c => c.name))
    // }
    this.hands[5]?.playHand();
    this.hands[6]?.playHand(); 
    this.hands[7]?.playHand(); 
    this.hands[8]?.playHand(); 
    this.hands[9]?.playHand();
  }

  hasActiveHand(): boolean {
    return !!this.hands.find(h => h.cards.length > 0 && !h.isBust());
  }

  resetHands(): void {
    // this.hands.forEach(h => console.log(this.playerHandle, ':', this.totalWon, h.cards.map(c => c.name + ' ')))
    this.hands.forEach(hand => hand.clearCards());
    this.hands = [];
  }
}