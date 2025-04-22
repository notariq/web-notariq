import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Import OrbitControls

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 2, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load(
  '/old-pc.glb',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.004, 0.004, 0.004)
    model.position.y = -1

    scene.add(model);

    // Lighting
    const al = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(al);
    
    const dl_1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dl_1.position.set(0, 5, 5);
    scene.add(dl_1);

    const dl_2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dl_2.position.set(0, 5, -5);
    scene.add(dl_2);

    // Controls #TODO
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.7;
    controls.screenSpacePanning = false;
    controls.enablePan = false;

    controls.minDistance = 4;
    controls.maxDistance = 10;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    animate(controls);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('An error happened while loading the GLB file', error);
  }
);

// Animation loop
function animate(controls) {
  requestAnimationFrame(() => (animate(controls));
  if (controls) {controls.update();}
  renderer.render(scene, camera);
};

// Window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


renderer.domElement.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });
