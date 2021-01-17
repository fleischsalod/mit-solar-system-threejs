import * as THREE from '../../lib/threejs/r122/build/three.module.js';
import { OrbitControls } from '../../lib/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { GUI } from '../../lib/util/gui/dat.gui.module.js';
import { SIZE_CONST } from '../data.js';
import {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
  createEarthEllipse,
} from '../modules/earth.js';
import {
  createJupiterMesh,
  createJupiterEllipse,
} from '../modules/jupiter.js';
import {
  createMarsMesh,
  createMarsEllipse,
} from '../modules/mars.js';
import {
  createMercuryMesh,
  createMercuryEllipse,
} from '../modules/mercury.js';
import {
  createNeptuneMesh,
  createNeptuneEllipse,
} from '../modules/neptune.js';
import {
  createSaturnMesh,
  createSaturnEllipse,
} from '../modules/saturn.js';
import { createSunMesh } from '../modules/sun.js';
import {
  createUranusMesh,
  createUranusEllipse,
} from '../modules/uranus.js';
import {
  createVenusMesh,
  createVenusCloudMesh,
  createVenusEllipse,
} from '../modules/venus.js';
import {
  getElementData,
  getElementDistanceFromSun,
  getRotationSpeed,
} from '../utils.js';

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

// GUI Setup
const gui = new GUI({ width: 300 });

let guiControls = { realDiameter: false, speedUp: 10000 };

const folder = gui.addFolder('Einstellungen');
folder
  .add(guiControls, 'realDiameter')
  .name('Reale Planetengrößen')
  .onChange(requestRenderIfNotRequested);
folder
  .add(guiControls, 'speedUp', [1, 100, 10000, 1000000])
  .name('Zeitmultiplikator');
folder.open();

//Add const for 90° rotation
const ellipseposition = 1.5707963268;

// Add Sun to Scene
const sunMesh = createSunMesh();
sunMesh.position.set(0, 0, 0);
scene.add(sunMesh);

const mercuryEllipseMesh = createMercuryEllipse();
mercuryEllipseMesh.rotation.x = ellipseposition;
const venusEllipseMesh = createVenusEllipse();
venusEllipseMesh.rotation.x = ellipseposition;
const earthEllipseMesh = createEarthEllipse();
earthEllipseMesh.rotation.x = ellipseposition;
const marsEllipseMesh = createMarsEllipse();
marsEllipseMesh.rotation.x = ellipseposition;
const jupiterEllipseMesh = createJupiterEllipse();
jupiterEllipseMesh.rotation.x = ellipseposition;
const saturnEllipseMesh = createSaturnEllipse();
saturnEllipseMesh.rotation.x = ellipseposition;
const uranusEllipseMesh = createUranusEllipse();
uranusEllipseMesh.rotation.x = ellipseposition;
const neptuneEllipseMesh = createNeptuneEllipse();
neptuneEllipseMesh.rotation.x = ellipseposition;

scene.add(
  mercuryEllipseMesh,
  venusEllipseMesh,
  earthEllipseMesh,
  marsEllipseMesh,
  jupiterEllipseMesh,
  saturnEllipseMesh,
  uranusEllipseMesh,
  neptuneEllipseMesh,
);

const earthGroup = new THREE.Group();
const marsGroup = new THREE.Group();
const jupiterGroup = new THREE.Group();
const saturnGroup = new THREE.Group();
const uranusGroup = new THREE.Group();
const neptuneGroup = new THREE.Group();

let mercuryMesh,
  venusMesh,
  venusAtmos,
  earthMesh,
  cloudMesh,
  moonMesh,
  marsMesh,
  jupiterMesh,
  saturnMesh,
  uranusMesh,
  neptuneMesh,
  mercuryMark,
  venusMark,
  earthMark,
  marsMark,
  jupiterMark,
  saturnMark,
  uranusMark,
  neptuneMark,
  moonMark;

