import * as THREE from '../lib/threejs/r122/build/three.module.js';
import { OrbitControls } from '../lib/threejs/r122/examples/jsm/controls/OrbitControls.js';
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
import {
  createSunMesh,
  // createSunVideo,
  // 'createSunCloudMesh1,
  // createSunCloudMesh2,'
} from './modules/sun.js';
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
  getElementDistanceFromSun,
  getRotationSpeed,
  getSideralOrbit,
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
camera.position.set(800, 0, 0);
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

//Add const vor 90° rotation
const ellipseposition = 1.5707963268;

// Add Sun to Scene
const sunMesh = createSunMesh();
// const sunVideo = createSunVideo();
// const sunCloud2 = createSunCloudMesh2();
sunMesh.position.set(-20, 0, 100);
// sunMesh.add(sunVideo);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
const mercuryMark = createMercuryMark();
const mercuryEllipseMesh = createMercuryEllipse();
mercuryEllipseMesh.rotation.x = ellipseposition;
mercuryMark.position.y = 20;
mercuryMesh.add(mercuryMark);
scene.add(mercuryMesh, mercuryEllipseMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
const venusAtmos = createVenusCloudMesh();
const venusMark = createVenusMark();
const venusEllipseMesh = createVenusEllipse();
venusEllipseMesh.rotation.x = ellipseposition;
(venusMark.position.y = -20), venusMesh.add(venusAtmos, venusMark);
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
earthGroup.add(earthMesh, eartMark);
scene.add(earthGroup, earthEllipseMesh);

// Add Moon to scene
const moonMesh = createEarthMoon();
moonMesh.position.x = -5;
moonMesh.position.z = 5;
earthGroup.add(moonMesh);

// Add Mars to Scene
const marsGroup = new THREE.Group();
const marsMesh = createMarsMesh();
const marsMark = createMarsMark();
const marsEllipseMesh = createMarsEllipse();
marsEllipseMesh.rotation.x = ellipseposition;
marsMark.position.y = 20;
marsGroup.position.set(0, 0, 0);
marsGroup.add(marsMark, marsMesh);
scene.add(marsGroup, marsEllipseMesh);

// Add Jupiter to scene
const jupiterGroup = new THREE.Group();
const jupiterMark = createJupiterMark();
const jupiterMesh = createJupiterMesh();
const jupiterEllipseMesh = createJupiterEllipse();
jupiterEllipseMesh.rotation.x = ellipseposition;
jupiterMark.position.y = 70;
jupiterGroup.add(jupiterMesh, jupiterMark);
scene.add(jupiterGroup, jupiterEllipseMesh);

// Add Saturn so Scene
const saturnGroup = new THREE.Group();
const saturnMark = createSaturnMark();
const saturnMesh = createSaturnMesh();
const saturnEllipseMesh = createSaturnEllipse();
saturnEllipseMesh.rotation.x = ellipseposition;
saturnMark.position.y = 70;
saturnGroup.add(saturnMark, saturnMesh);
scene.add(saturnGroup, saturnEllipseMesh);

// Add Uranus to Scene
const uranusGroup = new THREE.Group();
const uranusMark = createUranusMark();
const uranusMesh = createUranusMesh();
const uranusEllipseMesh = createUranusEllipse();
uranusEllipseMesh.rotation.x = ellipseposition;
uranusMark.position.y = 110;
uranusGroup.add(uranusMark, uranusMesh);
scene.add(uranusGroup, uranusEllipseMesh);

// Add Neptune to Scene
const neptuneGroup = new THREE.Group();
const neptuneEllipseMesh = createNeptuneEllipse();
const neptuneMark = createNeptuneMark();
const neptuneMesh = createNeptuneMesh();
neptuneEllipseMesh.rotation.x = ellipseposition;
neptuneMark.position.y = 110;
neptuneGroup.add(neptuneMark, neptuneMesh);
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

const mercuryDistance = getElementDistanceFromSun('mercury');
const mercuryOrbit = getSideralOrbit('mercury');
const venusDistance = getElementDistanceFromSun('venus');
const venusOrbit = getSideralOrbit('venus');
const earthDistance = getElementDistanceFromSun('earth');
const earthOrbit = getSideralOrbit('earth');
const marsDistance = getElementDistanceFromSun('mars');
const marsOrbit = getSideralOrbit('mars');
const jupiterDistance = getElementDistanceFromSun('jupiter');
const jupiterOrbit = getSideralOrbit('jupiter');
const saturnDistance = getElementDistanceFromSun('saturn');
const saturnOrbit = getSideralOrbit('saturn');
const uranusDistance = getElementDistanceFromSun('uranus');
const uranusOrbit = getSideralOrbit('uranus');
const neptuneDistance = getElementDistanceFromSun('neptune');
const neptuneOrbit = getSideralOrbit('neptune');

let time = 0;
const markRotation = 1.5707963268 * 2;
const render = () => {
  earthMesh.rotation.y += getRotationSpeed('earth');
  eartMark.rotation.x = markRotation;
  // clouds should move 5 times as fast as earth
  cloudMesh.rotation.y += getRotationSpeed('earth') * 5;
  moonMesh.rotation.y += getRotationSpeed('moon');
  // This one defines how fast moon is surrounding the earth
  // Should be changed to elliptic rotation around earth
  earthGroup.rotation.y += getRotationSpeed('moon');
  marsMesh.rotation.y += getRotationSpeed('mars');
  marsMark.rotation.x = markRotation;
  //marsMark.rotation.x = markRotation;
  mercuryMesh.rotation.y += getRotationSpeed('mercury');
  mercuryMark.rotation.x = markRotation;
  // sun does not rotate, but this should show some better effects on sun
  // sunCloud1.rotation.y += 0.001;
  // sunCloud2.rotation.y -= 0.0001;
  jupiterMesh.rotation.y += getRotationSpeed('jupiter');
  jupiterMark.rotation.x = markRotation;
  neptuneMesh.rotation.y += getRotationSpeed('neptune');
  neptuneMark.rotation.x = markRotation;
  saturnMesh.rotation.y += getRotationSpeed('saturn');
  saturnMark.rotation.x = markRotation;
  uranusMesh.rotation.y += getRotationSpeed('uranus');
  uranusMark.rotation.x = markRotation;
  venusMesh.rotation.y += getRotationSpeed('venus');
  // venus atmosphere should rotate 100 times as fast as venus
  venusAtmos.rotation.y += getRotationSpeed('venus') * 100;

  // requestAnimationFrame(render);
  time += 0.001;

  mercuryMesh.position.x =
    Math.sin(time * mercuryOrbit) * mercuryDistance.perihelion;
  mercuryMesh.position.z =
    Math.cos(time * mercuryOrbit) * mercuryDistance.aphelion;

  venusMesh.position.x =
    Math.sin(time * venusOrbit) * venusDistance.perihelion;
  venusMesh.position.z =
    Math.cos(time * venusOrbit) * venusDistance.aphelion;

  earthGroup.position.x =
    Math.sin(time * earthOrbit) * earthDistance.perihelion;
  earthGroup.position.z =
    Math.cos(time * earthOrbit) * earthDistance.aphelion;

  marsGroup.position.x =
    Math.sin(time * marsOrbit) * marsDistance.perihelion;
  marsGroup.position.z =
    Math.cos(time * marsOrbit) * marsDistance.aphelion;

  jupiterGroup.position.x =
    Math.sin(time * jupiterOrbit) * jupiterDistance.perihelion;
  jupiterGroup.position.z =
    Math.cos(time * jupiterOrbit) * jupiterDistance.aphelion;

  saturnGroup.position.x =
    Math.sin(time * saturnOrbit) * saturnDistance.perihelion;
  saturnGroup.position.z =
    Math.cos(time * saturnOrbit) * saturnDistance.aphelion;

  uranusGroup.position.x =
    Math.sin(time * uranusOrbit) * uranusDistance.perihelion;
  uranusGroup.position.z =
    Math.cos(time * uranusOrbit) * uranusDistance.aphelion;

  neptuneGroup.position.x =
    Math.sin(time * neptuneOrbit) * neptuneDistance.perihelion;
  neptuneGroup.position.z =
    Math.cos(time * neptuneOrbit) * neptuneDistance.aphelion;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
