import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;


  id: string;
  link: string;
  label: string;
  weight: number;
  linkCount = 0;
  isParent: boolean;
  log: any;
  itemCount: number;


  constructor(id, label, weight, isParent, link, log) {
    console.log(link);
    this.id = id;
    this.link = link;
    this.label = label;
    this.weight = weight;
    this.index = 0;
    this.isParent = isParent;
    this.log = log;
    this.itemCount = 0;
    if (this.log !== null && this.log !== undefined) {
      this.itemCount = this.log.itemCount;
    }
  }

  normal = () => {
    // return Math.sqrt(this.linkCount / APP_CONFIG.N);
    return 10;
  }

  get r() {
    // return 50 * this.normal() + 10;
    return 9;
  }

  get fontSize() {
    // return (30 * this.normal() + 10) + 'px';
    return 15;
  }

  get color() {
    // const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    // return APP_CONFIG.SPECTRUM[index];
    if (this.isParent === true) {
      return 'rgb(255,0,0)';
    } else {
      return 'rgb(176,212,243)';
    }
  }

}
