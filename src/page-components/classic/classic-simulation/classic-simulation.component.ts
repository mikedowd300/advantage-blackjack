import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { HeaderFooterService } from '../../../services/header-footer.service';
import { ABJSelectComponent } from '../../../shared-components/abj-select/abj-select.component';
import { ABJNumberInputComponent } from '../../../shared-components/abj-number-input/abj-number-input.component';
import { HeaderLink, LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../models';
import { AbbreviatedClassicConditions, TableConfig, PlayerConfig } from "../../../classic-blackjack/classic-models/classic-strategies.models";
import {
  classicTableTitles,
  classicTables,
  defaultClassicTable
} from "../../../classic-blackjack/default-classic-configs/table-config";
import { classicConditions } from '../../../classic-blackjack/default-classic-configs/conditions';
import { classicPlayers } from '../../../classic-blackjack/default-classic-configs/player-config';
import { PayRatio } from '../../../classic-blackjack/classic-models/classic-strategies.models'
import { Router } from '@angular/router';
import { GameEngineData } from '../../../services/game-engine-data';

@Component({
  selector: 'classic-simulation',
  standalone: true,
  imports: [FormsModule, ABJNumberInputComponent, ABJSelectComponent],
  templateUrl: './classic-simulation.component.html',
  styleUrl: './classic-simulation.component.scss'
})
export class ClassicSimulationComponent implements OnDestroy, OnInit {
  allTableNames: string[];
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  activeTable: TableConfig;
  selectedTableName: string;
  selectedTableConditions: string;
  selectedTableConditionsConfig: AbbreviatedClassicConditions;
  storedConditions: AbbreviatedClassicConditions[];
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
    url: 'classic/customizations',
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
    private gameData: GameEngineData,
  ) {}

  ngOnInit(): void {
    this.headerFooterService.addVariationLink(this.conditionsLink);
    this.emailjs.setPreviousScreen$.next('Classic Simulation');
    this.activeTable = defaultClassicTable;
    this.storedPlayers = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.PLAYER_CONFIG, LocalStorageVariationKeys.CLASSIC);
    this.storedTables = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.TABLE_CONFIG, LocalStorageVariationKeys.CLASSIC);
    this.allTableNames = [ ...classicTableTitles, ...Object.keys(this.storedTables)];
    this.storedConditions = this.localStorageService.getItemOfVariation(LocalStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.CLASSIC);
    this.selectTable(defaultClassicTable.title, true);
  }

  selectTable(tableName: string, useDefault: boolean = false):void {
    this.selectedTableName = tableName;
    if(!useDefault) {
      this.activeTable = (classicTables[this.selectedTableName] || this.storedTables[this.selectedTableName])
    }
    this.selectedTableConditions = this.activeTable.conditionsTitle;
    this.selectedTableConditionsConfig = this.getConditions();
    this.displayedRules = this.getDisplayedRules(this.selectedTableConditionsConfig);
    this.selectedPlayersTitles = (classicTables[this.selectedTableName] || this.storedTables[this.selectedTableName]).players.map(p => p.playerConfigTitle);
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
    this.router.navigate(['classic/thinking']);
  }

  getConditions(): AbbreviatedClassicConditions {
    const conditions: AbbreviatedClassicConditions = classicConditions[this.selectedTableConditions] || this.storedConditions[this.selectedTableConditions];
    return conditions;
  }

  getSelectedPlayers(): PlayerConfig[] {
    let seatNumbersByName = {};
    const players = { ...classicPlayers, ...this.storedPlayers };
    const selectedPlayers: PlayerConfig[] = this.selectedPlayersTitles.map(pt => players[pt]);
    this.activeTable.players.forEach(p => seatNumbersByName[p.playerConfigTitle] = p.seatNumber);
    selectedPlayers.forEach(p => p.seatNumber = seatNumbersByName[p.title]);
    return this.selectedPlayersTitles.map(pt => players[pt]);
  }

  getDisplayedRules(conditions: AbbreviatedClassicConditions) {
    const { DAS, canDoubleOn, MSE, RSA, S17, decksPerShoe, minBet, maxBet, shufflePoint, surrender, blackjackPayRatio, MHFS } = conditions;
    const penn: number = Math.round(shufflePoint * 1000 / (52 * decksPerShoe)) / 10;
    let rules = { top: [], bottom: [] };
    rules.top.push(DAS ? 'DAS' : 'NO DAS');
    rules.top.push(RSA ? 'RSA' : 'NO RSA');
    rules.top.push(MSE ? 'MSE' : 'NO MSE');
    rules.top.push(S17 ? 'S17' : 'H17');
    rules.top.push(`${ penn }%`);
    rules.top.push(`MHFS:${MHFS}`);
    rules.bottom.push(surrender ? 'Late Surrender' : 'No Surrender');
    rules.bottom.push(`${ decksPerShoe } deck`);
    rules.bottom.push(this.payRatioMap[blackjackPayRatio]);
    rules.bottom.push(`${ minBet } min / ${ maxBet } max`);
    return rules;
  }

  ngOnDestroy(): void {
    this.headerFooterService.removeVariationLink('classic/customizations');
  }

  // This component should check that for a table, the players exist and there are no players assigned to a seat that doesnt exist because of the conditions.spotsPerTable value
  // For a player it checko that all the strategies that a player has do infact exist
  // If a player's strategy doesnt exist or a set of conditions done exist or if the number od spots are insufficient (or all of these), then:
  // (1) the player / conditions will have a red outline in the UI snd should be click-able
  //    clicking the ui should make a modal appear describing the problem
  // (2) an error modal will appear if the user tries to run a simulation, a modal should appear describing the problem(s)
  // The simulation should NOT run until all problems are dealt with.
}