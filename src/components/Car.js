import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Car({ position, rotation }) {
  // Note: Replace the URL with your actual car model URL once you have it
  // const { nodes, materials } = useGLTF('/car.glb');

  return (
    <group position={position} rotation={rotation}>
      {/* Main car body */}
      <mesh>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="red" />
      </mesh>
      
      {/* Car roof */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="darkred" />
      </mesh>
      
      {/* Front indicator - headlights */}
      <mesh position={[0.6, 0.2, -1.9]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.6, 0.2, -1.9]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Front windshield */}
      <mesh position={[0, 0.6, -0.8]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.4, 0.7, 0.1]} />
        <meshStandardMaterial color="lightblue" transparent opacity={0.7} />
      </mesh>
      
      {/* Front bumper */}
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1, -0.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1, -0.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[1, -0.5, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1, -0.5, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}