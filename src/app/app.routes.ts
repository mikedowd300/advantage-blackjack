import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { HomeComponent } from '../page-components/home/home.component';
import { ClassicComponent } from '../page-components/classic/classic.component';
import { DoubleupComponent } from '../page-components/doubleup/doubleup.component';
import { ClassicSpeedPracticeComponent } from '../page-components/classic/classic-speed-practice/classic-speed-practice.component';
import { ClassicBankrollChartComponent } from '../page-components/classic/classic-bankroll-chart/classic-bankroll-chart.component';
import { ClassicRoiChartsComponent } from '../page-components/classic/classic-roi-charts/classic-roi-charts.component';
import { ClassicSimulationResultsDashboardComponent } from '../page-components/classic/simulation-results-dashboard/simulation-results-dashboard.component';
import { ClassicSimulationComponent } from '../page-components/classic/classic-simulation/classic-simulation.component';
import { ClassicPracticeComponent } from '../page-components/classic/classic-practice/classic-practice.component';
import { ClassicCustomizationsBetSpreadComponent } from '../page-components/classic/classic-customizations/classic-customizations-bet-spread/classic-customizations-bet-spread.component';
import { ClassicCustomizationsConditionsComponent } from '../page-components/classic/classic-customizations/classic-customizations-conditions/classic-customizations-conditions.component';
import { ClassicCustomizationsCustomCountingSystemComponent } from '../page-components/classic/classic-customizations/classic-customizations-custom-counting-system/classic-customizations-custom-counting-system.component';
import { ClassicCustomizationsInsuranceComponent } from '../page-components/classic/classic-customizations/classic-customizations-insurance/classic-customizations-insurance.component';
import { ClassicCustomizationsPlayChartComponent } from '../page-components/classic/classic-customizations/classic-customizations-play-chart/classic-customizations-play-chart.component';
import { ClassicCustomizationsPlayerComponent } from '../page-components/classic/classic-customizations/classic-customizations-player/classic-customizations-player.component';
import { ClassicCustomizationsTableComponent } from '../page-components/classic/classic-customizations/classic-customizations-table/classic-customizations-table.component';
import { ClassicCustomizationsTippingComponent } from '../page-components/classic/classic-customizations/classic-customizations-tipping/classic-customizations-tipping.component';
import { ClassicCustomizationsUnitResizingComponent } from '../page-components/classic/classic-customizations/classic-customizations-unit-resizing/classic-customizations-unit-resizing.component';
import { ClassicCustomizationsWongingComponent } from '../page-components/classic/classic-customizations/classic-customizations-wonging/classic-customizations-wonging.component';
import { ClassicCustomizationsComponent } from '../page-components/classic/classic-customizations/classic-customizations.component';
import { ClassicHomeComponent } from '../page-components/classic/classic-home/classic-home.component';
import { ClassicThinkingComponent } from '../page-components/classic/thinking/thinking.component';
import { HowToRunSimulationsComponent } from '../page-components/how-to-run-simulations/how-to-run-simulations.component';
import { HandReviewComponent } from '../page-components/classic/hand-review/hand-review.component';
import { FeedbackComponent } from '../page-components/feedback/feedback.component';
import { AboutUsComponent } from '../page-components/about-us/about-us.component';
import { FaqsComponent } from '../page-components/faqs/faqs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'classic',
    component: ClassicComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path: 'home',
        component: ClassicHomeComponent,
      },
      {
        path: 'customizations',
        component: ClassicCustomizationsComponent,
      },
      {
        path: 'conditions',
        component: ClassicCustomizationsConditionsComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'player',
        component: ClassicCustomizationsPlayerComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'table',
        component: ClassicCustomizationsTableComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'bet-spread',
        component: ClassicCustomizationsBetSpreadComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'play-chart',
        component: ClassicCustomizationsPlayChartComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'unit-resizing',
        component: ClassicCustomizationsUnitResizingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'wonging',
        component: ClassicCustomizationsWongingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'tipping',
        component: ClassicCustomizationsTippingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'custom-counting-system',
        component: ClassicCustomizationsCustomCountingSystemComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'insurance-plan',
        component: ClassicCustomizationsInsuranceComponent
      },
      {
        path: 'simulation',
        component: ClassicSimulationComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'simulation-results-dashboard',
        component: ClassicSimulationResultsDashboardComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'bankroll-chart',
        component: ClassicBankrollChartComponent,
        canActivate: [RouteGuardService],
      },{
        path: 'roi-charts',
        component: ClassicRoiChartsComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'practice',
        component: ClassicPracticeComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'speed-practice',
        component: ClassicSpeedPracticeComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'thinking',
        component: ClassicThinkingComponent,
        // canActivate: [RouteGuardService],
      },
      {
        path: 'hand-review',
        component: HandReviewComponent,
        // canActivate: [RouteGuardService],
      },
    ]
  },
  {
    path: 'doubleup',
    component: DoubleupComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path: 'customizations',
        component: DoubleupComponent,
        canActivate: [RouteGuardService],
        children: [
          {
            path: 'conditions',
            component: ClassicCustomizationsConditionsComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'player',
            component: ClassicCustomizationsPlayerComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'table',
            component: ClassicCustomizationsTableComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'bet-spread',
            component: ClassicCustomizationsBetSpreadComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'play-chart',
            component: ClassicCustomizationsPlayChartComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'unit-resizing',
            component: ClassicCustomizationsUnitResizingComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'wonging',
            component: ClassicCustomizationsWongingComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'tipping',
            component: ClassicCustomizationsTippingComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'custom-counting-system',
            component: ClassicCustomizationsCustomCountingSystemComponent,
            canActivate: [RouteGuardService],
          },
          {
            path: 'insurance-plan',
            component: ClassicCustomizationsInsuranceComponent,
            canActivate: [RouteGuardService],
          },
        ]
      },
      {
        path: 'simulation',
        component: DoubleupComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'simulation-results',
        component: DoubleupComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'practice',
        component: DoubleupComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'speed-practice',
        component: DoubleupComponent,
        canActivate: [RouteGuardService],
      },
    ]
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    // canActivate: [RouteGuardService],
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    // canActivate: [RouteGuardService],
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    // canActivate: [RouteGuardService],
  },
  {
    path: 'how-to-run-simulations',
    component: HowToRunSimulationsComponent,
  }
];

