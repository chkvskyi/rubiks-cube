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

const sideMaping = new Map();
sideMaping.set('F', { x: 2, subRotation: [0,1,4,5,3,2] });
sideMaping.set('D', { x: 0, subRotation: [0,1,4,5,3,2] });
sideMaping.set('T', { y: 2, subRotation: [4,5,2,3,1,0] });
sideMaping.set('B', { y: 0, subRotation: [4,5,2,3,1,0] });
sideMaping.set('L', { z: 2, subRotation: [2,3,1,0,4,5] });
sideMaping.set('R', { z: 0, subRotation: [2,3,1,0,4,5] })

export default class Cube extends Group {
  constructor() {
    super();
    this.name = 'cube';
    this.state = this.initialState();
    this.cube = this.renderState(this.state);

    console.log(this.cube, this);
    this.add(this.cube);
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
    const cube = new Object3D();

    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        for (let z = 0; z <= 2; z++) {
          const cubeGeo = new BoxGeometry(1, 1, 1);
          cubeGeo.translate(x * 1.01 - 1, y * 1.01 - 1, z * 1.01 - 1);
          const materials = state[x][y][z].map(side => new MeshBasicMaterial({ color: side.hexColor }));
          const subCube = new Mesh(cubeGeo, materials);
          cube.add(subCube);
        }
      }
    }

    return cube;
  }

  rotate(key, state) {
    if (!state) state = this.state;
    const side = [];

    if (sideMaping.get(key).x === 0 || sideMaping.get(key).x) {
      const x = sideMaping.get(key).x;
      for (let y = 0; y < 2; y++) {
        for (let z = y; z < 2; z++) {
          const temp = state[x][y][z];
          state[x][y][z] = state[x][2-z][y];
          state[x][2-z][y] = state[x][2-y][2-z];
          state[x][2-y][2-z] = state[x][z][2-y];
          state[x][z][2-y] = temp;
        }
      }
    } else if (sideMaping.get(key).y === 0 || sideMaping.get(key).y) {
      const y = sideMaping.get(key).y;
      for (let x = 0; x < 2; x++) {
        for (let z = x; z < 2; z++) {
          const temp = state[x][y][z];
          state[x][y][z] = state[2-z][y][x];
          state[2-z][y][x] = state[2-x][y][2-z];
          state[2-x][y][2-z] = state[z][y][2-x];
          state[z][y][2-x] = temp;
        }
      }
    } else if (sideMaping.get(key).z === 0 || sideMaping.get(key).z) {
      const z = sideMaping.get(key).z;
      for (let x = 0; x < 2; x++) {
        for (let y = x; y < 2; y++) {
          const temp = state[x][y][z];
          state[x][y][z] = state[2-y][x][z];
          state[2-y][x][z] = state[2-x][2-y][z];
          state[2-x][2-y][z] = state[y][2-x][z];
          state[y][2-x][z] = temp;
        }
      }
    }

    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        for (let z = 0; z <= 2; z++) {
          if (sideMaping.get(key).x === x || sideMaping.get(key).y === y || sideMaping.get(key).z === z) side.push([x,y,z]);
        }
      }
    }

    side.forEach(s => {
      const mapping = sideMaping.get(key).subRotation;
      const temp = Object.assign({}, state[s[0]][s[1]][s[2]]);
      for (let i = 0; i < 6; i++) {
        state[s[0]][s[1]][s[2]][i] = temp[mapping[i]];
      }
    })

    this.state = state;
    this.redraw();
  }

  redraw() {
    this.remove(this.cube);
    this.cube = this.renderState(this.state);
    this.add(this.cube);
  }
}