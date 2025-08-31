import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { CountingMethod } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicCountTitles, classicCounts, defaultClassicCount } from "../../../../classic-blackjack/default-classic-configs/counting-methods";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-custom-counting-system',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-custom-counting-system.component.html',
  styleUrl: './classic-customizations-custom-counting-system.component.scss'
})
export class ClassicCustomizationsCustomCountingSystemComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Counting System";
  defaultStrategy: CountingMethod = { ...defaultClassicCount };
  activeStrategy: CountingMethod = { ...defaultClassicCount };
  activeStrategy$: BehaviorSubject<CountingMethod> = new BehaviorSubject<CountingMethod>(defaultClassicCount);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: CountingMethod } = classicCounts;
  strategyTitles: string[] = classicCountTitles;

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Counting System');
  }
}