import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameVariations, HeaderLink } from '../../models';
import { ABJSelectComponent } from '../../shared-components/abj-select/abj-select.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [FormsModule, ABJSelectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  variations: string[] = ['home', ...GameVariations];
  currentVariation$: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  currentVariation: string = 'home';
  storedVariation: string = 'home';
  variationLinks: HeaderLink[] = [
    {
      url: 'classic',
      title: 'Classic Blackjack',
    },
    {
      url: 'doubleup',
      title: 'DoubleUp Blackjack',
    }
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleVariationSelection(variation: string = 'classic') {
    console.log(variation);
    this.currentVariation$.next(variation);
    this.router.navigate([variation]);
  }
}