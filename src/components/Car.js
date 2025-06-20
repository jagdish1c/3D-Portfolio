
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Car(props) {
  const group = useRef();
  const { scene } = useGLTF('/assets/CAR Model.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();
  
  return (
    <group ref={group} {...props}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/assets/CAR Model.glb');