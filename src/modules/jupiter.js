/**
 * Creational Functions for Jupiter
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createjupiterMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('jupiter'),
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
  mesh.rotation.x = getAxialTiltInRad('jupiter');
  return mesh;
};

export { createjupiterMesh };
