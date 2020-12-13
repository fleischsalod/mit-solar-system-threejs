/**
 * Creational Functions for the sun
 */

import {
  Color,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';

// basic url to textures of sun
const BASIC_URL = 'src/textures/sun/';

/**
 * Create mesh of sun
 */
const createSunMesh = () => {
  const geometry = new SphereGeometry(218.5999, 64, 64);
  const sunMap = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  const sunDisp = new TextureLoader().load(
    BASIC_URL + 'suncolor2New_DISP.png',
  );
  const sunNormal = new TextureLoader().load(
    BASIC_URL + 'suncolor2New_NRM.png',
  );
  const sunOcc = new TextureLoader().load(
    BASIC_URL + 'suncolor2New_OCC.png',
  );
  const sunSpec= new TextureLoader().load(
    BASIC_URL + 'suncolor2New_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: sunMap,
    dispMap: sunDisp,
    normalMap: sunNormal,
    occlusionMap: sunOcc,
    specularMap: sunSpec,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

//create SunCloud1
const createSunCloudMesh1 = () => {
  const geometry = new SphereGeometry(220, 64, 64);
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.7,
  });
  const mesh = new Mesh(geometry, material);
  return mesh;
};

//create SunCloud2
const createSunCloudMesh2 = () => {
  const geometry = new SphereGeometry(221, 64, 64);
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'suncolor2.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.6,
  });
  const mesh = new Mesh(geometry, material);
  return mesh;
};

export { createSunMesh, createSunCloudMesh1, createSunCloudMesh2 };
