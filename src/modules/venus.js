/**
 * Creational Functions for Venus
 */

import {
  Color,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';

// basic url to textures of venus
const BASIC_URL = 'src/textures/venus/';

/**
 * Create mesh of venus
 */
const createVenusMesh = () => {
  const geometry = new SphereGeometry(1.89954, 64, 64);
  const venusMap = new TextureLoader().load(
    BASIC_URL + 'venuscolor.jpg',
  );
  const venusBump = new TextureLoader().load(
    BASIC_URL + 'venusbump.jpg',
  );

  const material = new MeshPhongMaterial({
    map: venusMap,
    bumpMap: venusBump,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

export { createVenusMesh };
