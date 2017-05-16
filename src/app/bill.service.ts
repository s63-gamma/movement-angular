import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {API_URL} from './constants';
import {Owner} from './owner';
import {HttpService} from './http.service';

@Injectable()
export class BillService {

  constructor(private http: HttpService) { }

  query(): Observable<Owner[]> {
    return this.http.get(`${API_URL}/owner`)
      .map(response => response.json()._embedded.owner);
  }

  update(owner: Owner): Observable<Owner> {
    return this.http.post(`${API_URL}/owner`, owner)
      .map(response => response.json());
  }

}
