import * as THREE from '../lib/threejs/r122/build/three.module.js';
import { OrbitControls } from '../lib/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { SIZE_CONST } from './data.js';
import {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
  createEarthMark,
  createEarthEllipse,
} from './modules/earth.js';
import {
  createJupiterMesh,
  createJupiterMark,
  createJupiterEllipse,
} from './modules/jupiter.js';
import {
  createMarsMesh,
  createMarsMark,
  createMarsEllipse,
} from './modules/mars.js';
import {
  createMercuryMesh,
  createMercuryMark,
  createMercuryEllipse,
} from './modules/mercury.js';
import {
  createNeptuneMesh,
  createNeptuneMark,
  createNeptuneEllipse,
} from './modules/neptune.js';
import {
  createSaturnMesh,
  createSaturnMark,
  createSaturnEllipse,
} from './modules/saturn.js';
import { createSunMesh } from './modules/sun.js';
import {
  createUranusMesh,
  createUranusMark,
  createUranusEllipse,
} from './modules/uranus.js';
import {
  createVenusMesh,
  createVenusCloudMesh,
  createVenusMark,
  createVenusEllipse,
} from './modules/venus.js';
import {
  getElementData,
  getElementDistanceFromSun,
  getRotationSpeed,
} from './utils.js';

// renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;

// initialize scene and camera
const scene = new THREE.Scene();
const fov = 45;
const aspect = canvas.innerWidth / canvas.innerHeight; // the canvas default
const near = 0.1;
const far = 1000000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(800, 200, 0);
camera.lookAt(scene.position);

// Add Background
const loader = new THREE.TextureLoader();
const texture = loader.load('src/textures/background.jpg', () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt;
});

// Add Lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // soft white light
const sunLight = new THREE.PointLight(0xf39f8f); // sunlight colored
sunLight.position.set(0, 0, 0);
scene.add(ambientLight, sunLight);

const createSunSpotlight = (x, y, z) => {
  let spotlight = new THREE.SpotLight(
    0xf39f8f, // sunlight-colored
    5, // intensity
    SIZE_CONST * 3, // distance: how far the light shines
    Math.PI / 2, //angle: angle of the light, max is Math.PI/2
  );
  spotlight.position.set(x, y, z);
  scene.add(spotlight);
  return spotlight;
};

const spotlightPositions = [
  { x: SIZE_CONST * 2, y: 0, z: 0 },
  { x: -SIZE_CONST * 2, y: 0, z: 0 },
  { x: 0, y: SIZE_CONST * 2, z: 0 },
  { x: 0, y: -SIZE_CONST * 2, z: 0 },
  { x: 0, y: 0, z: SIZE_CONST * 2 },
  { x: 0, y: 0, z: -SIZE_CONST * 2 },
];

spotlightPositions.map((position) => {
  const { x, y, z } = position;
  return createSunSpotlight(x, y, z);
});

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(1, 0, 0);
controls.update();

//Add const vor 90° rotation
const ellipseposition = 1.5707963268;

