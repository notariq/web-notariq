// Import necessary modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5); // Position the camera away from the object (adjust as needed)

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering quality
document.body.appendChild(renderer.domElement);

// Add ambient light (soft global lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Color, Intensity
scene.add(ambientLight);

// Add directional light (to cast shadows and enhance depth)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
directionalLight.position.set(5, 10, 5); // Set light position
directionalLight.castShadow = true; // Enable shadow casting
scene.add(directionalLight);

// Load a .glb model using GLTFLoader
const loader = new GLTFLoader();
loader.load(
  '/pc.glb', // Path to the GLB file
  function (gltf) {
    // Scale the model (adjust size)
    gltf.scene.scale.set(0.025, 0.025, 0.025); // Adjust scale for x, y, z axes

    // Optionally, set the position of the model
    gltf.scene.position.set(0, 0, 0); // Position in the center of the scene

    // Enable shadow casting for the model if needed
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });

    // Add the loaded model to the scene
    scene.add(gltf.scene);
    animate(); // Start animation after the model is loaded
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: Track loading progress
  },
  function (error) {
    console.error('An error happened while loading the GLB file', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Optional: Add rotation to the model for a dynamic effect
  scene.rotation.y += 0.01; // Rotate the scene or the model

  renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
