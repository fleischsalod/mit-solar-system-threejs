/**
 * Creational Functions for Jupiter
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { jupiter, earth } from '../data.js';

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createjupiterMesh = () => {
  const geometry = new SphereGeometry(
    2 * (jupiter.equaRadius / earth.equaRadius),
    64,
    64,
  );
  const jupiterMap = new TextureLoader().load(
    BASIC_URL + 'jupitercolor.jpg',
  );
  const material = new MeshPhongMaterial({
    map: jupiterMap,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = jupiter.axialTilt * (Math.PI / 180);
  return mesh;
};

export { createjupiterMesh };
