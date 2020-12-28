/**
 * Creational Functions for Mercury
 */

import {
  EllipseCurve,
  Line,
  LineBasicMaterial,
  BufferGeometry,
  ConeGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
  Scene,
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
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('mercury'),
    64,
    64,
  );
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_COLOR.png',
  );
  const merkurNormal = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_NRM.png',
  );
  const merkurSpec = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: mercuryMap,
    normalMap: merkurNormal,
    specularMap: merkurSpec,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mercury');
  return mesh;
};

//create MercuryMark
const createMercuryMark = () => {
  const geometry = new ConeGeometry(12, 24, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//mercury ellipse
const createMercuryEllipse = () => {
  const mercuryDistance = getElementDistanceFromSun('mercury');
  const mercurycurve = new EllipseCurve(
    0,
    0, // ax, aY
    mercuryDistance.perihelion,
    mercuryDistance.aphelion, // xRadius, yRadius
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
export { createMercuryMesh, createMercuryMark, createMercuryEllipse };
