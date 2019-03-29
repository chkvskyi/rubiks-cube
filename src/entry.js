import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as Stats from 'stats-js';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// helpers
const controls = new OrbitControls(camera, renderer.domElement);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	stats.update();
    renderer.render(scene, camera);
    seedScene.update && seedScene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );