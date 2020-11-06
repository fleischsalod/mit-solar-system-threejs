// initialize scene, camera and renderer
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add sphere with earth-texture
var sphereGeometry = new THREE.SphereGeometry(20, 64, 64);
var texture = new THREE.TextureLoader().load(
  '/src/textures/earthmap.jpg',
);
var sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
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
