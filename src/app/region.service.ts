import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {API_URL} from './constants';
import {Region} from './region';
import 'rxjs/add/operator/map';


@Injectable()
export class RegionService {

  constructor(private http: Http) { }

  public query(): Observable<Region[]> {
    return this.http.get(`${API_URL}/region`)
      .map(response => response.json()._embedded.region);
  }

  update(region: Region): Observable<Region> {
    return this.http.post(`${API_URL}/region`, region)
      .map(response => response.json());
  }
}
