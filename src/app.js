import * as THREE from '../lib/threejs/r122/build/three.module.js';
import { OrbitControls } from '../lib/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
} from './modules/earth.js';
import { createjupiterMesh } from './modules/jupiter.js';
import { createMarsMesh } from './modules/mars.js';
import { createMercuryMesh } from './modules/mercury.js';
import { createNeptuneMesh } from './modules/neptune.js';
import { createSaturnMesh, createSaturnRingMesh} from './modules/saturn.js';
import { createSunMesh } from './modules/sun.js';
import { createUranusMesh, createUranusRingMesh} from './modules/uranus.js';
import { createVenusMesh } from './modules/venus.js';

// renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;

// initialize scene and camera
const scene = new THREE.Scene();
const fov = 45;
const aspect = canvas.innerWidth / canvas.innerHeight; // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);
camera.lookAt(scene.position);

// Add Light
const light = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xf39f8f, 0.75);
directionalLight.position.set(1, 0, 0);
scene.add(light, directionalLight);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(1, 0, 0);
controls.update();

// Add Sun to Scene
const sunMesh = createSunMesh();
sunMesh.position.set (-280,0,0);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
mercuryMesh.position.set (-30,0,0);
scene.add(mercuryMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
venusMesh.position.set (-15,0,0);
scene.add(venusMesh);

// Add group for earth and moon
const earthGroup = new THREE.Group();
scene.add(earthGroup);

// Add earth with clouds to scene
const earthMesh = createEarthMesh();
const cloudMesh = createEarthCloud();
earthMesh.add(cloudMesh);
earthGroup.add(earthMesh);

// Add Moon to scene
const moonMesh = createEarthMoon();
moonMesh.position.x = -5;
moonMesh.position.z = 5;
earthGroup.add(moonMesh);

// Add Mars to Scene
const marsMesh = createMarsMesh();
marsMesh.position.set (10,0,0);
scene.add(marsMesh);

// Add Jupiter to scene
const jupiterMesh = createjupiterMesh();
jupiterMesh.position.set (40,0,0);
scene.add(jupiterMesh);

// Add Saturn so Scene
const saturnMesh = createSaturnMesh();
saturnMesh.position.set (100,0,0);
scene.add(saturnMesh);
/* 
const saturnRingMesh = createSaturnRingMesh();
saturnRingMesh.position.set (100,0,0);
saturnRingMesh.rotation.x = Math.PI / 2;
*/

// Add Uranus to Scene
const uranusMesh = createUranusMesh();
uranusMesh.add(createUranusRingMesh);
uranusMesh.position.set (160,0,0);
scene.add(uranusMesh);
/* 
const uranusRingMesh = createUranusRingMesh();
uranusRingMesh.position.set (100,0,0);
uranusRingMesh.rotation.x = Math.PI / 2;
*/

// Add Neptune to Scene
const neptuneMesh = createNeptuneMesh();
neptuneMesh.position.set (200,0,0);
scene.add(neptuneMesh);


// handle browser resize
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize =
    canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Add animations to elements in scene
const render = () => {
  earthMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.005;
  earthGroup.rotation.y += 0.0015;
  marsMesh.rotation.y += 0.0020516;
  mercuryMesh.rotation.y += 0.11729166;
  sunMesh.rotation.y += 0.0507499;
  jupiterMesh.rotation.y += 0.00082749;
  neptuneMesh.rotation.y += 0.00134166;
  saturnMesh.rotation.y += 0.00089166;
  uranusMesh.rotation.y += 0.00143583;
  venusMesh.rotation.y += 0.2334999;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
