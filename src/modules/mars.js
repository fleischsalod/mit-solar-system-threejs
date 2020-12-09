/**
 * Creational Functions for Mars
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
import { mars, earth } from '../data.js';

// basic url to textures of mars
const BASIC_URL = 'src/textures/mars/';

/**
 * Create mesh of mars
 */
const createMarsMesh = () => {
  const geometry = new SphereGeometry(
    2 * (mars.equaRadius / earth.equaRadius),
    64,
    64,
  );
  const marsMap = new TextureLoader().load(
    BASIC_URL + 'marscolor.jpg',
  );
  const marsBump = new TextureLoader().load(
    BASIC_URL + 'marsbump1k.jpg',
  );

  const material = new MeshPhongMaterial({
    map: marsMap,
    bumpMap: marsBump,
    bumpScale: 0.2,
  });
  return new Mesh(geometry, material);
};

export { createMarsMesh };
