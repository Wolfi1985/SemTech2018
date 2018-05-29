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
  label: string;
  weight: number;
  linkCount = 0;
  isParent: boolean;


  constructor(id, label, weight, isParent) {

    this.id = id;
    this.label = label;
    this.weight = weight;
    this.index = 0;
    this.isParent = isParent;
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
