import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { 
  AbbreviatedDoubleupConditions,
  defaultFullDoubleupConditions,
  DisplayWith,
  DoubleupConditions,
} from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  doubleupDefaultConditions,
  doubleupConditions,
  doubleupConditionTitles
} from '../../../../doubleup-blackjack/default-doubleup-configs/conditions';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { ABJNumberInputComponent } from '../../../../shared-components/abj-number-input/abj-number-input.component';
import { ABJRadioButtonGroupComponent } from '../../../../shared-components/abj-radio-group/abj-radio-group.component';
import { ABJContentAccordionComponent } from '../../../../shared-components/abj-content-accordion/abj-content-accordion.component';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-conditions',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    ABJNumberInputComponent,
    ABJCheckboxComponent,
    ABJContentAccordionComponent,
    ABJRadioButtonGroupComponent,
    ABJStrategySelectorComponent
  ],
  templateUrl: './doubleup-customizations-conditions.component.html',
  styleUrl: './doubleup-customizations-conditions.component.scss'
})
export class DoubleupCustomizationsConditionsComponent implements OnInit {
  title: string = "Add, Edit or Delete a set of Conditions";
  defaultStrategy: AbbreviatedDoubleupConditions = { ...doubleupDefaultConditions };
  activeStrategy: AbbreviatedDoubleupConditions = { ...doubleupDefaultConditions };
  activeStrategy$: BehaviorSubject<AbbreviatedDoubleupConditions> = new BehaviorSubject<AbbreviatedDoubleupConditions>(doubleupDefaultConditions);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  includedStrategies = {  ...doubleupConditions };
  conditionKeys = Object.keys(defaultFullDoubleupConditions);
  featureGroupConditions: any;
  standardCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullDoubleupConditions[key].displayWith === DisplayWith.CHECKBOX);
  standardNumberInputKeys: string[] = this.conditionKeys
    .filter(key => defaultFullDoubleupConditions[key].displayWith === DisplayWith.NUMBER_INPUT);
  standardRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullDoubleupConditions[key].displayWith === DisplayWith.RADIO_GROUP);
  activeToolTip$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  allStrategiesObj:AbbreviatedDoubleupConditions;
  storedStrategies: AbbreviatedDoubleupConditions;
  allStrategyTitles: string[];
  doubleupConditionTitles: string[];

  constructor( private headerFooterService: HeaderFooterService ) {}

  ngOnInit(): void {
    this.doubleupConditionTitles = [ ...doubleupConditionTitles];
    this.headerFooterService.updateTheTagline$.next('Use preset table conditions, or create your own.');
    this.setConditiosKeyValuePairs(defaultFullDoubleupConditions);
    // For whatever reason, the UI is populated with data from defaultFullDoubleupConditions and not from the defaultStrategy.
    // Im not sure why this made sense to me there but this can be managed without a refactor by making sure the 2 value sets match. The user cannot change these values anyway. 
    this.activeStrategy$.pipe().subscribe(strategy => {
      if(this.activeStrategy.title !== strategy.title) {
        let conditionSet: DoubleupConditions = { ...defaultFullDoubleupConditions, title: strategy.title };
        this.conditionKeys.filter(k => k !== 'title').forEach(k => conditionSet[k].value = strategy[k]);
        this.setConditiosKeyValuePairs(conditionSet);
      }
      this.activeStrategy = strategy;
    })
  }

  setConditiosKeyValuePairs(conditionSet: DoubleupConditions) {
    this.featureGroupConditions = {
      checkBox: this.standardCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.standardNumberInputKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.standardRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    };
  }

  handleCheckAction(isChecked: boolean, key: string) {
    this.activeStrategy[key] = isChecked;
    this.activeStrategy$.next(this.activeStrategy);
  }

  handleNumberInputAction(num, key: string) {
    this.activeStrategy[key] = num;
    this.activeStrategy$.next(this.activeStrategy);
  }

  handleRadioGroupAction(value: any, key: string) {
    this.activeStrategy[key] = value;
    this.activeStrategy$.next(this.activeStrategy);
  } 

  handleTooltipClose() {
    this.activeToolTip$.next(-1);
  }

  setActiveToolTip(id: number) {
    this.activeToolTip$.next(id)
  }
}
