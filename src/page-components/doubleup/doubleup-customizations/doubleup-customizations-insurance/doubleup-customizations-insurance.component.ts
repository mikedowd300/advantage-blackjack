import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { InsurancePlan } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  doubleupInsuranceTitles,
  doubleupInsurancePlans,
  doubleupDefaultInsurancePlan
} from "../../../../doubleup-blackjack/default-doubleup-configs/insurance-plan";
import { BehaviorSubject } from 'rxjs';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-insurance',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJCheckboxComponent, FormsModule],
  templateUrl: './doubleup-customizations-insurance.component.html',
  styleUrl: './doubleup-customizations-insurance.component.scss'
})
export class DoubleupCustomizationsInsuranceComponent implements OnInit {
  title: string = "Add, Edit or Delete an Insurance Plan";
  defaultStrategy: InsurancePlan = { ...doubleupDefaultInsurancePlan };
  activeStrategy: InsurancePlan = { ...doubleupDefaultInsurancePlan };
  activeStrategy$: BehaviorSubject<InsurancePlan> = new BehaviorSubject<InsurancePlan>(doubleupDefaultInsurancePlan);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: InsurancePlan } = doubleupInsurancePlans;
  strategyTitles: string[] = doubleupInsuranceTitles;
  alwaysInsure: boolean;
  neverInsure: boolean;

  constructor(
    // private emailjs: EmailjsService, 
    private headerFooterService: HeaderFooterService,
  ) {
    // TODO - Can this be moved to ngOnInit?
    this.activeStrategy$.pipe().subscribe(strategy => this.activeStrategy = strategy);
  }

  ngOnInit(): void {
    // this.emailjs.setPreviousScreen$.next('Classic Custom Insurance');
    this.headerFooterService.updateTheTagline$.next('Use an existing insurance plan, or try your own.');
  }

  updateActiveStrategy(key: string) {
    this.activeStrategy[key] = !this.activeStrategy[key];
    this.activeStrategy$.next(this.activeStrategy);
  }
}