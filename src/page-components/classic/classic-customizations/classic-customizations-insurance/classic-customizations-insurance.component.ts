import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { InsurancePlan } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicInsuranceTitles,
  classicInsurancePlans,
  classicDefaultInsurancePlan
} from "../../../../classic-blackjack/default-classic-configs/insurance-plan";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-insurance',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJCheckboxComponent, FormsModule],
  templateUrl: './classic-customizations-insurance.component.html',
  styleUrl: './classic-customizations-insurance.component.scss'
})
export class ClassicCustomizationsInsuranceComponent implements OnInit {
  title: string = "Add, Edit or Delete an Insurance Plan";
  defaultStrategy: InsurancePlan = { ...classicDefaultInsurancePlan };
  activeStrategy: InsurancePlan = { ...classicDefaultInsurancePlan };
  activeStrategy$: BehaviorSubject<InsurancePlan> = new BehaviorSubject<InsurancePlan>(classicDefaultInsurancePlan);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: InsurancePlan } = classicInsurancePlans;
  strategyTitles: string[] = classicInsuranceTitles;
  alwaysInsure: boolean;
  neverInsure: boolean;

  constructor(private emailjs: EmailjsService) {
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy;
    });
  }

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Insurance');
  }

  updateActiveStrategy(key: string) {
    this.activeStrategy[key] = !this.activeStrategy[key];
    this.activeStrategy$.next(this.activeStrategy);
  }
}