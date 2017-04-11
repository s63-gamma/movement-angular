import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {owner} from "./owner";
import {API_URL} from "./constants";

@Injectable()
export class BillService {

  constructor(private http: Http) { }

  query(): Observable<owner[]> {
    return this.http.get(`${API_URL}/owner`)
      .map(response => response.json()._embedded.owner);
  }

}
