import {RouterModule, Routes} from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {ModuleWithProviders} from '@angular/core';
import {RegionComponent} from './region/region.component';
import {PoliceComponent} from './police/police.component';
import {TrackerComponent} from './tracker/tracker.component';
import {BillComponent} from "./bill/bill.component";
import {CarComponent} from "./car/car.component";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    component: InvoiceComponent,
    path: 'invoice'
  },
  {
    component: RegionComponent,
    path: 'region'
  },
  {
    component: BillComponent,
    path: 'bill'
  },
  {
    component: CarComponent,
    path: 'car'
  },
  {
    component: TrackerComponent,
    path: 'tracker'
  },
  {
    component: PoliceComponent,
    path: 'police'
  },
  {
    component: LoginComponent,
    path: 'login'
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
