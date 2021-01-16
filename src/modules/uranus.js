/**
 * Creational Functions for Uranus
 */

import {
  Line,
  BufferGeometry,
  LineBasicMaterial,
  EllipseCurve,
  MeshBasicMaterial,
  ConeGeometry,
  DoubleSide,
  MathUtils,
  Mesh,
  MeshPhongMaterial,
  RingBufferGeometry,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import {
  getElementDistanceFromSun,
  getAxialTiltInRad,
  getElementDiameter,
  getRingsDiameter,
} from '../utils.js';

// basic url to textures of Uranus
const BASIC_URL = 'src/textures/uranus/';

/**
 * Create mesh of Uranus
 */
const createUranusMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('uranus', realDiameter),
    64,
    64,
  );
  const uranusMap = new TextureLoader().load(
    BASIC_URL + 'uranusNew_COLOR.png',
  );
  const uranusSpec = new TextureLoader().load(
    BASIC_URL + 'uranusNew_SPEC.png',
  );
  // const uranusNormal = new TextureLoader().load(
  //   BASIC_URL + 'uranusNew_NRM.png',
  // );

  const material = new MeshPhongMaterial({
    map: uranusMap,
    specularMap: uranusSpec,
    // normalMap: uranusNormal,
    // bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('uranus');
  const ringMesh = createUranusRing(realDiameter);
  ringMesh.rotation.x = Math.PI / 2;
  mesh.add(ringMesh);
  return mesh;
};

/**
 * Create mesh of Uranusrings
 */
const createUranusRing = (realDiameter) => {
  const { ringsInnerDiameter, ringsOuterDiameter } = getRingsDiameter(
    'uranus',
    realDiameter,
  );
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
  const uranusRingMap = new TextureLoader().load(
    BASIC_URL + 'uranusringcolor.jpg',
  );
  uranusRingMap.rotation = MathUtils.degToRad(90);
  const material = new MeshPhongMaterial({
    map: uranusRingMap,
    side: DoubleSide,
    transparent: true,
    opacity: 0.3,
  });
  const ringMesh = new Mesh(geometry, material);
  return ringMesh;
};

//create UranusMark
const createUranusMark = () => {
  const geometry = new ConeGeometry(96, 192, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//uranus ellipse
const createUranusEllipse = (realDistance) => {
  const uranusDistance = getElementDistanceFromSun(
    'uranus',
    realDistance,
  );
  const uranuscurve = new EllipseCurve(
    0,
    0, // ax, aY
    uranusDistance,
    uranusDistance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const uranuspoints = uranuscurve.getPoints(500000);
  const uranusgeometry = new BufferGeometry().setFromPoints(
    uranuspoints,
  );
  const uranusmaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const uranusellipse = new Line(uranusgeometry, uranusmaterial);
  return uranusellipse;
};

export { createUranusMesh, createUranusMark, createUranusEllipse };
