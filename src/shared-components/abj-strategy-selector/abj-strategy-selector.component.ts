import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { AbbreviatedClassicConditions, AnyStrategy } from '../../classic-blackjack/classic-models/classic-strategies.models';
// import { LocalStorageItemsEnum } from '../../models-constants-enums/enumerations';
import { ABJSelectComponent } from '../abj-select/abj-select.component';
import { ABJButtonComponent } from '../abj-button/abj-button.component';
import { ABJTextInputComponent } from '../abj-text-input/abj-text-input.component';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../models';

@Component({
  selector: 'abj-strategy-selector',
  standalone: true,
  imports: [ 
    FormsModule,
    ABJButtonComponent,
    ABJSelectComponent,
    ABJTextInputComponent,
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './abj-strategy-selector.component.html',
  styleUrl: './abj-strategy-selector.component.scss'
})

export class ABJStrategySelectorComponent implements OnDestroy, OnInit {
  @ViewChild('newStrategy') newStrategy: ElementRef;
  @Input() title: string;
  @Input() activeStrategy$: BehaviorSubject<AnyStrategy>;
  @Input() activeTitle: string;
  @Input() defaultTitles: string[];
  @Input() centerAlign: boolean = false;
  @Input() defaultConfig: AnyStrategy;
  @Input() includedStrategies: any;
  @Input() configurationType: LocalStorageItemsEnum;
  @Input() variation: LocalStorageVariationKeys;
  
  showSelectBox$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showAddButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showDeleteButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showSaveButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  showEditableTitle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  hasNewTitle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  newTitle: string;

  activeStrategy: AnyStrategy;
  localStorageItemsEnum = LocalStorageItemsEnum;

  allStrategiesObj:AbbreviatedClassicConditions;
  storedStrategies: AbbreviatedClassicConditions;
  allStrategyTitles: string[];
  storedConditionTitles: string[];
  titleList: string[];

  constructor(
    private localStorageService: LocalStorageService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeStrategy$.pipe().subscribe(strategy => this.activeStrategy = strategy)
    this.activeStrategy$.next({ ...this.defaultConfig });
    this.getStrategies();
  }
  
  ngOnDestroy(): void {} 
  
  getStrategies(): void {
    this.storedStrategies = this.localStorageService.getItemOfVariation(this.configurationType, this.variation);
    this.allStrategiesObj = { ...this.includedStrategies, ...this.storedStrategies };
    this.allStrategyTitles = Object.keys(this.allStrategiesObj).map(key => this.allStrategiesObj[key].title);
  }

  selectStrategy(strategyName: string): void {
    this.activeStrategy = this.allStrategiesObj[strategyName];
    this.showDeleteButton$.next(!this.defaultTitles.includes(strategyName));
    this.showSaveButton$.next(!this.defaultTitles.includes(strategyName));
    this.activeStrategy$.next(this.activeStrategy);
  }

  saveStrategy(strategyTitle?: string): void {
    if(strategyTitle) {
      this.activeStrategy.title = strategyTitle;
      this.activeStrategy$.next(this.activeStrategy);
      this.showSelectBox$.next(true);
      this.showEditableTitle$.next(false);
      this.showAddButton$.next(true);
      this.showDeleteButton$.next(true);
      this.showSaveButton$.next(true);
      setTimeout(() =>this.getStrategies());
    }
    const strategyDetails = {
      variation: this.variation,
      configurationType: this.configurationType,
      strategy: this.activeStrategy
    }
    this.localStorageService.saveActiveStrategy$.next(strategyDetails);
  }

  deleteStrategy(): void {
    const newStoredStrategies = {};
    Object.keys(this.storedStrategies)
      .filter(key => key !== this.activeStrategy.title)
      .forEach(key => newStoredStrategies[key] = { ...this.storedStrategies[key] });
    this.localStorageService.deleteStrategy( this.variation, this.configurationType, newStoredStrategies, this.activeStrategy.title);
    this.getStrategies();
    this.activeStrategy = this.defaultConfig;
    this.activeStrategy$.next(this.activeStrategy);
    this.showDeleteButton$.next(false);
    this.showSaveButton$.next(false);
  }

  addStrategy(): void {
    this.showSelectBox$.next(false);
    this.showEditableTitle$.next(true);
    this.showAddButton$.next(false);
    this.showDeleteButton$.next(false);
    this.showSaveButton$.next(false);
  }

  handleTitleEdit(newTitle: string): void {
    // this.activeStrategy.title = newTitle;
    this.newTitle = newTitle; //maybe

    this.hasNewTitle$.next(newTitle.length >= 3); // I think this is not used
    this.showSaveButton$.next(newTitle.length >= 3);
  }

  // saveStrategy(): void {
    // console.log(this.activeStrategy);
    // if(this.activeStrategy.title.length > 2) {
    //   this.localStorageService.saveStrategy(this.activeStrategy, this.storedStrategies, this.strategyEnumType);
    //   this.router.navigate(['/customizations']);
    // }

        // if(strategyTitle) {
        //   this.activeStrategy.title = strategyTitle;
        // }
        // this.localStorageService.setItemOfVariation(LocalStorageVariationKeys.CLASSIC, LocalStorageItemsEnum.CONDITIONS, this.activeStrategy);
    // console.log(this.newTitle);
    // this.saveEvent.emit(this.newTitle);
  // }

  goBack(): void {
    this.router.navigate(['/classic/customizations']);
  }
}





