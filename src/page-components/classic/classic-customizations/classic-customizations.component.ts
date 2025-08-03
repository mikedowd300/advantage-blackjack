import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnInit {

  constructor(private pageService: PageService) {}

  ngOnInit(): void {}
}