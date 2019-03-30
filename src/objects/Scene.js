import { Group, Geometry, LineBasicMaterial, Line, Vector3, Float32BufferAttribute, Object3D, AxesHelper } from 'three';
import Cube from './Cube/Cube';
import BasicLights from './Lights';

export default class SeedScene extends Group {
  constructor() {
    super();

    const lights = new BasicLights();
    this.cube = new Cube();
    const axes = new AxesHelper(5)

    this.add(this.cube, lights, axes);
  }

  update(timeStamp) {
    // this.rotation.set(timeStamp / 1000, timeStamp / 1000, timeStamp / 1000);
  }
}