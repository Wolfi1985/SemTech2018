import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
  }

  /**filter data on button click*/
  public filter() {
    console.log('now');
    this.resetData();
    this.modalFilter.show();
    this.fetchData();
  }


  /**fetch data from REST-API */
  fetchData() {
    this.mainService.fetchData('assets/mockingData.json', (data) => this.fetchDataDone(data)); // patch to API after backend is finished
  }
  /**set data when fetched*/
  fetchDataDone(data: any) {
    this.data = data;
    this.drawGraph();
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
    // call draw graph method
    const graph = this.mainService.triplesToGraph(this.data.data);

    // setting nodes
    for (const g in graph.nodes) {
      if (g !== null || g !== undefined) {
        this.nodes.push(new Node(graph.nodes[g].id, graph.nodes[g].label, graph.nodes[g].weight));
      }
    }

    let source;
    let target;
    // setting nodes
    for (const l in graph.links) {
      if (l !== null || l !== undefined) {
        // console.log(graph.links[l].source);
        source = this.getNode(graph.links[l].source);
        target = this.getNode(graph.links[l].target);
        // console.log(source);
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
