import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component';
import { ABJCheckboxComponent } from '../../../../shared-components/abj-checkbox/abj-checkbox.component';
import { TippingPlan } from '../../../../classic-blackjack/classic-models/classic-strategies.models';
import { CheckboxConfig, LocalStorageItemsEnum, LocalStorageVariationKeys } from '../../../../models';
import { classicTippingTitles, classicTippingPlans, classicDefaultTippingPlan} from "../../../../classic-blackjack/default-classic-configs/tipping-plan";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classic-customizations-tipping',
  standalone: true,
  imports: [ABJStrategySelectorComponent, ABJCheckboxComponent, FormsModule],
  templateUrl: './classic-customizations-tipping.component.html',
  styleUrl: './classic-customizations-tipping.component.scss'
})
export class ClassicCustomizationsTippingComponent implements OnInit {
  title: string = "Add, Edit or Delete a Custom Tipping Approach";
  defaultStrategy: TippingPlan = { ...classicDefaultTippingPlan };
  activeStrategy: TippingPlan = { ...classicDefaultTippingPlan };
  activeStrategy$: BehaviorSubject<TippingPlan> = new BehaviorSubject<TippingPlan>(classicDefaultTippingPlan);
  localStorageItemsEnum = LocalStorageItemsEnum;
  localStorageVariationKeys = LocalStorageVariationKeys;
  strategies: { [k: string]: TippingPlan } = classicTippingPlans;
  strategyTitles: string[] = classicTippingTitles;
  checkBoxConfigs: CheckboxConfig[];

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Tipping');
    this.activeStrategy$.pipe().subscribe(strategy => {
      this.activeStrategy = strategy;
      this.setCheckBoxConfigs();
    });
  }

  handleCheck(key: string, value: boolean): void {
    this.activeStrategy[key] = value;
  }

  setCheckBoxConfigs() {
    this.checkBoxConfigs = [
      {
        label: 'After blackjack',
        whatsThis: '',
        key: 'afterBlackjack',
        value: this.activeStrategy.afterBlackjack,
      },
      {
        label: 'Dealer joins table',
        whatsThis: "Tip a new dealer's first hand",
        key: 'dealerJoins',
        value: this.activeStrategy.dealerJoins,
      },
      {
        label: 'Dealer leaves table',
        whatsThis: "Tip a dealer's last hand before being tapped out.",
        key: 'dealerLeaves',
        value: this.activeStrategy.dealerLeaves,
      },
      {
        label: 'First hand of shoe',
        whatsThis: 'Tip the first hand of a new shoe.',
        key: 'tipFirstHandOfShoe',
        value: this.activeStrategy.tipFirstHandOfShoe,
      },
      {
        label: 'Player Increases Bet',
        whatsThis: 'Add a tip when your bet increases.',
        key: 'playerIncreasesBet',
        value: this.activeStrategy.playerIncreasesBet,
      },
      {
        label: 'Tip split hand',
        whatsThis: 'If you tip, and end up splitting, tip the split hand as well.',
        key: 'tipSplitHandToo',
        value: this.activeStrategy.tipSplitHandToo,
      },
      {
        label: 'Double the tip',
        whatsThis: 'If you tip and end up doubling, double the tip as well.',
        key: 'doubleDownTip',
        value: this.activeStrategy.doubleDownTip,
      },
      {
        label: 'Tip wonged hand',
        whatsThis: 'Apply the same tipping approach to wonged hands.',
        key: 'tipWongHands',
        value: this.activeStrategy.tipWongHands,
      },
      {
        label: 'Insure tip',
        whatsThis: 'If you tip and end up insuring the hand, insure the tip as well.',
        key: 'insureTip',
        value: this.activeStrategy.insureTip,
      },
    ];
  }

  addTippingPoint() {
    const maxIndex = this.activeStrategy.tippingBreakpoints.length
    const ofOrBelow: number = this.activeStrategy.tippingBreakpoints[maxIndex - 1][0];
    const above: number = this.activeStrategy.tippingBreakpoints[maxIndex - 1][1];
    this.activeStrategy.tippingBreakpoints.push([ofOrBelow + 1, above + 50]);
    // this.activeStrategy$.next(this.activeStrategy);
    console.log(this.activeStrategy);
  }

  deleteTippingPoint() {
    if(this.activeStrategy.tippingBreakpoints.length > 1) {
      this.activeStrategy.tippingBreakpoints.pop();
    }
  }
}

  // title: "Generous Tipper",
  // tippingBreakpoints: [ [1, 25], [2, 50], [3, 100], [5, 250], [10, 500], [25, 1000] ],
  // maxTip: 50,
  // afterBlackjack: true,
  // dealerJoins: true,
  // dealerLeaves: true,
  // tipFirstHandOfShoe: true,
  // playerIncreasesBet: true,
  // everyXHands: 10, 
  // tipSplitHandToo: true,
  // doubleDownTip: true,
  // doubleUpTip: true,
  // tipWongHands: true,
  // insureTip: true,