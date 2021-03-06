/**
 * Creational Functions for Jupiter
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

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createJupiterMesh = (realDiameter) => {
  const geometry = new SphereGeometry(
    getElementDiameter('jupiter', realDiameter),
    64,
    64,
  );
  const jupiterMap = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_COLOR.png',
  );
  const jupiterSpec = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: jupiterMap,
    specularMap: jupiterSpec,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('jupiter');
  return mesh;
};

//jupiter ellipse
const createJupiterEllipse = (realDistance) => {
  const jupiterDistance = getElementDistanceFromSun(
    'jupiter',
    realDistance,
  );
  const jupitercurve = new EllipseCurve(
    0,
    0, // ax, aY
    jupiterDistance,
    jupiterDistance, // xRadius, yRadius
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

export { createJupiterMesh, createJupiterEllipse };
