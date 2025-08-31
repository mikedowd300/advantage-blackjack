import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { WongStrategy } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicWongingTitles, classicWongs, classicDefaultWong } from "../../../../classic-blackjack/default-classic-configs/wonging-strategies";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-wonging',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-wonging.component.html',
  styleUrl: './classic-customizations-wonging.component.scss'
})
export class ClassicCustomizationsWongingComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Wongin Strategy";
  defaultStrategy: WongStrategy = { ...classicDefaultWong };
  activeStrategy: WongStrategy = { ...classicDefaultWong };
  activeStrategy$: BehaviorSubject<WongStrategy> = new BehaviorSubject<WongStrategy>(classicDefaultWong);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: WongStrategy } = classicWongs;
  strategyTitles: string[] = classicWongingTitles;
  maxEnterAt: number;
  maxExitBelow: number;
  minEnterAt: number;
  minExitBelow: number;

  constructor() {}

  ngOnInit(): void {
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