import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { ABJContentAccordionComponent } from '../../../shared-components/abj-content-accordion/abj-content-accordion.component';
import { ABJSelectComponent } from '../../../shared-components/abj-select/abj-select.component';
import { classicPlayTitles, classicPlayCharts } from "../../../classic-blackjack/default-classic-configs/play-strategies";
import { PlayStrategy, SurrenderTypes } from "../../../classic-blackjack/classic-models/classic-strategies.models";
import { LocalStorageService } from '../../../services/local-storage.service';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../models';
import { playerFirst2 } from '../../../models';

@Component({
  selector: 'classic-speed-practice',
  standalone: true,
  imports: [ ABJContentAccordionComponent, ABJSelectComponent, FormsModule ],
  templateUrl: './classic-speed-practice.component.html',
  styleUrl: './classic-speed-practice.component.scss'
})
export class ClassicSpeedPracticeComponent implements OnInit {
  @ViewChild('accordion') accordion: ABJContentAccordionComponent;
  strategyTitles: string[] = [];
  storedTitles: string[] = [];
  selectedTitle: string = classicPlayTitles[0];
  strategy: PlayStrategy;
  chartKeys: string[] = [];
  dealersUpCards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  filteredUpCards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  first2Cards: string[] = playerFirst2.filter(c => c !== '20');
  filteredFirst2Cards: string[] = playerFirst2.filter(c => c !== '20');
  blackListedUpCards: string[] = [];
  blackListedFirst2: string[] = [];
  blackListed = {};
  surrenderTypes = Object.values(SurrenderTypes);
  selectedSurrenderType: SurrenderTypes;
  surrenderTypesLabelMap = {
    [SurrenderTypes.NOT_ALLOWED]: 'No Surrender',
    [SurrenderTypes.LATE]: 'Late Surrender',
    [SurrenderTypes.EARLY]: 'Early Surrender',
    [SurrenderTypes.EARLY_NOT_AGAINST_A]: 'Early Surrender Against 10s',
  };
  isExpanded: boolean = true;
  actionOptions: string[] = ['HIT', 'STAY', 'SPLIT', 'DOUBLE', 'SURRENDER'];
  actionAbbreviationMap = {
    'HIT': 'H',
    'STAY': 'S',
    'SPLIT': 'P',
    'DOUBLE': 'D',
    'SURRENDER': 'R',
  };
  suits: string[] = ['h', 'c', 'd', 's'];
  tens: string[] = ['t', 'j', 'q', 'k'];
  comboCards = {
    '5': ['23'],
    '6': ['24'],
    '7': ['25', '34'],
    '8': ['26', '35'],
    '9': ['27', '36', '45'],
    '10': ['28', '37', '46'],
    '11': ['29', '38', '47', '56'],
    '12': ['2T', '39', '48', '57'],
    '13': ['3T', '49', '58', '67'],
    '14': ['4T', '59', '68'],
    '15': ['5T', '69', '78'],
    '16': ['6T', '79'],
    '17': ['7T', '89'],
    '18': ['8T'],
    '19': ['9T'],
    '20': ['TT'],
  };
  upcardUrl: string;
  firstCardUrl: string;
  secondCardUrl: string;
  randomMultiplier: number = 99;
  playersFirstCard: string;
  playersSecondCard: string;
  minCount: number;
  maxCount: number;
  trueCount: number;
  upcardKey: string;
  first2CardsKey: string;
  chartKey: string;
  activeOptions: string[] = [];
  activeConditions: string[] = [];
  wrongChoice: boolean = false;

