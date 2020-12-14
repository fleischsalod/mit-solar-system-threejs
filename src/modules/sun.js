/**
 * Creational Functions for the sun
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getElementDiameter, getAxialTiltInRad } from '../utils.js';

// basic url to textures of sun
const BASIC_URL = 'src/textures/sun/';

/**
 * Create mesh of sun
 */
const createSunMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('sun'),
    64,
    64,
  );
  const sunMap = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  // const sunDisp = new TextureLoader().load(
  //   BASIC_URL + 'suncolor2New_DISP.png',
  // );
  const sunNormal = new TextureLoader().load(
    BASIC_URL + 'suncolor2New_NRM.jpg',
  );
  const sunSpec = new TextureLoader().load(
    BASIC_URL + 'suncolor2New_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: sunMap,
    // displacementMap: sunDisp,
    normalMap: sunNormal,
    specularMap: sunSpec,
    bumpScale: 0.2,
  });

  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('sun');
  return mesh;
};

//create SunCloud1
const createSunCloudMesh1 = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('sun') + 1,
    64,
    64,
  );
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.7,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('sun');
  return mesh;
};

//create SunCloud2
const createSunCloudMesh2 = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('sun') + 2,
    64,
    64,
  );
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.6,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('sun');
  return mesh;
};

export { createSunMesh, createSunCloudMesh1, createSunCloudMesh2 };
