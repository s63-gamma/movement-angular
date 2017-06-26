import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoices: Invoice[] = [];
  public selectedInvoices: Invoice[] = [];
  public alerts: any = [];
  public settings = {
    selectMode: 'multi',
    columns: {
      uuid: {
        title: 'ID'
      },
      date: {
        title: 'Date'
      },
      owner: {
        title: 'Name'
      },
      priceTotal: {
        title: 'Amount'
      },
      status: {
        title: 'Status'
      },
    },
    actions: {
      position: 'right'
    }
  };

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.getInvoices();
  }

  public getInvoices() {
    this.invoiceService.query().subscribe(invoices => {
      invoices.forEach(invoice => invoice.owner = invoice.owner.name);
      this.invoices = invoices;
      console.log(invoices);
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

  public mailInvoices(invoices: Invoice[]) {
    invoices.forEach(invoice => {
      this.invoiceService.mailInvoice(invoice.uuid);
    });

    this.addAlert(`${invoices.length} mail have been sent`);
  }

  public addAlert(text: String): void {
    this.alerts.push({
      type: 'info',
      msg: text,
      timeout: 5000
    });
  }

  public rowSelected(event) {
    this.selectedInvoices = event.selected;
  }
}
