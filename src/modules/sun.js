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
    const geometry = new SphereGeometry(218.59990, 64, 64);
    const sunMap = new TextureLoader().load(
      BASIC_URL + 'sunmap.jpg',
    );

    const material = new MeshPhongMaterial({
      map: sunMap,
      bumpScale: 0.2,

    });
    return new Mesh(geometry, material);
  };

export {createSunMesh};