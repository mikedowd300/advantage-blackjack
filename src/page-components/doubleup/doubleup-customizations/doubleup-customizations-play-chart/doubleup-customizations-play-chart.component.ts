import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJButtonComponent } from '../../../../shared-components/abj-button/abj-button.component';
import { ABJAccordionComponent } from "../../../../shared-components/abj-accordion/abj-accordion.component";
import { ABJAnchorComponent } from '../../../../shared-components/abj-anchor/abj-anchor.component';
import { PlayStrategy } from '../../../../doubleup-blackjack/doubleup-models/doubleup-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import {
  doubleupPlayTitles,
  doubleupPlayCharts,
  doubleupDefaultPlayChart
} from "../../../../doubleup-blackjack/default-doubleup-configs/play-strategies";
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { VideoModalService } from '../../../../services/video-modal.service';
import { HeaderFooterService } from '../../../../services/header-footer.service';

@Component({
  selector: 'doubleup-customizations-play-chart',
  standalone: true,
  imports: [
    ABJAccordionComponent,
    ABJAnchorComponent,
    ABJButtonComponent,
    ABJStrategySelectorComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './doubleup-customizations-play-chart.component.html',
  styleUrl: './doubleup-customizations-play-chart.component.scss'
})
export class DoubleupCustomizationsPlayChartComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('dealersUpcardsStickVersion') dealersUpcardsStickVersion: ElementRef;
  @ViewChild('dealersUpcards') dealersUpcards: ElementRef;

  title: string = "Add, Edit or Delete a Custom Play Chart";
  defaultStrategy: PlayStrategy = { ...doubleupDefaultPlayChart };
  activeStrategy$: BehaviorSubject<PlayStrategy> = new BehaviorSubject<PlayStrategy>(doubleupDefaultPlayChart);
  activeStrategy: PlayStrategy = { ...doubleupDefaultPlayChart };
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: PlayStrategy } = doubleupPlayCharts;
  strategyTitles: string[] = doubleupPlayTitles;
  startingHandCombos: string[] = ['AA', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AT', 'A9', 'A8', 'A7', 'A6', 'A5', 'A4', 'A3', 'A2', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4'];
  dealersUpCard: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A' ];
  validOptionsInputs = ['H', 'R', 'S', 'P', 'D', 'U'];
  noInputErrors: boolean = true;
  errorMessages: string[] = [];
  showErrorModal: boolean = false;
  errorId: string = null;
  accordionQuestion: string = "How Does this work?";
  accordionAnswer: string = "How Does this work?";
  errorType: string;
  isSticky: boolean = false;
  upCards: Element;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private headerFooterService: HeaderFooterService,
    private videoModalService: VideoModalService, 
    private renderer: Renderer2
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.upCards) {
      return;
    }
    const width = window.getComputedStyle(this.upCards).getPropertyValue('width');
    const rect = this.upCards.getBoundingClientRect();
    this.isSticky = rect.top <= 0;
    if(this.isSticky) {
      this.renderer.setStyle(this.dealersUpcardsStickVersion.nativeElement, 'width', width);
    }
  }

  ngOnInit(): void {
    this.activeStrategy$
      .pipe(takeUntil(this.destroy$))
      .subscribe(strategy => this.activeStrategy = { ...strategy });
    this.headerFooterService.updateTheTagline$.next('Use an existing play chart or experiment with your own.');
  }

  ngAfterViewInit() {
    this.upCards = document.querySelector('#dealers-upcards');
  }

  handleInputChange(chartKey: string, xtions: string, inputType: string) {
    this.errorType = inputType;
    let invalidOption: boolean = false;
    if(!this.showErrorModal) {
      this.errorMessages = [];
      if(inputType === 'option') {
        let options: string[] = xtions.trim().split(' ').filter(x => x !== '');
        if(options.length === 0){
          this.noInputErrors = false;
          this.errorMessages.push('This can not be left blank, a valid option must exist.');
        }
        options.forEach(op => {
          if(!this.validOptionsInputs.includes(op)) {
            this.noInputErrors = false;
            invalidOption = true;
            this.errorMessages.push(`Invalid input, ${op} is not a valid option.`);
          }
        })
        if(options.length === 1 && options[0] === 'D') {
          this.noInputErrors = false;
          this.errorMessages.push(`With more than 2 cards 'D', the option to double, will be filtered away, and, with no other play options, the simulation will freeze. Even if the intention is to use this option with table conditions that allow doubling regardless of the number of cards, the same play chart would fail if used in a game where there was a limit.`);
        }
        if(options.length === 1 && options[0] === 'P') {
          this.noInputErrors = false;
          this.errorMessages.push(`'P' is the only option. If max splits have occurred then the option to split will be filtered out of the options, causing the game to freeze. Even if a game has unlimited splits, using this chart in another game will cause errors.`);
        }
        if(options.length === 1 && options[0] === 'R') {
          this.noInputErrors = false;
          this.errorMessages.push(`'R' is the only option and may be filtered away in games with no surrender allowed, causing the game to freeze.`);
        }
        if(this.noInputErrors && !this.strategyTitles.includes(this.activeStrategy.title)) {
          this.activeStrategy.combos[chartKey].options = options.join(' ');
        }
      } else {
        let conditions: string[] = xtions.trim().split(' ').filter(x => x !== '');
        let options = this.activeStrategy.combos[chartKey].options.trim().split(' ').filter(x => x !== '')
        conditions.forEach(c => {
          if(!parseFloat(c) && c !== '?') {
            this.noInputErrors = false;
            this.errorMessages.push(`${c} is an invalis condition.`);
          }
        });
        if([...conditions].pop() === '?') {
          this.noInputErrors = false;
          this.errorMessages.push('If the final condition value is "?", it should not be entered.');
        }
        if(conditions.length === options.length) {
          this.noInputErrors = false;
          this.errorMessages.push('There should never be as many conditions as there are options.');
        }
        if(conditions.length > options.length) {
          this.noInputErrors = false;
          this.errorMessages.push('There should never be more conditions than there are options.');
        }
        if(this.noInputErrors && !this.strategyTitles.includes(this.activeStrategy.title)) {
          this.activeStrategy.combos[chartKey].conditions = conditions.join(' ');
        }
      }
      this.noInputErrors = this.errorMessages.length === 0;
      this.showErrorModal = this.errorMessages.length !== 0;
      this.errorId = this.errorMessages.length === 0 ? null : `#${inputType}-${chartKey}`;
    }
  }

  closeErrorModal() {
    this.showErrorModal = false;
    setTimeout(() => {
      const el: any = document.querySelector(`${this.errorId}`);
      el?.focus();
    });
  }

  stopProp(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  playVideo() {
    this.videoModalService.openModal('createCustomChart');
  }

  updateComboOptions(key, { target }) {
    if(target.value) {
      this.handleInputChange(key, target.value, 'option')
    }
  }

  updateComboConditions(key, { target }) {
    if(target.value) {
      this.handleInputChange(key, target.value, 'condition')
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}