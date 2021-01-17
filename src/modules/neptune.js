/**
 * Creational Functions for Neptune
 */

import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  EllipseCurve,
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

// basic url to textures of neptune
const BASIC_URL = 'src/textures/neptune/';

/**
 * Create mesh of neptune
 */
const createNeptuneMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('neptune', realDiameter),
    64,
    64,
  );
  const neptuneMap = new TextureLoader().load(
    BASIC_URL + 'neptunecolorNew_COLOR.png',
  );
  const neptuneSpec = new TextureLoader().load(
    BASIC_URL + 'neptunecolorNew_SPEC.png',
  );
  // const neptuneNormal = new TextureLoader().load(
  //   BASIC_URL + 'neptunecolorNew_NRM.png',
  // );

  const material = new MeshPhongMaterial({
    map: neptuneMap,
    specularMap: neptuneSpec,
    // normalMap: neptuneNormal,
    // bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('neptune');
  return mesh;
};

//neptune ellipse
const createNeptuneEllipse = (realDistance) => {
  const neptuneDistance = getElementDistanceFromSun(
    'neptune',
    realDistance,
  );
  const neptunecurve = new EllipseCurve(
    0,
    0, // ax, aY
    neptuneDistance,
    neptuneDistance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const neptunepoints = neptunecurve.getPoints(500000);
  const neptunegeometry = new BufferGeometry().setFromPoints(
    neptunepoints,
  );
  const neptunematerial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const neptuneellipse = new Line(neptunegeometry, neptunematerial);
  return neptuneellipse;
};

export { createNeptuneMesh, createNeptuneEllipse };
