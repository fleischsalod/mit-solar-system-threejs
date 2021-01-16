/**
 * Creational Functions for Saturn
 */

import {
  Line,
  LineBasicMaterial,
  EllipseCurve,
  BufferGeometry,
  ConeGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
  RingBufferGeometry,
  MathUtils,
} from '../../lib/threejs/r122/build/three.module.js';
import {
  getAxialTiltInRad,
  getElementDiameter,
  getRingsDiameter,
  getElementDistanceFromSun,
} from '../utils.js';

// basic url to textures of Saturn
const BASIC_URL = 'src/textures/saturn/';

/**
 * Create mesh of Saturn
 */
const createSaturnMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('saturn', realDiameter),
    64,
    64,
  );
  const saturnMap = new TextureLoader().load(
    BASIC_URL + 'saturncolor2.jpg',
  );
  // const saturnNormal = new TextureLoader().load(
  //   BASIC_URL + 'saturncolorNew_NRM.png',
  // );
  const saturnSpec = new TextureLoader().load(
    BASIC_URL + 'saturncolorNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: saturnMap,
    // normalMap: saturnNormal,
    specularMap: saturnSpec,
    // bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('saturn');
  const ringMesh = createSaturnRing(realDiameter);
  ringMesh.rotation.x = Math.PI / 2;
  mesh.add(ringMesh);
  return mesh;
};

/**
 * Create Saturnrings
 */
const createSaturnRing = (realDiameter) => {
  const { ringsInnerDiameter, ringsOuterDiameter } = getRingsDiameter(
    'saturn',
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
  const saturnRingMap = new TextureLoader().load(
    BASIC_URL + '2k_saturn_ring_alpha.png',
  );
  saturnRingMap.rotation = MathUtils.degToRad(90);
  const material = new MeshPhongMaterial({
    map: saturnRingMap,
    side: DoubleSide,
    transparent: true,
  });
  const ringMesh = new Mesh(geometry, material);
  return ringMesh;
};

//create SaturnMark
const createSaturnMark = () => {
  const geometry = new ConeGeometry(48, 96, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//saturn ellipse
const createSaturnEllipse = (realDistance) => {
  const saturnDistance = getElementDistanceFromSun(
    'saturn',
    realDistance,
  );
  const saturncurve = new EllipseCurve(
    0,
    0, // ax, aY
    saturnDistance,
    saturnDistance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const saturnpoints = saturncurve.getPoints(500000);
  const saturngeometry = new BufferGeometry().setFromPoints(
    saturnpoints,
  );
  const saturnmaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const saturnellipse = new Line(saturngeometry, saturnmaterial);
  return saturnellipse;
};

export { createSaturnMesh, createSaturnMark, createSaturnEllipse };
