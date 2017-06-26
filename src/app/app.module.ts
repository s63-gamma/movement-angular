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
import {CarComponent} from './car/car.component';
import {CarService} from './car.service';
import {AlertModule, BsDropdownModule, ModalModule, TabsModule, TypeaheadModule} from 'ng2-bootstrap';
import {TrackerComponent} from './tracker/tracker.component';
import {TrackerService} from './tracker.service';
import {BillComponent} from './bill/bill.component';
import {BillService} from './bill.service';
import {AgmCoreModule} from '@agm/core';
import {PoliceComponent} from './police/police.component';
import {HttpService} from './http.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    RegionComponent,
    TrackerComponent,
    BillComponent,
    CarComponent,
    PoliceComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqEk83nB58CAmnDYJskoxrHx2hIelE3Xk'
    }),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [
    InvoiceService,
    RegionService,
    CarService,
    TrackerService,
    BillService,
    HttpService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
