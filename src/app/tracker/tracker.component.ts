import { Component, OnInit } from '@angular/core';
import {TrackerService} from '../tracker.service';
import {Tracker} from '../tracker';

@Component({
  selector: 'app-tracker',
  templateUrl: 'tracker.component.html',
  styleUrls: ['tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  private trackers: Tracker[];

  constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.getTrackers();
  }

  public getTrackers() {
    this.trackerService.query().subscribe(trackers => {
      console.log(trackers)
      this.trackers = trackers;
    });
  }

  public sendTrackers() {
    this.trackerService.mailTrackers().subscribe();
  }



}
