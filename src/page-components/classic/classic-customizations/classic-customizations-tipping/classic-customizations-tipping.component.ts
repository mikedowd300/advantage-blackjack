import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { TippingPlan } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicTippingTitles, classicTippingPlans, classicDefaultTippingPlan} from "../../../../classic-blackjack/default-classic-configs/tipping-plan";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-tipping',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-tipping.component.html',
  styleUrl: './classic-customizations-tipping.component.scss'
})
export class ClassicCustomizationsTippingComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Tipping Approach";
  defaultStrategy: TippingPlan = { ...classicDefaultTippingPlan };
  activeStrategy: TippingPlan = { ...classicDefaultTippingPlan };
  activeStrategy$: BehaviorSubject<TippingPlan> = new BehaviorSubject<TippingPlan>(classicDefaultTippingPlan);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: TippingPlan } = classicTippingPlans;
  strategyTitles: string[] = classicTippingTitles;

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Tipping');
  }
}