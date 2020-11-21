/**
 * Creational Functions for Saturn
 */

import {
    Color,
    DoubleSide,
    Mesh,
    MeshPhongMaterial,
    RingGeometry,
    SphereGeometry,
    Texture,
    TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
  
// basic url to textures of Saturn
const BASIC_URL = 'src/textures/saturn/';

/**
 * Create mesh of Saturn
 */
const createSaturnMesh = () => {
    const geometry = new SphereGeometry(18.28033, 64, 64);
    const saturnMap = new TextureLoader().load(
      BASIC_URL + 'saturnmap.jpg',
    );

    const material = new MeshPhongMaterial({
      map: saturnMap,
      bumpScale: 0.2,

    });
    return new Mesh(geometry, material);
};

/**
 * Create mesh of Saturnrings
 */
const createSaturnRingMesh = () => {
    const geometry = new RingGeometry(21.00141, 44.00565, 256);
    const saturnRingMap = new TextureLoader().load(
        BASIC_URL + 'saturnringcolor.jpg',
      );

      const material = new MeshPhongMaterial({
        map: saturnRingMap,
        bumpScale: 0.2,
    });
    return new Mesh(geometry, material);
};

export {createSaturnMesh, createSaturnRingMesh};