import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from './car';
import {API_URL} from './constants';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarService {

  constructor(private http: Http) {
  }

  public query(): Observable<Car[]> {
    return this.http.get(`${API_URL}/car?projection=details`)
      .map(response => response.json()._embedded.car);
  }

  public apply(cars: Car[]): Car[] {
    cars.forEach(car => {

      const lastDate = Math.max.apply(null, car.gpsPoints.map(e => e.date.epochSecond));
      const firstDate = Math.min.apply(null, car.gpsPoints.map(e => e.date.epochSecond));

      car.latestGpsPoint = car.gpsPoints.filter(gpsPoint => gpsPoint.date.epochSecond === lastDate)[0];

      if (car.gpsPoints) {
        car.gpsPoints.map(gpsPoint => {
          gpsPoint.opacity = (gpsPoint.date.epochSecond - firstDate) / (lastDate - firstDate) * (1 - 0.1) + 0.1;
        });
      }
    });

    return cars;
  }
}
