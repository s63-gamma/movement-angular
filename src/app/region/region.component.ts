import {Component, OnInit, ViewChild} from '@angular/core';
import {RegionService} from '../region.service';
import {Region} from '../region';
import {Observable} from 'rxjs/Rx';
import {ModalDirective} from 'ng2-bootstrap';
import * as faker from 'faker';
import {UUID} from "angular2-uuid";


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  public regions: Region[];
  public selectedRegion: Region = null;
  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('map') public mapView;

  constructor(private regionService: RegionService) {
  }

  ngOnInit() {
    this.getRegions();
  }

  public getRegions() {
    this.regionService.query().subscribe(regions => {
      this.regions = regions;
    });
  }

  public gotoRegion(region: Region) {
    // this.mapView._mapsWrapper.panTo();
    this.mapView._mapsWrapper.panTo({lat: region.latitude, lng: region.longitude});
    this.mapView._mapsWrapper.setZoom(12);
  }

  public locationChanged(region: Region, $event: any) {
    region.longitude = Math.round($event.lng * 1000000) / 1000000;

    region.latitude = Math.round($event.lat * 1000000) / 1000000;
    this.selectedRegion = region;
  }

  public calculateColor(region: Region): String {
    const minCost = 1;
    const maxCost = 2.5;
    const minColor = 120;
    const maxColor = 360;
    const color = (region.costMultiplier - minCost) / (maxCost - minCost) * (maxColor - minColor) + minColor;

    return `hsl(${color}, 100%, 50%)`;

  }

  public radiusChanged(region: Region, $event: any) {
    region.radius = Math.round($event);
    this.selectedRegion = region;
  }

  public showModal(region: Region) {
    this.selectedRegion = region;
    this.childModal.show();
  }

  public closeModal() {
    this.childModal.hide();
  }

  public createRegion() {
    const region: Region = new Region(faker.fake('{{address.cityPrefix}} {{address.city}}'), 0, 0, 10000, 1, UUID.UUID());

    this.regions.push(region);
    this.selectedRegion = region;
    const wrapper = this.mapView._mapsWrapper;

    wrapper.getCenter().then(center => {
      this.locationChanged(region, {lat: center.lat(), lng: center.lng()});
    });
  }

  public saveModal(region: Region) {
    this.save(region);
    this.selectedRegion = null;
    this.closeModal();
  }

  public save(region: Region) {
    this.regionService.upsert(region).subscribe();
  }

  public saveAll(regions: Region[]) {
    const observables: Observable<Region>[] = [];
    regions.forEach(region => {
      observables.push(this.regionService.upsert(region));
    });

    Observable.forkJoin(observables).subscribe(result => {
      console.log(result);
    });

  }

}
