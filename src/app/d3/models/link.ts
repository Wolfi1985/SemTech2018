import { Node } from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  predicate: Node | string | number;

  constructor(source, target, predicate) {
    this.source = source;
    this.target = target;
    this.predicate = predicate;
  }
  get fontSize() {
    // return (30 * this.normal() + 10) + 'px';
    return 10;
  }
}
