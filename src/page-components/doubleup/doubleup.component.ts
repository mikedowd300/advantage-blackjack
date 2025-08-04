import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatureNavComponent } from '../../shared-components/feature-nav/feature-nav.component';

@Component({
  selector: 'doubleup',
  standalone: true,
  imports: [FeatureNavComponent,FormsModule, RouterOutlet],
  templateUrl: './doubleup.component.html',
  styleUrl: './doubleup.component.scss'
})
export class DoubleupComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}