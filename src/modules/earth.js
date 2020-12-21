/**
 * Creational functions for the earth and moon
 */

import {
  Line,
  BufferGeometry,
  LineBasicMaterial,
  EllipseCurve,
  ConeGeometry,
  MeshBasicMaterial,
  Color,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
} from '../../lib/threejs/r122/build/three.module.js';
import {
  getAxialTiltInRad,
  getElementDiameter,
  getElementDistanceFromSun,
} from '../utils.js';

// basic url to textures of earth
const BASIC_URL = 'src/textures/earth/';

/**
 * Create mesh of earth
 */
const createEarthMesh = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('earth'),
    64,
    64,
  );
  const earthMap = new TextureLoader().load(
    BASIC_URL + 'earthmap1k.jpg',
  );
  const earthBump = new TextureLoader().load(
    BASIC_URL + 'earthbump1k.jpg',
  );
  const earthSpec = new TextureLoader().load(
    BASIC_URL + 'earthspec1k.jpg',
  );
  const material = new MeshPhongMaterial({
    map: earthMap,
    bumpMap: earthBump,
    bumpScale: 0.2,
    specularMap: earthSpec,
    specular: new Color('grey'),
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('earth');
  return mesh;
};

/**
 * Create mesh of moon
 */
const createEarthMoon = () => {
  const geometry = new SphereGeometry(
    getElementDiameter('moon'),
    64,
    64,
  );
  const map = new TextureLoader().load(
    BASIC_URL + 'moon/moonNew_COLOR.png',
  );
  // const bumpMap = new TextureLoader().load(
  //   BASIC_URL + 'moon/moonbump1k.jpg',
  // );
  // const moonDisp = new TextureLoader().load(
  //   BASIC_URL + 'moon/moonNEW_DISP.png',
  // );
  const moonNormal = new TextureLoader().load(
    BASIC_URL + 'moon/moonNew_NRM.png',
  );
  const moonSpec = new TextureLoader().load(
    BASIC_URL + 'moon/moonNew_SPEC.png',
  );
  const material = new MeshPhongMaterial({
    map: map,
    // displacementMap: moonDisp,
    normalMap: moonNormal,
    specularMap: moonSpec,
    //bumpMap: bumpMap,
    bumpScale: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('moon');
  return mesh;
};

/**
 * Create mesh of transparent cloud-layer
 */
const createEarthCloud = () => {
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = 1024;
  canvasResult.height = 512;
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
      imageTrans.addEventListener('load', () => {
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
          canvasMap.width,
          canvasMap.height,
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] =
              255 - dataTrans.data[offset + 0];
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = BASIC_URL + 'earthcloudmaptrans.jpg';
    },
    false,
  );
  imageMap.src = BASIC_URL + 'earthcloudmap.jpg';

  const geometry = new SphereGeometry(
    getElementDiameter('earth') + 0.01,
    64,
    64,
  );
  const material = new MeshPhongMaterial({
    map: new Texture(canvasResult),
    side: DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = getAxialTiltInRad('earth');
  return mesh;
};

//create EarthMark
const createEarthMark = () => {
  const geometry = new ConeGeometry(12, 24, 64, 1, 0, 6.3);
  const material = new MeshBasicMaterial({ color: 0xfffff });
  const cone = new Mesh(geometry, material);
  return cone;
};

//earth ellipse
const createEarthEllipse = () => {
  const earthDistance = getElementDistanceFromSun('earth');
  const earthcurve = new EllipseCurve(
    0,
    0, // ax, aY
    earthDistance.perihelion,
    earthDistance.aphelion, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );

  const earthpoints = earthcurve.getPoints(500000);
  const earthgeometry = new BufferGeometry().setFromPoints(
    earthpoints,
  );
  const earthmaterial = new LineBasicMaterial({
    color: 0xffffff,
  });
  const earthellipse = new Line(earthgeometry, earthmaterial);
  return earthellipse;
};

export {
  createEarthCloud,
  createEarthMesh,
  createEarthMoon,
  createEarthMark,
  createEarthEllipse,
};
