import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Condition } from '../../classic-blackjack/classic-models/classic-strategies.models';
import { ABJTooltipComponent } from '../abj-tooltip/abj-tooltip.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'abj-number-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ABJTooltipComponent],
  templateUrl: './abj-number-input.component.html',
  styleUrl: './abj-number-input.component.scss'
})
export class ABJNumberInputComponent implements AfterViewInit, OnInit {
  @ViewChild('innerInput') innerInput: ElementRef;
  @Input() condition: Condition;
  @Input() value: number;
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() inputId: string;
  @Output() changeEvent = new EventEmitter<number>();
  numberMessage: number;
  activeConditionId$: Observable<string>;

  constructor(public tooltipService: TooltipService) {}

  status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.numberMessage = this.condition.value;
    this.activeConditionId$ = this.tooltipService.activeId$
    this.tooltipService.activeId$.next(null);
    this.tooltipService.tooltipCloser$.pipe()
      .subscribe(() => this.tooltipService.activeId$.next(null));
  }

  ngAfterViewInit(): void {
    // this.innerInput.nativeElement.focus();
  }

  handleInput() {
    this.changeEvent.emit(this.numberMessage)
  }

  // handleTooltipClose() {
  //   this.status$.next(false);
  // }
}