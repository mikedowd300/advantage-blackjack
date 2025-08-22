import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
;import { AsyncPipe, CommonModule } from '@angular/common';
import { ABJTooltipComponent } from '../abj-tooltip/abj-tooltip.component';
import { Condition, ClassicConditions } from '../../classic-blackjack/classic-models/classic-conditions.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'abj-checkbox',
  standalone: true,
  imports: [AsyncPipe, ABJTooltipComponent],
  templateUrl: './abj-checkbox.component.html',
  styleUrl: './abj-checkbox.component.scss'
})
export class ABJCheckboxComponent implements OnInit {
  @Input() condition: Condition;
  @Input() checked: boolean;
  @Input() checkboxId: string;
  @Output() action = new EventEmitter<any>();
  activeConditionId$: Observable<string>;

  constructor(public tooltipService: TooltipService) {}

  ngOnInit(): void {
    this.activeConditionId$ = this.tooltipService.activeId$
    this.tooltipService.activeId$.next(null);
    this.tooltipService.tooltipCloser$.pipe()
      .subscribe(() => this.tooltipService.activeId$.next(null));
  }

  handleCheckAction(evt: any) {
    this.action.emit(evt);
  }
}