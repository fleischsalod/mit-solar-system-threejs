/**
 * Creational Functions for the sun
 */

import {
  RingBufferGeometry,
  VideoTexture,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  DoubleSide,
} from '../../lib/threejs/r122/build/three.module.js';

import {
  getElementDiameter,
  getAxialTiltInRad,
  getRingsDiameter,
} from '../utils.js';

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
  const fireRing = createSunFireRing();
  mesh.add(fireRing);
  return mesh;
};

const createSunFireRing = () => {
  const ringsInnerDiameter = getElementDiameter('sun');
  const ringsOuterDiameter = ringsInnerDiameter + 30;
  const geometry = new RingBufferGeometry(
    ringsInnerDiameter,
    ringsOuterDiameter,
    64,
  );
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
  const video02 = document.getElementById('video02');
  video02.play();
  const videoTexture = new VideoTexture(video02);
  const material = new MeshPhongMaterial({
    map: videoTexture,
    side: DoubleSide,
    transparent: true,
  });
  const ringMesh = new Mesh(geometry, material);
  return ringMesh;
};

export { createSunMesh };
