import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { TableConfig } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicTableTitles, classicTables, classicDefaultTable } from "../../../../classic-blackjack/default-classic-configs/table-config";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-table',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-table.component.html',
  styleUrl: './classic-customizations-table.component.scss'
})
export class ClassicCustomizationsTableComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Table";
  defaultStrategy: TableConfig = { ...classicDefaultTable };
  activeStrategy: TableConfig = { ...classicDefaultTable };
  activeStrategy$: BehaviorSubject<TableConfig> = new BehaviorSubject<TableConfig>(classicDefaultTable);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: TableConfig } = classicTables;
  strategyTitles: string[] = classicTableTitles;

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Table');
  }
}