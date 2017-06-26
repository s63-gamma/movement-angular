import {Component, OnInit} from '@angular/core';
import {TrackerService} from '../tracker.service';
import {Tracker} from '../tracker';
import 'rxjs/add/operator/map';
import {SMART_TABLE_SETTINGS} from '../constants';

@Component({
  selector: 'app-tracker',
  templateUrl: 'tracker.component.html',
  styleUrls: ['tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  private trackers: Tracker[];
  public settings = Object.assign({}, SMART_TABLE_SETTINGS, {
    columns: {
      uuid: {
        title: 'Uuid'
      },
      authorisationCode: {
        title: 'Authorisation Code'
      },
      type: {
        title: 'Type'
      }
    }
  });

  constructor(private trackerService: TrackerService) {
  }

  ngOnInit() {
    this.getTrackers();
  }

  public getTrackers() {
    this.trackerService.query().subscribe(trackers => {
      console.log(trackers);
      this.trackers = trackers;
    });
  }

  public save(tracker: Tracker) {
    this.trackerService.update(tracker).subscribe();
  }

  public deleteTracker(tracker: Tracker) {
   this.trackerService.deleteTracker(tracker).subscribe();
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
    this.deleteTracker(event.data);
  }
}