const createMark = (text, small) => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, small ? 50 : 100, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  const loader = new THREE.FontLoader();
  loader.load('src/fonts/Abel_Regular.json', function (font) {
    var geometry = new THREE.TextGeometry(text, {
      font: font,
      size: 16,
      height: 1,
      curveSegments: 4,
      bevelEnabled: false,
    });
    geometry.center();
    var material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, small ? 60 : 110, 0);
    line.add(mesh);
  });

  return line;
};

const createPlanets = (realDiameter) => {
  // Add Mercury to Scene
  mercuryMesh = createMercuryMesh(realDiameter);
  scene.add(mercuryMesh);

  // Add Venus to Scene
  venusMesh = createVenusMesh(realDiameter);
  venusAtmos = createVenusCloudMesh(realDiameter);
  venusMesh.add(venusAtmos);
  scene.add(venusMesh);

  // Add group for earth and moon

  // Add earth with clouds to scene
  earthMesh = createEarthMesh(realDiameter);
  cloudMesh = createEarthCloud(realDiameter);
  earthMesh.add(cloudMesh);
  earthGroup.add(earthMesh);

  // Add Moon to scene
  moonMesh = createEarthMoon(realDiameter);
  // gets moons distance from earth
  const moonDistance = getElementDistanceFromSun('moon');
  earthGroup.add(moonMesh);

  // Add Mars to Scene
  marsMesh = createMarsMesh(realDiameter);
  marsGroup.add(marsMesh);

  // Add Jupiter to scene
  jupiterMesh = createJupiterMesh(realDiameter);
  jupiterGroup.add(jupiterMesh);

  // Add Saturn so Scene
  saturnMesh = createSaturnMesh(realDiameter);
  saturnGroup.add(saturnMesh);

  // Add Uranus to Scene
  uranusMesh = createUranusMesh(realDiameter);
  uranusGroup.add(uranusMesh);

  // Add Neptune to Scene
  neptuneMesh = createNeptuneMesh(realDiameter);
  neptuneGroup.add(neptuneMesh);

  if (realDiameter) {
    mercuryMark = createMark('Merkur');
    venusMark = createMark('Venus');
    earthMark = createMark('Erde');
    marsMark = createMark('Mars');
    jupiterMark = createMark('Jupiter');
    saturnMark = createMark('Saturn');
    uranusMark = createMark('Uranus');
    neptuneMark = createMark('Neptun');
    moonMark = createMark('Mond', 'small');

    mercuryMesh.add(mercuryMark);
    venusMesh.add(venusMark);
    earthMesh.add(earthMark);
    marsMesh.add(marsMark);
    jupiterMesh.add(jupiterMark);
    saturnMesh.add(saturnMark);
    uranusMesh.add(uranusMark);
    neptuneMesh.add(neptuneMark);
    moonMesh.add(moonMark);
  }
};

createPlanets(guiControls.realDiameter);
scene.add(
  earthGroup,
  marsGroup,
  jupiterGroup,
  saturnGroup,
  uranusGroup,
  neptuneGroup,
);

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
const {
  distance: moonDistance,
  orbit: moonOrbit,
  rotation: moonRotation,
} = getElementData('moon');

const updatePlanetSizes = (realDiameter) => {
  scene.remove(venusMesh, mercuryMesh);
  earthGroup.remove(earthMesh, moonMesh);
  marsGroup.remove(marsMesh);
  jupiterGroup.remove(jupiterMesh);
  saturnGroup.remove(saturnMesh);
  uranusGroup.remove(uranusMesh);
  neptuneGroup.remove(neptuneMesh);
  createPlanets(realDiameter);
};

