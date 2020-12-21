/**
 * Creational Functions for Venus
 */

import {
  EllipseCurve,
  BufferGeometry,
  Line,
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

// basic url to textures of venus
const BASIC_URL = 'src/textures/venus/';

/**
 * Create mesh of venus
 */
const createVenusMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('venus'),
    64,
    64,
  );
  const venusMap = new TextureLoader().load(
    BASIC_URL + 'venuscolorNew_COLOR.png',
  );
  // const venusBump = new TextureLoader().load(
  //   BASIC_URL + 'venusbump.jpg',
  // );
  // const venusDisp = new TextureLoader().load(
  //   BASIC_URL + 'venuscolorNEW_DISP.png',
  // );
  const venusNormal = new TextureLoader().load(
    BASIC_URL + 'venuscolorNew_NRM.png',
  );
  const venusSpec = new TextureLoader().load(
    BASIC_URL + 'venuscolorNew_SPEC.png',
  );

  const material = new MeshPhongMaterial({
    map: venusMap,
    // displacementMap: venusDisp,
    normalMap: venusNormal,
    specularMap: venusSpec,
    // bumpMap: venusBump,
    // bumpScale: 0.2,
  });

  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('venus');
  return mesh;
};

/**
 * Create mesh of transparent cloud-layer
 */
const createVenusCloudMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('venus') + 0.01,
    64,
    64,
  );
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'venusatmosphere.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.7,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('venus');
  return mesh;
};

//create VenusMark
const createVenusMark = () => {
  const geometry = new ConeGeometry(12, 24, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//venus ellipse
const createVenusEllipse = () => {
  const venusDistance = getElementDistanceFromSun('venus');
  const venuscurve = new EllipseCurve(
    0,
    0, // ax, aY
    venusDistance.perihelion,
    venusDistance.aphelion, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );
  const venuspoints = venuscurve.getPoints(500000);
  const venusgeometry = new BufferGeometry().setFromPoints(
    venuspoints,
  );
  const venusmaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const venusellipse = new Line(venusgeometry, venusmaterial);
  return venusellipse;
};
export {
  createVenusMesh,
  createVenusCloudMesh,
  createVenusMark,
  createVenusEllipse,
};
