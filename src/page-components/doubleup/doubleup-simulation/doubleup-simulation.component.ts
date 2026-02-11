import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { HeaderFooterService } from '../../../services/header-footer.service';
import { ABJSelectComponent } from '../../../shared-components/abj-select/abj-select.component';
import { ABJNumberInputComponent } from '../../../shared-components/abj-number-input/abj-number-input.component';
import { HeaderLink, LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../models';
import { AbbreviatedDoubleupConditions, TableConfig, PlayerConfig } from "../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models";
import {
  doubleupTableTitles,
  doubleupTables,
  doubleupDefaultTable
} from "../../../doubleup-blackjack/default-doubleup-configs/table-config";
import { doubleupConditions } from '../../../doubleup-blackjack/default-doubleup-configs/conditions';
import { doubleupPlayers } from '../../../doubleup-blackjack/default-doubleup-configs/player-config';
import { PayRatio } from '../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models'
import { Router } from '@angular/router';
import { DuGameEngineData } from '../../../services/du-game-engine-data';

@Component({
  selector: 'doubleup-simulation',
  standalone: true,
  imports: [FormsModule, ABJNumberInputComponent, ABJSelectComponent],
  templateUrl: './doubleup-simulation.component.html',
  styleUrl: './doubleup-simulation.component.scss'
})
export class DoubleupSimulationComponent implements OnDestroy, OnInit {
  allTableNames: string[];
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  activeTable: TableConfig;
  selectedTableName: string;
  selectedTableConditions: string;
  selectedTableConditionsConfig: AbbreviatedDoubleupConditions;
  storedConditions: AbbreviatedDoubleupConditions[];
  storedTables: TableConfig[];
  storedPlayers: PlayerConfig[];
  selectedPlayersTitles: string[];
  selectedPlayers: PlayerConfig[];
  iterations: number = 1000;
  selectedIterations: string = '1000';
  showCustomIterationsInput: boolean = false;
  suggestedIterations: string[] = ['1', '10', '100', '1000', '10000', '100000', '1000000', '5000000', 'custom'];
  displayedRules: any = { top: [], bottom: [] };
  conditionsLink: HeaderLink = {
    url: 'doubleup/customizations',
    title: 'Customizations',
    responsiveTitle: 'Customize',
  };
  payRatioMap = {
    [PayRatio.ONE_to_ONE] : '1/1',
    [PayRatio.SIX_to_FIVE] : '6/5',
    [PayRatio.SEVEN_to_FIVE] : '7/5',
    [PayRatio.THREE_to_TWO] : '3/2',
    [PayRatio.TWO_to_ONE] : '2/1',
    [PayRatio.THREE_to_ONE] : '3/1',
    [PayRatio.FIVE_to_ONE] : '5/1',
    [PayRatio.TEN_to_ONE] : '10/1',
    [PayRatio.HUNDRED_to_ONE] : '100/1',
    [PayRatio.THOUSAND_to_ONE] : '1000/1',
  };
  spots: any[] = [];
  
  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerFooterService: HeaderFooterService,
    private gameData: DuGameEngineData,
  ) {}

  ngOnInit(): void {
    this.headerFooterService.updateTheTagline$.next('Get to the long run now');
    this.headerFooterService.addVariationLink(this.conditionsLink);
    this.emailjs.setPreviousScreen$.next('Classic Simulation');
    this.activeTable = doubleupDefaultTable;
    this.storedPlayers = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.PLAYER_CONFIG, LocalStorageVariationKeys.DOUBLE_UP);
    this.storedTables = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.TABLE_CONFIG, LocalStorageVariationKeys.DOUBLE_UP);
    this.allTableNames = [ ...doubleupTableTitles, ...Object.keys(this.storedTables)];
    this.storedConditions = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.DOUBLE_UP);
    this.selectTable(doubleupDefaultTable.title, true);
  }

  selectTable(tableName: string, useDefault: boolean = false):void {
    this.selectedTableName = tableName;
    if(!useDefault) {
      this.activeTable = (doubleupTables[this.selectedTableName] || this.storedTables[this.selectedTableName])
    }
    this.selectedTableConditions = this.activeTable.conditionsTitle;
    this.selectedTableConditionsConfig = this.getConditions();
    this.displayedRules = this.getDisplayedRules(this.selectedTableConditionsConfig);
    this.selectedPlayersTitles = (doubleupTables[this.selectedTableName] || this.storedTables[this.selectedTableName]).players.map(p => p.playerConfigTitle);
    this.selectedPlayers = this.getSelectedPlayers();
    this.setSpots();
  }

  setSpots(): void {
    this.spots = [];
    for(let s = 0; s < this.selectedTableConditionsConfig.spotsPerTable; s++) {
      let spot = { empty: true };
      const seatedPlayer = this.selectedPlayers.find(p => p.seatNumber === s + 1);
      if(seatedPlayer) {
        spot = { ...seatedPlayer, empty: false };
      }
      this.spots.push(spot)
    }
  }

  selectIterations(iterations: string):void {
    if(iterations !== 'custom') {
      this.iterations = parseInt(iterations);
    } else {
      this.showCustomIterationsInput = true;
    }
  }

  startSimulation(): void {
    this.gameData.setTableConfig(this.activeTable);
    this.gameData.setConditionsConfig(this.selectedTableConditionsConfig);
    this.gameData.setPlayerConfigs(this.selectedPlayers);
    this.gameData.setIterations(this.iterations);
    this.router.navigate(['doubleup/thinking']);
  }

  getConditions(): AbbreviatedDoubleupConditions {
    const conditions: AbbreviatedDoubleupConditions = doubleupConditions[this.selectedTableConditions] || this.storedConditions[this.selectedTableConditions];
    return conditions;
  }

  getSelectedPlayers(): PlayerConfig[] {
    let seatNumbersByName = {};
    const players = { ...doubleupPlayers, ...this.storedPlayers };
    const selectedPlayers: PlayerConfig[] = this.selectedPlayersTitles.map(pt => players[pt]);
    this.activeTable.players.forEach(p => seatNumbersByName[p.playerConfigTitle] = p.seatNumber);
    selectedPlayers.forEach(p => p.seatNumber = seatNumbersByName[p.title]);
    return this.selectedPlayersTitles.map(pt => players[pt]);
  }

  getDisplayedRules(conditions: AbbreviatedDoubleupConditions) {
    const { DAS, canDoubleOn, MSE, RSA, S17, decksPerShoe, minBet, maxBet, shufflePoint, surrender, blackjackPayRatio, MHFS } = conditions;
    const penn: number = Math.round(shufflePoint * 1000 / (52 * decksPerShoe)) / 10;
    let rules = { top: [], bottom: [] };
    rules.top.push(DAS ? 'DAS' : 'NO DAS');
    rules.top.push(RSA ? 'RSA' : 'NO RSA');
    rules.top.push(MSE ? 'MSE' : 'NO MSE');
    rules.top.push(S17 ? 'S17' : 'H17');
    rules.top.push(`${ penn }%`);
    rules.top.push(`MHFS:${MHFS}`);
    rules.bottom.push(surrender === 'notAllowed' ? 'No Surrender' : 'Late Surrender');
    rules.bottom.push(`${ decksPerShoe } deck`);
    rules.bottom.push(this.payRatioMap[blackjackPayRatio]);
    rules.bottom.push(`${ minBet } min / ${ maxBet } max`);
    return rules;
  }

  ngOnDestroy(): void {
    this.headerFooterService.removeVariationLink('doubleup/customizations');
  }
}