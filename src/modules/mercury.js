/**
 * Creational Functions for Mercury
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('mercury'),
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
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mercury');
  return mesh;
};

export { createMercuryMesh };
