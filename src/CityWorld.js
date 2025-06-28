import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';

// Glass Skyscraper with detailed structure
const GlassSkyscraper = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main building structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], scale[2]]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          metalness={0.9} 
          roughness={0.1} 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
      {/* Window grid on all 4 sides */}
      {[0, 1, 2, 3].map(side => (
        <group key={side} rotation={[0, side * Math.PI / 2, 0]}>
          {Array.from({ length: Math.floor(scale[1] / 3) }, (_, i) => (
            <mesh key={i} position={[0, -scale[1]/2 + i * 3 + 1.5, scale[2]/2 + 0.01]}>
              <planeGeometry args={[scale[0] * 0.9, 2]} />
              <meshStandardMaterial color="#1e3a8a" transparent={true} opacity={0.6} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Building top */}
      <mesh position={[0, scale[1]/2 + 0.5, 0]} castShadow>
        <boxGeometry args={[scale[0] * 0.8, 1, scale[2] * 0.8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
};

// Modern Office Building with detailed structure
const OfficeBuilding = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], scale[2]]} />
        <meshStandardMaterial color="#6c757d" roughness={0.8} />
      </mesh>
      {/* Window strips on all sides */}
      {[0, 1, 2, 3].map(side => (
        <group key={side} rotation={[0, side * Math.PI / 2, 0]}>
          {Array.from({ length: Math.floor(scale[1] / 4) }, (_, i) => (
            <mesh key={i} position={[0, -scale[1]/2 + i * 4 + 2, scale[2]/2 + 0.01]}>
              <planeGeometry args={[scale[0] * 0.8, 3]} />
              <meshStandardMaterial color="#1a1a2e" transparent={true} opacity={0.7} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Building entrance */}
      <mesh position={[0, -scale[1]/2 + 2, scale[2]/2 + 0.1]} castShadow>
        <boxGeometry args={[scale[0] * 0.3, 4, 0.5]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  );
};

// Residential Building
const ResidentialBuilding = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[scale[0], scale[1], scale[2]]} />
      <meshStandardMaterial color="#8b4513" roughness={0.9} />
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

// 2-Lane Road Network with textures
const RoadNetwork = () => {
  const roads = [];
  
  // Main horizontal road with 2 lanes
  roads.push(
    <group key="main-h">
      {/* Road base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[200, 0.1, 12]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.9} />
      </mesh>
      {/* Lane divider */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[200, 0.01, 0.2]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>
      {/* Side lines */}
      <mesh position={[0, 0.01, 5.8]}>
        <boxGeometry args={[200, 0.01, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.01, -5.8]}>
        <boxGeometry args={[200, 0.01, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
  
  // Main vertical road with 2 lanes
  roads.push(
    <group key="main-v">
      {/* Road base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 200]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.9} />
      </mesh>
      {/* Lane divider */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.2, 0.01, 200]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>
      {/* Side lines */}
      <mesh position={[5.8, 0.01, 0]}>
        <boxGeometry args={[0.2, 0.01, 200]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-5.8, 0.01, 0]}>
        <boxGeometry args={[0.2, 0.01, 200]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
  
  return <>{roads}</>;
};

export function CityWorld({ weatherCondition, timeOfDay }) {
  // Generate dense city with no empty spaces
  const buildings = [];
  const buildingTypes = [GlassSkyscraper, OfficeBuilding, ResidentialBuilding];
  
  // Fill entire area with buildings except roads
  for (let x = -15; x <= 15; x++) {
    for (let z = -15; z <= 15; z++) {
      // Skip road areas (cross pattern)
      if ((Math.abs(x) < 1 && Math.abs(z) < 8) || (Math.abs(z) < 1 && Math.abs(x) < 8)) continue;
      
      const BuildingType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
      const scale = [
        4 + Math.random() * 3,
        12 + Math.random() * 30, // Varied heights
        4 + Math.random() * 3
      ];
      
      const position = [
        x * 8 + (Math.random() - 0.5) * 2,
        scale[1] / 2, // Position above ground
        z * 8 + (Math.random() - 0.5) * 2
      ];
      
      buildings.push(
        <BuildingType 
          key={`building-${x}-${z}`} 
          position={position} 
          scale={scale} 
          rotation={[0, Math.random() * Math.PI * 2, 0]}
        />
      );
    }
  }
  
  // Add extra tall buildings in corners
  const cornerPositions = [[-80, -80], [80, -80], [-80, 80], [80, 80]];
  cornerPositions.forEach((pos, i) => {
    const scale = [6, 50 + Math.random() * 20, 6];
    buildings.push(
      <GlassSkyscraper 
        key={`corner-${i}`} 
        position={[pos[0], scale[1] / 2, pos[1]]} 
        scale={scale} 
        rotation={[0, Math.random() * Math.PI * 2, 0]}
      />
    );
  });
  
  // Add traffic lights and stop signs
  const trafficLights = [];
  const stopSigns = [];
  
  for (let i = 0; i < 5; i++) {
    const position = [-6, 0, -60 + i * 30];
    trafficLights.push(<TrafficLight key={`traffic-${i}`} position={position} />);
  }
  
  for (let i = 0; i < 3; i++) {
    const position = [6, 0, -40 + i * 40];
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
      
      {/* Ground with concrete texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
      </mesh>
      
      {/* Road Network */}
      <RoadNetwork />
      
      {/* Textured 3D City */}
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