import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'abj-button',
  standalone: true,
  templateUrl: './abj-button.component.html',
  styleUrl: './abj-button.component.scss'
})
export class ABJButtonComponent implements OnInit {
  @Input() text: string = "Button Text";
  @Input() bodyText: string;
  @Input() primary: boolean = true;
  @Input() secondary: boolean = false;
  @Input() onLightBackground: boolean = true;
  @Input() noOutline: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() action = new EventEmitter<any>();

  ngOnInit(): void {}

  handleAction(evt: any) {
    this.action.emit(evt);
  }
}