import React from 'react';

export function World() {
  return (
    <>
      {/* Lighting - bright desert sun */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} color="#fff5e0" castShadow />
      <fog attach="fog" args={["#ffe6cc", 30, 100]} />
      
      {/* Desert ground with terrain variations */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 50, 50]} />
        <meshStandardMaterial color="#e6c588" displacementScale={2} wireframe={false} />
      </mesh>
      
      {/* Mountains */}
      <group>
        {/* Large mountain range */}
        <mesh position={[-40, 15, -60]} castShadow>
          <coneGeometry args={[30, 40, 4]} />
          <meshStandardMaterial color="#c19a6b" />
        </mesh>
        
        <mesh position={[-20, 10, -50]} castShadow>
          <coneGeometry args={[20, 25, 4]} />
          <meshStandardMaterial color="#d2b48c" />
        </mesh>
        
        <mesh position={[30, 12, -55]} castShadow>
          <coneGeometry args={[25, 30, 4]} />
          <meshStandardMaterial color="#c19a6b" />
        </mesh>
        
        {/* Additional mountains */}
        <mesh position={[50, 8, -40]} castShadow>
          <coneGeometry args={[15, 20, 4]} />
          <meshStandardMaterial color="#b38867" />
        </mesh>
        
        <mesh position={[-60, 10, -30]} castShadow>
          <coneGeometry args={[18, 22, 4]} />
          <meshStandardMaterial color="#c2a284" />
        </mesh>
      </group>
      
      {/* Desert buildings - Hacienda-like compound */}
      <group position={[0, 0, 10]}>
        {/* Main building */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[8, 4, 10]} />
          <meshStandardMaterial color="#d9c8b4" />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[9, 1, 11]} />
          <meshStandardMaterial color="#a86f32" />
        </mesh>
        
        {/* Smaller buildings */}
        <mesh position={[-10, 1, 5]} castShadow>
          <boxGeometry args={[5, 2, 5]} />
          <meshStandardMaterial color="#c2b280" />
        </mesh>
        
        <mesh position={[8, 1.5, -8]} castShadow>
          <boxGeometry args={[4, 3, 6]} />
          <meshStandardMaterial color="#d9c8b4" />
        </mesh>
        
        {/* Walls */}
        <mesh position={[-5, 1, -5]} castShadow>
          <boxGeometry args={[20, 2, 0.5]} />
          <meshStandardMaterial color="#e8d9c0" />
        </mesh>
        
        <mesh position={[-5, 1, 15]} castShadow>
          <boxGeometry args={[20, 2, 0.5]} />
          <meshStandardMaterial color="#e8d9c0" />
        </mesh>
      </group>
      
      {/* Desert rocks */}
      {[[5, 0, -5], [-8, 0, 8], [15, 0, 5], [-12, 0, -15], [30, 0, -20], [-20, 0, -25], [25, 0, 15]].map((position, index) => (
        <mesh key={`rock-${index}`} position={position} castShadow>
          <dodecahedronGeometry args={[1 + Math.random() * 1.5, 0]} />
          <meshStandardMaterial color="#a89078" />
        </mesh>
      ))}
      
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[6, 100]} />
        <meshStandardMaterial color="#847c74" />
      </mesh>
      
      {/* Oasis */}
      <group position={[30, 0, 30]}>
        {/* Palm trees */}
        {[[2, 0, 2], [-3, 0, 1], [0, 0, -3]].map((pos, idx) => (
          <group key={`palm-${idx}`} position={[pos[0] + 30, pos[1], pos[2] + 30]}>
            <mesh position={[0, 3, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.5, 6, 8]} />
              <meshStandardMaterial color="#8b5a2b" />
            </mesh>
            <mesh position={[0, 6, 0]} castShadow>
              <coneGeometry args={[2, 1, 8]} />
              <meshStandardMaterial color="#2e8b57" />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}