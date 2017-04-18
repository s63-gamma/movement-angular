import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {owner} from "../owner";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  private owners: owner[];

  constructor(private billService:BillService) { }

  ngOnInit() {
    this.getBillers();
  }

  public getBillers() {
    this.billService.query().subscribe(owners => {

      this.owners = owners;
      console.log(this.owners[0].emailadres);
    });
  }

}
