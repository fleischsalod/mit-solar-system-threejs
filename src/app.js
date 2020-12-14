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
import { getRotationSpeed } from './utils.js';

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
// sunMesh.position.set(0, 0, 0);
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

// Add animations to elements in scene
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

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  function render() {
    requestAnimationFrame(render);
    var time = Date.now() * 0.0005;

    //mercury.rotation.x += 0.01;
    mercuryMesh.position.x = Math.sin(time * 4.5) * 250;
    mercuryMesh.position.y = Math.cos(time * 4.5) * 20;
    mercuryMesh.position.z = Math.cos(time * 4.5) * 250;

    //venus.rotation.x += 0.01;
    venusMesh.position.x = Math.sin(time * 2.5) * 300;
    venusMesh.position.y = Math.sin(time * 1.5) * 20;
    venusMesh.position.z = Math.cos(time * 2.5) * 300;

    //earth.rotation.x += 0.01;
    earthGroup.position.x = Math.sin(time * 1.5) * 350;
    earthGroup.position.z = Math.cos(time * 1.5) * 350;

    marsMesh.position.x = Math.sin(time * 1) * 375;
    marsMesh.position.y = Math.cos(time * 1) * 20;
    marsMesh.position.z = Math.cos(time * 1) * 375;

    jupiterMesh.position.x = Math.sin(time * 0.5) * 500;
    jupiterMesh.position.y = Math.sin(time * 0.5) * 30;
    jupiterMesh.position.z = Math.cos(time * 0.5) * 500;

    saturnMesh.position.x = Math.sin(time * 0.3) * 650;
    saturnMesh.position.z = Math.cos(time * 0.3) * 650;

    uranusMesh.position.x = Math.sin(time * 0.2) * 700;
    uranusMesh.position.y = Math.cos(time * 0.2) * 10;
    uranusMesh.position.z = Math.cos(time * 0.2) * 700;

    neptuneMesh.position.x = Math.sin(time * 0.1) * 750;
    neptuneMesh.position.y = Math.cos(time * 0.1) * 20;
    neptuneMesh.position.z = Math.cos(time * 0.1) * 750;
  }
  renderer.render(scene, camera);
  render();
};

renderer.setAnimationLoop(render);
