import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
;import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ABJTooltipComponent } from '../abj-tooltip/abj-tooltip.component';
import { Condition } from '../../classic-blackjack/classic-models/classic-strategies.models';
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
  @Input() name: string;
  @Input() whatsThis: string;
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

  handleCheckAction(target: any) {
    this.action.emit(target.checked);
  }
}