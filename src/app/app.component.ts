import {
  Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy,
  OnInit, AfterViewInit, ViewChild
} from '@angular/core';

import APP_CONFIG from './app.config';
import { Node, Link } from './d3';
import { D3Service, ForceDirectedGraph } from './d3';

import { ModalFilterComponent } from './modal-filter/modal-filter.component';

import { MainService } from './main/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  @ViewChild('modalFilter') modalFilter: ModalFilterComponent;

  title = 'app';

  nodes: Node[] = [];
  links: Link[] = [];
  parentElem: any;

  private showButtons: boolean;
  private showDetails: boolean;

  public data;

  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private mainService: MainService, private d3Service: D3Service, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.mainService.setModalFilterWindow(this.modalFilter);
    this.modalFilter.show();
    this.showButtons = false;
    this.showDetails = false;
  }
  private setShowDetails() {
    this.mainService.setShowDetails(this.showDetails);
  }

  /**filter data on button click*/
  public filter() {
    this.resetData();
    this.modalFilter.show();
    this.showButtons = false;
  }


  /**fetch data from REST-API */
  fetchData(event: object) {
    this.parentElem = event['parent'];
    const depth = event['depth'];
    console.log(this.parentElem + ' ' + depth);

    if (this.parentElem != null && this.parentElem !== undefined && this.parentElem !== '') {
      this.mainService.fetchData('http://localhost:5000/api/query/' + this.parentElem + '/'
        + depth, (data) => this.fetchDataDone(data));
    } else {
      alert('Please enter a parent element!');
    }
  }
  /**set data when fetched*/
  fetchDataDone(data: any) {
    this.data = data;

    console.log(this.data);

    this.drawGraph();
    this.showButtons = true;
  }

  /**reset Nodes and links */
  resetData() {
    this.nodes = [];
    this.links = [];
    this.data = [];
  }

  /** draw graph
   * will be restructured
  */
  drawGraph() {
    // call draw graph method to get nodes and links
    const graph = this.mainService.triplesToGraph(this.data.data);

    console.log(graph);

    // setting nodes
    for (const g in graph.nodes) {
      if (g !== null && g !== undefined) {
        this.nodes.push(new Node(graph.nodes[g].id, graph.nodes[g].label, graph.nodes[g].weight,
          false, graph.nodes[g].link, graph.nodes[g].log));
      }
    }
    this.nodes[0].isParent = true;
    console.log(this.nodes[0]);

    let source;
    let target;

    // setting nodes
    for (const l in graph.links) {
      if (l !== null || l !== undefined) {

        source = this.getNode(graph.links[l].source);
        target = this.getNode(graph.links[l].target);

        this.links.push(new Link(source, target, graph.links[l].predicate));
      }
    }
    console.log(this.links);
    console.log(this.nodes);
    this.initGraph();
  }

  private getNode(node: any) {
    let ret = null;
    for (const n in this.nodes) {
      if (this.nodes[n].id === node.id) {
        ret = this.nodes[n];
      }
    }

    return ret;
  }

  private initGraph() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  startSimulation() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
