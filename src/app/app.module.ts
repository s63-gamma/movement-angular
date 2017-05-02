import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {routing} from './app.routing';
import {InvoiceService} from './invoice.service';
import {RegionComponent} from './region/region.component';
import {RegionService} from './region.service';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { CarComponent } from './car/car.component';
import {CarService} from './car.service';
import {ModalModule, TabsModule} from 'ng2-bootstrap';
import {TrackerComponent} from './tracker/tracker.component';
import {TrackerService} from './tracker.service';
import { BillComponent } from './bill/bill.component';
import {BillService} from "./bill.service";

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    RegionComponent,
    TrackerComponent,
    BillComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqEk83nB58CAmnDYJskoxrHx2hIelE3Xk'
    }),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    InvoiceService,
    RegionService,
    CarService,
    TrackerService,
    BillService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
