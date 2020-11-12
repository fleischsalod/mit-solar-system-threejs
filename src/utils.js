const createEarthMesh = () => {
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const earthMap = new THREE.TextureLoader().load(
    'src/textures/earthmap1k.jpg',
  );
  const earthBump = new THREE.TextureLoader().load(
    'src/textures/earthbump1k.jpg',
  );
  const earthSpec = new THREE.TextureLoader().load(
    'src/textures/earthspec1k.jpg',
  );
  const material = new THREE.MeshPhongMaterial({
    map: earthMap,
    bumpMap: earthBump,
    bumpScale: 0.2,
    specularMap: earthSpec,
    specular: new THREE.Color('grey'),
  });
  return new THREE.Mesh(geometry, material);
};

const createEarthMoon = () => {
  const geometry = new THREE.SphereGeometry(0.5, 64, 64);
  const map = new THREE.TextureLoader().load(
    'src/textures/moonmap1k.jpg',
  );
  const bumpMap = new THREE.TextureLoader().load(
    'src/textures/moonbump1k.jpg',
  );
  const material = new THREE.MeshPhongMaterial({
    map: map,
    bumpMap: bumpMap,
    bumpScale: 0.2,
  });
  return new THREE.Mesh(geometry, material);
};

const createEarthCloud = () => {
  // create destination canvas
  var canvasResult = document.createElement('canvas');
  canvasResult.width = 1024;
  canvasResult.height = 512;
  var contextResult = canvasResult.getContext('2d');

  // load earthcloudmap
  var imageMap = new Image();
  imageMap.addEventListener(
    'load',
    function () {
      // create dataMap ImageData for earthcloudmap
      var canvasMap = document.createElement('canvas');
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      var contextMap = canvasMap.getContext('2d');
      contextMap.drawImage(imageMap, 0, 0);
      var dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height,
      );

      // load earthcloudmaptrans
      var imageTrans = new Image();
      imageTrans.addEventListener('load', function () {
        // create dataTrans ImageData for earthcloudmaptrans
        var canvasTrans = document.createElement('canvas');
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        var contextTrans = canvasTrans.getContext('2d');
        contextTrans.drawImage(imageTrans, 0, 0);
        var dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height,
        );
        // merge dataMap + dataTrans into dataResult
        var dataResult = contextMap.createImageData(
          canvasMap.width,
          canvasMap.height,
        );
        for (var y = 0, offset = 0; y < imageMap.height; y++) {
          for (var x = 0; x < imageMap.width; x++, offset += 4) {
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
      imageTrans.src = 'src/textures/earthcloudmaptrans.jpg';
    },
    false,
  );
  imageMap.src = 'src/textures/earthcloudmap.jpg';

  var geometry = new THREE.SphereGeometry(2.01, 64, 64);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

export { createEarthCloud, createEarthMesh, createEarthMoon };
