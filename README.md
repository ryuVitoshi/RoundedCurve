
# RoundedCurve for Three.js

[![@ryuvitoshi/roundedcurve on npm](https://img.shields.io/npm/v/@ryuvitoshi/roundedcurve)](https://www.npmjs.com/package/@ryuvitoshi/roundedcurve)

A [Three.js](https://threejs.org/) plugin that implements rounded curves.

![readme-img](https://github.com/ryuVitoshi/RoundedCurve/raw/main/readme-img.png)

## How to Use

### from HTML

You can import all needed modules via CDN. Code example:

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/",
      "@ryuvitoshi/roundedcurve": "https://esm.sh/@ryuvitoshi/roundedcurve@1.0.0"
    }
  }
</script>

<script type="module">
  import * as THREE from 'three';
  import { RoundedCurve } from '@ryuvitoshi/roundedcurve';

  const scene = new THREE.Scene();

  const path = [
    new THREE.Vector3(  3,  0, -3 ),
    new THREE.Vector3(  3,  0,  3 ),
    new THREE.Vector3( -3,  0,  3 ),
    new THREE.Vector3( -3,  0, -3 ),
    new THREE.Vector3( -3,  6, -3 ),
    new THREE.Vector3(  3,  6, -3 )
  ];
  
  /* arguments are:
    - points ( array of points | [THREE.Vector3] )
    - closed ( is curve closed or not | bool )
    - radius ( the radius of rounding | float )
  */
  const curve = new RoundedCurve( path, true, 1.2 );
  const segments = Math.ceil( curve.getLength() * 100 );

  const material = new THREE.MeshStandardMaterial( { color: 0xCE2718 } );
  const geometry = new THREE.TubeGeometry( curve, segments, 0.3, 12, false );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
</script>
```

### via npm

Install [`three`](https://www.npmjs.com/package/three) and [`@ryuvitoshi/roundedcurve`](https://www.npmjs.com/package/@ryuvitoshi/roundedcurve) :

```sh
npm install three @ryuvitoshi/roundedcurve
```

Code example:

```javascript
import * as THREE from 'three';
import { RoundedCurve } from '@ryuvitoshi/roundedcurve';

const scene = new THREE.Scene();

const path = [
  new THREE.Vector3(  3,   0,  -3 ),
  new THREE.Vector3(  3,   0,   3 ),
  new THREE.Vector3( -3,   0,   3 ),
  new THREE.Vector3( -3,   0,  -3 ),
  new THREE.Vector3( -3,   6,  -3 ),
  new THREE.Vector3(  3,   6,  -3 )
];

/* arguments are:
  - points ( array of points | [THREE.Vector3] )
  - closed ( is curve closed or not | bool )
  - radius ( the radius of rounding | float )
*/
const curve = new RoundedCurve( path, true, 1.2 );
const segments = Math.ceil( curve.getLength() * 100 );

const material = new THREE.MeshStandardMaterial( { color: 0xCE2718 } );
const geometry = new THREE.TubeGeometry( curve, segments, 0.3, 12, false );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
```

## Demo

[`Demo`](https://codepen.io/ryuVitoshi/pen/WNBoPPR)

![readme-img-demo](https://github.com/ryuVitoshi/RoundedCurve/raw/main/readme-img-demo.png)

## License

[MIT](https://github.com/ryuVitoshi/RoundedCurve/blob/main/LICENSE)
