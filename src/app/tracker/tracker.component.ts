import { Component, OnInit } from '@angular/core';
import {TrackerService} from '../tracker.service';
import {Tracker} from '../tracker';
import {Observable} from "rxjs";
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-tracker',
  templateUrl: 'tracker.component.html',
  styleUrls: ['tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  private trackers: Tracker[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Tracker> = new Subject();

  constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.getTrackers();
  }

  public getTrackers() {
    this.trackerService.query().subscribe(trackers => {
      console.log(trackers)
      this.trackers = trackers;
      this.dtTrigger.next();
    });
  }

  public sendTrackers() {
    this.trackerService.mailTrackers().subscribe();
  }

  public save() {
    const observables: Observable<Tracker>[] = [];
    this.trackers.forEach(tracker => {
      observables.push(this.trackerService.update(tracker));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });
  }



}
