import { CountingMethod } from '../classic-models/classic-strategies.models';

export class Card {
  cardSuitlessName: string;
  suit: string;
  name: string;
  image: string;
  cardValue: number;
  countValuesByMethodType: { [k:string]: number } = {};
  countValuesMap = {};
  countMethodNames: string[] = [];
  cardValues: string[] = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
  ];
  suitAbrvMap = {
    H: 'heart',
    D: 'diamond',
    C: 'club',
    S: 'spade',
  };
  id: number = null; // This is used for the track function in @for

  constructor(suit: string, index: number, public isHoleCard: boolean = false) {
    this.name = `${this.cardValues[index]}${suit}`;
    this.image = `cards-images/${suit.toLowerCase()}${this.cardValues[index].toLowerCase()}.png`;
    this.cardValue = Math.min(index + 1, 10);
    this.cardSuitlessName = this.name.split('')[0];
    this.suit = this.name.split('')[1];
  }

  addToCountValueMethodsMap(method: CountingMethod): void {
    if(!this.countMethodNames.includes(method.title)) {
      if(method.suitAware) {
        this.countValuesByMethodType[method.title] = 
          method.suitAwareValuesMap[this.cardSuitlessName][this.suitAbrvMap[this.suit]];
      } else {
        this.countValuesByMethodType[method.title] = method.valuesMap[this.cardSuitlessName];
      }
      this.countMethodNames.push(method.title);
    }
  }
}