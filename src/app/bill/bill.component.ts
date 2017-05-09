import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {Observable} from "rxjs";
import { Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import {Owner} from "../owner";
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Owner> = new Subject();

  private owners: Owner[];
  constructor(private billService:BillService) { }

  ngOnInit() {
    this.getBillers();
  }

  public getBillers() {
    this.billService.query().subscribe(owners => {
      this.owners = owners;
      this.dtTrigger.next();
    });
  }

  public save() {
    const observables: Observable<Owner>[] = [];
    this.owners.forEach(owner => {
      observables.push(this.billService.update(owner));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });
  }

}
