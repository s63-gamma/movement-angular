import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Tracker} from './tracker';
import {Http, Response} from '@angular/http';
import {API_URL} from 'app/constants';
import 'rxjs/add/operator/map';


@Injectable()
export class TrackerService {

  constructor(private http: Http) { }

  query(): Observable<Tracker[]> {
    return this.http.get(`${API_URL}/tracker`)
      .map(response => response.json()._embedded.tracker);
  }

  mailTrackers() {
    return this.http.get(`${API_URL}/sendTrackers`)
      .map((res:Response) => res.json());
  }

  update(owner: Tracker): Observable<Tracker> {
    return this.http.post(`${API_URL}/tracker`, owner)
      .map(response => response.json());
  }
}
