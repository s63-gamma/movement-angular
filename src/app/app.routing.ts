import {RouterModule, Routes} from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {ModuleWithProviders} from '@angular/core';
const appRoutes: Routes = [
  {
    component: InvoiceComponent,
    path: 'invoice'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
