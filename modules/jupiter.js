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
 const createjupiterhMesh = () => {
    const geometry = new SphereGeometry(21.94663, 64, 64);
    const jupiterMap = new TextureLoader().load(
      BASIC_URL + 'jupitermap2k.jpg',
    );
    const material = new MeshPhongMaterial({
        map: jupiterMap,
        bumpScale: 0.2,
      });
      return new Mesh(geometry, material);
    };

export {createjupiterMesh};