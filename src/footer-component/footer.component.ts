import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderFooterService } from '../services/header-footer.service';
import { ABJAnchorComponent } from '../shared-components/abj-anchor/abj-anchor.component';
import { FooterLink } from '../models';
import { GameVariations } from '../models';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'abj-footer',
  standalone: true,
  imports: [
    CommonModule,
    ABJAnchorComponent, 
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  links: FooterLink[];
  variations: string[] = ['home', ...GameVariations];
  currentVariation$: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  currentVariation: string;
  storedVariation: string;
  showSetDefaultButton$: Observable<boolean> = of(false);
  currentUrl$: Observable<string> = of('/');
  storableHomePageText: string = null;

  constructor(
    private router: Router,
    private headerFooterService: HeaderFooterService,
    private localStorageService: LocalStorageService
  ) {}

  setIsFooterPage() {
    this.headerFooterService.isFooterPage$.next(true);
  }

  ngOnInit(): void {
    this.links = this.headerFooterService.footerLinks;
    this.storedVariation = this.localStorageService.getPreferredVariation();
    this.headerFooterService.currentVariation$.pipe().subscribe(v => this.currentVariation = v);
    this.showSetDefaultButton$ = this.headerFooterService.currentVariation$
      .pipe(
        tap(v => this.storableHomePageText = this.headerFooterService.storeablePagesReadableTextMap[v]),
        // tap(v => {
        //   console.log(v);
        //   console.log(this.storableHomePageText);
        //   console.log(this.headerFooterService.storeablePages);
        //   console.log(this.storedVariation, v);
        // }),
        map(v => this.headerFooterService.storeablePages.includes(v) && this.storedVariation !== v)
      );
  }

  setDefaultVariation() {
    console.log(this.currentVariation);
    this.localStorageService.setPreferredVariation(this.currentVariation);
    this.storedVariation = this.localStorageService.getPreferredVariation();
    this.headerFooterService.isFooterPage$.next(false);
  }
}