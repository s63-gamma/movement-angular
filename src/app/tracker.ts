enum TrackerType {
  GPS,
  CAMERA
}

export class Tracker {
  constructor(public uuid: String,
              public authorisationCode: number,
              public serialNumber: number,
              public type: TrackerType){
  }
}
