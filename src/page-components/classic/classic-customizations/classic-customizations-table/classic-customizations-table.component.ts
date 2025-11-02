import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJSelectComponent } from '../../../../shared-components/abj-select/abj-select.component';
import { TableConfig } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicTableTitles, classicTables, defaultClassicTable } from "../../../../classic-blackjack/default-classic-configs/table-config";
import { BehaviorSubject } from 'rxjs';
import { classicConditionTitles, classicConditions } from '../../../../classic-blackjack/default-classic-configs/conditions';
import { classicPlayerTitles } from '../../../../classic-blackjack/default-classic-configs/player-config';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'classic-customizations-table',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJSelectComponent, FormsModule, CommonModule],
  templateUrl: './classic-customizations-table.component.html',
  styleUrl: './classic-customizations-table.component.scss'
})
export class ClassicCustomizationsTableComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Table";
  defaultStrategy: TableConfig = { ...defaultClassicTable };
  activeStrategy: TableConfig = { ...defaultClassicTable };
  activeStrategy$: BehaviorSubject<TableConfig> = new BehaviorSubject<TableConfig>(defaultClassicTable);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: TableConfig } = classicTables;
  strategyTitles: string[] = classicTableTitles;
  seatsAtTable: number;
  playersBySeat: string[];
  conditionTitles: string[];
  availablePlayerTitles: string[] = [];
  conditionTitles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(classicConditionTitles);
  availablePlayerTitles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(classicPlayerTitles);
  showErrorModal: boolean = false;
  seatsAtNewTable: number;
  highestRankedTakenSeat: number;

  constructor(
    private emailjs: EmailjsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Table');
    
    this.conditionTitles$.pipe().subscribe(titles => this.conditionTitles = titles);

    this.availablePlayerTitles$.pipe().subscribe(aTitles => this.availablePlayerTitles = [ ...aTitles ]);

    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy;
      this.seatsAtTable = this.getSeatsAtTableFromTitle(strategy.conditionsTitle);
      this.playersBySeat = this.getPlayersBySeat();
      const localConditionTitles: string[] = this.getLocalConditionTitles();
      this.conditionTitles$.next([ ...classicConditionTitles, ...localConditionTitles ]);
      this.filterAvailablePlayerTitles();
    });
  }

  getLocalConditionTitles(): string[] {
    let titles: string[] = [];
    const localConditions = this.localStorageService.
      getItemOfVariation(this.localStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.CLASSIC);
    Object.keys(localConditions).forEach(key => titles.push(localConditions[key].title));
    return titles;
  }

  getLocalPlayerTitles(): string[] {
    let titles: string[] = [];
    const localPlayers = this.localStorageService.
      getItemOfVariation(this.localStorageItemsEnum.PLAYER_CONFIG, LocalStorageVariationKeys.CLASSIC);
    Object.keys(localPlayers).forEach(key => titles.push(localPlayers[key].title));
    return titles;
  }

  filterAvailablePlayerTitles(): void {
    const takenTitles: string[] = this.playersBySeat.filter(p => p);
    const titles: string[] = [ ...classicPlayerTitles, ...this.getLocalPlayerTitles() ]
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

    // Happy path - the UI should update immediatly

    // Aside from saving the new condition's title in the activeStrategy, we need to make sure that the new condition's spotsPerTable value accomodates activeStrategy.players seating arrangements. This means that if activeStrategy.players contains a player with a seat nuber greater that new condition's spotsPerTable value there is a problem.

    // *** Detecting The Problem ***
    // get all the conditions
    // find the selected condition
    // get the spotsPerTable value - this.seatsAtTable = new condition's spotsPerTable value
    // make sure that the no current players seatNumber value is greated than the amount of seats at the table

    // *** Handling the error ***
    // Display a modal with an explanation that the selected conditions doesn't accomodate the players seat values and that the new conditions selection was not excepted. The error message should call 2 solutions.One would be to edit the spotsPerTable in the conditions, and the second would be to adjust the current seating of players. Closing the modal should land the user on the conditions.
    // the error should give the chance to edit the spotsPerTable in the conditions.
    // UNSET THE CONDITION SELECTION
    
    // *** Additional UI Changes ****
    // A tool tip should exist on the conditions calling out the potential for the seating mismatch.
    // Filtering the invalid seating solutions is not the solution we want as it may cause more confusion.
    // After the user does successfully select conditions with a different spotsPerTable value, the UI should update.
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
    const storedConditionConfigs = this.localStorageService.getItemOfVariation(this.localStorageItemsEnum.CONDITIONS, LocalStorageVariationKeys.CLASSIC);
    const conditionConfig = storedConditionConfigs[title] || classicConditions[title];
    return conditionConfig.spotsPerTable;
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
    const el: any = document.querySelector('#condition-selector select');
    el.value = this.activeStrategy.conditionsTitle;
  }
}