import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { PlayerConfig } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicPlayerTitles, classicPlayers, classicDefaultPlayer } from "../../../../classic-blackjack/default-classic-configs/player-config";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-player',
  standalone: true,
  imports: [ABJStrategySelectorComponent, FormsModule],
  templateUrl: './classic-customizations-player.component.html',
  styleUrl: './classic-customizations-player.component.scss'
})
export class ClassicCustomizationsPlayerComponent implements OnInit {
  title: string = "Add, Edit or Delete a Customized Player";
  defaultStrategy: PlayerConfig = { ...classicDefaultPlayer };
  activeStrategy: PlayerConfig = { ...classicDefaultPlayer };
  activeStrategy$: BehaviorSubject<PlayerConfig> = new BehaviorSubject<PlayerConfig>(classicDefaultPlayer);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: PlayerConfig } = classicPlayers;
  strategyTitles: string[] = classicPlayerTitles;

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Player');
  }
}