import {Component, OnInit, ViewChild} from '@angular/core';
import {Car} from "../car";
import {CarService} from '../car.service';
import {GpsPoint} from "../gps-point";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.scss'],
  providers: [
    HttpService,
    CarService
  ]
})
export class PoliceComponent implements OnInit {

  public stolenCars: Car[] = [];
  public cars: Car[] = [];
  public selectedCar: Car = null;
  public markedCar: String = "";
  public gpsPoints: GpsPoint[] = [];
  @ViewChild('map') public mapView;

  constructor(public carService: CarService) {
  }

  ngOnInit() {
    this.getStolenCars();
    this.getCars();
  }

  private getCars() {
    this.carService.query().subscribe(cars => {
      this.cars = cars;
    });
  }

  private getStolenCars() {
    this.carService.queryByStolenCars().subscribe(cars => {
      this.stolenCars = this.carService.apply(cars);
      cars.forEach(car => car.gpsPoints.forEach(gpsPoint => this.gpsPoints.push(gpsPoint)));
      console.log(this.stolenCars)
    });
  }

  public gotoCar(car: Car) {
    // this.mapView._mapsWrapper.panTo();
    const gpsPoint = car.gpsPoints[0];
    this.mapView._mapsWrapper.panTo({lat: gpsPoint.latitude, lng: gpsPoint.longitude});
    this.mapView._mapsWrapper.setZoom(12);
  }

  public selectMarkedCar(event) {
    console.log(event);
  }

}
