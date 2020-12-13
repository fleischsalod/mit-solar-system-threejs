/**
 * Creational Functions for Uranus
 */

import {
  DoubleSide,
  MathUtils,
  Mesh,
  MeshPhongMaterial,
  RingBufferGeometry,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';

// basic url to textures of Uranus
const BASIC_URL = 'src/textures/uranus/';

/**
 * Create mesh of Uranus
 */
const createUranusMesh = () => {
  const geometry = new SphereGeometry(7.9617, 64, 64);
  const uranusMap = new TextureLoader().load(
    BASIC_URL + 'uranusNew_COLOR.png',
  );
  const uranusDisp = new TextureLoader().load(
    BASIC_URL + 'uranusmapNew_DISP.png',
  );
  const uranusSpec = new TextureLoader().load(
    BASIC_URL + 'uranusmapNew_SPEC.png',
  );
  const uranusNormal = new TextureLoader().load(
    BASIC_URL + 'uranusmapNew_NRM.png',
  );
  const uranusOcc = new TextureLoader().load(
    BASIC_URL + 'uranusmapNew_OCC.png',
  );

  const material = new MeshPhongMaterial({
    map: uranusMap,
    dispMap: uranusDisp,
    specularMap: uranusSpec,
    normalMap: uranusNormal,
    occlusionMap: uranusOcc,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

/**
 * Create mesh of Uranusrings
 */
const createUranusRing = () => {
  const geometry = new RingBufferGeometry(11, 16, 64);
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
  const uranusRingMap = new TextureLoader().load(
    BASIC_URL + 'uranusringcolor.jpg',
  );
  uranusRingMap.rotation = MathUtils.degToRad(90);
  const material = new MeshPhongMaterial({
    map: uranusRingMap,
    side: DoubleSide,
    transparent: true,
    opacity: 0.6,
  });
  const ringMesh = new Mesh(geometry, material);
  return ringMesh;
};

export { createUranusMesh, createUranusRing };
