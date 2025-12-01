import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { EmailjsService } from '../../../../services/emailjs.service';
import { 
  CardNameEnum,
  CountingMethod,
  RoundingMethodEnum 
} from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicCountTitles,
  classicCounts,
  defaultClassicCount 
} from "../../../../classic-blackjack/default-classic-configs/counting-methods";
import {
  ABJStrategySelectorComponent
} from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJTooltipComponent } from '../../../../shared-components/abj-tooltip/abj-tooltip.component';
import { TooltipService } from '../../../../services/tooltip.service';   
import { HeaderFooterService } from '../../../../services/header-footer.service';
  
@Component({
  selector: 'classic-customizations-custom-counting-system',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJTooltipComponent, CommonModule, FormsModule],
  templateUrl: './classic-customizations-custom-counting-system.component.html',
  styleUrl: './classic-customizations-custom-counting-system.component.scss'
})
export class ClassicCustomizationsCustomCountingSystemComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Counting System";
  defaultStrategy: CountingMethod = { ...defaultClassicCount };
  activeStrategy$: BehaviorSubject<CountingMethod> = new BehaviorSubject<CountingMethod>(defaultClassicCount);
  activeStrategy: CountingMethod = { ...defaultClassicCount };
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: CountingMethod } = classicCounts;
  strategyTitles: string[] = classicCountTitles;
  cardNames: string[] = Object.keys(CardNameEnum).map(n => CardNameEnum[n]);
  suits = [
    { text: 'Heart', key: 'heart'},
    { text: 'Diamond', key: 'diamond' },
    { text: 'Club', key: 'club' },
    { text: 'Spade', key: 'spade' },
  ];
  toolTipBody: { [k: string]: string } = {
    'count-details-tip': 'The True Count is used for betting decisions and play deviations.',
    'rounding-down-tip': 'When calculating the true count, an unrounded true count of 1.9 will round to 1',
    'rounding-off-tip': 'When calculating the true count, an unrounded true count of 1.4 will round to 1 and an unrounded true count of 1.5 will round to 2',
    'start-count-at-zero-tip': 'The running count before any cards are dealt is 0.',
    'count-offset-per-deck': 'The running is offset by this amount of cards for every deck in the shoe',
    'suit-aware': 'The suit of the card matters to the count value of the card.',
    'ace-side-count': 'An ace, side count is used for more accurate playing and betting decisions.',
  };

  constructor(
    private emailjs: EmailjsService, 
    public tooltipService: TooltipService,
    private headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.activeStrategy$.pipe().subscribe(strategy => this.activeStrategy = strategy);
    this.emailjs.setPreviousScreen$.next('Classic Custom Counting System');
    this.headerFooterService.updateTheTagline$.next('Use an existing counting system, or implement your own.');
    this.tooltipService.tooltipCloser$.pipe()
      .subscribe(() => this.tooltipService.activeId$.next('-1'))
  }
  
  handleTooltipOpen(id: string): void {
    this.tooltipService.activeId$.next(id);
  }

  handleTooltipClose(): void {
    this.tooltipService.tooltipCloser$.next();
  }

  handleRoundMethodChange() {
    this.activeStrategy.roundingMethod = this.activeStrategy.roundingMethod === RoundingMethodEnum.FLOOR
      ? RoundingMethodEnum.ROUND
      : RoundingMethodEnum.FLOOR;
  }
}