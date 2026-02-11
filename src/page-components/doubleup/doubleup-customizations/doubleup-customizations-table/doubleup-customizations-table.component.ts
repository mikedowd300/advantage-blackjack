import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJSelectComponent } from '../../../../shared-components/abj-select/abj-select.component';
import { TableConfig } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { doubleupTableTitles, doubleupTables, doubleupDefaultTable } from "../../../../doubleup-blackjack/default-doubleup-configs/table-config";
import { BehaviorSubject } from 'rxjs';
import { doubleupConditionTitles, doubleupConditions } from '../../../../doubleup-blackjack/default-doubleup-configs/conditions';
import { doubleupPlayerTitles } from '../../../../doubleup-blackjack/default-doubleup-configs/player-config';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-table',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJSelectComponent, FormsModule, CommonModule],
  templateUrl: './doubleup-customizations-table.component.html',
  styleUrl: './doubleup-customizations-table.component.scss'
})
export class DoubleupCustomizationsTableComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Table";
  defaultStrategy: TableConfig = { ...doubleupDefaultTable };
  activeStrategy: TableConfig = { ...doubleupDefaultTable };
  activeStrategy$: BehaviorSubject<TableConfig> = new BehaviorSubject<TableConfig>(doubleupDefaultTable);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: TableConfig } = doubleupTables;
  strategyTitles: string[] = doubleupTableTitles;
  seatsAtTable: number;
  playersBySeat: string[];
  conditionTitles: string[];
  availablePlayerTitles: string[] = [];
  conditionTitles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(doubleupConditionTitles);
  availablePlayerTitles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(doubleupPlayerTitles);
  showErrorModal: boolean = false;
  seatsAtNewTable: number;
  highestRankedTakenSeat: number;

  constructor(
    private localStorageService: LocalStorageService,
    private headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.headerFooterService.updateTheTagline$.next('Create tables with the players and table conditions you want to sim.');
    this.conditionTitles$.pipe().subscribe(titles => this.conditionTitles = titles);
    this.availablePlayerTitles$.pipe().subscribe(aTitles => this.availablePlayerTitles = [ ...aTitles ]);
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy;
      this.seatsAtTable = this.getSeatsAtTableFromTitle(strategy.conditionsTitle);
      this.playersBySeat = this.getPlayersBySeat();
      const localConditionTitles: string[] = this.getLocalConditionTitles();
      this.conditionTitles$.next([ ...doubleupConditionTitles, ...localConditionTitles ]);
      this.filterAvailablePlayerTitles();
    });
  }

  getLocalConditionTitles(): string[] {
    let titles: string[] = [];
    const localConditions = this.localStorageService.
      getItemOfVariation(this.localStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.DOUBLE_UP);
    Object.keys(localConditions).forEach(key => titles.push(localConditions[key].title));
    return titles;
  }

  getLocalPlayerTitles(): string[] {
    let titles: string[] = [];
    const localPlayers = this.localStorageService.
      getItemOfVariation(this.localStorageItemsEnum.PLAYER_CONFIG, LocalStorageVariationKeys.DOUBLE_UP);
    Object.keys(localPlayers).forEach(key => titles.push(localPlayers[key].title));
    return titles;
  }

  filterAvailablePlayerTitles(): void {
    const takenTitles: string[] = this.playersBySeat.filter(p => p);
    const titles: string[] = [ ...doubleupPlayerTitles, ...this.getLocalPlayerTitles() ]
      .filter(t => !takenTitles.includes(t));
    this.availablePlayerTitles$.next(titles);
  }

  selectCondition(conditionsTitle: string): void {
    this.seatsAtNewTable = this.getSeatsAtTableFromTitle(conditionsTitle);
    const seatingPositions = this.activeStrategy.players.map(p => p.seatNumber);
    this.highestRankedTakenSeat = Math.max(...seatingPositions);
    if(this.seatsAtNewTable >= this.highestRankedTakenSeat) {
      this.activeStrategy.conditionsTitle = conditionsTitle;
      this.activeStrategy$.next(this.activeStrategy);
    } else {
      this.showErrorModal = true;
    }
  }

  getPlayersBySeat(): string[] {
    let takenBy: string[] = [];
    for(let s = 0; s < this.seatsAtTable; s++) {
      takenBy.push(null);
    }
    this.activeStrategy.players
      .forEach(p => {
        if(p.seatNumber - 1 < this.seatsAtTable) {
          takenBy[p.seatNumber - 1] = p.playerConfigTitle
        }
      });
    return takenBy;
  }

  selectPlayerForSeat(playerConfigTitle, seatNumber: number): void {
    this.availablePlayerTitles$.next([ ...this.availablePlayerTitles.filter(t => t !== playerConfigTitle) ]);
    this.activeStrategy.players.push({ seatNumber, playerConfigTitle });
    this.playersBySeat = this.getPlayersBySeat();
  }

  addPlayerToAvailablePlayerList(title: string, seatNumber: number): void {
    this.availablePlayerTitles$.next([ ...this.availablePlayerTitles, title ]);
    this.activeStrategy.players = this.activeStrategy.players.filter(p => p.seatNumber !== seatNumber);
    this.playersBySeat = this.getPlayersBySeat();
  }

  getSeatsAtTableFromTitle(title: string): number {
    const storedConditionConfigs = this.localStorageService.getItemOfVariation(this.localStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.DOUBLE_UP);
    const conditionConfig = storedConditionConfigs[title] || doubleupConditions[title];
    return conditionConfig.spotsPerTable;
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
    const el: any = document.querySelector('#condition-selector select');
    el.value = this.activeStrategy.conditionsTitle;
  }
}