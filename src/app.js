import * as THREE from '../lib/threejs/r122/build/three.module.js';
import { OrbitControls } from '../lib/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
  createEarthMark,
} from './modules/earth.js';
import {
  createjupiterMesh,
  createJupiterMark,
} from './modules/jupiter.js';
import { createMarsMesh, createMarsMark } from './modules/mars.js';
import {
  createMercuryMesh,
  createMercuryMark,
} from './modules/mercury.js';
import {
  createNeptuneMesh,
  createNeptuneMark,
} from './modules/neptune.js';
import {
  createSaturnMesh,
  createSaturnMark,
} from './modules/saturn.js';
import {
  createSunMesh,
  createSunCloudMesh1,
  createSunCloudMesh2,
} from './modules/sun.js';
import {
  createUranusMesh,
  createUranusMark,
} from './modules/uranus.js';
import {
  createVenusMesh,
  createVenusCloudMesh,
  createVenusMark,
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

// Add Sun to Scene
const sunMesh = createSunMesh();
const sunCloud1 = createSunCloudMesh1();
const sunCloud2 = createSunCloudMesh2();
// sunMark.position.z = 5;
sunMesh.position.set(0, 0, 0);
// sunMark.rotation.y = 1.5707963268;
sunMesh.add(sunCloud1, sunCloud2);
scene.add(sunMesh);

// Add Mercury to Scene
const mercuryMesh = createMercuryMesh();
const mercuryMark = createMercuryMark();
// mercuryMesh.position.set(-30, 0, 0);
mercuryMark.position.y = 20;
mercuryMesh.add(mercuryMark);
scene.add(mercuryMesh);

// Add Venus to Scene
const venusMesh = createVenusMesh();
const venusAtmos = createVenusCloudMesh();
const venusMark = createVenusMark();
(venusMark.position.y = -20),
  // venusMesh.position.set(-15, 0, 0);
  venusMesh.add(venusAtmos, venusMark);
scene.add(venusMesh);

// Add group for earth and moon
const earthGroup = new THREE.Group();
earthGroup.position.set(0, 0, 0);
scene.add(earthGroup);

// Add earth with clouds to scene
const eartMark = createEarthMark();
const earthMesh = createEarthMesh();
const cloudMesh = createEarthCloud();
eartMark.position.y = 20;
earthMesh.add(cloudMesh);
earthGroup.add(earthMesh, eartMark);

// Add Moon to scene
const moonMesh = createEarthMoon();
moonMesh.position.x = -5;
moonMesh.position.z = 5;
earthGroup.add(moonMesh);

// Add Mars to Scene
const marsGroup = new THREE.Group();
const marsMesh = createMarsMesh();
const marsMark = createMarsMark();
marsMark.position.y = 20;
marsGroup.position.set(0, 0, 0);
marsGroup.add(marsMark, marsMesh);
// marsMesh.position.set(10, 0, 0);
scene.add(marsGroup);

// Add Jupiter to scene
const jupiterGroup = new THREE.Group();
const jupiterMark = createJupiterMark();
const jupiterMesh = createjupiterMesh();
jupiterMark.position.y = 70;
jupiterGroup.add(jupiterMesh, jupiterMark);
// jupiterMesh.position.set(40, 0, 0);
scene.add(jupiterGroup);

// Add Saturn so Scene
const saturnGroup = new THREE.Group();
const saturnMark = createSaturnMark();
const saturnMesh = createSaturnMesh();
saturnMark.position.y = 70;
saturnGroup.add(saturnMark, saturnMesh);
// saturnMesh.position.set(100, 0, 0);
scene.add(saturnGroup);

// Add Uranus to Scene
const uranusGroup = new THREE.Group();
const uranusMark = createUranusMark();
const uranusMesh = createUranusMesh();
uranusMark.position.y = 110;
uranusGroup.add(uranusMark, uranusMesh);
// uranusMesh.position.set(160, 0, 0);
scene.add(uranusGroup);

// Add Neptune to Scene
const neptuneGroup = new THREE.Group();
const neptuneMark = createNeptuneMark();
const neptuneMesh = createNeptuneMesh();
neptuneMark.position.y = 110;
neptuneGroup.add(neptuneMark, neptuneMesh);
// neptuneMesh.position.set(200, 0, 0);
scene.add(neptuneGroup);

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

//create Ellipse Rings
const color = 0xfffff;
const ellipseposition = 1.5707963268;
const curvepoints = 500000;

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

const mercurypoints = mercurycurve.getPoints(curvepoints);
const venuspoints = venuscurve.getPoints(curvepoints);
const earthpoints = earthcurve.getPoints(curvepoints);
const marspoints = marscurve.getPoints(curvepoints);
const jupiterpoints = jupitercurve.getPoints(curvepoints);
const saturnpoints = saturncurve.getPoints(curvepoints);
const uranuspoints = uranuscurve.getPoints(curvepoints);
const neptunepoints = neptunecurve.getPoints(curvepoints);

const mercurygeometry = new THREE.BufferGeometry().setFromPoints(
  mercurypoints,
);
const venusgeometry = new THREE.BufferGeometry().setFromPoints(
  venuspoints,
);
const earthgeometry = new THREE.BufferGeometry().setFromPoints(
  earthpoints,
);
const marsgeometry = new THREE.BufferGeometry().setFromPoints(
  marspoints,
);
const jupitergeometry = new THREE.BufferGeometry().setFromPoints(
  jupiterpoints,
);
const saturngeometry = new THREE.BufferGeometry().setFromPoints(
  saturnpoints,
);
const uranusgeometry = new THREE.BufferGeometry().setFromPoints(
  uranuspoints,
);
const neptunegeometry = new THREE.BufferGeometry().setFromPoints(
  neptunepoints,
);

const {
  mercurymaterial,
  venusmaterial,
  earthmaterial,
  marsmaterial,
  jupitermaterial,
  saturnmaterial,
  neptunematerial,
  uranusmaterial,
} = new THREE.LineBasicMaterial({
  color: color,
});

// Create the final object to add to the scene
const mercuryellipse = new THREE.Line(
  mercurygeometry,
  mercurymaterial,
);
const venusellipse = new THREE.Line(venusgeometry, venusmaterial);
const earthellipse = new THREE.Line(earthgeometry, earthmaterial);
const marsellipse = new THREE.Line(marsgeometry, marsmaterial);
const jupiterellipse = new THREE.Line(
  jupitergeometry,
  jupitermaterial,
);
const saturnellipse = new THREE.Line(saturngeometry, saturnmaterial);
const uranusellipse = new THREE.Line(uranusgeometry, uranusmaterial);
const neptuneellipse = new THREE.Line(
  neptunegeometry,
  neptunematerial,
);

//Set Ellipse positions and add to Scene
mercuryellipse.rotation.x = ellipseposition;
venusellipse.rotation.x = ellipseposition;
earthellipse.rotation.x = ellipseposition;
marsellipse.rotation.x = ellipseposition;
jupiterellipse.rotation.x = ellipseposition;
saturnellipse.rotation.x = ellipseposition;
uranusellipse.rotation.x = ellipseposition;
neptuneellipse.rotation.x = ellipseposition;

scene.add(
  mercuryellipse,
  earthellipse,
  venusellipse,
  marsellipse,
  jupiterellipse,
  saturnellipse,
  neptuneellipse,
  uranusellipse,
);

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
  sunCloud1.rotation.y += 0.001;
  sunCloud2.rotation.y -= 0.0001;
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
