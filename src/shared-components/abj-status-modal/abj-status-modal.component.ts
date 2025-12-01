import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ABJButtonComponent } from '../abj-button/abj-button.component';
import { SuccessStatus } from '../../models';

@Component({
  selector: 'abj-status-modal',
  standalone: true,
  imports: [ABJButtonComponent],
  templateUrl: './abj-status-modal.component.html',
  styleUrl: './abj-status-modal.component.scss'
})
export class ABJStatusModalComponent {
  @Input() status: SuccessStatus;
  @Input() message: string;
  @Input() showSubmitButton: boolean = true;
  @Output() xClickEvent = new EventEmitter<string>();
  @Output() buttonClickEvent = new EventEmitter<string>();

  successStatus = SuccessStatus;

  handleXClick() {
    this.xClickEvent.emit();
  }

  handleButtonSubmit() {
    this.buttonClickEvent.emit();
  }
}
