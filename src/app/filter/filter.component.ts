import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories = ['Repair', 'Health & beauty','Events', 'Computers & Informatics'];
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

}
