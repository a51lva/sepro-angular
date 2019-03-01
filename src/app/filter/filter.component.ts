import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories = ['Repair', 'Health & beauty','Events', 'Computers & Informatics'];

  constructor() { }

  ngOnInit() {
  }

}
