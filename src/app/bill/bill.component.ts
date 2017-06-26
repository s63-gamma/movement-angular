import {Component, OnInit} from '@angular/core';
import {BillService} from '../bill.service';
import {Observable} from 'rxjs/Observable';

import {Owner} from '../owner';
import {SMART_TABLE_SETTINGS} from '../constants';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  private owners: Owner[];
  public settings = Object.assign({}, SMART_TABLE_SETTINGS, {
    columns: {
      username: {
        title: 'Username'
      },
      emailadres: {
        title: 'Email'
      },
      name: {
        title: 'First Name'
      },
      surname: {
        title: 'Surname'
      },
      phoneNumber: {
        title: 'Phone Number'
      },
      residence: {
        title: 'Residence'
      }
    }
  });


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

  public saveAll() {
    const observables: Observable<Owner>[] = [];
    this.owners.forEach(owner => {
      observables.push(this.billService.upsert(owner));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });
  }

  public save(owner: Owner) {
    this.billService.upsert(owner).subscribe();
  }

  public deleteOwner(owner: Owner) {
    this.billService.delete(owner).subscribe();
  }

  public confirmEdit(event) {
    if (event.data !== event.newData) {
      event.confirm.resolve();
      this.save(event.newData);
    }
  }
  public confirmCreate(event) {
    event.confirm.resolve();
    this.save(event.newData);
  }

  public confirmDelete(event) {
    event.confirm.resolve();
    this.deleteOwner(event.data);
  }
}
