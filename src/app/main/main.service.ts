import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ModalFilterComponent } from '../modal-filter/modal-filter.component';

@Injectable()
export class MainService {
  headers: Headers;
  options: RequestOptions;

  private modalFilterWindow: ModalFilterComponent;

  public showDetails: BehaviorSubject<boolean>;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.showDetails = new BehaviorSubject(false);
  }

  public setShowDetails(show: boolean) {
    this.showDetails.next(show);
  }

  public fetchData(url: string, callback: Function) {
    this.http
      .get(url)
      .toPromise()
      .then(
        res => {
          this.hideFilter();
          callback(res.json());
        }
      )
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred while loading data', error);
    if (error.status === 404) {
      alert('Data couldn\'t be found, please enter a valid ID!');
    }
    return Promise.reject(error.message || error);
  }

  /**define graph with nodes and links */
  public triplesToGraph(triples: any) {

    const graph = { nodes: [], links: [] };

    let subjId;
    let subjectLink;
    let objectLink;
    let predId;
    let objId;
    let objectLog;
    let subjectLog;

    triples.forEach((triple) => {

      console.log(triple);
      if (this.checkIfExists(triple.subjectName)) {
        subjId = triple.subjectName;
      }
      if (this.checkIfExists(triple.subject)) {
        subjectLink = triple.subject;
      }
      if (this.checkIfExists(triple.predicate)) {
        predId = triple.predicate;
      }
      if (this.checkIfExists(triple.objectName)) {
        objId = triple.objectName;
      }
      if (this.checkIfExists(triple.object)) {
        objectLink = triple.object;
      }
      if (this.checkIfExists(triple.subjectLog)) {
        subjectLog = triple.subjectLog;
      }
      if (this.checkIfExists(triple.objectLog)) {
        objectLog = triple.objectLog;
      }

      let subjNode = this.filterNodesById(graph.nodes, subjId)[0];
      let objNode = this.filterNodesById(graph.nodes, objId)[0];

      if (subjNode == null) {
        subjNode = { id: subjId, label: subjId, weight: 1, link: subjectLink, log: subjectLog };
        graph.nodes.push(subjNode);
      }

      if (objNode == null) {
        objNode = {
          id: objId, label: objId, weight: 1, link: objectLink, log: objectLog
        };
        graph.nodes.push(objNode);
      }


      graph.links.push({ source: subjNode, target: objNode, predicate: predId, weight: 1 });
    });
    return graph;
  }
  private filterNodesById(nodes, id) {
    return nodes.filter((n) => n.id === id);
  }
  private checkIfExists(data: any) {
    if (data !== undefined && data !== null) {
      return true;
    } else {
      return false;
    }
  }

  // set modal window
  public setModalFilterWindow(modalFilterWindow: ModalFilterComponent) {
    this.modalFilterWindow = modalFilterWindow;
  }

  // show modal window
  public showFilter() {
    this.modalFilterWindow.show();
  }

  // hide modal window
  public hideFilter() {
    this.modalFilterWindow.hide();
  }
}
