import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'abj-button',
  standalone: true,
  templateUrl: './abj-button.component.html',
  styleUrl: './abj-button.component.scss'
})
export class ABJButtonComponent {
  @Input() text: string = "Button Text";
  @Input() bodyText: string;
  @Input() primary: boolean = true;
  @Input() secondary: boolean = false;
  @Input() onLightBackground: boolean = true;
  @Input() noOutline: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() size: string = 'large';
  @Output() action = new EventEmitter<any>();

  handleAction(evt: any) {
    this.action.emit(evt);
  }
}