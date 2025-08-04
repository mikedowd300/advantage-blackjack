import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'abj-anchor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './abj-anchor.component.html',
  styleUrl: './abj-anchor.component.scss'
})
export class ABJAnchorComponent implements OnInit {
  @Input() text: string = "Anchor Text";
  @Input() isTab: boolean = false;
  @Input() onLightBackground: boolean = true;
  @Input() routerLink: string = '';
  @Input() linkUrl: string = '';
  @Input() textWrap: boolean = true;
  @Output() action = new EventEmitter<any>();

  ngOnInit(): void {}

  handleAction(evt: any) {
    this.action.emit(evt);
  }
}