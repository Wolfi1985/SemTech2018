import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public data = {};
  constructor(private mainService: MainService) {
  }


  ngOnInit() {
    this.mainService.getService('assets/mockingData.json', (data) => this.fetchDataDone(data)); // patch to API after backend is finished
  }

  fetchDataDone(data: any) {
    this.data = data;
    console.log(this.data);
  }


}
