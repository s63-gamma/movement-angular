import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Observable} from "rxjs";
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoices: Invoice[] = [];
  public alerts: any = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();
  }

  public getInvoices() {
    this.invoiceService.query().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  public save() {
    const observables: Observable<Invoice>[] = [];
    this.invoices.forEach(invoice => {
      observables.push(this.invoiceService.update(invoice));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });
  }

  public mailInvoice(id: String) {
    this.invoiceService.mailInvoices(id).subscribe();
    this.addAlert('Mail has been send');
  }
  public mailInvoices() {
    let sent: Boolean = false;
    let amount = 0;
    this.invoices.forEach(invoice => {
      if (invoice.checked) {
        this.invoiceService.mailInvoices(invoice.uuid);
        amount += 1;
        sent = true;
      }
    });
    if (sent) {
      this.addAlert(amount + ' mail have been send');
    }
  }

  public addAlert(text: String): void {
    this.alerts.push({
      type: 'info',
      msg: text,
      timeout: 5000
    });
  }

  public deleteInvoice(invoice: Invoice) {
    let observable: Observable<Invoice>;

    observable = this.invoiceService.delete(invoice);
    console.log(observable);
    this.invoices.splice(this.invoices.lastIndexOf(invoice), 1);

    Observable.forkJoin(observable).subscribe(result => {
      console.log(result);
    });
  }

  public createInvoice() {
    this.invoices.splice(0, 0, new Invoice(null, new Date(), null, null, null, null, null));
  }





}
