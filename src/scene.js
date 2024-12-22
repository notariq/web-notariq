// Import necessary modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Import OrbitControls

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 2, 3);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Load a .glb model using GLTFLoader
const loader = new GLTFLoader();
loader.load(
  '/old-pc.glb', // Path to the GLB file
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.004, 0.004, 0.004)
    model.position.y = -1

    // Ensure model materials respond to light
    // model.traverse((child) => {
    //   if (child.isMesh) {
    //     child.material = new THREE.MeshStandardMaterial({
    //       color: child.material.color,
    //       roughness: 0.5,
    //       metalness: 0.5,
    //     });
    //   }
    // });

    // Add model to scene
    scene.add(model);

    // Add lights
    const al = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(al);

    const dl_1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dl_1.position.set(0, 5, 5);
    scene.add(dl_1);

    const dl_2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dl_2.position.set(0, 5, -5);
    scene.add(dl_2);

    // Add OrbitControls for rotating and zooming
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 4;
    controls.maxDistance = 10;

    controls.minPolarAngle = 0; 
    controls.maxPolarAngle = Math.PI / 2;

    // Start rendering
    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Optional: Track loading progress
  },
  function (error) {
    console.error('An error happened while loading the GLB file', error);
  }
);

// Animation loop for rendering
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
