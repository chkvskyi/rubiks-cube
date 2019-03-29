import { Group, CubeGeometry, MeshLambertMaterial, Mesh, MeshBasicMaterial, BoxGeometry, Object3D, Color } from 'three';

/**
 * subPart
 * 0: F(Front): White - W
 * 1: D(Back): Yellow - Y
 * 2: T(Top): Red - R
 * 3: B(Bottom): Orange - O
 * 4: L(Left): Blue/Purple -
 * 5: R(Right): Green
 */

export default class Cube extends Group {
  constructor() {
    super();
    this.name = 'cube';
    this.state = this.initialState();

    const cube = this.renderState(this.state);

    // const materials = [
    //   new MeshBasicMaterial({color: 0xf6f9f9}), //white
    //   new MeshBasicMaterial({color: 0xbf392b}), //red
    //   new MeshBasicMaterial({color: 0x26ae60}), //green
    //   new MeshBasicMaterial({color: 0x8d44ad}), // purple
    //   new MeshBasicMaterial({color: 0xf39c13}), // orange
    //   new MeshBasicMaterial({color: 0xf1c40f}), // yellow
    // ]

    this.add(cube);
  }

  initialState() {
    let xyz = Array(3).fill(0)
      .map(x => Array(3).fill(0)
        .map(y => Array(3).fill(0)
          .map(z => Array(6).fill(0)
            .map(p => {
              return {
                color: 'black',
                  hexColor: 0x000000
              }
            }))))

    for(let x = 0; x <= 2; x++) {
      for (let y = 0; y <=2; y++) {
        for (let z = 0; z <=2; z++) {
          if (x === 0) {
            xyz[x][y][z][1] = {
              color: 'yellow',
              hexColor: new Color(0xf1c40f)
            }
          }

          if (x === 2) {
            xyz[x][y][z][0] = {
              color: 'white',
              hexColor: new Color(0xf6f9f9)
            }
          }

          if (y === 2) {
            xyz[x][y][z][2] = {
              color: 'red',
              hexColor: new Color(0xbf392b)
            }
          }

          if (y === 0) {
            xyz[x][y][z][3] = {
              color: 'orange',
              hexColor: new Color(0xf39c13)
            }
          }

          if (z === 2) {
            xyz[x][y][z][4] = {
              color: 'purple',
              hexColor: new Color(0x8d44ad)
            }
          }

          if (z === 0) {
            xyz[x][y][z][5] = {
              color: 'green',
              hexColor: new Color(0x26ae60)
            }
          }
        }
      }
    }

    return xyz;
  }

  renderState(state) {
    const cubeGeo = new BoxGeometry(1,1,1);
    const cube = new Object3D();

    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        for (let z = 0; z <= 2; z++) {
          const materials = state[x][y][z].map(side => new MeshBasicMaterial({ color: side.hexColor }));
          const subCube = new Mesh(cubeGeo, materials);
          cube.add(subCube);
          subCube.position.set(x*1.01 - 1, y*1.01 - 1, z*1.01 - 1);
        }
      }
    }

    return cube;
  }
}