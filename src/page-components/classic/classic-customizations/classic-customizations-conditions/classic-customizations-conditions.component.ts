import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { EmailjsService } from '../../../../services/emailjs.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { 
  AbbreviatedClassicConditions,
  defaultFullClassicConditions,
  customizingLinks,
  CustomizingLink,
  Condition,
  DisplayWith
} from '../../../../classic-blackjack/classic-models/classic-conditions.model';
import { LocalStorageItemsEnum } from '../../../../models';
import {
  defaultClassicConditions,
  allDefaultClassicConditions,
  storedConditionTitles
} from '../../../../classic-blackjack/default-classic-configs/conditions';
import { classicFeatureToggles } from '../../../../classic-blackjack/classic-models/classic-feature-toggles';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { ABJNumberInputComponent } from '../../../../shared-components/abj-number-input/abj-number-input.component';
import { ABJRadioButtonGroupComponent } from '../../../../shared-components/abj-radio-group/abj-radio-group.component';

@Component({
  selector: 'classic-customizations-conditions',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    ABJNumberInputComponent,
    ABJCheckboxComponent,
    ABJRadioButtonGroupComponent,
    ABJStrategySelectorComponent
  ],
  templateUrl: './classic-customizations-conditions.component.html',
  styleUrl: './classic-customizations-conditions.component.scss'
})
export class ClassicCustomizationsConditionsComponent implements OnInit {
  title: string = "Add, Edit or Delete a set of Conditions";
  defaultStrategy: AbbreviatedClassicConditions = { ...defaultClassicConditions };
  activeStrategy: AbbreviatedClassicConditions = { ...defaultClassicConditions };
  activeStrategy$: BehaviorSubject<AbbreviatedClassicConditions> = new BehaviorSubject<AbbreviatedClassicConditions>(defaultClassicConditions);
  localStorageItemsEnum = LocalStorageItemsEnum;
  defaultStrategiesObj = {  ...allDefaultClassicConditions };
  links: CustomizingLink[] = customizingLinks;
  classicConditionKeys = Object.keys(defaultFullClassicConditions);
  checkboxConditionsKeys = this.classicConditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  checkboxConditions: Condition[] = this.checkboxConditionsKeys
    .map(key => ({ ...defaultFullClassicConditions[key], key }));
  numberInputConditionsKeys = this.classicConditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  numberInputConditions: Condition[] = this.numberInputConditionsKeys
    .map(key => ({ ...defaultFullClassicConditions[key], key }));
  radioGroupConditionsKeys = this.classicConditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  radioGroupConditions: Condition[]  = this.radioGroupConditionsKeys
    .map(key => ({ ...defaultFullClassicConditions[key], key }));
  activeToolTip$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  allStrategiesObj:AbbreviatedClassicConditions;
  storedStrategies: AbbreviatedClassicConditions;
  allStrategyTitles: string[];
  storedConditionTitles: string[];

  constructor(
    private emailjs: EmailjsService, 
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storedConditionTitles = [ ...storedConditionTitles];
    this.emailjs.setPreviousScreen$.next('Classic Custom Conditions');
    this.getStrategies();
    this.activeStrategy$.pipe()
      .subscribe(strategy => this.updateConditions(strategy));
    setTimeout(() => window.scrollTo(0, 0));
  }

  updateConditions(strategy) {
    this.checkboxConditions = this.checkboxConditions
      .map(cbc => ({ ...cbc, value: strategy[cbc.key] }));
    this.numberInputConditions = this.numberInputConditions
      .map(cbc => ({ ...cbc, value: strategy[cbc.key] }));
  }

  getStrategies(): void {
    this.activeStrategy$.next(this.activeStrategy);
    this.storedStrategies = this.localStorageService.getItem(LocalStorageItemsEnum.CONDITIONS) || {};
    this.allStrategiesObj = { ...this.defaultStrategiesObj, ...this.storedStrategies };
    this.allStrategyTitles = Object.keys(this.allStrategiesObj)
      .map(key => this.allStrategiesObj[key].title);
  }

  setActiveStrategy(name: string) {
    const strategy = this.allStrategiesObj[name];
    if(strategy) {
      this.activeStrategy = strategy;
      this.activeStrategy$.next(strategy);
    }
  }

  handleCheckAction(isChecked: boolean, key: string) {
    this.activeStrategy[key] = isChecked;
  }

  handleNumberInputAction(num, key: string) {
    this.activeStrategy[key] = num;
  }

  handleRadioGroupAction(value: any, key: string) {
    this.activeStrategy[key] = value;
  }

  saveStrategy(): void {
    console.log(this.activeStrategy);
  } 

  handleTooltipClose() {
    this.activeToolTip$.next(-1);
  }

  setActiveToolTip(id: number) {
    this.activeToolTip$.next(id)
  }
}