let renderRequested = false;
// requestAnimationFrame forwards the time since first render in ms to the render-function
const render = (time) => {
  if (renderRequested) {
    updatePlanetSizes(guiControls.realDiameter);
  }
  renderRequested = false;
  if (guiControls.realDiameter) {
    mercuryMark.lookAt(camera.position);
    venusMark.lookAt(camera.position);
    earthMark.lookAt(camera.position);
    marsMark.lookAt(camera.position);
    jupiterMark.lookAt(camera.position);
    saturnMark.lookAt(camera.position);
    uranusMark.lookAt(camera.position);
    neptuneMark.lookAt(camera.position);
    moonMark.lookAt(camera.position);
  }
  // converts time to seconds
  time *= 0.001;

  // time in seconds / 24h * 360deg is real time (earth needs 24h to rotate around axis 1 time)
  earthMesh.rotation.y =
    (time / earthRotation) * Math.PI * 2 * guiControls.speedUp;
  // clouds should move 5 times as fast as earth
  cloudMesh.rotation.y =
    (time / earthRotation) * Math.PI * 2 * guiControls.speedUp * 5;
  moonMesh.rotation.y =
    (time / moonRotation) * Math.PI * 2 * guiControls.speedUp;
  mercuryMesh.rotation.y =
    (time / mercuryRotation) * Math.PI * 2 * guiControls.speedUp;
  venusMesh.rotation.y =
    -(time / venusRotation) * Math.PI * 2 * guiControls.speedUp;
  // venus atmosphere should rotate 100 times as fast as venus
  venusAtmos.rotation.y =
    (time / venusRotation) * Math.PI * 2 * guiControls.speedUp * 100;
  marsMesh.rotation.y =
    (time / marsRotation) * Math.PI * 2 * guiControls.speedUp;
  jupiterMesh.rotation.y =
    (time / jupiterRotation) * Math.PI * 2 * guiControls.speedUp;
  saturnMesh.rotation.y =
    (time / saturnRotation) * Math.PI * 2 * guiControls.speedUp;
  uranusMesh.rotation.y =
    (time / uranusRotation) * Math.PI * 2 * guiControls.speedUp;
  neptuneMesh.rotation.y =
    (time / neptuneRotation) * Math.PI * 2 * guiControls.speedUp;

  // time in s / 365 days * 360deg * 1 (1x speedUp) is real-time (earth need 356 day to orbit the sun 1 time)
  earthGroup.position.x =
    Math.sin(
      (time / earthOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * earthDistance;
  earthGroup.position.z =
    Math.cos(
      (time / earthOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * earthDistance;

  moonMesh.position.x =
    Math.sin((time / moonOrbit) * Math.PI * 2 * guiControls.speedUp) *
    moonDistance;
  moonMesh.position.z =
    Math.cos((time / moonOrbit) * Math.PI * 2 * guiControls.speedUp) *
    moonDistance;

  mercuryMesh.position.x =
    Math.sin(
      (time / mercuryOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * mercuryDistance;
  mercuryMesh.position.z =
    Math.cos(
      (time / mercuryOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * mercuryDistance;

  venusMesh.position.x =
    Math.sin(
      (time / venusOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * venusDistance;
  venusMesh.position.z =
    Math.cos(
      (time / venusOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * venusDistance;

  marsGroup.position.x =
    Math.sin((time / marsOrbit) * Math.PI * 2 * guiControls.speedUp) *
    marsDistance;
  marsGroup.position.z =
    Math.cos((time / marsOrbit) * Math.PI * 2 * guiControls.speedUp) *
    marsDistance;

  jupiterGroup.position.x =
    Math.sin(
      (time / jupiterOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * jupiterDistance;
  jupiterGroup.position.z =
    Math.cos(
      (time / jupiterOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * jupiterDistance;

  saturnGroup.position.x =
    Math.sin(
      (time / saturnOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * saturnDistance;
  saturnGroup.position.z =
    Math.cos(
      (time / saturnOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * saturnDistance;

  uranusGroup.position.x =
    Math.sin(
      (time / uranusOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * uranusDistance;
  uranusGroup.position.z =
    Math.cos(
      (time / uranusOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * uranusDistance;

  neptuneGroup.position.x =
    Math.sin(
      (time / neptuneOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * neptuneDistance;
  neptuneGroup.position.z =
    Math.cos(
      (time / neptuneOrbit) * Math.PI * 2 * guiControls.speedUp,
    ) * neptuneDistance;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

requestAnimationFrame(render);

function requestRenderIfNotRequested() {
  if (!renderRequested) {
    renderRequested = true;
    requestAnimationFrame(render);
  }
}
