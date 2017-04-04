import {RouterModule, Routes} from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {ModuleWithProviders} from '@angular/core';
import {RegionComponent} from './region/region.component';
const appRoutes: Routes = [
  {
    component: InvoiceComponent,
    path: 'invoice'
  },
  {
    component: RegionComponent,
    path: 'region'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
