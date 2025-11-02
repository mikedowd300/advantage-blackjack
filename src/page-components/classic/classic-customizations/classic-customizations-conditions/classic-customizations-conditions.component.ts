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
  DisplayWith,
  ClassicConditions,
  AnyStrategy
} from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicDefaultConditions,
  classicConditions,
  classicConditionTitles
} from '../../../../classic-blackjack/default-classic-configs/conditions';
import { ClassicFeatureGroups } from '../../../../classic-blackjack/classic-models/classic-feature-toggles-and-groups';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { ABJNumberInputComponent } from '../../../../shared-components/abj-number-input/abj-number-input.component';
import { ABJRadioButtonGroupComponent } from '../../../../shared-components/abj-radio-group/abj-radio-group.component';
import { ABJContentAccordionComponent } from '../../../../shared-components/abj-content-accordion/abj-content-accordion.component';

@Component({
  selector: 'classic-customizations-conditions',
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
  templateUrl: './classic-customizations-conditions.component.html',
  styleUrl: './classic-customizations-conditions.component.scss'
})
export class ClassicCustomizationsConditionsComponent implements OnInit {
  title: string = "Add, Edit or Delete a set of Conditions";
  defaultStrategy: AbbreviatedClassicConditions = { ...classicDefaultConditions };
  activeStrategy: AbbreviatedClassicConditions = { ...classicDefaultConditions };
  activeStrategy$: BehaviorSubject<AbbreviatedClassicConditions> = new BehaviorSubject<AbbreviatedClassicConditions>(classicDefaultConditions);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  includedStrategies = {  ...classicConditions };
  links: CustomizingLink[] = customizingLinks;
  conditionKeys = Object.keys(defaultFullClassicConditions);
  featureGroupNamesText: string[] = [
    'Standard Table Conditions',
    'EV Hacks' ,
    'Bonuses Rules' ,
    'Weird Rules' ,
    'Camoflage Plays' ,
  ];
  featureGroupConditions: any = [];
  standardCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.STANDARD)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  standardNumberInputKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.STANDARD)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  standardRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.STANDARD)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  evHacksCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.EV_HACKS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  evHacksNumberInputsKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.EV_HACKS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  evHacksRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.EV_HACKS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  bonusesCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.BONUSES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  bonusesNumberInputKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.BONUSES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  bonusesRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.BONUSES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  weirdRulesCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.WEIRD_RULES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  weirdRulesNumberInputKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.WEIRD_RULES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  weirdRulesRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.WEIRD_RULES)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  camoPlaysCheckboxKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.CHECKBOX)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.CAMO_PLAYS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  camoPlaysNumberInputKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.NUMBER_INPUT)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.CAMO_PLAYS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  camoPlaysRadioGroupKeys: string[] = this.conditionKeys
    .filter(key => defaultFullClassicConditions[key].displayWith === DisplayWith.RADIO_GROUP)
    .filter(key => defaultFullClassicConditions[key].featureGroup === ClassicFeatureGroups.CAMO_PLAYS)
    // .filter(key => classicFeatureToggles[defaultFullClassicConditions[key].featureToggle]);
  activeToolTip$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  allStrategiesObj:AbbreviatedClassicConditions;
  storedStrategies: AbbreviatedClassicConditions;
  allStrategyTitles: string[];
  classicConditionTitles: string[];

  constructor(
    private emailjs: EmailjsService, 
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.classicConditionTitles = [ ...classicConditionTitles];
    this.emailjs.setPreviousScreen$.next('Classic Custom Conditions');
    this.setConditiosKeyValuePairs(defaultFullClassicConditions);
    this.activeStrategy$.pipe().subscribe(strategy => {
      if(this.activeStrategy.title !== strategy.title) {
        // I forget what this does
        let conditionSet: ClassicConditions = { ...defaultFullClassicConditions, title: strategy.title };
        this.conditionKeys.filter(k => k !== 'title').forEach(k => conditionSet[k].value = strategy[k]);
        this.setConditiosKeyValuePairs(conditionSet);
      }
      this.activeStrategy = strategy;
    })
  }

  setConditiosKeyValuePairs(conditionSet: ClassicConditions) {
    this.featureGroupConditions = [];
    this.featureGroupConditions.push({
      checkBox: this.standardCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.standardNumberInputKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.standardRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    })
    this.featureGroupConditions.push({
      checkBox: this.evHacksCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.evHacksNumberInputsKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.evHacksRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    })
    this.featureGroupConditions.push({
      checkBox: this.bonusesCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.bonusesNumberInputKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.bonusesRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    })
    this.featureGroupConditions.push({
      checkBox: this.weirdRulesCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.weirdRulesNumberInputKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.weirdRulesRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    })
    this.featureGroupConditions.push({
      checkBox: this.camoPlaysCheckboxKeys.map(key => ({ ...conditionSet[key], key })),
      numberInput: this.camoPlaysNumberInputKeys.map(key => ({ ...conditionSet[key], key })),
      radioGroup: this.camoPlaysRadioGroupKeys.map(key => ({ ...conditionSet[key], key })),
    });
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
