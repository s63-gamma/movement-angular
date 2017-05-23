import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Observable} from "rxjs";
import { Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoices: Invoice[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Invoice> = new Subject();

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();
  }

  public getInvoices() {
    this.invoiceService.query().subscribe(invoices => {
      //console.log(invoices)
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

  public delete(invoice : Invoice) {
    var observable: Observable<Invoice>;

    observable = this.invoiceService.delete(invoice);
    console.log(observable);
    this.invoices.splice(this.invoices.lastIndexOf(invoice), 1);

    Observable.forkJoin(observable).subscribe(result => {
      console.log(result);
    });
  }

  public createInvoice(){
    this.invoices.splice(0, 0, new Invoice(null, new Date(), null, null, null, null, null));
  }





}
