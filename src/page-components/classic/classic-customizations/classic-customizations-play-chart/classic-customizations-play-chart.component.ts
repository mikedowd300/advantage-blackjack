import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { PlayStrategy } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  classicPlayTitles,
  classicPlayCharts,
  classicDefaultPlayChart
} from "../../../../classic-blackjack/default-classic-configs/play-strategies";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-play-chart',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-play-chart.component.html',
  styleUrl: './classic-customizations-play-chart.component.scss'
})
export class ClassicCustomizationsPlayChartComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Play Chart";
  defaultStrategy: PlayStrategy = { ...classicDefaultPlayChart };
  activeStrategy: PlayStrategy = { ...classicDefaultPlayChart };
  activeStrategy$: BehaviorSubject<PlayStrategy> = new BehaviorSubject<PlayStrategy>(classicDefaultPlayChart);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: PlayStrategy } = classicPlayCharts;
  strategyTitles: string[] = classicPlayTitles;

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Play Chart');
  }
}