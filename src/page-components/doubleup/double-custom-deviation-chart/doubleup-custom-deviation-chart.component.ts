import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { DeviationChartFinderComponent } from './deviation-chart-components/deviation-finder-chart/deviation-finder-chart.component';
// import { PlayChartUpdaterComponent } from './deviation-chart-components/play-chart-updater/play-chart-updater.component';
import { ABJContentAccordionComponent } from '../../../shared-components/abj-content-accordion/abj-content-accordion.component';
import { ABJTextInputComponent } from '../../../shared-components/abj-text-input/abj-text-input.component';
import { ABJSelectComponent } from '../../../shared-components/abj-select/abj-select.component';
import { ABJButtonComponent } from '../../../shared-components/abj-button/abj-button.component';
import { doubleupPlayTitles } from "../../../doubleup-blackjack/default-doubleup-configs/play-strategies";
import { 
  DoubleDownOn,
  HoleCardType,
  PayRatio,
  PlayStrategy,
} from "../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models";
import { LocalStorageService } from '../../../services/local-storage.service';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../models';
import { VideoModalService } from '../../../services/video-modal.service';
import { DuPlayChartEngine } from '../../../doubleup-blackjack/doubleup-play-chart-engine/du-pc-engine';
import { doubleupCounts } from '../../../doubleup-blackjack/default-doubleup-configs/counting-methods';

