import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../invoice.service';
import {Invoice} from '../invoice';

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

}
