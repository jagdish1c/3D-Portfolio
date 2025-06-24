import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// City building component
const Building = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  // Simple building using a box
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[scale[0], scale[1], scale[2]]} />
      <meshStandardMaterial color="#8c8c8c" />
      <mesh position={[0, scale[1]/2 + 0.1, 0]}>
        <boxGeometry args={[scale[0] * 0.8, scale[1] * 0.2, scale[2] * 0.8]} />
        <meshStandardMaterial color="#6e6e6e" />
      </mesh>
    </mesh>
  );
};

// Traffic light component
const TrafficLight = ({ position }) => {
  const [lightColor, setLightColor] = useState("red");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLightColor(prev => {
        if (prev === "red") return "green";
        if (prev === "green") return "yellow";
        return "red";
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 1.2, 0.2]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0, 1.4, 0.3]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// Stop sign component
const StopSign = ({ position }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI/8, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#c41e3a" />
      </mesh>
      {/* Text would require TextGeometry which needs additional setup */}
      <mesh position={[0, 1, 0.03]} rotation={[0, Math.PI/8, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.01]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

// Road component
const Road = ({ position, length, rotation = [0, 0, 0] }) => {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[10, 0.1, length]} />
      <meshStandardMaterial color="#333333" />
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.3, 0.01, length]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </mesh>
  );
};

export function CityWorld({ weatherCondition, timeOfDay }) {
  // Generate random buildings along the road
  const buildings = [];
  const roadLength = 200;
  const buildingCount = 20;
  
  // Create buildings on both sides of the road
  for (let i = 0; i < buildingCount; i++) {
    // Left side buildings
    const leftPosition = [-7, 2 + Math.random() * 5, -roadLength/2 + i * (roadLength/buildingCount)];
    const leftScale = [3 + Math.random() * 2, 4 + Math.random() * 10, 3 + Math.random() * 2];
    
    // Right side buildings
    const rightPosition = [7, 2 + Math.random() * 5, -roadLength/2 + i * (roadLength/buildingCount)];
    const rightScale = [3 + Math.random() * 2, 4 + Math.random() * 10, 3 + Math.random() * 2];
    
    buildings.push(
      <Building key={`left-${i}`} position={leftPosition} scale={leftScale} />,
      <Building key={`right-${i}`} position={rightPosition} scale={rightScale} />
    );
  }
  
  // Add traffic lights and stop signs
  const trafficLights = [];
  const stopSigns = [];
  
  for (let i = 0; i < 5; i++) {
    const position = [-4, 0, -roadLength/2 + (i+1) * (roadLength/6)];
    trafficLights.push(<TrafficLight key={`traffic-${i}`} position={position} />);
  }
  
  for (let i = 0; i < 3; i++) {
    const position = [4, 0, -roadLength/2 + (i+1) * (roadLength/4)];
    stopSigns.push(<StopSign key={`stop-${i}`} position={position} />);
  }
  
  // Set lighting based on time of day
  let skyColor, lightIntensity, lightPosition, fogColor, fogDensity;
  
  switch(timeOfDay) {
    case 'morning':
      skyColor = "#87ceeb";
      lightIntensity = 0.8;
      lightPosition = [-10, 10, 0];
      fogColor = "#e6e6fa";
      fogDensity = 0.01;
      break;
    case 'afternoon':
      skyColor = "#1e90ff";
      lightIntensity = 1.2;
      lightPosition = [0, 20, 0];
      fogColor = "#f0f8ff";
      fogDensity = 0.005;
      break;
    case 'evening':
      skyColor = "#ff7f50";
      lightIntensity = 0.6;
      lightPosition = [10, 5, 0];
      fogColor = "#ffdab9";
      fogDensity = 0.02;
      break;
    case 'night':
      skyColor = "#191970";
      lightIntensity = 0.2;
      lightPosition = [0, 10, 0];
      fogColor = "#000033";
      fogDensity = 0.03;
      break;
    default:
      skyColor = "#87ceeb";
      lightIntensity = 1.0;
      lightPosition = [0, 10, 0];
      fogColor = "#e6e6fa";
      fogDensity = 0.01;
  }
  
  // Adjust for weather conditions
  switch(weatherCondition) {
    case 'rainy':
      skyColor = "#708090";
      fogColor = "#708090";
      fogDensity = 0.04;
      lightIntensity *= 0.7;
      break;
    case 'cloudy':
      skyColor = "#a9a9a9";
      fogColor = "#a9a9a9";
      fogDensity = 0.02;
      lightIntensity *= 0.8;
      break;
    case 'snowy':
      skyColor = "#f0f8ff";
      fogColor = "#f0f8ff";
      fogDensity = 0.05;
      lightIntensity *= 0.9;
      break;
    case 'foggy':
      fogDensity = 0.1;
      lightIntensity *= 0.6;
      break;
    default:
      // Clear weather, no changes
      break;
  }

  return (
    <>
      {/* Sky and fog */}
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[fogColor, 10, 100]} />
      
      {/* Lighting */}
      <ambientLight intensity={lightIntensity * 0.5} />
      <directionalLight 
        position={lightPosition} 
        intensity={lightIntensity} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#4b5320" />
      </mesh>
      
      {/* Road */}
      <Road position={[0, 0, 0]} length={roadLength} />
      
      {/* Buildings */}
      {buildings}
      
      {/* Traffic lights and stop signs */}
      {trafficLights}
      {stopSigns}
      
      {/* Weather effects */}
      {weatherCondition === 'rainy' && (
        <mesh position={[0, 20, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="blue" transparent opacity={0} />
          {/* Rain particles would be added here with a particle system */}
        </mesh>
      )}
      
      {weatherCondition === 'snowy' && (
        <mesh position={[0, 20, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="white" transparent opacity={0} />
          {/* Snow particles would be added here with a particle system */}
        </mesh>
      )}
    </>
  );
}