// Add Sun to Scene
const sunMesh = createSunMesh();
sunMesh.position.set(0, 0, 0);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
const mercuryMark = createMercuryMark();
const mercuryEllipseMesh = createMercuryEllipse();
mercuryEllipseMesh.rotation.x = ellipseposition;
mercuryMark.position.y = 20;
// mercuryMesh.add(mercuryMark);
scene.add(mercuryMesh, mercuryEllipseMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
const venusAtmos = createVenusCloudMesh();
const venusMark = createVenusMark();
const venusEllipseMesh = createVenusEllipse();
venusEllipseMesh.rotation.x = ellipseposition;
// (venusMark.position.y = -20)
venusMesh.add(venusAtmos);
scene.add(venusMesh, venusEllipseMesh);

// Add group for earth and moon
const earthGroup = new THREE.Group();
earthGroup.position.set(0, 0, 0);

// Add earth with clouds to scene
const eartMark = createEarthMark();
const earthMesh = createEarthMesh();
const cloudMesh = createEarthCloud();
const earthEllipseMesh = createEarthEllipse();
earthEllipseMesh.rotation.x = ellipseposition;
eartMark.position.y = 20;
earthMesh.add(cloudMesh);
earthGroup.add(earthMesh);
scene.add(earthGroup, earthEllipseMesh);

// Add Moon to scene
const moonMesh = createEarthMoon();
// gets moons distance from earth
const moonDistance = getElementDistanceFromSun('moon');
moonMesh.position.x = moonDistance;
earthGroup.add(moonMesh);

// Add Mars to Scene
const marsGroup = new THREE.Group();
const marsMesh = createMarsMesh();
const marsMark = createMarsMark();
const marsEllipseMesh = createMarsEllipse();
marsEllipseMesh.rotation.x = ellipseposition;
marsMark.position.y = 20;
marsGroup.position.set(0, 0, 0);
marsGroup.add(marsMesh);
scene.add(marsGroup, marsEllipseMesh);

// Add Jupiter to scene
const jupiterGroup = new THREE.Group();
const jupiterMark = createJupiterMark();
const jupiterMesh = createJupiterMesh();
const jupiterEllipseMesh = createJupiterEllipse();
jupiterEllipseMesh.rotation.x = ellipseposition;
jupiterMark.position.y = 70;
jupiterGroup.add(jupiterMesh);
scene.add(jupiterGroup, jupiterEllipseMesh);

// Add Saturn so Scene
const saturnGroup = new THREE.Group();
const saturnMark = createSaturnMark();
const saturnMesh = createSaturnMesh();
const saturnEllipseMesh = createSaturnEllipse();
saturnEllipseMesh.rotation.x = ellipseposition;
saturnMark.position.y = 70;
saturnGroup.add(saturnMesh);
scene.add(saturnGroup, saturnEllipseMesh);

// Add Uranus to Scene
const uranusGroup = new THREE.Group();
const uranusMark = createUranusMark();
const uranusMesh = createUranusMesh();
const uranusEllipseMesh = createUranusEllipse();
uranusEllipseMesh.rotation.x = ellipseposition;
uranusMark.position.y = 110;
uranusGroup.add(uranusMesh);
scene.add(uranusGroup, uranusEllipseMesh);

// Add Neptune to Scene
const neptuneGroup = new THREE.Group();
const neptuneEllipseMesh = createNeptuneEllipse();
const neptuneMark = createNeptuneMark();
const neptuneMesh = createNeptuneMesh();
neptuneEllipseMesh.rotation.x = ellipseposition;
neptuneMark.position.y = 110;
neptuneGroup.add(neptuneMesh);
scene.add(neptuneGroup, neptuneEllipseMesh);

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

const {
  distance: mercuryDistance,
  orbit: mercuryOrbit,
  rotation: mercuryRotation,
} = getElementData('mercury');
const {
  distance: venusDistance,
  orbit: venusOrbit,
  rotation: venusRotation,
} = getElementData('venus');
const {
  distance: earthDistance,
  orbit: earthOrbit,
  rotation: earthRotation,
} = getElementData('earth');
const {
  distance: marsDistance,
  orbit: marsOrbit,
  rotation: marsRotation,
} = getElementData('mars');
const {
  distance: jupiterDistance,
  orbit: jupiterOrbit,
  rotation: jupiterRotation,
} = getElementData('jupiter');
const {
  distance: saturnDistance,
  orbit: saturnOrbit,
  rotation: saturnRotation,
} = getElementData('saturn');
const {
  distance: uranusDistance,
  orbit: uranusOrbit,
  rotation: uranusRotation,
} = getElementData('uranus');
const {
  distance: neptuneDistance,
  orbit: neptuneOrbit,
  rotation: neptuneRotation,
} = getElementData('neptune');
const moonRotation = getRotationSpeed('moon');

const markRotation = 1.5707963268 * 2;
// requestAnimationFrame forwards the time since first render in ms to the render-function
const render = (time) => {
  // converts time to seconds
  time = 1; // *= 0.0001
  // pickHelper.pick(pickPosition, scene, camera, time);

  earthMesh.rotation.y += earthRotation;
  eartMark.rotation.x = markRotation;
  // clouds should move 5 times as fast as earth
  cloudMesh.rotation.y += earthRotation * 5;
  moonMesh.rotation.y += moonRotation;
  // This one defines how fast moon is surrounding the earth
  // Should be changed to elliptic rotation around earth
  earthGroup.rotation.y += moonRotation;
  marsMesh.rotation.y += marsRotation;
  marsMark.rotation.x = markRotation;
  mercuryMesh.rotation.y += mercuryRotation;
  mercuryMark.rotation.x = markRotation;
  jupiterMesh.rotation.y += jupiterRotation;
  jupiterMark.rotation.x = markRotation;
  neptuneMesh.rotation.y += neptuneRotation;
  neptuneMark.rotation.x = markRotation;
  saturnMesh.rotation.y += saturnRotation;
  saturnMark.rotation.x = markRotation;
  uranusMesh.rotation.y += uranusRotation;
  uranusMark.rotation.x = markRotation;
  venusMesh.rotation.y += venusRotation;
  // venus atmosphere should rotate 100 times as fast as venus
  venusAtmos.rotation.y += venusRotation * 100;

  mercuryMesh.position.x =
    Math.sin(time * mercuryOrbit) * mercuryDistance;
  mercuryMesh.position.z =
    Math.cos(time * mercuryOrbit) * mercuryDistance;

  venusMesh.position.x = Math.sin(time * venusOrbit) * venusDistance;
  venusMesh.position.z = Math.cos(time * venusOrbit) * venusDistance;

  earthGroup.position.x = Math.sin(time * earthOrbit) * earthDistance;
  earthGroup.position.z = Math.cos(time * earthOrbit) * earthDistance;

  marsGroup.position.x = Math.sin(time * marsOrbit) * marsDistance;
  marsGroup.position.z = Math.cos(time * marsOrbit) * marsDistance;

  jupiterGroup.position.x =
    Math.sin(time * jupiterOrbit) * jupiterDistance;
  jupiterGroup.position.z =
    Math.cos(time * jupiterOrbit) * jupiterDistance;

  saturnGroup.position.x =
    Math.sin(time * saturnOrbit) * saturnDistance;
  saturnGroup.position.z =
    Math.cos(time * saturnOrbit) * saturnDistance;

  uranusGroup.position.x =
    Math.sin(time * uranusOrbit) * uranusDistance;
  uranusGroup.position.z =
    Math.cos(time * uranusOrbit) * uranusDistance;

  neptuneGroup.position.x =
    Math.sin(time * neptuneOrbit) * neptuneDistance;
  neptuneGroup.position.z =
    Math.cos(time * neptuneOrbit) * neptuneDistance;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

requestAnimationFrame(render);
