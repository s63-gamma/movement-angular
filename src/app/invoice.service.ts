import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Invoice} from './invoice';
import {Http, Response} from '@angular/http';
import {API_URL} from 'app/constants';
import 'rxjs/add/operator/map';


@Injectable()
export class InvoiceService {

  constructor(private http: Http) { }

  query(): Observable<Invoice[]> {
    return this.http.get(`${API_URL}/invoice`)
      .map(response => response.json()._embedded.invoice);
  }
  mailInvoices() {
    return this.http.get(`http://localhost:8080/sendInvoices`)
      .map((res:Response) => res.json());
  }
}
