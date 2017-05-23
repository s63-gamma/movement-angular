import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Tracker} from './tracker';
import {Http, Response} from '@angular/http';
import {API_URL} from 'app/constants';
import 'rxjs/add/operator/map';
import {HttpService} from './http.service';


@Injectable()
export class TrackerService {

  constructor(private http: HttpService) { }

  query(): Observable<Tracker[]> {
    return this.http.get(`${API_URL}/tracker`)
      .map(response => response.json()._embedded.tracker);
  }

  update(owner: Tracker): Observable<Tracker> {
    return this.http.post(`${API_URL}/tracker`, owner)
      .map(response => response.json());
  }

  delete(tracker: Tracker) : Observable<Tracker>  {
    return this.http.delete(`${API_URL}/tracker/` + tracker.uuid).map(response => response.json());
  }

  create(tracker: Tracker): Observable<Tracker> {
    return this.http.post(`${API_URL}/tracker`, tracker)
      .map(response => response.json());
  }
}
