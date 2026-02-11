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
import { ClassicCustomDeviationChartComponent } from '../page-components/classic/classic-custom-deviation-chart/classic-custom-deviation-chart.component';
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
import { DoubleupHomeComponent } from '../page-components/doubleup/doubleup-home/doubleup-home.component';
import { DoubleupInstructionsComponent } from '../page-components/doubleup/doubleup-instructions/doubleup-instructions.component';
import { HandReviewComponent } from '../page-components/classic/hand-review/hand-review.component';
import { FeedbackComponent } from '../page-components/feedback/feedback.component';
import { AboutUsComponent } from '../page-components/about-us/about-us.component';
import { FaqsComponent } from '../page-components/faqs/faqs.component';
import { DoubleupCustomizationsComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations.component';
import { DoubleupCustomizationsInsuranceComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-insurance/doubleup-customizations-insurance.component';
import { DoubleupCustomizationsWongingComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-wonging/doubleup-customizations-wonging.component';
import { DoubleupCustomizationsBetSpreadComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-bet-spread/doubleup-customizations-bet-spread.component';
import { DoubleupCustomizationsUnitResizingComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-unit-resizing/doubleup-customizations-unit-resizing.component';
import { DoubleupCustomizationsTippingComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-tipping/doubleup-customizations-tipping.component';
import { DoubleupCustomizationsPlayerComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-player/doubleup-customizations-player.component';
import { DoubleupCustomizationsCustomCountingSystemComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-custom-counting-system/doubleup-customizations-custom-counting-system.component';
import { DoubleupCustomizationsConditionsComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-conditions/doubleup-customizations-conditions.component';
import { DoubleupCustomizationsTableComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-table/doubleup-customizations-table.component';
import { DoubleupCustomizationsPlayChartComponent } from '../page-components/doubleup/doubleup-customizations/doubleup-customizations-play-chart/doubleup-customizations-play-chart.component';
import { DoubleupSimulationComponent } from '../page-components/doubleup/doubleup-simulation/doubleup-simulation.component';
import { DoubleupThinkingComponent } from '../page-components/doubleup/doubleup-thinking/doubleup-thinking.component';
import { DoubleupSimulationResultsDashboardComponent } from '../page-components/doubleup/doubleup-simulation-results-dashboard/doubleup-simulation-results-dashboard.component';
import { DoubleupHandReviewComponent } from '../page-components/doubleup/doubleup-hand-review/doubleup-hand-review.component';
import { DoubleupBankrollChartComponent } from '../page-components/doubleup/doubleup-bankroll-chart/doubleup-bankroll-chart.component';
import { DoubleupRoiChartsComponent } from '../page-components/doubleup/doubleup-roi-charts/doubleup-roi-charts.component';
import { DoubleupCustomDeviationChartComponent } from '../page-components/doubleup/double-custom-deviation-chart/doubleup-custom-deviation-chart.component';

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
      {
        path: 'create-deviation-chart',
        component: ClassicCustomDeviationChartComponent,
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
        path: 'home',
        component: DoubleupHomeComponent,
      },
      {
        path: 'how-to-play',
        component: DoubleupInstructionsComponent,
      },
      {
        path: 'customizations',
        component: DoubleupCustomizationsComponent,
      },
      {
        path: 'conditions',
        component: DoubleupCustomizationsConditionsComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'player',
        component: DoubleupCustomizationsPlayerComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'table',
        component: DoubleupCustomizationsTableComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'bet-spread',
        component: DoubleupCustomizationsBetSpreadComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'play-chart',
        component: DoubleupCustomizationsPlayChartComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'unit-resizing',
        component: DoubleupCustomizationsUnitResizingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'wonging',
        component: DoubleupCustomizationsWongingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'tipping',
        component: DoubleupCustomizationsTippingComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'custom-counting-system',
        component: DoubleupCustomizationsCustomCountingSystemComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'insurance-plan',
        component: DoubleupCustomizationsInsuranceComponent
      },
      {
        path: 'simulation',
        component: DoubleupSimulationComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'simulation-results-dashboard',
        component: DoubleupSimulationResultsDashboardComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'bankroll-chart',
        component: DoubleupBankrollChartComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'roi-charts',
        component: DoubleupRoiChartsComponent,
        canActivate: [RouteGuardService],
      },
      // {
      //   path: 'speed-practice',
      //   component: ClassicSpeedPracticeComponent,
      //   canActivate: [RouteGuardService],
      // },
      {
        path: 'thinking',
        component: DoubleupThinkingComponent,
        // canActivate: [RouteGuardService],
      },
      {
        path: 'hand-review',
        component: DoubleupHandReviewComponent,
        // canActivate: [RouteGuardService],
      },
      {
        path: 'create-deviation-chart',
        component: DoubleupCustomDeviationChartComponent,
        // canActivate: [RouteGuardService],
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

