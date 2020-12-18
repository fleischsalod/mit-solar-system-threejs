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
camera.position.set(0, 800, 0);
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
sunMesh.position.set(0, 0, 0);
sunMesh.add(sunCloud1, sunCloud2);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
// mercuryMesh.position.set(-30, 0, 0);
scene.add(mercuryMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
const venusAtmos = createVenusCloudMesh();
// venusMesh.position.set(-15, 0, 0);
venusMesh.add(venusAtmos);
scene.add(venusMesh);

// Add group for earth and moon
const earthGroup = new THREE.Group();
earthGroup.position.set(0, 0, 0);
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
// marsMesh.position.set(10, 0, 0);
scene.add(marsMesh);

// Add Jupiter to scene
const jupiterMesh = createjupiterMesh();
// jupiterMesh.position.set(40, 0, 0);
scene.add(jupiterMesh);

// Add Saturn so Scene
const saturnMesh = createSaturnMesh();
// saturnMesh.position.set(100, 0, 0);
scene.add(saturnMesh);

// Add Uranus to Scene
const uranusMesh = createUranusMesh();
// uranusMesh.position.set(160, 0, 0);
scene.add(uranusMesh);

// Add Neptune to Scene
const neptuneMesh = createNeptuneMesh();
// neptuneMesh.position.set(200, 0, 0);
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

//mercury ellipse
const mercurycurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  mercuryDistance.perihelion,
  mercuryDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const mercurypoints = mercurycurve.getPoints(500000);
const mercurygeometry = new THREE.BufferGeometry().setFromPoints(
  mercurypoints,
);
const mercurymaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const mercuryellipse = new THREE.Line(
  mercurygeometry,
  mercurymaterial,
);
mercuryellipse.rotation.x = 1.5707963268;
scene.add(mercuryellipse);

//venus ellipse
const venuscurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  venusDistance.perihelion,
  venusDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const venuspoints = venuscurve.getPoints(500000);
const venusgeometry = new THREE.BufferGeometry().setFromPoints(
  venuspoints,
);
const venusmaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const venusellipse = new THREE.Line(venusgeometry, venusmaterial);
venusellipse.rotation.x = 1.5707963268;
scene.add(venusellipse);

//earth ellipse
const earthcurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  earthDistance.perihelion,
  earthDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const earthpoints = earthcurve.getPoints(500000);
const earthgeometry = new THREE.BufferGeometry().setFromPoints(
  earthpoints,
);
const earthmaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const earthellipse = new THREE.Line(earthgeometry, earthmaterial);
earthellipse.rotation.x = 1.5707963268;
scene.add(earthellipse);

//mars ellipse
const marscurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  marsDistance.perihelion,
  marsDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const marspoints = marscurve.getPoints(500000);
const marsgeometry = new THREE.BufferGeometry().setFromPoints(
  marspoints,
);
const marsmaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const marsellipse = new THREE.Line(marsgeometry, marsmaterial);
marsellipse.rotation.x = 1.5707963268;
scene.add(marsellipse);

//jupiter ellipse
const jupitercurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  jupiterDistance.perihelion,
  jupiterDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const jupiterpoints = jupitercurve.getPoints(500000);
const jupitergeometry = new THREE.BufferGeometry().setFromPoints(
  jupiterpoints,
);
const jupitermaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const jupiterellipse = new THREE.Line(
  jupitergeometry,
  jupitermaterial,
);
jupiterellipse.rotation.x = 1.5707963268;
scene.add(jupiterellipse);

//saturn ellipse
const saturncurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  saturnDistance.perihelion,
  saturnDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const saturnpoints = saturncurve.getPoints(500000);
const saturngeometry = new THREE.BufferGeometry().setFromPoints(
  saturnpoints,
);
const saturnmaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const saturnellipse = new THREE.Line(saturngeometry, saturnmaterial);
saturnellipse.rotation.x = 1.5707963268;
scene.add(saturnellipse);

//uranus ellipse
const uranuscurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  uranusDistance.perihelion,
  uranusDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const uranuspoints = uranuscurve.getPoints(500000);
const uranusgeometry = new THREE.BufferGeometry().setFromPoints(
  uranuspoints,
);
const uranusmaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const uranusellipse = new THREE.Line(uranusgeometry, uranusmaterial);
uranusellipse.rotation.x = 1.5707963268;
scene.add(uranusellipse);

//neptune ellipse
const neptunecurve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  neptuneDistance.perihelion,
  neptuneDistance.aphelion, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0, // aRotation
);
const neptunepoints = neptunecurve.getPoints(500000);
const neptunegeometry = new THREE.BufferGeometry().setFromPoints(
  neptunepoints,
);
const neptunematerial = new THREE.LineBasicMaterial({
  color: 0xff0000,
});

// Create the final object to add to the scene
const neptuneellipse = new THREE.Line(
  neptunegeometry,
  neptunematerial,
);
neptuneellipse.rotation.x = 1.5707963268;
scene.add(neptuneellipse);

let time = 0;
const render = () => {
  earthMesh.rotation.y += getRotationSpeed('earth');
  // clouds should move 5 times as fast as earth
  cloudMesh.rotation.y += getRotationSpeed('earth') * 5;
  moonMesh.rotation.y += getRotationSpeed('moon');
  // This one defines how fast moon is surrounding the earth
  // Should be changed to elliptic rotation around earth
  earthGroup.rotation.y += getRotationSpeed('moon');
  marsMesh.rotation.y += getRotationSpeed('mars');
  mercuryMesh.rotation.y += getRotationSpeed('mercury');
  // sun does not rotate, but this should show some better effects on sun
  sunCloud1.rotation.y += 0.001;
  sunCloud2.rotation.y -= 0.0001;
  jupiterMesh.rotation.y += getRotationSpeed('jupiter');
  neptuneMesh.rotation.y += getRotationSpeed('neptune');
  saturnMesh.rotation.y += getRotationSpeed('saturn');
  uranusMesh.rotation.y += getRotationSpeed('uranus');
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

  marsMesh.position.x =
    Math.sin(time * marsOrbit) * marsDistance.perihelion;
  marsMesh.position.z =
    Math.cos(time * marsOrbit) * marsDistance.aphelion;

  jupiterMesh.position.x =
    Math.sin(time * jupiterOrbit) * jupiterDistance.perihelion;
  jupiterMesh.position.z =
    Math.cos(time * jupiterOrbit) * jupiterDistance.aphelion;

  saturnMesh.position.x =
    Math.sin(time * saturnOrbit) * saturnDistance.perihelion;
  saturnMesh.position.z =
    Math.cos(time * saturnOrbit) * saturnDistance.aphelion;

  uranusMesh.position.x =
    Math.sin(time * uranusOrbit) * uranusDistance.perihelion;
  uranusMesh.position.z =
    Math.cos(time * uranusOrbit) * uranusDistance.aphelion;

  neptuneMesh.position.x =
    Math.sin(time * neptuneOrbit) * neptuneDistance.perihelion;
  neptuneMesh.position.z =
    Math.cos(time * neptuneOrbit) * neptuneDistance.aphelion;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
