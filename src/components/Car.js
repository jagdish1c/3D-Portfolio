import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function Car({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const carRef = useRef();
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()];
  
  // Animate wheels
  useFrame(() => {
    wheelRefs.forEach(wheel => {
      if (wheel.current) {
        wheel.current.rotation.x += 0.05;
      }
    });
  });

  return (
    <group ref={carRef} position={position} rotation={rotation} castShadow>
      {/* Car body - main chassis */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[2, 0.5, 4.5]} />
        <meshStandardMaterial color="#cc3333" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Car cabin */}
      <mesh castShadow position={[0, 1.2, 0.2]}>
        <boxGeometry args={[1.7, 0.7, 2.2]} />
        <meshStandardMaterial color="#cc3333" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Windshield */}
      <mesh castShadow position={[0, 1.3, -0.9]}>
        <boxGeometry args={[1.65, 0.6, 0.1]} />
        <meshStandardMaterial color="#aaccff" transparent opacity={0.7} metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Rear window */}
      <mesh castShadow position={[0, 1.3, 1.3]}>
        <boxGeometry args={[1.65, 0.6, 0.1]} />
        <meshStandardMaterial color="#aaccff" transparent opacity={0.7} metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Side windows */}
      <mesh castShadow position={[0.85, 1.3, 0.2]}>
        <boxGeometry args={[0.1, 0.6, 2.2]} />
        <meshStandardMaterial color="#aaccff" transparent opacity={0.7} metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh castShadow position={[-0.85, 1.3, 0.2]}>
        <boxGeometry args={[0.1, 0.6, 2.2]} />
        <meshStandardMaterial color="#aaccff" transparent opacity={0.7} metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Hood */}
      <mesh castShadow position={[0, 0.6, -1.7]}>
        <boxGeometry args={[1.9, 0.4, 1]} />
        <meshStandardMaterial color="#cc3333" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Trunk */}
      <mesh castShadow position={[0, 0.6, 1.7]}>
        <boxGeometry args={[1.9, 0.4, 1]} />
        <meshStandardMaterial color="#cc3333" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Bumpers */}
      <mesh castShadow position={[0, 0.3, -2.2]}>
        <boxGeometry args={[1.9, 0.3, 0.2]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 2.2]}>
        <boxGeometry args={[1.9, 0.3, 0.2]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.7} />
      </mesh>
      
      {/* Headlights */}
      <mesh castShadow position={[0.6, 0.5, -2.25]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffcc" emissiveIntensity={0.5} />
      </mesh>
      <mesh castShadow position={[-0.6, 0.5, -2.25]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffcc" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Taillights */}
      <mesh castShadow position={[0.6, 0.5, 2.25]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh castShadow position={[-0.6, 0.5, 2.25]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Wheels */}
      {/* Front left */}
      <group position={[-1, 0.3, -1.5]}>
        <mesh ref={wheelRefs[0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Front right */}
      <group position={[1, 0.3, -1.5]}>
        <mesh ref={wheelRefs[1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Rear left */}
      <group position={[-1, 0.3, 1.5]}>
        <mesh ref={wheelRefs[2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Rear right */}
      <group position={[1, 0.3, 1.5]}>
        <mesh ref={wheelRefs[3]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Grill */}
      <mesh castShadow position={[0, 0.5, -2.15]}>
        <boxGeometry args={[1.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Roof rack */}
      <mesh castShadow position={[0, 1.6, 0.2]}>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}