import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { HeaderLink } from '../../models';
import { ABJAnchorComponent } from '../abj-anchor/abj-anchor.component';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'feature-nav',
  standalone: true,
  imports: [ABJAnchorComponent],
  templateUrl: './feature-nav.component.html',
  styleUrl: './feature-nav.component.scss'
})
export class FeatureNavComponent implements OnDestroy, OnInit {
  variationName: string;
  featureName: string;
  featureLinks: HeaderLink[];
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private pageService: PageService,
  ) {}

  ngOnInit(): void {
    this.variationName = this.route.snapshot.url[0].path;
    this.featureLinks = this.pageService.featureLinks;
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd && event.url.split('/').length >= 3),
      map(event => event.url === '/' ? 'home' : event.url.split('/')[2]),
      takeUntil(this.unsubscribe$)
    ).subscribe(featureName => {
      this.featureName = featureName;
      this.featureLinks = this.pageService.featureLinks
        .filter(fl => fl.url !== '/' + featureName);
    });
  }

  handleVariationSelection(url: string): void {
    this.router.navigate([this.variationName + url]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}