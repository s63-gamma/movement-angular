import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {routing} from './app.routing';
import {InvoiceService} from './invoice.service';
import { RegionComponent } from './region/region.component';

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
    routing
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
