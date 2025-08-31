import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Condition, RadioButtonGroup } from '../../classic-blackjack/classic-models/classic-strategies.models';
import { ABJTooltipComponent } from '../abj-tooltip/abj-tooltip.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'abj-radio-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ABJTooltipComponent],
  templateUrl: './abj-radio-group.component.html',
  styleUrl: './abj-radio-group.component.scss'
})
export class ABJRadioButtonGroupComponent implements AfterViewInit, OnInit {
  @ViewChild('innerInput') innerInput: ElementRef;
  @Input() condition: Condition;
  @Input() group: RadioButtonGroup;
  @Input() value: any;
  @Input() label: string;
  @Input() radioGroupId: string;
  @Output() changeEvent = new EventEmitter<number>();
  radioGroupValue: string;
  activeToolTip$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  activeConditionId$: Observable<string>;

  constructor(public tooltipService: TooltipService) {}

  ngOnInit(): void {
    this.activeConditionId$ = this.tooltipService.activeId$
    this.radioGroupValue = this.condition.value;
    this.tooltipService.tooltipCloser$.subscribe(() => this.activeToolTip$.next(-1));
    this.tooltipService.activeId$.subscribe(() => this.activeToolTip$.next(-1));
  }

  ngAfterViewInit(): void {
    // this.innerInput.nativeElement.focus();
  }

  handleInput(value: any) {
    this.radioGroupValue = value.toString();
    this.changeEvent.emit(value)
  }

  setActiveToolTip(id: number) {
    this.tooltipService.tooltipCloser$.next();
    this.activeToolTip$.next(id);
  }
}