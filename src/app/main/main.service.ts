import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MainService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  public fetchData(url: string, callback: Function) {
    this.http
      .get(url, this.options)
      .toPromise()
      .then(
        res => {
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
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /**define graph with nodes and links */
  public triplesToGraph(triples: any) {

    const graph = { nodes: [], links: [] };

    triples.forEach((triple) => {
      const subjId = triple.subject;
      const predId = triple.predicate;
      const objId = triple.object;

      let subjNode = this.filterNodesById(graph.nodes, subjId)[0];
      let objNode = this.filterNodesById(graph.nodes, objId)[0];

      if (subjNode == null) {
        subjNode = { id: subjId, label: subjId, weight: 1 };
        graph.nodes.push(subjNode);
      }

      if (objNode == null) {
        objNode = { id: objId, label: objId, weight: 1 };
        graph.nodes.push(objNode);
      }


      graph.links.push({ source: subjNode, target: objNode, predicate: predId, weight: 1 });
    });

    return graph;
  }
  private filterNodesById(nodes, id) {
    return nodes.filter((n) => n.id === id);
  }
}
