import {Component, OnInit} from '@angular/core';
import {RegionService} from '../region.service';
import {Region} from '../region';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  public regions: Region[];
  public selectedRegion: Region;

  constructor(private regionService: RegionService) {
  }

  ngOnInit() {
    this.getRegions();
  }

  public getRegions() {
    this.regionService.query().subscribe(regions => {
      this.regions = regions.reverse();
    });
  }

  public locationChanged(region: Region, $event: any) {
    region.longitude = Math.round($event.lng * 1000000) / 1000000;

    region.latitude = Math.round($event.lat * 1000000) / 1000000;
    this.selectedRegion = region;
  }

  public radiusChanged(region: Region, $event: any) {
    region.radius = $event;
    this.selectedRegion = region;
  }

  public save(regions: Region[]) {
    const observables: Observable<Region>[] = [];
    regions.forEach(region => {
      observables.push(this.regionService.update(region));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });

  }

}
