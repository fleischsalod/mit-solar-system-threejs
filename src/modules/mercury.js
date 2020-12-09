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
