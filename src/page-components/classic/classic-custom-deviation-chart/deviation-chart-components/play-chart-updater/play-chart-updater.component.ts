import { 
  AfterViewInit, 
  Component, 
  EventEmitter, 
  Input, 
  OnDestroy,
  OnInit, 
  Output 
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../../../services/local-storage.service';
import { LocalStorageVariationKeys, LocalStorageItemsEnum } from '../../../../../models';

@Component({
  selector: 'play-chart-updater',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './play-chart-updater.component.html',
  styleUrl: './play-chart-updater.component.scss'
})

export class PlayChartUpdaterComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() chartName: string;
  @Input() f2c: string;
  @Output() cancel = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  chartRow: any;
  upCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  chartKeys: string[] = [];
  newCombos: any = {};
  newComboKeys: string[] = [];
  oldCombos = {};
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.oldCombos = { ...this.localStorageService.getItemOfVariation(
      LocalStorageItemsEnum.PLAY, LocalStorageVariationKeys.CLASSIC
    )[this.chartName].combos };
    this.upCards.forEach(c => {
      const key = `${c}-${this.f2c}`;
      this.newCombos[key] = { ...this.oldCombos[key] };
      this.newComboKeys.push(key);
    });
  }

  ngAfterViewInit(): void {}

  updatePlayChart(): void {
    this.update.emit(this.newCombos);
  }
  
  cancelUpdate(): void {
    this.cancel.emit();
  }

  ngOnDestroy(): void {}
}