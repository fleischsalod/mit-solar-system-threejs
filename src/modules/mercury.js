/**
 * Creational Functions for Mercury
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

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(0.76581, 64, 64);
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'mercurymap.jpg',
  );
  const mercuryBump = new TextureLoader().load(
    BASIC_URL + 'mercurybump.jpg',
  );

  const material = new MeshPhongMaterial({
    map: mercuryMap,
    bumpMap: mercuryBump,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

export { createMercuryMesh };
