import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Observable} from "rxjs";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  private invoices: Invoice[];

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

  public mailInvoices() {
    this.invoiceService.mailInvoices().subscribe();
  }



}
