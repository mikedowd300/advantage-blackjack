import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { HeaderFooterService } from '../services/header-footer.service';
import { ABJSelectComponent } from '../shared-components/abj-select/abj-select.component';
import { ABJButtonComponent } from '../shared-components/abj-button/abj-button.component';
import { ABJAnchorComponent } from '../shared-components/abj-anchor/abj-anchor.component';
import { GameVariations, HeaderLink } from '../models';

@Component({
  selector: 'abj-header',
  standalone: true,
  imports: [
    ABJAnchorComponent, 
    ABJSelectComponent, 
    ABJButtonComponent,
    CommonModule, 
    FormsModule, 
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  variations: string[] = ['home', ...GameVariations];
  currentVariation$: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  currentVariation: string;
  storedVariation: string;
  urlLinks: HeaderLink[] = [];
  isHomePage$: Observable<boolean>;
  title: string;
  tagLine: string;
  showSetDefaultButton: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    public headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.storedVariation = this.localStorageService.getPreferredVariation();
    this.handleVariationSelection(this.storedVariation)
    combineLatest([this.currentVariation$, this.headerFooterService.isFooterPage$])
      .pipe().subscribe(([v, isFooterPage]) => {
        this.currentVariation = v;
        this.urlLinks = isFooterPage 
          ? this.headerFooterService.variationLinks
          : this.headerFooterService.variationLinks.filter(vl => vl.url !== v);
      });
    this.isHomePage$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(event => event.url === '/')
    );
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      tap(({ url }) => {
        if(url !== "/feedback") {
          this.headerFooterService.currentPage$.next(url)
        }
      }),
      map(event => event.url === '/' ? 'home' : event.url.split('/')[1])
    ).subscribe((pageKey: string) => {
        this.title = this.headerFooterService.headerText[pageKey].header;
        this.tagLine = this.headerFooterService.headerText[pageKey].tagLine;
        if(this.variations.includes(pageKey)) {
          this.showSetDefaultButton = true;
        } else {
          this.showSetDefaultButton = false;
          this.router.navigate([pageKey]);
        }
      });;
  }

  handleVariationSelection(variation: string = 'home') {
    this.currentVariation$.next(variation);
    this.router.navigate([variation !== 'home' ? variation : '']);
    this.headerFooterService.isFooterPage$.next(false);
  }

  setDefaultVariation() {
    this.localStorageService.setPreferredVariation(this.currentVariation);
    this.storedVariation = this.localStorageService.getPreferredVariation();
    this.headerFooterService.isFooterPage$.next(false);
  }
}