import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';
import 'rxjs/add/operator/map';
import {SMART_TABLE_SETTINGS} from '../constants';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoices: Invoice[] = [];
  public selectedInvoices: Invoice[] = [];
  public alerts: any = [];
  public settings = Object.assign({}, SMART_TABLE_SETTINGS, {
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
    }
  });

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

  public save(invoice: Invoice) {
    this.invoiceService.update(invoice).subscribe();
  }

  public deleteInvoice(invoice: Invoice) {
    this.invoiceService.deleteInvoice(invoice).subscribe();
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

  public confirmEdit(event) {
    if (event.data !== event.newData) {
      event.confirm.resolve();
      this.save(event.newData);
    }
  }

  public confirmCreate(event) {
    event.confirm.resolve();
    this.save(event.newData);
  }

  public confirmDelete(event) {
    event.confirm.resolve();
    this.deleteInvoice(event.data);
  }

  public rowSelected(event) {
    this.selectedInvoices = event.selected;
    console.log(this.selectedInvoices);
  }
}
