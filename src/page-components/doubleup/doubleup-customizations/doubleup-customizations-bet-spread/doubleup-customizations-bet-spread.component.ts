import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BetSpreadStrategy } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { 
  doubleupBetSpreads, 
  defaultDoubleupBetSpread, 
  doubleupBetSpreadTitles 
} from '../../../../doubleup-blackjack/default-doubleup-configs/bet-spread-strategies';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-bet-spread',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    ABJCheckboxComponent,
    ABJStrategySelectorComponent
  ],
  templateUrl: './doubleup-customizations-bet-spread.component.html',
  styleUrl: './doubleup-customizations-bet-spread.component.scss'
})
export class DoubleupCustomizationsBetSpreadComponent implements OnInit {
  title: string = "Add, Edit or Delete a Bet Spread strategy";
  defaultStrategy: BetSpreadStrategy = { ...defaultDoubleupBetSpread };
  activeStrategy: BetSpreadStrategy = { ...defaultDoubleupBetSpread };
  activeStrategy$: BehaviorSubject<BetSpreadStrategy> = new BehaviorSubject<BetSpreadStrategy>(defaultDoubleupBetSpread);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  defaultSpreads = doubleupBetSpreads;
  allStrategies: { [k: string]: BetSpreadStrategy};
  allStrategyTitles: string[];
  defaultStrategyTitles: string[] = doubleupBetSpreadTitles;
  strategyKeys: string[] = Object.keys(defaultDoubleupBetSpread);
  spreadKeys: number[];
  maxSpreadKey: number;
  minSpreadKey: number;
  constructor(
    private headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.headerFooterService.updateTheTagline$.next('Use an existing bet spread strategy, or create your own.');
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy;
      this.spreadKeys = Object.keys(this.activeStrategy.spreads)
        .map(key => parseFloat(key))
        .sort((a, b) => a - b);
      this.minSpreadKey = this.spreadKeys[0];
      this.maxSpreadKey = [ ...this.spreadKeys].reverse()[0];
      this.activeStrategy.useHalfCount = this.activeStrategy.useHalfCount;
    });
  }

  deleteUpperCountSpread() {
    if(this.spreadKeys.length > 1) {
      const maxKey = Math.max(...Object.keys(this.activeStrategy.spreads)
        .map(key => parseFloat(key)));
      if(maxKey > 0) {
        this.spreadKeys = Object.keys(this.activeStrategy.spreads)
          .map(key => parseFloat(key))
          .filter(key => key !== maxKey)
          .sort((a, b) => a - b);
        let newSpreads = {};
        this.spreadKeys.forEach(key => newSpreads[key] = this.activeStrategy.spreads[key]);
        this.minSpreadKey = this.spreadKeys[0];
        this.maxSpreadKey = [ ...this.spreadKeys].reverse()[0];
        this.activeStrategy.spreads = { ...newSpreads };
        this.activeStrategy$.next(this.activeStrategy);
      }
    }
  }

  deleteLowerCountSpread() {
    if(this.spreadKeys.length > 1) {
      const minKey: number = Math.min(...Object.keys(this.activeStrategy.spreads)
        .map(key => parseFloat(key)));
      if(minKey < 0) {
        this.spreadKeys = Object.keys(this.activeStrategy.spreads)
          .map(key => parseFloat(key))
          .filter(key => key !== minKey)
          .sort((a, b) => a - b);
        this.minSpreadKey = this.spreadKeys[0];
        this.maxSpreadKey = [ ...this.spreadKeys].reverse()[0];
        let newSpreads = {};
        this.spreadKeys.forEach(key => newSpreads[key] = this.activeStrategy.spreads[key]);
        this.activeStrategy.spreads = { ...newSpreads };
        this.activeStrategy$.next(this.activeStrategy);
      }
    }
  }

  addUpperCountSpread() {
    const maxKey: number = Math.max(...Object.keys(this.activeStrategy.spreads).map(key => parseFloat(key)));
    const inc = this.activeStrategy.useHalfCount ? .5 : 1;
    const newMaxVal = this.activeStrategy.spreads[maxKey] + 1;
    this.activeStrategy.spreads[maxKey + inc] = newMaxVal;
    this.spreadKeys = Object.keys(this.activeStrategy.spreads)
      .map(key => parseFloat(key))
      .sort((a, b) => a - b);
    this.minSpreadKey = this.spreadKeys[0];
    this.maxSpreadKey = [ ...this.spreadKeys].reverse()[0];
    this.activeStrategy$.next(this.activeStrategy);
  }

  addLowerCountSpread() {
    const minKey: number = Math.min(...Object.keys(this.activeStrategy.spreads).map(key => parseFloat(key)));
    const dec = this.activeStrategy.useHalfCount ? -.5 : -1;
    const minVal = this.activeStrategy.spreads[minKey];
    this.activeStrategy.spreads[minKey + dec] = minVal;
    this.spreadKeys = Object.keys(this.activeStrategy.spreads)
      .map(key => parseFloat(key))
      .sort((a, b) => a - b);
    this.minSpreadKey = this.spreadKeys[0];
    this.maxSpreadKey = [ ...this.spreadKeys].reverse()[0];
    this.activeStrategy$.next(this.activeStrategy);
  }

  updateHalfCountUsage(val: boolean): void {
    this.activeStrategy.useHalfCount = val;
    this.activeStrategy$.next(this.activeStrategy);
  }
}
