/**
 * Creational Functions for Uranus
 */

import {
  Color,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  RingGeometry,
  SphereGeometry,
  Texture,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';

// basic url to textures of Uranus
const BASIC_URL = 'src/textures/uranus/';

/**
 * Create mesh of Uranus
 */
const createUranusMesh = () => {
  const geometry = new SphereGeometry(7.9617, 64, 64);
  const uranusMap = new TextureLoader().load(
    BASIC_URL + 'uranusmap.jpg',
  );

  const material = new MeshPhongMaterial({
    map: uranusMap,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

/**
 * Create mesh of Uranusrings
 */
const createUranusRingMesh = () => {
  const geometry = new RingGeometry(11.92905, 30.7644, 256);
  const uranusRingMap = new TextureLoader().load(
    BASIC_URL + 'uranusringcolor.jpg',
  );

  const material = new MeshPhongMaterial({
    map: uranusRingMap,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

export { createUranusMesh, createUranusRingMesh };
