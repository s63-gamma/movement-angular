import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {owner} from "../owner";
import {Observable} from "rxjs";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<owner> = new Subject();

  private owners: owner[];
  constructor(private billService:BillService) { }

  ngOnInit() {
    this.getBillers();
  }

  public getBillers() {
    this.billService.query().subscribe(owners => {
      this.dtTrigger.next();
      this.owners = owners;
    });
  }

  public save() {
    const observables: Observable<owner>[] = [];
    this.owners.forEach(owner => {
      observables.push(this.billService.update(owner));
    });
  }

}