  constructor(private emailjs: EmailjsService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.storedTitles = Object.keys(this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.PLAY, LocalStorageVariationKeys.CLASSIC));
    this.strategyTitles = [ ...classicPlayTitles, ...this.storedTitles];
    this.selectStrategy(this.selectedTitle);
    this.emailjs.setPreviousScreen$.next('Classic Speed Practice');
    this.whiteListAllCombos();
    this.updateSurrenderType(SurrenderTypes.NOT_ALLOWED);
  }

  blackListUpCard(card: string) {
    if(this.blackListedUpCards.includes(card)) {
      this.blackListedUpCards = this.blackListedUpCards.filter(c => c !== card);
      this.first2Cards.forEach(c => this.blackListed[card][c] = false);
    } else {
      this.blackListedUpCards.push(card);
      this.first2Cards.forEach(c => this.blackListed[card][c] = true);
    }
    this.filterUpCards();
  }

  blackListFirst2(card: string) {
    if(this.blackListedFirst2.includes(card)) {
      this.blackListedFirst2 = this.blackListedFirst2.filter(c => c !== card);
      this.dealersUpCards.forEach(c => this.blackListed[c][card] = false);
    } else {
      this.blackListedFirst2.push(card);
      this.dealersUpCards.forEach(c => this.blackListed[c][card] = true);
    }
    this.filterFirst2();
  }

  filterUpCards() {
    this.filteredUpCards = this.dealersUpCards.filter(c => !this.blackListedUpCards.includes(c));
    this.setMinMaxCounts();
  }

  filterFirst2() {
    this.filteredFirst2Cards = this.first2Cards.filter(c => !this.blackListedFirst2.includes(c));
    this.setMinMaxCounts();
  }

  selectStrategy(event: string) {
    this.selectedTitle = event;
    this.strategy = this.storedTitles.includes(event)
      ? this.strategy = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.PLAY, LocalStorageVariationKeys.CLASSIC)[event]
      : classicPlayCharts[event]
    this.chartKeys = Object.keys(this.strategy.combos);
    this.blackListedUpCards = [];
    this.blackListedFirst2 = [];
    this.setMinMaxCounts();
  }

  setMinMaxCounts() {
    let comboKeys: string[] = Object.keys(this.strategy.combos);
    const usesCounts: boolean = !!comboKeys.find(key => this.strategy.combos[key].conditions !== '');
    if(usesCounts) {
      let min = 0;
      let max = 0;
      comboKeys = [];
      this.filteredUpCards.forEach(uc => this.filteredFirst2Cards.forEach(f2 => comboKeys.push(`${uc}-${f2}`)));
      comboKeys = comboKeys.filter(key => this.strategy.combos[key].conditions !== '');
      comboKeys.forEach(key => this.strategy.combos[key].conditions
        .replace('?', '')
        .replace('  ', ' ')
        .split(' ')
        .forEach(c => {
          let intC = parseInt(c) || 0;
          max = intC > max ? intC : max;
          min = intC < min ? intC : min;
        }));
      this.minCount = min - 1;
      this.maxCount = max + 1;
    }
  }

  updateSurrenderType(newType: SurrenderTypes) {
    this.selectedSurrenderType = newType;
    if(newType === SurrenderTypes.NOT_ALLOWED) {
      this.actionOptions = this.actionOptions.filter(ao => ao !== 'SURRENDER');
    } else if(newType === SurrenderTypes.EARLY_NOT_AGAINST_A && this.upcardKey === 'A') {
      this.actionOptions = this.actionOptions.filter(ao => ao !== 'SURRENDER');
    } else if(newType === SurrenderTypes.LATE && ['A', '10'].includes(this.upcardKey)) {
      this.actionOptions = this.actionOptions.filter(ao => ao !== 'SURRENDER');
    } else if(!this.actionOptions.includes('SURRENDER')){
      this.actionOptions.push('SURRENDER');
    }
  }

  closeAccordion() {
    this.accordion.expand();
  }

  setRandomCount() {
    if(this.minCount) {
      const rangeSize = this.maxCount - this.minCount;
      this.trueCount = (Math.round(Math.random() * this.randomMultiplier) % rangeSize) + this.minCount;
    }
  }

  deal(isOpen: boolean) {
    this.isExpanded = isOpen;
    this.wrongChoice = false;
    // this.setMinMaxCounts(); // Because the default is BS, this is unnecessary
    if(!isOpen) {
      this.playHand();
    }
  }

  handlePlayAction(action: string) {
    this.wrongChoice = this.actionAbbreviationMap[action] !== this.getCorrectOption()
    if(!this.wrongChoice) {
      this.playHand();
    }
  }

  playHand() {
    this.actionOptions = ['HIT', 'STAY', 'SPLIT', 'DOUBLE', 'SURRENDER'];
    this.setRandomCount();
    this.selectFirst2();
    this.upcardUrl = `cards-images/${this.selectSuit()}${this.selectUpcard()}.png`;
    this.firstCardUrl = `cards-images/${this.selectSuit()}${this.playersFirstCard}.png`;
    this.secondCardUrl = `cards-images/${this.selectSuit()}${this.playersSecondCard}.png`;
    this.updateSurrenderType(this.selectedSurrenderType);
    this.chartKey = `${this.upcardKey}-${this.first2CardsKey}`;
    this.activeOptions = this.strategy.combos[this.chartKey].options.split(' ');
    this.activeConditions = this.strategy.combos[this.chartKey].conditions.split(' ');
  }

  getCorrectOption(): string {
    let c: number = 0
    let found: boolean = false
    let option: string;
    while(c < this.activeOptions.length && !found) {
      option = this.activeOptions[c];
      if(option === 'R' && !this.actionOptions.includes('SURRENDER')) {
        found = false;
      } else if(!this.activeConditions[c] || this.activeConditions[c] === '?') {
        found = true;
      } else if(parseInt(this.activeConditions[c]) < 0) {
        found = this.trueCount <= parseInt(this.activeConditions[c]);
      } else if(parseInt(this.activeConditions[c]) > 0) {
        found = this.trueCount >= parseInt(this.activeConditions[c]);
      }
      c++;
    }
    return option;
  }

  selectSuit(): string {
    const suit: string = this.suits.pop();
    this.suits.unshift(suit);
    return suit;
  }

  get10(): string {
    const ten: string = this.tens.pop();
    this.tens.unshift(ten);
    return ten;
  }

  selectUpcard() {
    let index: string = ((Math.round(Math.random() * this.randomMultiplier) % this.filteredUpCards.length)).toString();
    this.randomMultiplier += 1;
    this.upcardKey = this.filteredUpCards[index];
    if(this.upcardKey === 'A') {
      return 'a'
    }
    if(this.upcardKey === '10') {
      return this.get10();
    }
    return this.upcardKey;
  }

  getFromList(cards): string {
    const selectedCombo: string = this.comboCards[cards].pop();
    this.comboCards[cards].unshift(selectedCombo);
    return selectedCombo;
  }

  selectFirst2() {
    let index: string = ((Math.round(Math.random() * this.randomMultiplier) % this.filteredFirst2Cards.length)).toString();
    this.randomMultiplier += 1.3;
    let cards = this.filteredFirst2Cards[index];
    this.first2CardsKey = cards;
    if(this.comboCards[cards]) {
      let combo = parseInt(index) % 2 === 1
        ? this.getFromList(cards)
        : this.getFromList(cards).split('').reverse().join('');
      cards = combo.replace('T', this.get10());
      this.actionOptions = this.actionOptions.filter(ao => ao !== 'SPLIT');
    } else {
      if(cards.length === 2 && cards[0] !== cards[1]) {
        this.actionOptions = this.actionOptions.filter(ao => ao !== 'SPLIT');
      }
      cards = this.filteredFirst2Cards[index]
        .replaceAll('A', 'a')
        .replace('T', this.get10())
        .replace('T', this.get10());
      if(parseInt(index) % 2 === 1) {
        cards = cards.split('').reverse().join('');
      }
    }
    this.playersFirstCard = cards[0];
    this.playersSecondCard = cards[1];
  }

  private whiteListAllCombos() {
    this.dealersUpCards.forEach(uc => this.blackListed[uc] = {})
    this.dealersUpCards.forEach(uc => this.first2Cards.forEach(c => this.blackListed[uc][c] = false));
  }
}