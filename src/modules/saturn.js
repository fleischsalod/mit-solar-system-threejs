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
 * Create Saturnrings
 */
const createSaturnRing = () => {
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = 915;
  canvasResult.height = 64;
  const contextResult = canvasResult.getContext('2d');

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    'load',
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height,
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener('load', function () {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height,
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasResult.width,
          canvasResult.height,
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] =
              255 - dataTrans.data[offset + 0] / 4;
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = BASIC_URL + 'saturnringpattern.gif';
    },
    false,
  );
  imageMap.src = BASIC_URL + 'saturnringcolor.jpg';

  var geometry = new RingGeometry(0.55, 0.75, 64);
  var material = new MeshPhongMaterial({
    map: new Texture(canvasResult),
    side: DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  var mesh = new Mesh(geometry, material);
  mesh.lookAt(new Vector3(0.5, -4, 1));
  return mesh;
};

export { createSaturnMesh, createSaturnRingMesh };
