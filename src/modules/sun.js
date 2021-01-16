/**
 * Creational Functions for the sun
 */

import {
  VideoTexture,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
} from '../../lib/threejs/r122/build/three.module.js';
import { SIZE_CONST } from '../data.js';
import { getAxialTiltInRad } from '../utils.js';

/**
 * Create mesh of sun
 */
const createSunMesh = () => {
  const geometry = new SphereGeometry(SIZE_CONST, 64, 64);

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
