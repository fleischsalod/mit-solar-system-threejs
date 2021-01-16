/**
 * Creational Functions for Mercury
 */

import {
  EllipseCurve,
  Line,
  LineBasicMaterial,
  BufferGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import {
  getAxialTiltInRad,
  getElementDiameter,
  getElementDistanceFromSun,
} from '../utils.js';

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('mercury', realDiameter),
    64,
    64,
  );
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_COLOR.png',
  );
  const merkurSpec = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: mercuryMap,
    specularMap: merkurSpec,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mercury');
  return mesh;
};

//mercury ellipse
const createMercuryEllipse = (realDistance) => {
  const mercuryDistance = getElementDistanceFromSun(
    'mercury',
    realDistance,
  );
  const mercurycurve = new EllipseCurve(
    0,
    0, // ax, aY
    mercuryDistance,
    mercuryDistance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const mercurypoints = mercurycurve.getPoints(50000);
  const mercurygeometry = new BufferGeometry().setFromPoints(
    mercurypoints,
  );
  const mercurymaterial = new LineBasicMaterial({
    color: 0xffffff,
    opacity: 0.8,
  });
  const mercuryellipse = new Line(mercurygeometry, mercurymaterial);
  return mercuryellipse;
};
export { createMercuryMesh, createMercuryEllipse };
