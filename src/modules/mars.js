/**
 * Creational Functions for Mars
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

// basic url to textures of mars
const BASIC_URL = 'src/textures/mars/';

/**
 * Create mesh of mars
 */
const createMarsMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('mars'),
    64,
    64,
  );
  const marsMap = new TextureLoader().load(
    BASIC_URL + 'marscolor.jpg',
  );
  const marsBump = new TextureLoader().load(
    BASIC_URL + 'marsbump1k.jpg',
  );
  // const marsDisp = new TextureLoader().load(
  //   BASIC_URL + 'marscolor_displacementMap.jpg',
  // );
  // const marsNormal = new TextureLoader().load(
  //   BASIC_URL + 'marscolor_normalMap.jpg',
  // );

  const material = new MeshPhongMaterial({
    map: marsMap,
    bumpMap: marsBump,
    // displacementMap: marsDisp,
    // normalMap: marsNormal,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('mars');
  return mesh;
};

//create MarsMark
const createMarsMark = () => {
  const geometry = new ConeGeometry(14, 28, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

export { createMarsMesh, createMarsMark };
