import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { UnitResizeStrategy } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicUnitResizingStrategyTitles,
  classicUnitResizingStrategies,
  classicDefaultUnitResizeStrategy
} from "../../../../classic-blackjack/default-classic-configs/unit-resize-strategies";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-unit-resizing',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
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

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Unit Resizing');
  }
}