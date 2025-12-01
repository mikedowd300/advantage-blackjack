import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'abj-tooltip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-tooltip.component.html',
  styleUrl: './abj-tooltip.component.scss'
})
export class ABJTooltipComponent {
  @Input() body: string;
  @Input() status: boolean;
  @Input() toolTipId: string;

  constructor(private tooltipService: TooltipService) {}

  handleClose() {
    this.tooltipService.tooltipCloser$.next();
  }
}