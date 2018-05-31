import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';
import * as d3 from 'd3';

import { MainService } from '../../../main/main.service';

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  showDetail: boolean;
  activateDetail: boolean;

  constructor(private mainService: MainService) {
    this.showDetail = false;
    this.mainService.showDetails.subscribe((value) => {
      this.activateDetail = value;
      return value;
    });
  }

  showPopup(node: any) {
    this.showDetail = true;
  }
  hidePopup(node: any) {
    this.showDetail = false;
  }
}
