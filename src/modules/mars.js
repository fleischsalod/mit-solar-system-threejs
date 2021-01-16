/**
 * Creational Functions for Mars
 */

import {
  Line,
  BufferGeometry,
  EllipseCurve,
  LineBasicMaterial,
  ConeGeometry,
  MeshBasicMaterial,
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

// basic url to textures of mars
const BASIC_URL = 'src/textures/mars/';

/**
 * Create mesh of mars
 */
const createMarsMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('mars', realDiameter),
    64,
    64,
  );
  const marsMap = new TextureLoader().load(
    BASIC_URL + 'marscolor.jpg',
  );
  const marsBump = new TextureLoader().load(
    BASIC_URL + 'marsbump1k.jpg',
  );

  const material = new MeshPhongMaterial({
    map: marsMap,
    bumpMap: marsBump,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mars');
  return mesh;
};

//create MarsMark
const createMarsMark = () => {
  const geometry = new ConeGeometry(14, 28, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//mars ellipse
const createMarsEllipse = (realDistance) => {
  const marsDistance = getElementDistanceFromSun(
    'mars',
    realDistance,
  );
  const marscurve = new EllipseCurve(
    0,
    0, // ax, aY
    marsDistance,
    marsDistance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const marspoints = marscurve.getPoints(500000);
  const marsgeometry = new BufferGeometry().setFromPoints(marspoints);
  const marsmaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const marsellipse = new Line(marsgeometry, marsmaterial);
  return marsellipse;
};

export { createMarsMesh, createMarsMark, createMarsEllipse };
