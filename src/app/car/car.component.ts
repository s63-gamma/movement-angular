import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CarService} from '../car.service';
import {Car} from '../car';
import {GpsPoint} from '../gps-point';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {


  private timerSubscription: Subscription;
  private carSubscription: Subscription;
  public cars: Car[] = [];
  public selectedCar: Car = null;
  public gpsPoints: GpsPoint[] = [];
  @ViewChild('map') public mapView;

  constructor(public carService: CarService) {
  }

  ngOnInit() {
    this.getCars();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    this.carSubscription.unsubscribe();
  }

  private getCars() {
    this.carSubscription = this.carService.query().subscribe(cars => {
      if (this.cars.length === 0 || cars.map(car => car.gpsPoints.length).join(',') !== this.cars.map(car => car.gpsPoints.length).join(',')) {
        console.log('Data changed');
        this.cars = this.carService.apply(cars);
        cars.forEach(car => car.gpsPoints.forEach(gpsPoint => this.gpsPoints.push(gpsPoint)));
      }
      this.autoRefresh();
    });
  }

  private autoRefresh() {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => {
      this.getCars();
      console.log('Refreshing');
    });
  }

  public gotoCar(car: Car) {
    // this.mapView._mapsWrapper.panTo();
    const gpsPoint = car.gpsPoints[0];
    this.mapView._mapsWrapper.panTo({lat: gpsPoint.latitude, lng: gpsPoint.longitude});
    this.mapView._mapsWrapper.setZoom(12);
  }
}
