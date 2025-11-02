import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJSelectComponent } from '../../../../shared-components/abj-select/abj-select.component';
import { PlayerConfig } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicPlayerTitles, classicPlayers, classicDefaultPlayer } from "../../../../classic-blackjack/default-classic-configs/player-config";
import { BehaviorSubject } from 'rxjs';

import { classicPlayTitles } from "../../../../classic-blackjack/default-classic-configs/play-strategies";
import { classicTippingTitles } from "../../../../classic-blackjack/default-classic-configs/tipping-plan";
import { classicBetSpreadTitles } from "../../../../classic-blackjack/default-classic-configs/bet-spread-strategies";
import { classicInsuranceTitles } from "../../../../classic-blackjack/default-classic-configs/insurance-plan";
import { classicUnitResizingStrategyTitles } from "../../../../classic-blackjack/default-classic-configs/unit-resize-strategies";
import { classicCountTitles } from "../../../../classic-blackjack/default-classic-configs/counting-methods";
import { classicWongingTitles } from "../../../../classic-blackjack/default-classic-configs/wonging-strategies";

import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'classic-customizations-player',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJSelectComponent, FormsModule],
  templateUrl: './classic-customizations-player.component.html',
  styleUrl: './classic-customizations-player.component.scss'
})
export class ClassicCustomizationsPlayerComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Player";
  defaultStrategy: PlayerConfig = { ...classicDefaultPlayer };
  activeStrategy: PlayerConfig;
  activeStrategy$: BehaviorSubject<PlayerConfig> = new BehaviorSubject<PlayerConfig>(classicDefaultPlayer);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: PlayerConfig } = classicPlayers;
  strategyTitles: string[] = classicPlayerTitles;
  selectableStrategies: any[] = [
    { 
      lsEnum: LocalStorageItemsEnum.PLAY,
      key: 'playStrategyTitle',
      text: 'Play Chart',
      titles: [ ...classicPlayTitles],
    },
    {
      lsEnum: LocalStorageItemsEnum.BET_SPREAD,
      key: 'betSpreadStrategyTitle',
      text: 'Bet Spread Strategy', 
      titles: [ ...classicBetSpreadTitles],
    },
    {
      lsEnum: LocalStorageItemsEnum.UNIT_RESIZE, 
      key: 'unitResizingStrategyTitle', 
      text: 'Unit Resizing Strategy', 
      titles: [ ...classicUnitResizingStrategyTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.TIPPING,
      key: 'tippingStrategyTitle',
      text: 'Tipping Strategy', 
      titles: [ ...classicTippingTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.WONG,
      key: 'wongingStrategyTitle', 
      text: 'Wonging Strategy', 
      titles: [ ...classicWongingTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.COUNT,
      key: 'countStrategyTitle', 
      text: 'Counting Method', 
      titles: [ ...classicCountTitles],
    },
    { 
      lsEnum: LocalStorageItemsEnum.INSURANCE,
      key: 'insurancePlanTitle',
      text: 'Insurance Plan', 
      titles: [ ...classicInsuranceTitles],
    },
  ];

  constructor(
    private emailjs: EmailjsService, 
    private lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activeStrategy$.pipe().subscribe(strategy => this.activeStrategy = strategy);
    this.emailjs.setPreviousScreen$.next('Classic Custom Player');
    this.selectableStrategies.forEach(
      t => this.getDynamicTitles(t.lsEnum).forEach(dt => t.titles.push(dt))
    );
  }

  getDynamicTitles(storageEnum: LocalStorageItemsEnum): string[] {
    const dynamicStrategies: string[] = 
      Object.keys(this.lsService.getItemOfVariation(storageEnum, LocalStorageVariationKeys.CLASSIC));
    return [ ...dynamicStrategies ];
  }

  selectStrategy(event: string, key: string) {
    let tempStrategy: PlayerConfig = { ...this.activeStrategy };
    tempStrategy[key] = event;
    this.activeStrategy$.next(tempStrategy)
  }
}