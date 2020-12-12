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
import { createSaturnMesh } from './modules/saturn.js';
import {
  createSunMesh,
  createSunCloudMesh1,
  createSunCloudMesh2,
} from './modules/sun.js';
import { createUranusMesh } from './modules/uranus.js';
import {
  createVenusMesh,
  createVenusCloudMesh,
} from './modules/venus.js';
import {
  earth,
  jupiter,
  mars,
  mercury,
  moon,
  neptune,
  saturn,
  sun,
  uranus,
  venus,
} from './data.js';

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

// Add Background
const loader = new THREE.TextureLoader();
const texture = loader.load('src/textures/background.jpg', () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt;
});

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
const sunCloud1 = createSunCloudMesh1();
const sunCloud2 = createSunCloudMesh2();
sunMesh.position.set(-280, 0, 0);
sunMesh.add(sunCloud1, sunCloud2);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
mercuryMesh.position.set(-30, 0, 0);
scene.add(mercuryMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
const venusAtmos = createVenusCloudMesh();
venusMesh.position.set(-15, 0, 0);
venusMesh.add(venusAtmos);
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
marsMesh.position.set(10, 0, 0);
scene.add(marsMesh);

// Add Jupiter to scene
const jupiterMesh = createjupiterMesh();
jupiterMesh.position.set(40, 0, 0);
scene.add(jupiterMesh);

// Add Saturn so Scene
const saturnMesh = createSaturnMesh();
saturnMesh.position.set(100, 0, 0);
scene.add(saturnMesh);

// Add Uranus to Scene
const uranusMesh = createUranusMesh();
uranusMesh.position.set(160, 0, 0);
scene.add(uranusMesh);

// Add Neptune to Scene
const neptuneMesh = createNeptuneMesh();
neptuneMesh.position.set(200, 0, 0);
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

const getRotation = (sideralRotation) => {
  // the sideralRotation of a planet is set in hours.
  // the earth rotates 360deg = 2*phi (rad) in 24h.
  const earthRotation = earth.sideralRotation;
  // The rotation of earth is set to 0.01
  const rotationConst = 0.01;
  // the rotation of all other planets is then calculated from earth rotation like this:
  // (earthRotation/sideralRotation) * rotationConst
  // Example Mars: (23.9345/24.6229) * 0.01 = 0.00972
  return (earthRotation / sideralRotation) * rotationConst;
};

// Add animations to elements in scene
const render = () => {
  earthMesh.rotation.y += getRotation(earth.sideralRotation);
  // clouds should move 5 times as fast as earth
  cloudMesh.rotation.y += getRotation(earth.sideralRotation / 5);
  moonMesh.rotation.y += getRotation(moon.sideralRotation);
  // This one defines how fast moon is surrounding the earth;
  earthGroup.rotation.y += getRotation(moon.sideralOrbit);
  marsMesh.rotation.y += getRotation(mars.sideralRotation);
  mercuryMesh.rotation.y += getRotation(mercury.sideralRotation);
  // sun does not rotate, but this should show some better effects on sun
  sunCloud1.rotation.y += 0.002;
  sunCloud2.rotation.y -= 0.004;
  jupiterMesh.rotation.y += getRotation(jupiter.sideralRotation);
  neptuneMesh.rotation.y += getRotation(neptune.sideralRotation);
  saturnMesh.rotation.y += getRotation(saturn.sideralRotation);
  uranusMesh.rotation.y += getRotation(uranus.sideralRotation);
  venusMesh.rotation.y += getRotation(venus.sideralRotation);
  // venus atmosphere should rotate 100 times as fast as venus
  venusAtmos.rotation.y -= getRotation(venus.sideralRotation / 100);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
