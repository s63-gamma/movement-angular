import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from './car';
import {API_URL} from './constants';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from "./http.service";

@Injectable()
export class CarService {

  constructor(private http: HttpService) {
  }

  public query(): Observable<Car[]> {
    return this.http.get(`${API_URL}/car?projection=details&size=500`)
      .map(response => response.json()._embedded.car);
  }

  public queryByStolenCars(stolen: boolean = true): Observable<Car[]> {
    return this.http.get(`${API_URL}/car/search/findByIsStolen?stolen=${stolen}&projection=police&size=500`)
      .map(response => response.json()._embedded.car);
  }

  public apply(cars: Car[]): Car[] {
    cars.forEach(car => {

      const lastDate = Math.max.apply(null, car.gpsPoints.map(e => e.date.epochSecond));
      const firstDate = Math.min.apply(null, car.gpsPoints.map(e => e.date.epochSecond));

      car.latestGpsPoint = car.gpsPoints.filter(gpsPoint => gpsPoint.date.epochSecond === lastDate)[0];
      if (car.latestGpsPoint) {
        car.latestLatitude = car.latestGpsPoint.latitude;
        car.latestLongitude = car.latestGpsPoint.longitude;
      }

      if (car.gpsPoints) {
        car.gpsPoints.map(gpsPoint => {
          gpsPoint.opacity = (gpsPoint.date.epochSecond - firstDate) / (lastDate - firstDate) * (1 - 0.1) + 0.1;
        });
      }
    });

    return cars;
  }

  upsert(car: Car): Observable<Car> {
    return this.http.post(`${API_URL}/car`, car)
      .map(response => response.json());
  }

  reportStolenCar(licensePlate: string): Observable<number> {
    return this.http.get(`${API_URL}/reportstolencar?licensePlate=${licensePlate}`).map(response => response.status);
  }

  deleteCar(car: Car): Observable<Car> {
    return this.http.delete(`${API_URL}/car/` + car.uuid).map(response => response.json());
  }
}
