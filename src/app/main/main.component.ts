import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];

  public data;

  constructor(private mainService: MainService) {

  }


  ngOnInit() {
    this.mainService.fetchData('assets/mockingData.json', (data) => this.fetchDataDone(data)); // patch to API after backend is finished
  }

  fetchDataDone(data: any) {
    this.data = data;
    // console.log(this.data.data);
    this.drawGraph();

  }
  drawGraph() {
    // call draw graph method
  }


}
