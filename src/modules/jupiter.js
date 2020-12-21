/**
 * Creational Functions for Jupiter
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

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createJupiterMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('jupiter'),
    64,
    64,
  );
  const jupiterMap = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_COLOR.png',
  );
  // const jupiterDisp = new TextureLoader().load(
  //   BASIC_URL + 'jupitermapNEW_DISP.png',
  // );
  // const jupiterNormal = new TextureLoader().load(
  //   BASIC_URL + 'jupitermapNew_NRM.png',
  // );
  const jupiterSpec = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: jupiterMap,
    //displacementMap: jupiterDisp,
    //normalMap: jupiterNormal,
    specularMap: jupiterSpec,
    bumpScale: 0.1,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('jupiter');
  return mesh;
};

//create JupiterMark
const createJupiterMark = () => {
  const geometry = new ConeGeometry(48, 96, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//jupiter ellipse
const createJupiterEllipse = () => {
  const jupiterDistance = getElementDistanceFromSun('jupiter');
  const jupitercurve = new EllipseCurve(
    0,
    0, // ax, aY
    jupiterDistance.perihelion,
    jupiterDistance.aphelion, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const jupiterpoints = jupitercurve.getPoints(500000);
  const jupitergeometry = new BufferGeometry().setFromPoints(
    jupiterpoints,
  );
  const jupitermaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const jupiterellipse = new Line(jupitergeometry, jupitermaterial);
  return jupiterellipse;
};

export { createJupiterMesh, createJupiterMark, createJupiterEllipse };
