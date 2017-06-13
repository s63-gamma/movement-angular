import {Component, OnInit} from '@angular/core';
import {BillService} from '../bill.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Rx';

import {Owner} from '../owner';
import {Car} from '../car';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  private owners: Owner[];

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.getBillers();
  }

  public getBillers() {
    this.billService.query().subscribe(owners => {
      this.owners = owners;
    });
  }

  public save() {
    const observables: Observable<Owner>[] = [];
    this.owners.forEach(owner => {
      observables.push(this.billService.upsert(owner));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });
  }

  public delete(owner: Owner) {
    let observable: Observable<Owner>;

    observable = this.billService.delete(owner);
    console.log(observable);
    this.owners.splice(this.owners.lastIndexOf(owner), 1);

    Observable.forkJoin(observable).subscribe(result => {
      console.log(result);
    });
  }

  public createOwner() {
    this.owners.splice(0, 0, new Owner(null, null, null, null, null, null, null, [Car]));
  }
}
