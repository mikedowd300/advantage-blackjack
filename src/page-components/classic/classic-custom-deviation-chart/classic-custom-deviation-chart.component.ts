import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// import { EmailjsService } from '../../../services/emailjs.service';
import { DeviationChartFinderComponent } from './deviation-chart-components/deviation-finder-chart/deviation-finder-chart.component';
import { ABJContentAccordionComponent } from '../../../shared-components/abj-content-accordion/abj-content-accordion.component';
import { ABJTextInputComponent } from '../../../shared-components/abj-text-input/abj-text-input.component';
import { ABJSelectComponent } from '../../../shared-components/abj-select/abj-select.component';
import { ABJButtonComponent } from '../../../shared-components/abj-button/abj-button.component';
import { classicPlayTitles } from "../../../classic-blackjack/default-classic-configs/play-strategies";
import { 
  DoubleDownOn,
  HoleCardType,
  PayRatio,
  PlayStrategy,
  SurrenderTypes
} from "../../../classic-blackjack/classic-models/classic-strategies.models";
import { LocalStorageService } from '../../../services/local-storage.service';
import { LocalStorageItemsEnum, playerFirst2, LocalStorageVariationKeys } from '../../../models';
import { VideoModalService } from '../../../services/video-modal.service';
import { PlayChartEngine } from '../../../classic-blackjack/classic-play-chart-engine/pc-engine';
import { classicCounts } from '../../../classic-blackjack/default-classic-configs/counting-methods';

