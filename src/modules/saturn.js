/**
 * Creational Functions for Saturn
 */

import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
  RingBufferGeometry,
  MathUtils,
} from '../../lib/threejs/r122/build/three.module.js';
import { saturn, earth } from '../data.js';

// basic url to textures of Saturn
const BASIC_URL = 'src/textures/saturn/';

/**
 * Create mesh of Saturn
 */
const createSaturnMesh = () => {
  const geometry = new SphereGeometry(
    2 * (saturn.equaRadius / earth.equaRadius),
    64,
    64,
  );
  const saturnMap = new TextureLoader().load(
    BASIC_URL + 'saturncolor2.jpg',
  );

  const material = new MeshPhongMaterial({
    map: saturnMap,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

/**
 * Create Saturnrings
 */
const createSaturnRing = () => {
  const geometry = new RingBufferGeometry(25, 35, 64);
  var uvs = geometry.attributes.uv.array;
  // loop and initialization taken from RingBufferGeometry
  var phiSegments = geometry.parameters.phiSegments || 0;
  var thetaSegments = geometry.parameters.thetaSegments || 0;
  phiSegments =
    phiSegments !== undefined ? Math.max(1, phiSegments) : 1;
  thetaSegments =
    thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
  for (var c = 0, j = 0; j <= phiSegments; j++) {
    for (var i = 0; i <= thetaSegments; i++) {
      (uvs[c++] = i / thetaSegments), (uvs[c++] = j / phiSegments);
    }
  }
  const saturnRingMap = new TextureLoader().load(
    BASIC_URL + 'saturnringcolor.jpg',
  );
  saturnRingMap.rotation = MathUtils.degToRad(90);
  const material = new MeshPhongMaterial({
    map: saturnRingMap,
    side: DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const ringMesh = new Mesh(geometry, material);
  return ringMesh;
};

export { createSaturnMesh, createSaturnRing };
