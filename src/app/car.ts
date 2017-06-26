import {GpsPoint} from './gps-point';
export class Car {
  constructor(public uuid: String,
              public buildingYear: number,
              public licensePlate: String,
              public weight: number,
              public mileage: number,
              public carType: String,
              public gpsPoints?: GpsPoint[],
              public latestGpsPoint?: GpsPoint,
              public latestLatitude: String | Number = 'UNKNOWN',
              public latestLongitude: String | Number = 'UNKNOWN'
  ) {

  }
}
