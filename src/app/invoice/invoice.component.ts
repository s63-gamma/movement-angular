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
  private invoices: Invoice[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Invoice> = new Subject();

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();

  }

  public getInvoices() {
    this.invoiceService.query().subscribe(invoices => {
      console.log(invoices)
      this.invoices = invoices;
      this.dtTrigger.next();
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

  public mailInvoices(id: String) {
    this.invoiceService.mailInvoices(id).subscribe();
  }



}
