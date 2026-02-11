import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { WongStrategy } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { doubleupWongingTitles, doubleupWongs, doubleupDefaultWong } from "../../../../doubleup-blackjack/default-doubleup-configs/wonging-strategies";
import { BehaviorSubject } from 'rxjs';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-wonging',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './doubleup-customizations-wonging.component.html',
  styleUrl: './doubleup-customizations-wonging.component.scss'
})
export class DoubleupCustomizationsWongingComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Wongin Strategy";
  defaultStrategy: WongStrategy = { ...doubleupDefaultWong };
  activeStrategy: WongStrategy = { ...doubleupDefaultWong };
  activeStrategy$: BehaviorSubject<WongStrategy> = new BehaviorSubject<WongStrategy>(doubleupDefaultWong);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: WongStrategy } = doubleupWongs;
  strategyTitles: string[] = doubleupWongingTitles;
  maxEnterAt: number;
  maxExitBelow: number;
  minEnterAt: number;
  minExitBelow: number;

  constructor(private headerFooterService: HeaderFooterService) {}

  ngOnInit(): void {
    this.headerFooterService.updateTheTagline$.next('Make a plan to wong in and out of additional hands.');
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy
      this.maxEnterAt = Math.max(...strategy.wongedHands.map(h => h.enterAt));
      this.maxExitBelow = Math.max(...strategy.wongedHands.map(h => h.exitBelow));
      this.minEnterAt = Math.min(...strategy.wongedHands.map(h => h.enterAt));
      this.minExitBelow = Math.min(...strategy.wongedHands.map(h => h.exitBelow));
    });
  }

  addUpperWong() {
    this.activeStrategy.wongedHands.push({ 
      enterAt: this.activeStrategy.wongedHands.length > 0 ? this.maxEnterAt + 1 : 1, 
      exitBelow: this.activeStrategy.wongedHands.length > 0 ? this.maxExitBelow + 1 : 0,
      isActive: false,
    });
    this.activeStrategy$.next(this.activeStrategy);
  }

  addLowerWong() {
    this.activeStrategy.wongedHands.unshift({ 
      enterAt: this.activeStrategy.wongedHands.length > 0 ? this.minEnterAt - 1 : 1, 
      exitBelow: this.activeStrategy.wongedHands.length > 0 ? this.minEnterAt - 2 : 0,
      isActive: false,
    });
    this.activeStrategy$.next(this.activeStrategy);
  }

  deleteUpperWong() {
    this.activeStrategy.wongedHands.pop();
    this.activeStrategy$.next(this.activeStrategy);
  }

  deleteLowerWong() {
    this.activeStrategy.wongedHands.shift();
    this.activeStrategy$.next(this.activeStrategy);
  }
}