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

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqEk83nB58CAmnDYJskoxrHx2hIelE3Xk'
    })
  ],
  providers: [
    InvoiceService,
    RegionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
