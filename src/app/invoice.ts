import {Owner} from "./owner";
export class Invoice {
  constructor(public uuid: String,
              public date: Date,
              public distance: number,
              public priceTotal: number,
              public status: number,
              public paymentCode: number,
              public checked: boolean = false,
              public owner?: Owner) {
  }
}
