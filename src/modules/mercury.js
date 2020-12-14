/**
 * Creational Functions for Mercury
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

// basic url to textures of mercury
const BASIC_URL = 'src/textures/mercury/';

/**
 * Create mesh of mercury
 */
const createMercuryMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('mercury'),
    64,
    64,
  );
  const mercuryMap = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_COLOR.png',
  );
  // const mercuryBump = new TextureLoader().load(
  //   BASIC_URL + 'mercurybump.jpg',
  // );
  // const merkurDisp = new TextureLoader().load(
  //   BASIC_URL + 'merkurcolorNEW_DISP.png',
  // );
  const merkurNormal = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_NRM.png',
  );
  const merkurSpec = new TextureLoader().load(
    BASIC_URL + 'merkurcolorNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: mercuryMap,
    // displacementMap: merkurDisp,
    normalMap: merkurNormal,
    specularMap: merkurSpec,
    // bumpMap: mercuryBump,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mercury');
  return mesh;
};

export { createMercuryMesh };
