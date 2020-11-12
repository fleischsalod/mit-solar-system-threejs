// initialize scene, camera and renderer
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight(0x404040); // soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(light, directionalLight);

// Add sphere with earth-texture
var sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
var earthMap = new THREE.TextureLoader().load(
  'src/textures/earthmap1k.jpg',
);
var earthBump = new THREE.TextureLoader().load(
  'src/textures/earthbump1k.jpg',
);
var earthSpec = new THREE.TextureLoader().load(
  'src/textures/earthspec1k.jpg',
);
var sphereMaterial = new THREE.MeshPhongMaterial({
  map: earthMap,
  bumpMap: earthBump,
  bumpScale: 0.2,
  specularMap: earthSpec,
  specular: new THREE.Color('grey'),
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Add sphere to scene
scene.add(sphere);

// Add aniations to elements in scene
var animate = function () {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;

  renderer.render(scene, camera);
};

animate();