@Component({
  selector: 'doubleup-custom-deviation-chart',
  standalone: true,
  imports: [
    ABJButtonComponent,
    ABJContentAccordionComponent,
    ABJSelectComponent,
    ABJTextInputComponent,
    DeviationChartFinderComponent,
    // PlayChartUpdaterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './doubleup-custom-deviation-chart.component.html',
  styleUrl: './doubleup-custom-deviation-chart.component.scss'
})
export class DoubleupCustomDeviationChartComponent implements OnInit {
  @ViewChild('setupAccordion') setupAccordion: ABJContentAccordionComponent;
  strategyTitles: string[] = [];
  storedTitles: string[] = [];
  selectedTitle: string = doubleupPlayTitles[0];
  strategy: PlayStrategy;
  chartKeys: string[] = [];
  dealersUpCards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  filteredUpCards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

  first2Cards: string[] = [
  'TT', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10' , 'A9', 'A8', 'A7', 'A6', 'A5', 'A4', 'A3', 'A2', 'AA', 'AT', 'TT', '9', '8', '7', '6', '5', '99', '88', '77', '66', '55', '44', '33', '22' ];
  blackListedUpCards: string[] = [];
  blackListedFirst2: string[] = [];
  blackListed = {};
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
    [DoubleDownOn.ANY_TWO_CARDS]: 'Double any 2 Cards',
    [DoubleDownOn.EIGHT_thru_ELEVEN]: 'Double 8 Thru 11',
    [DoubleDownOn.NINE_thru_ELEVEN]: 'Double 9 thru 11',
    [DoubleDownOn.TEN_and_ELEVEN]: 'Double 10 and 11',
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
  };
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
  RSA: boolean;
  MHFS: number;
  DAS: boolean;
  decks: number;
  doubleOn: DoubleDownOn;
  disabled: boolean = false;
  showBonusConfig: boolean = false;
  // showWeirdRulesConfig: boolean = false;
  holeCardRules: HoleCardType;
  maxMinCount: number = 10;
  playStrategy: PlayStrategy;
  showF2CDropDown: boolean = false;
  iterations: number = 10; 
  playChartEngine: DuPlayChartEngine = new DuPlayChartEngine();
  showSpinnerModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activeF2C: string;
  showCreatePlayStrategyButton: boolean = false;
  showStartSimButton: boolean = false;
  createFromExistingChart: boolean;

  constructor(
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
      ...Object.keys(this.localStorageService.getItemOfVariation( LocalStorageItemsEnum.COUNT, LocalStorageVariationKeys.DOUBLE_UP)), 
      ...Object.keys(doubleupCounts),
    ]
  }

  getChartNames() {
    let creatorConfigMap = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP);
    let mapKeys = Object.keys(creatorConfigMap);
    this.chartNames = mapKeys.filter(key => creatorConfigMap[key].split('-')[0] === LocalStorageVariationKeys.DOUBLE_UP);
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }

  selectChart(chartName: string) {
    this.createFromExistingChart = true; 
    this.chartName = chartName;
    this.disabled = true;
    this.chartConfig = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP)[chartName];
    this.dissectChartConfig();
  }

  dissectChartConfig() {
    const fields: string[] = this.chartConfig.split('-');
    this.x17 = fields[2] + '17',
    this.RSA = fields[3] === 'true',
    this.MHFS = parseInt(fields[4]);
    this.DAS = fields[5] === 'true',
    this.decks = parseInt(fields[6]);
    this.doubleOn = fields[7] as DoubleDownOn;
    this.holeCardRules = fields[8] as HoleCardType;
    this.countingMethod = fields[9];
    this.maxMinCount = parseInt(fields[10]);
    this.setChartConfig();
  }

  updateShowCreatePlayStrategyButton(newValue: boolean) {
    this.showCreatePlayStrategyButton = newValue;
  }

  handleChartName(chartName: string): void {
    // If this.chartName already exists with this name then nothing should happen
    if(this.chartName === chartName) {
      return
    }
    this.createFromExistingChart = false; 
    this.chartName = chartName;
    this.setChartConfig();
  }

  handleX17(x17: string): void {
    this.x17 = x17;
    this.setChartConfig();
  }

  handleRSA(RSA: boolean): void {
    this.RSA = RSA;
    this.setChartConfig();
  }

  handleMHFS(): void {
    if(this.decks < 2) {
      this.decks = 2;
    } 
    this.setChartConfig();
  }

  handleDAS(DAS: boolean): void {
    this.DAS = DAS;
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

  handleMaxMinCount() {
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

  setChartConfig(): void {

    this.chartConfig = `doubleUp-${this.chartName}-${this.x17?.split('')[0]}-${this.RSA?.toString()}-${this.MHFS?.toString()}-${this.DAS?.toString()}-${this.decks?.toString()}-${this.doubleOn}-${this.holeCardRules}-${this.countingMethod}-${this.maxMinCount.toString()}`;

    if(!this.chartConfig.includes('undefined')) {
      this.updateShowCreatePlayStrategyButton(true);
    } else {
      this.chartConfig = null;
      this.showF2CDropDown = false;
      this.updateShowCreatePlayStrategyButton(false);
    }
  }

  createNewPlayStrategy() {
    this.showF2CDropDown = true;
    let chartCreatorsList = this.localStorageService.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP);
    chartCreatorsList[this.chartName] = this.chartConfig;
    this.localStorageService.setItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP, chartCreatorsList);
    this.playStrategy = this.playChartEngine.pcDataService.getPlayStrategy(this.chartName);

    const playDetails = {
      variation: LocalStorageVariationKeys.DOUBLE_UP,
      configurationType: LocalStorageItemsEnum.PLAY,
      strategy: this.playStrategy,
      title: null,
    }
    this.localStorageService.saveActiveStrategy$.next(playDetails);

    if(!this.localStorageService.getItemOfItemOfVariation(LocalStorageVariationKeys.DOUBLE_UP , LocalStorageItemsEnum.DEVIATION_CHART, this.chartConfig)){
      const deviationChartDetails = {
        variation: LocalStorageVariationKeys.DOUBLE_UP,
        configurationType: LocalStorageItemsEnum.DEVIATION_CHART,
        strategy: this.playChartEngine.pcDataService.getNewDeviationChart(),
        title: this.chartConfig,
      }
      this.localStorageService.saveActiveStrategy$.next(deviationChartDetails);
    }
  }

  showSimmedData() {
    this.createNewPlayStrategy();
    this.runSim(0);
    this.showF2CDropDown = false;
    this.isSetupExpanded = false;
  }

  removeChartNameFromLocalStorage() {
    this.setChartConfig();
    if(this.chartConfig) {
      this.localStorageService.deleteStrategyByName(LocalStorageVariationKeys.DOUBLE_UP, LocalStorageItemsEnum.DEVIATION_CHART, this.chartConfig);
      this.localStorageService.deleteChartCreatorsListByChartName(LocalStorageVariationKeys.DOUBLE_UP, this.chartName);
    }
  }

  selectF2C(f2c: string) {
    this.activeF2C = f2c;
    this.showStartSimButton = true;
  }

  runSim(iterations: number = null) {
    this.showSpinnerModal$.next(true);
    setTimeout(() => {
      if(iterations !== null) {
        this.activeF2C = 'AT';
      }
      this.playChartEngine.startSimulation(iterations || this.iterations, this.chartConfig, this.activeF2C);
      this.showSpinnerModal$.next(false);
    });
  }
}