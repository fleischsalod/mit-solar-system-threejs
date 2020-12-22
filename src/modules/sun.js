/**
 * Creational Functions for the sun
 */

import {
  VideoTexture,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from '../../lib/threejs/r122/build/three.module.js';
import { getElementDiameter, getAxialTiltInRad } from '../utils.js';

// basic url to textures of sun
const BASIC_URL = 'src/textures/sun/';

/**
 * Create mesh of sun
 */
const createSunMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('sun'),
    64,
    64,
  );

  const video01 = document.getElementById('video01');
  video01.play();
  const videoTexture = new VideoTexture(video01);

  const material = new MeshPhongMaterial({
    map: videoTexture,
  });

  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('sun');
  return mesh;
};

export { createSunMesh };
