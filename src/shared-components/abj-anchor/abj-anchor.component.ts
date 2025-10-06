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
  @Input() responsiveText: string;
  @Input() isTab: boolean = false;
  @Input() isInlineButton: boolean = false;
  @Input() onLightBackground: boolean = true;
  @Input() routerLink: string = '';
  @Input() linkUrl: string = '';
  @Input() textWrap: boolean = true;
  @Input() isSelected: boolean = false;
  @Input() showTextLink: boolean = false;
  @Output() action = new EventEmitter<any>();

  displayedResponsiveText: string;

  ngOnInit(): void {
    this.displayedResponsiveText = this.responsiveText || this.text;
  }

  handleAction(evt: any) {
    this.action.emit(evt);
  }
}