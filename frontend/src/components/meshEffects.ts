import * as THREE from 'three';
import * as BUI from '@thatopen/ui';
import { world } from './scene';

// Fonction pour changer la couleur de fond
export function changeBackgroundColor(target: BUI.ColorInput) {
  world.scene.three.background = new THREE.Color(target.color);
}

// Fonction pour changer l'intensité des lumières directionnelles
export function changeDirectionalLightIntensity(target: BUI.NumberInput) {
  for (const child of world.scene.three.children) {
    if (child instanceof THREE.DirectionalLight) {
      child.intensity = target.value;
    }
  }
}

// Fonction pour changer l'intensité des lumières ambiantes
export function changeAmbientLightIntensity(target: BUI.NumberInput) {
  for (const child of world.scene.three.children) {
    if (child instanceof THREE.AmbientLight) {
      child.intensity = target.value;
    }
  }
}