@Component({
  selector: 'classic-custom-deviation-chart',
  standalone: true,
  imports: [
    ABJButtonComponent,
    ABJContentAccordionComponent,
    ABJSelectComponent,
    ABJTextInputComponent,
    DeviationChartFinderComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './classic-custom-deviation-chart.component.html',
  styleUrl: './classic-custom-deviation-chart.component.scss'
})
export class ClassicCustomDeviationChartComponent implements OnInit {
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
  doubleTypes = Object.values(DoubleDownOn);
  excludedPayoutRation: PayRatio[] = [
    PayRatio.THOUSAND_to_ONE, 
    PayRatio.HUNDRED_to_ONE, 
    PayRatio.HALF,
    PayRatio.N_A
  ];
  payoutRatios = Object.values(PayRatio)
    .filter(val => !this.excludedPayoutRation.includes(val))
    .map(val => val.replaceAll('-', '_'));
  doubleTypesLabelMap = {
    [DoubleDownOn.ANY_TWO_CARDS]: 'Any 2 Cards',
    [DoubleDownOn.EIGHT_thru_ELEVEN]: '8 Thru 11',
    [DoubleDownOn.NINE_thru_ELEVEN]: '9 thru 11',
    [DoubleDownOn.TEN_and_ELEVEN]: '10 and 11',
  }
  selectedSurrenderType: SurrenderTypes;
  surrenderTypesLabelMap = {
    [SurrenderTypes.NOT_ALLOWED]: 'No Surrender',
    [SurrenderTypes.LATE]: 'Late Surrender',
    [SurrenderTypes.EARLY]: 'Early Surrender',
    [SurrenderTypes.EARLY_NOT_AGAINST_A]: 'Early Surrender Against 10s',
  };
  payoutRatiosLabelMap = {
    [PayRatio.ONE_to_ONE.replaceAll('-', '_')]: '1:1',
    [PayRatio.SIX_to_FIVE.replaceAll('-', '_')]: '6:5',
    [PayRatio.SEVEN_to_FIVE.replaceAll('-', '_')]: '7:5',
    [PayRatio.THREE_to_TWO.replaceAll('-', '_')]: '3:2',
    [PayRatio.TWO_to_ONE.replaceAll('-', '_')]: '2:1',
    [PayRatio.THREE_to_ONE.replaceAll('-', '_')]: '3:1',
    [PayRatio.FIVE_to_ONE.replaceAll('-', '_')]: '5:1',
    [PayRatio.TEN_to_ONE.replaceAll('-', '_')]: '10:1',
  }
  countingMethods: string[] = [];
  isExplanationsExpanded: boolean = false;
  isWhatsThisExpanded: boolean = false;
  isSetupExpanded: boolean = true;
  explanationUrlKey: string = 'createCustomChart';
  chartNames: string[] = [];
  chartName: string;
  showNameForm: string;
  chartConfig: string;
  countingMethod: string;
  x17: string;
  rsa: boolean;
  mhfs: number;
  das: boolean;
  decks: number;
  doubleOn: DoubleDownOn;
  disabled: boolean = false;
  surrender: SurrenderTypes;
  showBonusConfig: boolean = false;
  showWeirdRulesConfig: boolean = false;
  holeCardRules: HoleCardType;
  c678: boolean;
  s678: boolean;
  x678: boolean;
  c777: boolean;
  s777: boolean;
  x777: boolean;
  charlie: string;
  c678Payout: string;
  s678Payout: string;
  x678Payout: string;
  c777Payout: string;
  s777Payout: string;
  x777Payout: string;
  charliePayout: string;
  doubleSplitAces: boolean;
  drawOnSplitAces: boolean;
  tripleDownOn3Cards: boolean;
  tripleDownOnAnyAmountOfCards: boolean;
  surrenderAfterDoubling: boolean;
  surrenderWhenever: boolean;
  doubleOn3Card9to11: boolean;
  doubleOn3Cards: boolean;
  doubleOnAnyAmountOfCards: boolean;
  dealerPushes22: boolean;
  playStrategy: PlayStrategy;
  showP2CDropDown: boolean = false;
  iterations: number = 10; // 1000000
  playChartEngine: PlayChartEngine = new PlayChartEngine();
  showSpinnerModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activeF2C: string;

  constructor(
    // private emailjs: EmailjsService,
    private videoModalService: VideoModalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.countingMethods = this.getItemCountingMethodTitles();
    this.setChartConfig();
    this.getChartNames();
  }

  getItemCountingMethodTitles() {
    return [ 
      ...Object.keys(this.localStorageService.getItemOfVariation( LocalStorageItemsEnum.COUNT, LocalStorageVariationKeys.CLASSIC)), 
      ...Object.keys(classicCounts),
    ]
  }

  getChartNames() {
    let creatorConfigMap = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP);
    let mapKeys = Object.keys(creatorConfigMap);
    this.chartNames = mapKeys.filter(key => creatorConfigMap[key].split('-')[0] === LocalStorageVariationKeys.CLASSIC);
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }

  selectChart(chartName: string) {
    this.chartName = chartName;
    this.disabled = true;
    this.chartConfig = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP)[chartName];
    console.log(this.chartConfig);
    this.dissectChartConfig();
  }

  dissectChartConfig() {
    const fields: string[] = this.chartConfig.split('-');
    this.x17 = fields[2] + '17',
    this.rsa = fields[3] === 'true',
    this.mhfs = parseInt(fields[4]);
    this.das = fields[5] === 'true',
    this.decks = parseInt(fields[6]);
    this.doubleOn = fields[7] as DoubleDownOn;
    this.surrender = fields[8] as SurrenderTypes;
    this.holeCardRules = fields[9] as HoleCardType;
    this.countingMethod = fields[10];
    console.log('DISSECTING CHART CONFIG')
    this.setChartConfig();
  }

  handleChartName(chartName: string): void {
    // If this.chartName already exists witht this name then nothing should happen
    if(this.chartName === chartName) {
      return
    }
    this.chartName = chartName;
    this.setChartConfig();
  }

  handleX17(x17: string): void {
    this.x17 = x17;
    this.setChartConfig();
  }

  handleRsa(rsa: boolean): void {
    this.rsa = rsa;
    this.setChartConfig();
  }

  handleMhfs(): void {
    if(this.decks < 2) {
      this.decks = 2;
    } 
    this.setChartConfig();
  }

  handleDas(das: boolean): void {
    this.das = das;
    this.setChartConfig();
  }

  handleDecks(): void {
    if(this.decks < 1) {
      this.decks = 1;
    }
    this.setChartConfig();
  }

  handleDoubleOn(doubleOn: DoubleDownOn): void {
    this.doubleOn = doubleOn;
    this.setChartConfig();
  }

  handleSurrender(surrender: SurrenderTypes): void {
    this.surrender = surrender;
    this.setChartConfig();
  }

  handleHoleCardRules(holeCardRules: string): void {
    this.holeCardRules = holeCardRules as HoleCardType;
    this.setChartConfig();
  }

  handleCountingMethod(countingMethod) {
    this.countingMethod = countingMethod;
    this.setChartConfig();
  }

  handleC678(c678: boolean) {
    this.c678 = c678;
    this.c678Payout = !c678 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleS678(s678: boolean) {
    this.s678 = s678;
    this.s678Payout = !s678 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleX678(x678: boolean) {
    this.x678 = x678;
    this.x678Payout = !x678 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleC777(c777: boolean) {
    this.c777 = c777;
    this.c777Payout = !c777 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleS777(s777: boolean) {
    this.s777 = s777;
    this.s777Payout = !s777 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleX777(s777: boolean) {
    this.s777 = s777;
    this.s777Payout = !s777 ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleCharlie(charlie: string) {
    this.charlie = charlie;
    this.charliePayout = !charlie ? PayRatio.N_A : undefined;
    this.setChartConfig();
  }

  handleC678Payout(c678Payout: string) {
    this.c678Payout = this.c678 ? c678Payout : undefined;
    this.setChartConfig();
  }

  handleS678Payout(s678Payout: string) {
    this.s678Payout = this.s678 ? s678Payout : undefined;
    this.setChartConfig();
  }

  handleX678Payout(x678Payout: string) {
    this.x678Payout = this.x678 ? x678Payout : undefined;
    this.setChartConfig();
  }

  handleC777Payout(c777Payout: string) {
    this.c777Payout = this.c777 ? c777Payout : undefined;
    this.setChartConfig();
  }

  handleS777Payout(s777Payout: string) {
    this.s777Payout = this.s777 ? s777Payout : undefined;
    this.setChartConfig();
  }

  handleX777Payout(x777Payout: string) {
    this.x777Payout = this.x777 ? x777Payout : undefined;
    this.setChartConfig();
  }

  handleCharliePayout(charliePayout: string) {
    this.charliePayout = this.charliePayout ? charliePayout : undefined;
    this.setChartConfig();
  }

  handleDoubleSplitAces(doubleSplitAces: boolean) {
    this.doubleSplitAces = doubleSplitAces;
    this.setChartConfig();
  }

  handleDrawOnSplitAces(drawOnSplitAces: boolean) {
    this.drawOnSplitAces = drawOnSplitAces;
    this.setChartConfig();
  }

  handleTripleDownOn3Cards(tripleDownOn3Cards: boolean) {
    this.tripleDownOn3Cards = tripleDownOn3Cards;
    this.setChartConfig();
  }

  handleTripleDownOnAnyAmountOfCards(tripleDownOnAnyAmountOfCards: boolean) {
    this.tripleDownOnAnyAmountOfCards = tripleDownOnAnyAmountOfCards;
    this.setChartConfig();
  }

  handleSurrenderAfterDoubling(surrenderAfterDoubling: boolean) {
    this.surrenderAfterDoubling = surrenderAfterDoubling;
    this.setChartConfig();
  }

  handleSurrenderWhenever(surrenderWhenever: boolean) {
    this.surrenderWhenever = surrenderWhenever;
    this.setChartConfig();
  }

  handleDoubleOn3Card9to11(doubleOn3Card9to11: boolean) {
    this.doubleOn3Card9to11 = doubleOn3Card9to11;
    this.setChartConfig();
  }

  handleDoubleOn3Cards(doubleOn3Cards: boolean) {
    this.doubleOn3Cards = doubleOn3Cards;
    this.setChartConfig();
  }

  handleDoubleOnAnyAmountOfCards(doubleOnAnyAmountOfCards: boolean) {
    this.doubleOnAnyAmountOfCards = doubleOnAnyAmountOfCards;
    this.setChartConfig();
  }

  handleDealerPushes22(dealerPushes22: boolean) {
    this.dealerPushes22 = dealerPushes22;
    this.setChartConfig();
  }

  setChartConfig(): void {
    const atLeastOneWeirdRule: boolean = this.doubleSplitAces || this.drawOnSplitAces || this.tripleDownOn3Cards || this.tripleDownOnAnyAmountOfCards || this.surrenderAfterDoubling || this.surrenderWhenever || this.doubleOn3Card9to11 || this.doubleOn3Cards || this.doubleOnAnyAmountOfCards || this.dealerPushes22;

    this.chartConfig = `classic-${this.chartName}-${this.x17?.split('')[0]}-${this.rsa?.toString()}-${this.mhfs?.toString()}-${this.das?.toString()}-${this.decks?.toString()}-${this.doubleOn}-${this.surrender}-${this.holeCardRules}-${this.countingMethod}`;

    if(this.showBonusConfig && (this.c678 || this.s678 ||this.c777 ||this.s777)) {
      this.chartConfig += `--BONUSES-${this.c678}-${this.c678Payout}-${this.s678}-${this.s678Payout}-${this.x678}-${this.x678Payout}-${this.c777}-${this.c777Payout}-${this.s777}-${this.s777Payout}-${this.x777}-${this.x777Payout}-${this.charlie}-${this.charliePayout}`;
    }
    if(this.showWeirdRulesConfig && atLeastOneWeirdRule) {
      this.chartConfig += `--WEIRD_RULES-${this.doubleSplitAces}-${this.drawOnSplitAces}-${this.tripleDownOn3Cards}-${this.tripleDownOnAnyAmountOfCards}-${this.surrenderAfterDoubling}-${this.surrenderWhenever}-${this.doubleOn3Card9to11}-${this.doubleOn3Cards}-${this.doubleOnAnyAmountOfCards}-${this.dealerPushes22}`;
    }

    if(!this.chartConfig.includes('undefined')) {
      this.showP2CDropDown = true;
      let chartCreatorsList = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP);
      chartCreatorsList[this.chartName] = this.chartConfig;
      this.localStorageService.setItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP, chartCreatorsList);
      // this.playStrategy = this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.CLASSIC,LocalStorageItemsEnum.PLAY, this.chartName) || { ...deviationFinder, title: this.chartName };
      // console.log(this.playStrategy);

      this.playStrategy = this.playChartEngine.pcDataService.getPlayStrategy(this.chartName);
      console.log(this.playStrategy);

      const playDetails = {
        variation: LocalStorageVariationKeys.CLASSIC,
        configurationType: LocalStorageItemsEnum.PLAY,
        strategy: this.playStrategy,
        title: null,
      }
      this.localStorageService.saveActiveStrategy$.next(playDetails);

      console.log(this.chartConfig);
      if(!this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.CLASSIC , LocalStorageItemsEnum.DEVIATION_CHART, this.chartConfig)){
        const deviationChartDetails = {
          variation: LocalStorageVariationKeys.CLASSIC,
          configurationType: LocalStorageItemsEnum.DEVIATION_CHART,
          strategy: this.playChartEngine.pcDataService.getNewDeviationChart(),
          title: this.chartConfig,
        }
        console.log('DO YOU SEE ME MORE THAN ONCE')
        this.localStorageService.saveActiveStrategy$.next(deviationChartDetails);
      }
      // Also A delete button should appear to deleat the current Deviation Chart Data
      //  Deleting the Deviation Chart Data affects 2 places in local storage, classic.deviationVhart and chartCreatorsList
      // When deleating from chartCreatorsList, make sure the variation in classic, its the first part of the name
    } else {
      this.chartConfig = null;
      this.showP2CDropDown = false;
    }
  }

  setShowBonusConfig() {
    this.showBonusConfig = !this.showBonusConfig;
    this.setChartConfig();
  }

  setShowWeirdRulesConfig() {
    this.showWeirdRulesConfig = !this.showWeirdRulesConfig;
    this.setChartConfig();
  }

  removeChartNameFromLocalStorage() {
    this.setChartConfig();
    if(this.chartConfig) {
      this.localStorageService.deleteStrategyByName(LocalStorageVariationKeys.CLASSIC, LocalStorageItemsEnum.DEVIATION_CHART, this.chartConfig);
      this.localStorageService.deleteChartCreatorsListByChartName(LocalStorageVariationKeys.CLASSIC, this.chartName);
    }
  }

  selectF2C(f2c: string) {
    this.activeF2C = f2c;
    this.showSpinnerModal$.next(true);
    setTimeout(() => {
      this.playChartEngine.startSimulation(this.iterations, this.chartConfig, f2c);
      this.showSpinnerModal$.next(false);
    });
  }
}