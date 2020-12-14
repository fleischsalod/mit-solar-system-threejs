/**
 * Creational Functions for Neptune
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

// basic url to textures of neptune
const BASIC_URL = 'src/textures/neptune/';

/**
 * Create mesh of neptune
 */
const createNeptuneMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('neptune'),
    64,
    64,
  );
  const neptuneMap = new TextureLoader().load(
    BASIC_URL + 'neptunecolor.jpg',
  );

  const material = new MeshPhongMaterial({
    map: neptuneMap,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('neptune');
  return mesh;
};

export { createNeptuneMesh };
