import * as THREE from '../../lib/threejs/r122/build/three.module.js';
import { createEarthMoon } from '../modules/earth.js';

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
camera.position.set(-0.75, -0.075, 1.25);

// Add Background
const loader = new THREE.TextureLoader();
const texture = loader.load('src/textures/background.jpg', () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt;
});

// Add Light
const light = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xf39f8f, 1.5);
directionalLight.position.set(-1, 0, 0);
scene.add(light, directionalLight);

//Drawing Lines for Design and Text
const Line1 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-582 / 250) * 0.9375, (155 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3(
      (-582 / 250) * 0.9375,
      (-140 / 250) * 0.9375,
      0,
    ),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line2 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-580 / 250) * 0.9375, (163 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3((-200 / 250) * 0.9375, (163 / 250) * 0.9375, 0),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line3 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-390 / 250) * 0.9375, (80 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3(
      (-390 / 250) * 0.9375,
      (-100 / 250) * 0.9375,
      0,
    ),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line4 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-387 / 250) * 0.9375, (60 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3((-387 / 250) * 0.9375, (-80 / 250) * 0.9375, 0),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line5 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(new THREE.Vector3((-387 / 250) * 0.9375, 0, 0));
  points.push(new THREE.Vector3((-150 / 250) * 0.9375, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line6 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-290 / 250) * 0.9375, (-10 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3((-290 / 250) * 0.9375, (10 / 250) * 0.9375, 0),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

const Line7 = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  const points = [];
  points.push(
    new THREE.Vector3((-340 / 250) * 0.9375, (-50 / 250) * 0.9375, 0),
  );
  points.push(
    new THREE.Vector3((-340 / 250) * 0.9375, (50 / 250) * 0.9375, 0),
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  return line;
};

// Add earth with clouds to scene
const moonMesh = createEarthMoon();
const line1 = Line1();
const line2 = Line2();
const line3 = Line3();
const line4 = Line4();
const line5 = Line5();
const line6 = Line6();
const line7 = Line7();
moonMesh.rotation.set(0, Math.PI, 0);
scene.add(moonMesh, line1, line2, line3, line4, line5, line6, line7);

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
  moonMesh.rotation.y += 0.002;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
