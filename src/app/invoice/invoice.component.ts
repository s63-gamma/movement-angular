import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Observable} from "rxjs";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();

  }

  public getInvoices() {
    this.invoiceService.query().subscribe(invoices => {
      console.log(invoices)
      this.invoices = invoices;
    });
  }

  public save() {
    const observables: Observable<Invoice>[] = [];
    this.invoices.forEach(region => {
      observables.push(this.invoiceService.update(region));
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
    let sended: Boolean = false;
    let amount: number = 0;
    for(var i = 0; i < this.invoices.length; i++){
        if (this.invoices[i].checked) {
          this.invoiceService.mailInvoices(this.invoices[i].uuid);
          amount += 1;
          sended = true;
        }
    }
    if (sended)
      this.addAlert(amount + " mail have been send");
  }
  public alerts: any = [];

  public addAlert(text: String): void {
    this.alerts.push({
      type: 'info',
      msg: text,
      timeout: 5000
    });
  }





}
