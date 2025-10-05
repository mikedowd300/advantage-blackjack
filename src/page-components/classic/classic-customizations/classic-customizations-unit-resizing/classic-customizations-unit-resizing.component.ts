import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJTooltipComponent } from '../../../../shared-components/abj-tooltip/abj-tooltip.component';
import { ABJRadioButtonGroupComponent } from '../../../../shared-components/abj-radio-group/abj-radio-group.component';
import {
  RoundingMethodEnum,
  ChipTypeEnum,
  UnitResizeStrategy,
  chipTypeRadioGroup,
  roundingMethodRadioGroup,
  RadioButtonGroup
} from '../../../../classic-blackjack/classic-models/classic-strategies.models';
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
  imports: [
    ABJStrategySelectorComponent,
    ABJTooltipComponent,
    ABJRadioButtonGroupComponent,
    CommonModule,
    FormsModule
  ],
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
  roundToRadioGroup: RadioButtonGroup = chipTypeRadioGroup;
  roundMethodRadioGroup = roundingMethodRadioGroup;
  roundToValue: ChipTypeEnum = ChipTypeEnum.RED;
  roundMethodValue: RoundingMethodEnum = RoundingMethodEnum.ROUND;
  whatsThisRoundTo: string = 'Decimal betting unit resize progression are allowed, but may result in a betting unit such as 12.40. In a casino, this bet size in not allowed. Partial bet sizes round to a white or red chip. This ensures a more realistic casino experience.'
  whatsThisMethod: string = 'Using a decimal betting unit resize progression, bet sizes round to a whole number, the rounding methods are: round down (3.9 rounds to 3), round up, (3.1 rounds to 4) or round off (3.4 rounds to 3, 3.5 rounds to 4).'

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
  }

  deleteResizingPoint() {
    const { unitProgression, increaseAtMultiple, decreaseAtMultiple } = this.activeStrategy;
    if(unitProgression.length > 1) {
      unitProgression.pop();
      increaseAtMultiple.pop();
      decreaseAtMultiple.pop();
      increaseAtMultiple[unitProgression.length - 1] = null;
    }
  }

  createToolTipBody(): void {
    const { unitProgression, increaseAtMultiple, decreaseAtMultiple } = this.activeStrategy;
    this.toolTipBody = unitProgression.map((u, i) => {
      if(i === 0) {
        return `Your betting unit (BU) resizes to ${u + 1} times your original BU when your bankroll grows to ${increaseAtMultiple[i]} times your original BU.`
      } else if (i < unitProgression.length - 1) {
        return `Your betting unit (BU) resizes to ${u + 1} times your original BU when your bankroll grows to ${increaseAtMultiple[i]} times your original BU. If your BU has already resized, then, if your bankroll falls below ${decreaseAtMultiple[i]} times your original BU, your BU will resize to ${u - 1} times your original BU (the previous BU size).`
      } else {
        return `Your betting unit (BU) of ${u[i]} times your original (BU) will resize down to ${u[i - 1]} times your original (BU) if your bankroll falls below ${decreaseAtMultiple[i]} times your original (BU).`;
      }
    })
  }

  createToolTipIds(): void {
    const { unitProgression } = this.activeStrategy;
    this.toolTipIds = unitProgression.map((u, i) => `unit-resizing-${u}-${i}`);
  }

  handleTooltipOpen(id: string): void {
    this.tooltipService.activeId$.next(id);
  }

  handleTooltipClose(): void {
    this.tooltipService.tooltipCloser$.next();
  }

  handleRadioAction(event, id): void {
    console.log(event, id);
    console.log(this.activeStrategy);
  }
}