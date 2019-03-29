import { Group, CubeGeometry, MeshLambertMaterial, Mesh, MeshBasicMaterial } from 'three';

export default class Cube extends Group {
  constructor() {
    super();

    this.name = 'basic';

    const cubeGeo = new CubeGeometry(2,2,2);
    const materials = [
    	new MeshBasicMaterial({color: 0xb03a2e}),
    	new MeshBasicMaterial({color: 0x633974}),
    	new MeshBasicMaterial({color: 0x1a5276}),
    	new MeshBasicMaterial({color: 0x0f6655}),
    	new MeshBasicMaterial({color: 0x1b8348}),
    	new MeshBasicMaterial({color: 0xe57e23}),
    ]
    const cube = new Mesh(cubeGeo, materials);

    this.add(cube);
  }
}