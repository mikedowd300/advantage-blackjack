import { Routes } from '@angular/router';
import { HomeComponent } from '../page-components/home/home.component';
import { ClassicComponent } from '../page-components/classic/classic.component';
import { DoubleupComponent } from '../page-components/doubleup/doubleup.component';
import { ClassicSpeedPracticeComponent } from '../page-components/classic/classic-speed-practice/classic-speed-practice.component';
import { ClassicSimulationResultsComponent } from '../page-components/classic/classic-simulation-results/classic-simulation-results.component';
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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'classic',
    component: ClassicComponent,
    children: [
      {
        path: 'customizations',
        component: ClassicComponent,
        children: [
          {
            path: 'conditions',
            component: ClassicCustomizationsConditionsComponent
          },
          {
            path: 'player',
            component: ClassicCustomizationsPlayerComponent
          },
          {
            path: 'table',
            component: ClassicCustomizationsTableComponent
          },
          {
            path: 'bet-spread',
            component: ClassicCustomizationsBetSpreadComponent
          },
          {
            path: 'play-chart',
            component: ClassicCustomizationsPlayChartComponent
          },
          {
            path: 'unit-resizing',
            component: ClassicCustomizationsUnitResizingComponent
          },
          {
            path: 'wonging',
            component: ClassicCustomizationsWongingComponent
          },
          {
            path: 'tipping',
            component: ClassicCustomizationsTippingComponent
          },
          {
            path: 'custom-counting-system',
            component: ClassicCustomizationsCustomCountingSystemComponent
          },
          {
            path: 'insurance-plan',
            component: ClassicCustomizationsInsuranceComponent
          },
        ]
      },
      {
        path: 'simulation',
        component: ClassicSimulationComponent,
      },
      {
        path: 'simulation-results',
        component: ClassicSimulationResultsComponent,
      },
      {
        path: 'practice',
        component: ClassicPracticeComponent,
      },
      {
        path: 'speed-practice',
        component: ClassicSpeedPracticeComponent,
      },
    ]
  },
  {
    path: 'double-up',
    component: DoubleupComponent,
    children: [
      {
        path: 'customizations',
        component: DoubleupComponent,
        children: [
          {
            path: 'conditions',
            component: ClassicCustomizationsConditionsComponent
          },
          {
            path: 'player',
            component: ClassicCustomizationsPlayerComponent
          },
          {
            path: 'table',
            component: ClassicCustomizationsTableComponent
          },
          {
            path: 'bet-spread',
            component: ClassicCustomizationsBetSpreadComponent
          },
          {
            path: 'play-chart',
            component: ClassicCustomizationsPlayChartComponent
          },
          {
            path: 'unit-resizing',
            component: ClassicCustomizationsUnitResizingComponent
          },
          {
            path: 'wonging',
            component: ClassicCustomizationsWongingComponent
          },
          {
            path: 'tipping',
            component: ClassicCustomizationsTippingComponent
          },
          {
            path: 'custom-counting-system',
            component: ClassicCustomizationsCustomCountingSystemComponent
          },
          {
            path: 'insurance-plan',
            component: ClassicCustomizationsInsuranceComponent
          },
        ]
      },
      {
        path: 'simulation',
        component: DoubleupComponent,
      },
      {
        path: 'simulation-results',
        component: DoubleupComponent,
      },
      {
        path: 'practice',
        component: DoubleupComponent,
      },
      {
        path: 'speed-practice',
        component: DoubleupComponent,
      },
    ]
  },
];

