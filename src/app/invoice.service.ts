import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Invoice} from './invoice';
import {Http, Response} from '@angular/http';
import {API_URL} from 'app/constants';
import 'rxjs/add/operator/map';
import {HttpService} from "./http.service";


@Injectable()
export class InvoiceService {

  constructor(private http: HttpService) { }

  query(): Observable<Invoice[]> {
    return this.http.get(`${API_URL}/invoice?projection=driver`)
      .map(response => response.json()._embedded.invoice);
  }

  update(invoice: Invoice): Observable<Invoice> {
    return this.http.post(`${API_URL}/invoice`, invoice)
      .map(response => response.json());
  }

  mailInvoices(id: String) {
    return this.http.get(`${API_URL}/mailInvoice/` + id)
      .map(res => res.json());
  }
}
