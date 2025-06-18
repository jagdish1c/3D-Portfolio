import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import { Car } from './Car';
import * as THREE from 'three';

// Camera controller component to follow the car
const CameraController = ({ carPosition, carRotation, perspective }) => {
  const cameraRef = useRef();
  
  useFrame(() => {
    if (!cameraRef.current) return;
    
    // Calculate camera position based on perspective
    if (perspective === 'first-person') {
      // First-person: position camera at the front of the car
      const offset = new THREE.Vector3(0, 1.5, -1);
      offset.applyEuler(new THREE.Euler(0, carRotation[1], 0));
      
      cameraRef.current.position.x = carPosition[0] + offset.x;
      cameraRef.current.position.y = carPosition[1] + offset.y;
      cameraRef.current.position.z = carPosition[2] + offset.z;
      
      // Look in the direction the car is facing
      const target = new THREE.Vector3(0, 0, -10);
      target.applyEuler(new THREE.Euler(0, carRotation[1], 0));
      target.add(new THREE.Vector3(carPosition[0], carPosition[1], carPosition[2]));
      
      cameraRef.current.lookAt(target);
    } else {
      // Third-person: position camera behind and above the car
      const offset = new THREE.Vector3(0, 5, 10);
      offset.applyEuler(new THREE.Euler(0, carRotation[1], 0));
      
      cameraRef.current.position.x = carPosition[0] + offset.x;
      cameraRef.current.position.y = carPosition[1] + offset.y;
      cameraRef.current.position.z = carPosition[2] + offset.z;
      
      // Look at the car
      cameraRef.current.lookAt(
        new THREE.Vector3(carPosition[0], carPosition[1], carPosition[2])
      );
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={[0, 5, 10]} 
      fov={perspective === 'first-person' ? 75 : 45}
    />
  );
};

// Racing track component
const RaceTrack = () => {
  // Track parameters
  const trackWidth = 10;
  const trackOuterRadius = 30;
  const trackInnerRadius = 20;
  const wallHeight = 2;
  
  // Create track path points
  const trackPoints = useMemo(() => {
    const points = [];
    const segments = 32;
    
    // Outer track wall
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * trackOuterRadius,
          0,
          Math.sin(angle) * trackOuterRadius
        )
      );
    }
    
    return points;
  }, []);
  
  // Create inner track points
  const innerTrackPoints = useMemo(() => {
    const points = [];
    const segments = 32;
    
    // Inner track wall
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * trackInnerRadius,
          0,
          Math.sin(angle) * trackInnerRadius
        )
      );
    }
    
    return points;
  }, []);

  return (
    <group>
      {/* Track surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]} receiveShadow>
        <ringGeometry args={[trackInnerRadius, trackOuterRadius, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Track markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, 0]}>
        <ringGeometry args={[trackInnerRadius + 0.1, trackInnerRadius + 0.5, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, 0]}>
        <ringGeometry args={[trackOuterRadius - 0.5, trackOuterRadius - 0.1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Dashed center line */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh 
          key={`dash-${i}`}
          rotation={[-Math.PI / 2, 0, i * Math.PI / 8]} 
          position={[0, -0.47, 0]}
        >
          <planeGeometry args={[1, trackWidth * 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
      
      {/* Outer wall */}
      <mesh>
        <tubeGeometry 
          args={[
            new THREE.CatmullRomCurve3(trackPoints),
            64,
            0.5,
            8,
            true
          ]} 
        />
        <meshStandardMaterial color="#777777" />
      </mesh>
      
      {/* Inner wall */}
      <mesh>
        <tubeGeometry 
          args={[
            new THREE.CatmullRomCurve3(innerTrackPoints),
            64,
            0.5,
            8,
            true
          ]} 
        />
        <meshStandardMaterial color="#777777" />
      </mesh>
    </group>
  );
};

const Scene = ({ carPosition, carRotation, perspective = 'third-person' }) => {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <CameraController 
        carPosition={carPosition} 
        carRotation={carRotation} 
        perspective={perspective} 
      />
      <Car position={carPosition} rotation={carRotation} />
      
      {/* Ground with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#505050" />
      </mesh>
      
      {/* Grid helper */}
      <Grid 
        position={[0, -0.49, 0]}
        args={[100, 100]} 
        cellSize={5}
        cellThickness={0.6}
        cellColor="#808080"
        sectionSize={20}
        sectionThickness={1.2}
        sectionColor="#A0A0A0"
        fadeDistance={100}
        infiniteGrid={true}
      />
      
      {/* Racing track */}
      <RaceTrack />
      
      <OrbitControls enabled={false} />
    </Canvas>
  );
};

export default Scene;