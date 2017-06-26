import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Invoice} from './invoice';
import {Http, Response} from '@angular/http';
import {API_URL} from 'app/constants';
import 'rxjs/add/operator/map';
import {HttpService} from "./http.service";


@Injectable()
export class InvoiceService {

  constructor(private http: HttpService) {
  }

  query(): Observable<Invoice[]> {
    return this.http.get(`${API_URL}/invoice?projection=driver&size=512`)
      .map(response => response.json()._embedded.invoice);
  }

  update(invoice: Invoice): Observable<Invoice> {
    invoice.owner = `${API_URL}/owner/${invoice.owner.uuid}`;
    return this.http.post(`${API_URL}/invoice`, invoice)
      .map(response => response.json());
  }

  mailInvoice(id: String) {
    return this.http.get(`${API_URL}/mailInvoice/` + id)
      .map(res => res.json());
  }

  deleteInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.delete(`${API_URL}/invoice/` + invoice.uuid).map(response => response.json());
  }
}
