/**
 * Creational Functions for Mercury
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { mercury, earth } from '../data.js';

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(
    2 * (mercury.equaRadius / earth.equaRadius),
    64,
    64,
  );
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'merkurcolor.jpg',
  );

  const material = new MeshPhongMaterial({
    map: mercuryMap,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = mercury.axialTilt * (Math.PI / 180);
  return mesh;
};

export { createMercuryMesh };
