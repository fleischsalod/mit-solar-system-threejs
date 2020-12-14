/**
 * Creational Functions for Jupiter
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

// basic url to textures of jupiter
const BASIC_URL = 'src/textures/jupiter/';

/**
 * Create mesh of jupiter
 */
const createjupiterMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('jupiter'),
    64,
    64,
  );
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
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('jupiter');
  return mesh;
};

export { createjupiterMesh };
