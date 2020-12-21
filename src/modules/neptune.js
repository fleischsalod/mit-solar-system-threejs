/**
 * Creational Functions for Neptune
 */

import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  EllipseCurve,
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

// basic url to textures of neptune
const BASIC_URL = 'src/textures/neptune/';

/**
 * Create mesh of neptune
 */
const createNeptuneMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('neptune'),
    64,
    64,
  );
  const neptuneMap = new TextureLoader().load(
    BASIC_URL + 'neptunecolorNew_COLOR.png',
  );
  // const neptuneDisp = new TextureLoader().load(
  //   BASIC_URL + 'neptunecolorNew_DISP.png',
  // );
  const neptuneSpec = new TextureLoader().load(
    BASIC_URL + 'neptunecolorNew_SPEC.png',
  );
  const neptuneNormal = new TextureLoader().load(
    BASIC_URL + 'neptunecolorNew_NRM.png',
  );

  const material = new MeshPhongMaterial({
    map: neptuneMap,
    // displacementMap: neptuneDisp,
    specularMap: neptuneSpec,
    normalMap: neptuneNormal,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('neptune');
  return mesh;
};

//create NeptuneMark
const createNeptuneMark = () => {
  const geometry = new ConeGeometry(96, 192, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//neptune ellipse
const createNeptuneEllipse = () => {
  const neptuneDistance = getElementDistanceFromSun('neptune');
  const neptunecurve = new EllipseCurve(
    0,
    0, // ax, aY
    neptuneDistance.perihelion,
    neptuneDistance.aphelion, // xRadius, yRadius
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

export { createNeptuneMesh, createNeptuneMark, createNeptuneEllipse };
