import {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
} from './utils.js';

// initialize scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xf39f8f, 0.75);
directionalLight.position.set(1, 0, 0);
scene.add(light, directionalLight);

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

// Add aniations to elements in scene
const animate = function () {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.005;
  cloudMesh.rotation.y += 0.005;
  earthGroup.rotation.y += 0.0015;

  renderer.render(scene, camera);
};

animate();
