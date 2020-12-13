/**
 * Creational Functions for Mercury
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

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(0.76581, 64, 64);
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_COLOR.png',
  );
  /*const mercuryBump = new TextureLoader().load(
    BASIC_URL + 'mercurybump.jpg',
  );*/
  const merkurDisp = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNEW_DISP.png',
  );
  const merkurNormal = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_NRM.png',
  );
  const merkurOcc = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNEW_OCC.png',
  );
  const merkurSpec= new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: mercuryMap,
  dispMap: merkurDisp,
    normalMap: merkurNormal,
    occlusionMap: merkurOcc,
    specularMap: merkurSpec
    /*bumpMap: mercuryBump,
    bumpScale: 0.2,*/
  });
  return new Mesh(geometry, material);
};

export { createMercuryMesh };
