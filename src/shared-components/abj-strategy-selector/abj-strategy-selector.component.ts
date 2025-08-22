import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { AbbreviatedClassicConditions, AnyStrategy } from '../../classic-blackjack/classic-models/classic-conditions.model';
// import { LocalStorageItemsEnum } from '../../models-constants-enums/enumerations';
import { ABJSelectComponent } from '../abj-select/abj-select.component';
import { ABJButtonComponent } from '../abj-button/abj-button.component';
import { ABJTextInputComponent } from '../abj-text-input/abj-text-input.component';

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
  @Input() activeTitle: string;
  @Input() defaultTitles: string[];
  @Input() titleList: string[];
  @Input() centerAlign: boolean = false;
  @Output() ChangeStrategyNameEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<void>();
  
  showSelectBox$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showAddButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showDeleteButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showSaveButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  showEditableTitle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  hasNewTitle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  newTitle: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {} 

  getStrategies(): void {
    // this.activeStrategy = { ...this.defaultStrategy };
    // this.activeStrategy$.next(this.activeStrategy);
    // this.storedStrategies = this.localStorageService.getItem(this.strategyEnumType) || {};
    // if(this.storedStrategies) {
    //   this.allStrategiesObj = { ...this.defaultStrategiesObj, ...this.storedStrategies };
    // }
    // this.strategyKeys = Object.keys(this.allStrategiesObj);
  }

  selectStrategy(value: string): void {
    // this.activeStrategy = { ...this.allStrategiesObj[value] };
    // this.activeStrategy$.next(this.activeStrategy);
    // const isFromLS = this.strategyKeys
    //   .filter(key => !this.hardCodedStrategyKeys.includes(key)) 
    //   .includes(this.activeStrategy.title);
    // this.showDeleteButton$.next(isFromLS);
    // this.showAddButton$.next(true);
    // this.showSaveButton$.next(isFromLS);
    // Tell the parent what the active strategy is
    this.showDeleteButton$.next(!this.defaultTitles.includes(value));
    this.showSaveButton$.next(!this.defaultTitles.includes(value));
    this.ChangeStrategyNameEvent.emit(value);
  }

  deleteStrategy(): void {
    // this.localStorageService.deleteStrategy( this.storedStrategies, this.activeStrategy.title, this.strategyEnumType);
    // this.getStrategies();
    // this.showDeleteButton$.next(false);
    // this.showSaveButton$.next(false);
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
    // console.log(newTitle, this.activeStrategy.title);
  }

  saveStrategy(): void {
    // console.log(this.activeStrategy);
    // if(this.activeStrategy.title.length > 2) {
    //   this.localStorageService.saveStrategy(this.activeStrategy, this.storedStrategies, this.strategyEnumType);
    //   this.router.navigate(['/customizations']);
    // }
    this.saveEvent.emit();
  }

  goBack(): void {
    this.router.navigate(['/classic/customizations']);
  }
}





