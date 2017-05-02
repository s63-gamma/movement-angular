import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {API_URL} from "./constants";
import {owner} from "./owner";

@Injectable()
export class BillService {

  constructor(private http: Http) { }

  query(): Observable<owner[]> {
    return this.http.get(`${API_URL}/owner`)
      .map(response => response.json()._embedded.owner);
  }

  update(owner: owner): Observable<owner> {
    return this.http.post(`${API_URL}/owner`, owner)
      .map(response => response.json());
  }

}
