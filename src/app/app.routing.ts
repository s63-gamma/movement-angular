import {RouterModule, Routes} from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {ModuleWithProviders} from '@angular/core';
import {RegionComponent} from './region/region.component';
import {BillComponent} from "./bill/bill.component";
const appRoutes: Routes = [
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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
