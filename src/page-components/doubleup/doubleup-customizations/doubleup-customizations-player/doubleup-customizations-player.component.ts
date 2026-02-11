import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJSelectComponent } from '../../../../shared-components/abj-select/abj-select.component';
import { PlayerConfig } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { doubleupPlayerTitles, doubleupPlayers, doubleupDefaultPlayer } from "../../../../doubleup-blackjack/default-doubleup-configs/player-config";
import { BehaviorSubject } from 'rxjs';
import { doubleupPlayTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/play-strategies";
import { doubleupTippingTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/tipping-plan";
import { doubleupBetSpreadTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/bet-spread-strategies";
import { doubleupInsuranceTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/insurance-plan";
import { doubleupUnitResizingStrategyTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/unit-resize-strategies";
import { doubleupCountTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/counting-methods";
import { doubleupWongingTitles } from "../../../../doubleup-blackjack/default-doubleup-configs/wonging-strategies";
import { LocalStorageService } from '../../../../services/local-storage.service';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-player',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJSelectComponent, FormsModule],
  templateUrl: './doubleup-customizations-player.component.html',
  styleUrl: './doubleup-customizations-player.component.scss'
})
export class DoubleupCustomizationsPlayerComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Player";
  defaultStrategy: PlayerConfig = { ...doubleupDefaultPlayer };
  activeStrategy: PlayerConfig;
  activeStrategy$: BehaviorSubject<PlayerConfig> = new BehaviorSubject<PlayerConfig>(doubleupDefaultPlayer);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: PlayerConfig } = doubleupPlayers;
  strategyTitles: string[] = doubleupPlayerTitles;
  selectableStrategies: any[] = [
    { 
      lsEnum: LocalStorageItemsEnum.PLAY,
      key: 'playStrategyTitle',
      text: 'Play Chart',
      titles: [ ...doubleupPlayTitles],
    },
    {
      lsEnum: LocalStorageItemsEnum.BET_SPREAD,
      key: 'betSpreadStrategyTitle',
      text: 'Bet Spread Strategy', 
      titles: [ ...doubleupBetSpreadTitles],
    },
    {
      lsEnum: LocalStorageItemsEnum.UNIT_RESIZE, 
      key: 'unitResizingStrategyTitle', 
      text: 'Unit Resizing Strategy', 
      titles: [ ...doubleupUnitResizingStrategyTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.TIPPING,
      key: 'tippingStrategyTitle',
      text: 'Tipping Strategy', 
      titles: [ ...doubleupTippingTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.WONG,
      key: 'wongingStrategyTitle', 
      text: 'Wonging Strategy', 
      titles: [ ...doubleupWongingTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.COUNT,
      key: 'countStrategyTitle', 
      text: 'Counting Method', 
      titles: [ ...doubleupCountTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.INSURANCE,
      key: 'insurancePlanTitle',
      text: 'Insurance Plan', 
      titles: [ ...doubleupInsuranceTitles],
    },
  ];

  constructor(
    private headerFooterService: HeaderFooterService,
    private lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activeStrategy$.pipe().subscribe(strategy => this.activeStrategy = strategy);
    this.headerFooterService.updateTheTagline$.next('Create players with the exact habits and strategies you want to sim.');
    this.selectableStrategies.forEach(
      t => this.getDynamicTitles(t.lsEnum).forEach(dt => t.titles.push(dt))
    );
  }

  getDynamicTitles(storageEnum: LocalStorageItemsEnum): string[] {
    const dynamicStrategies: string[] = 
      Object.keys(this.lsService.getItemOfVariation(storageEnum, LocalStorageVariationKeys.DOUBLE_UP));
    return [ ...dynamicStrategies ];
  }

  selectStrategy(event: string, key: string) {
    let tempStrategy: PlayerConfig = { ...this.activeStrategy };
    tempStrategy[key] = event;
    this.activeStrategy$.next(tempStrategy)
  }
}