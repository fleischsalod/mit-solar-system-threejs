/**
 * Creational Functions for Jupiter
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

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createjupiterMesh = () => {
  const geometry = new SphereGeometry(21.94663, 64, 64);
  const jupiterMap = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_COLOR.png',
  );
  const jupiterDisp = new TextureLoader().load(
    BASIC_URL + 'jupitermapNEW_DISP.png',
  );
  const jupiterNormal = new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_NRM.png',
  );
  const jupiterOcc = new TextureLoader().load(
    BASIC_URL + 'jupitermapNEW_OCC.png',
  );
  const jupiterSpec= new TextureLoader().load(
    BASIC_URL + 'jupitermapNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: jupiterMap,
    dispMap: jupiterDisp,
    normalMap: jupiterNormal,
    occlusionMap: jupiterOcc,
    specularMap: jupiterSpec,
    bumpScale: 0.1,
  });
  return new Mesh(geometry, material);
};

export { createjupiterMesh };
