export class Region {
  constructor(public uuid: String,
              public name: String,
              public longitude: number,
              public latitude: number,
              public radius: number,
              public costMultiplier: number) {
  }
}
