/**
 * Creational Functions for Neptune
 */

import {
  ConeGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { getAxialTiltInRad, getElementDiameter } from '../utils.js';

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

export { createNeptuneMesh, createNeptuneMark };
