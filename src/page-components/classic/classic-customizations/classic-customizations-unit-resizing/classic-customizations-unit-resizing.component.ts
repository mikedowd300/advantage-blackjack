import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJTooltipComponent } from '../../../../shared-components/abj-tooltip/abj-tooltip.component';
import { UnitResizeStrategy } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicUnitResizingStrategyTitles,
  classicUnitResizingStrategies,
  classicDefaultUnitResizeStrategy
} from "../../../../classic-blackjack/default-classic-configs/unit-resize-strategies";
import { BehaviorSubject } from 'rxjs';
import { TooltipService } from '../../../../services/tooltip.service';

@Component({
  selector: 'classic-customizations-unit-resizing',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJTooltipComponent, CommonModule, FormsModule],
  templateUrl: './classic-customizations-unit-resizing.component.html',
  styleUrl: './classic-customizations-unit-resizing.component.scss'
})
export class ClassicCustomizationsUnitResizingComponent implements OnInit {
  title: string = "Add, Edit or Delete a Bet Spread strategy";
  defaultStrategy: UnitResizeStrategy = { ...classicDefaultUnitResizeStrategy };
  activeStrategy: UnitResizeStrategy = { ...classicDefaultUnitResizeStrategy };
  activeStrategy$: BehaviorSubject<UnitResizeStrategy> = new BehaviorSubject<UnitResizeStrategy>(classicDefaultUnitResizeStrategy);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  defaultSpreads = classicUnitResizingStrategies;
  allStrategies: { [k: string]: UnitResizeStrategy};
  allStrategyTitles: string[];
  defaultStrategyTitles: string[] = classicUnitResizingStrategyTitles;
  toolTipBody: string[];
  toolTipIds: string[];

  constructor(
    private emailjs: EmailjsService,
    public tooltipService: TooltipService,
  ) {}

  ngOnInit(): void {
    this.createToolTipBody();
    this.createToolTipIds();
    this.emailjs.setPreviousScreen$.next('Classic Custom Unit Resizing');
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy
      this.createToolTipBody();
    });
    console.log(this.activeStrategy);

    console.log(this.defaultStrategyTitles);
    console.log(classicUnitResizingStrategyTitles);

    this.tooltipService.tooltipCloser$.pipe()
      .subscribe(() => this.tooltipService.activeId$.next('-1'))
  }

  addResizingPoint() {
    const maxUnit = Math.max(...this.activeStrategy.unitProgression);
    const maxIncrease = Math.max(...this.activeStrategy.increaseAtMultiple);
    const maxDecrease = Math.max(...this.activeStrategy.decreaseAtMultiple);
    this.activeStrategy.unitProgression.push(maxUnit + 1);
    this.activeStrategy.increaseAtMultiple.push(maxIncrease + 1000);
    this.activeStrategy.decreaseAtMultiple.push(maxDecrease + 1000);
    console.log(this.activeStrategy);
  }

  deleteResizingPoint() {
    const { unitProgression, increaseAtMultiple, decreaseAtMultiple } = this.activeStrategy;
    if(unitProgression.length > 1) {
      unitProgression.pop();
      increaseAtMultiple.pop();
      decreaseAtMultiple.pop();
      increaseAtMultiple[unitProgression.length - 1] = null;
      console.log(this.activeStrategy);
    }
  }

  createToolTipBody(): void {
    const { unitProgression, increaseAtMultiple, decreaseAtMultiple } = this.activeStrategy;
    this.toolTipBody = unitProgression.map((u, i) => {
      if(i === 0) {
        return `This means your betting unit resizes to ${u + 1} times your original betting unit when your bankroll grows to ${increaseAtMultiple[i]} times your original betting unit.`
      } else if (i < unitProgression.length - 1) {
        return `This means your betting unit resizes to ${u + 1} times your original betting unit when your bankroll grows to ${increaseAtMultiple[i]} times your original betting unit. If your betting unit has already resized, then, if your bankroll falls below ${decreaseAtMultiple[i]} times your original betting unit, your betting unit will resize to ${u - 1} times your original betting unit (the previous betting unit size).`
      } else {
        return `Your betting unit of ${u[i]} times your original betting unit will resize down to ${u[i - 1]} times your original betting unit if your bankroll falls below ${decreaseAtMultiple[i]} times your original betting unit.`;
      }
    })
  }

  createToolTipIds(): void {
    const { unitProgression } = this.activeStrategy;
    this.toolTipIds = unitProgression.map((u, i) => `unit-resizing-${u}-${i}`);
  }

  handleTooltipOpen(id: string) {
    this.tooltipService.activeId$.next(id);
  }

  handleTooltipClose() {
    this.tooltipService.tooltipCloser$.next();
  }
}

// "title":"sdfsf",

// "unitProgression":[1,2,3,4,5,6,7,8,10],

// "increaseAtMultiple":[30000,70000,110000,150000,200000,250000,300000,350000,400000,null],

// "decreaseAtMultiple":[null,50000,90000,130000,170000,220000,270000,320000,370000],

// "roundToNearest":"red",

// "roundingMethod":"ceiling"