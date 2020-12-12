/**
 * Creational Functions for Venus
 */

import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import { venus, earth } from '../data.js';

// basic url to textures of venus
const BASIC_URL = 'src/textures/venus/';

/**
 * Create mesh of venus
 */
const createVenusMesh = () => {
  const geometry = new SphereGeometry(
    2 * (venus.equaRadius / earth.equaRadius),
    64,
    64,
  );
  const venusMap = new TextureLoader().load(
    BASIC_URL + 'venuscolor.jpg',
  );

  const material = new MeshPhongMaterial({
    map: venusMap,
    bumpScale: 0.2,
  });

  return new Mesh(geometry, material);
};

/**
 * Create mesh of transparent cloud-layer
 */
const createVenusCloudMesh = () => {
  const geometry = new SphereGeometry(
    2 * (venus.equaRadius / earth.equaRadius) + 0.01,
    64,
    64,
  );
  const venusatmos = new TextureLoader().load(
    BASIC_URL + 'venusatmosphere.jpg',
  );
  const material = new MeshPhongMaterial({
    map: venusatmos,
    transparent: true,
    opacity: 0.7,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = venus.axialTilt * (Math.PI / 180);
  return mesh;
};
export { createVenusMesh, createVenusCloudMesh };
